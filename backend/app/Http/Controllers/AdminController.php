<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\VoxelModel;
use App\Models\Creator;
use App\Models\Order;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    /**
     * Dashboard stats.
     */
    public function dashboard()
    {
        return response()->json([
            'total_users'    => User::count(),
            'total_models'   => VoxelModel::count(),
            'total_creators' => Creator::count(),
            'total_orders'   => Order::count(),
            'total_revenue'  => Order::where('status', 'completed')->sum('total'),
            'recent_orders'  => Order::with('user')
                ->orderBy('created_at', 'desc')
                ->take(5)
                ->get(),
        ]);
    }

    /**
     * List all users (admin only).
     */
    public function users()
    {
        return response()->json(
            User::orderBy('created_at', 'desc')->get(['id', 'name', 'email', 'role', 'created_at'])
        );
    }

    /**
     * Update user role (admin only).
     */
    public function updateUserRole(Request $request, $id)
    {
        $request->validate([
            'role' => 'required|in:user,admin',
        ]);

        $user = User::findOrFail($id);
        $user->update(['role' => $request->role]);

        return response()->json(['message' => 'User role updated.', 'user' => $user]);
    }

    /**
     * Delete a user (admin only).
     */
    public function deleteUser($id)
    {
        $user = User::findOrFail($id);
        $user->delete();

        return response()->json(['message' => 'User deleted successfully.']);
    }
}
