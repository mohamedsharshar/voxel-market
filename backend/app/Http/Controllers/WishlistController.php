<?php

namespace App\Http\Controllers;

use App\Models\Wishlist;
use Illuminate\Http\Request;

class WishlistController extends Controller
{
    /**
     * Get the authenticated user's wishlist.
     */
    public function index(Request $request)
    {
        $items = Wishlist::with('voxelModel.creator')
            ->where('user_id', $request->user()->id)
            ->get()
            ->pluck('voxelModel');

        return response()->json($items);
    }

    /**
     * Toggle a model in the wishlist.
     */
    public function toggle(Request $request, $modelId)
    {
        $userId = $request->user()->id;

        $existing = Wishlist::where('user_id', $userId)
            ->where('voxel_model_id', $modelId)
            ->first();

        if ($existing) {
            $existing->delete();
            return response()->json([
                'wishlisted' => false,
                'message'    => 'Removed from wishlist.',
            ]);
        }

        Wishlist::create([
            'user_id'        => $userId,
            'voxel_model_id' => $modelId,
        ]);

        return response()->json([
            'wishlisted' => true,
            'message'    => 'Added to wishlist.',
        ]);
    }

    /**
     * Check if a model is in the wishlist.
     */
    public function check(Request $request, $modelId)
    {
        $exists = Wishlist::where('user_id', $request->user()->id)
            ->where('voxel_model_id', $modelId)
            ->exists();

        return response()->json(['wishlisted' => $exists]);
    }
}
