<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\VoxelModel;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    /**
     * Get the authenticated user's orders.
     */
    public function index(Request $request)
    {
        $orders = Order::with('items.voxelModel.creator')
            ->where('user_id', $request->user()->id)
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json($orders);
    }

    /**
     * Create a new order (checkout).
     */
    public function store(Request $request)
    {
        $request->validate([
            'items'          => 'required|array|min:1',
            'items.*.id'     => 'required|exists:voxel_models,id',
            'items.*.quantity' => 'sometimes|integer|min:1',
        ]);

        $total = 0;
        $orderItems = [];

        foreach ($request->items as $item) {
            $model = VoxelModel::findOrFail($item['id']);
            $qty = $item['quantity'] ?? 1;
            $total += $model->price * $qty;
            $orderItems[] = [
                'voxel_model_id' => $model->id,
                'quantity'       => $qty,
                'price'          => $model->price,
            ];
        }

        $order = Order::create([
            'user_id' => $request->user()->id,
            'total'   => $total,
            'status'  => 'completed',
        ]);

        foreach ($orderItems as $item) {
            $order->items()->create($item);
        }

        return response()->json(
            $order->load('items.voxelModel.creator'),
            201
        );
    }

    /**
     * Show a specific order.
     */
    public function show(Request $request, $id)
    {
        $order = Order::with('items.voxelModel.creator')
            ->where('user_id', $request->user()->id)
            ->findOrFail($id);

        return response()->json($order);
    }

    /**
     * Get all orders (admin only).
     */
    public function adminIndex()
    {
        $orders = Order::with(['user', 'items.voxelModel'])
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json($orders);
    }
}
