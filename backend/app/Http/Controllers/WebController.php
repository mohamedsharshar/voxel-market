<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\VoxelModel;
use App\Models\Creator;
use App\Models\Order;

class WebController extends Controller
{
    /**
     * Display the home page
     */
    public function home()
    {
        $featuredModels = VoxelModel::where('featured', true)
            ->with('creator')
            ->take(8)
            ->get();
        
        $topCreators = Creator::withCount('models')
            ->orderBy('models_count', 'desc')
            ->take(8)
            ->get();
        
        $categories = VoxelModel::select('category')
            ->selectRaw('count(*) as count')
            ->groupBy('category')
            ->get();

        return view('home', compact('featuredModels', 'topCreators', 'categories'));
    }

    /**
     * Display the browse page
     */
    public function browse(Request $request)
    {
        $query = VoxelModel::with('creator');

        // Search
        if ($request->has('q') && $request->q) {
            $query->where(function($q) use ($request) {
                $q->where('name', 'like', '%' . $request->q . '%')
                  ->orWhere('description', 'like', '%' . $request->q . '%');
            });
        }

        // Category filter
        if ($request->has('category') && $request->category !== 'All Categories') {
            $query->where('category', $request->category);
        }

        // Verified creators only
        if ($request->has('verified') && $request->verified) {
            $query->whereHas('creator', function($q) {
                $q->where('verified', true);
            });
        }

        // Sorting
        $sort = $request->get('sort', 'Newest First');
        switch ($sort) {
            case 'Price: Low to High':
                $query->orderBy('price', 'asc');
                break;
            case 'Price: High to Low':
                $query->orderBy('price', 'desc');
                break;
            case 'Most Popular':
                $query->orderBy('likes', 'desc');
                break;
            default:
                $query->orderBy('created_at', 'desc');
        }

        $models = $query->paginate(12);
        
        $categories = VoxelModel::select('category')
            ->selectRaw('count(*) as count')
            ->groupBy('category')
            ->get();

        return view('browse', compact('models', 'categories'));
    }

    /**
     * Display model details
     */
    public function modelDetail($id)
    {
        $model = VoxelModel::with('creator')->findOrFail($id);
        
        $relatedModels = VoxelModel::where('category', $model->category)
            ->where('id', '!=', $model->id)
            ->with('creator')
            ->take(4)
            ->get();

        return view('model-detail', compact('model', 'relatedModels'));
    }

    /**
     * Display creators page
     */
    public function creators(Request $request)
    {
        $query = Creator::withCount('models');

        if ($request->has('q') && $request->q) {
            $q = $request->q;
            $query->where(function($qb) use ($q) {
                $qb->where('name', 'like', '%' . $q . '%')
                   ->orWhere('handle', 'like', '%' . $q . '%');
            });
        }

        $creators = $query->orderBy('models_count', 'desc')->paginate(12);

        return view('creators', compact('creators'));
    }

    /**
     * Display creator profile
     */
    public function creatorProfile($name)
    {
        $creator = Creator::where('name', 'like', '%' . str_replace('-', ' ', $name) . '%')
            ->firstOrFail();
        
        $models = VoxelModel::where('creator_id', $creator->id)
            ->orderBy('created_at', 'desc')
            ->paginate(12);

        return view('creator-profile', compact('creator', 'models'));
    }

    /**
     * Display cart page
     */
    public function cart()
    {
        $cartItems = session('cart', []);
        $total = 0;
        
        foreach ($cartItems as $item) {
            $total += $item['price'] * $item['quantity'];
        }

        return view('cart', compact('cartItems', 'total'));
    }

    /**
     * Add item to cart
     */
    public function addToCart(Request $request, $id)
    {
        $model = VoxelModel::findOrFail($id);
        
        $cart = session('cart', []);
        
        // Check if already in cart
        if (isset($cart[$id])) {
            return response()->json([
                'success' => false,
                'message' => 'Already in cart!'
            ]);
        }
        
        $cart[$id] = [
            'id' => $model->id,
            'name' => $model->name,
            'price' => $model->price,
            'image' => $model->image,
            'quantity' => 1
        ];
        
        session(['cart' => $cart]);
        
        return response()->json([
            'success' => true,
            'message' => 'Added to cart!',
            'cartCount' => count($cart)
        ]);
    }

    /**
     * Remove item from cart
     */
    public function removeFromCart($id)
    {
        $cart = session('cart', []);
        
        if (isset($cart[$id])) {
            unset($cart[$id]);
            session(['cart' => $cart]);
        }
        
        return response()->json([
            'success' => true,
            'message' => 'Removed from cart',
            'cartCount' => count($cart)
        ]);
    }

    /**
     * Clear cart
     */
    public function clearCart()
    {
        session()->forget('cart');
        
        return response()->json([
            'success' => true,
            'message' => 'Cart cleared'
        ]);
    }

    /**
     * Display about page
     */
    public function about()
    {
        return view('about');
    }

    /**
     * Display support page
     */
    public function support()
    {
        return view('support');
    }

    /**
     * Display settings page
     */
    public function settings()
    {
        return view('settings');
    }

    /**
     * Display admin dashboard
     */
    public function adminDashboard()
    {
        $stats = [
            'total_models' => VoxelModel::count(),
            'total_creators' => Creator::count(),
            'total_orders' => Order::count(),
            'total_revenue' => Order::sum('total_amount')
        ];

        $recentOrders = Order::with('user')
            ->orderBy('created_at', 'desc')
            ->take(10)
            ->get();

        return view('admin.dashboard', compact('stats', 'recentOrders'));
    }
}
