<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\VoxelModel;
use App\Models\Creator;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

// Public routes
Route::get('/models', function () {
    return VoxelModel::with('creator')->get();
});

Route::get('/creators', function () {
    return Creator::all();
});

Route::post('/login', function (Request $request) {
    $request->validate([
        'email' => 'required|email',
        'password' => 'required',
    ]);

    $user = User::where('email', $request->email)->first();

    if (! $user || ! Hash::check($request->password, $user->password)) {
        return response()->json(['message' => 'Invalid email or password'], 401);
    }

    return response()->json([
        'user' => [
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'role' => $user->role,
        ]
    ]);
});

Route::post('/register', function (Request $request) {
    $request->validate([
        'email' => 'required|email|unique:users',
        'password' => 'required|min:6',
    ]);

    $user = User::create([
        'name' => explode('@', $request->email)[0],
        'email' => $request->email,
        'password' => Hash::make($request->password),
        'role' => 'user',
    ]);

    return response()->json([
        'user' => [
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'role' => $user->role,
        ]
    ]);
});
