<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\VoxelModelController;
use App\Http\Controllers\CreatorController;
use App\Http\Controllers\WishlistController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\AdminController;

/*
|--------------------------------------------------------------------------
| Public Routes (no auth required)
|--------------------------------------------------------------------------
*/

// Models
Route::get('/models', [VoxelModelController::class, 'index']);
Route::get('/models/{id}', [VoxelModelController::class, 'show']);
Route::get('/categories', [VoxelModelController::class, 'categories']);
Route::post('/models/{id}/like', [VoxelModelController::class, 'like']);

// Creators
Route::get('/creators', [CreatorController::class, 'index']);
Route::get('/creators/{id}', [CreatorController::class, 'show']);
Route::get('/creators/name/{name}', [CreatorController::class, 'findByName']);

// Auth
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

/*
|--------------------------------------------------------------------------
| Authenticated Routes (requires Sanctum token)
|--------------------------------------------------------------------------
*/

Route::middleware('auth:sanctum')->group(function () {
    // Auth
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);
    Route::put('/profile', [AuthController::class, 'updateProfile']);
    Route::put('/password', [AuthController::class, 'changePassword']);

    // Wishlist
    Route::get('/wishlist', [WishlistController::class, 'index']);
    Route::post('/wishlist/{modelId}', [WishlistController::class, 'toggle']);
    Route::get('/wishlist/{modelId}/check', [WishlistController::class, 'check']);

    // Orders
    Route::get('/orders', [OrderController::class, 'index']);
    Route::post('/orders', [OrderController::class, 'store']);
    Route::get('/orders/{id}', [OrderController::class, 'show']);
});

/*
|--------------------------------------------------------------------------
| Admin Routes (requires auth + admin role)
|--------------------------------------------------------------------------
*/

Route::middleware(['auth:sanctum', 'admin'])->prefix('admin')->group(function () {
    // Dashboard
    Route::get('/dashboard', [AdminController::class, 'dashboard']);

    // Users management
    Route::get('/users', [AdminController::class, 'users']);
    Route::put('/users/{id}/role', [AdminController::class, 'updateUserRole']);
    Route::delete('/users/{id}', [AdminController::class, 'deleteUser']);

    // Models CRUD (admin)
    Route::post('/models', [VoxelModelController::class, 'store']);
    Route::put('/models/{id}', [VoxelModelController::class, 'update']);
    Route::post('/models/{id}/thumbnail', [VoxelModelController::class, 'uploadThumbnail']);
    Route::delete('/models/{id}', [VoxelModelController::class, 'destroy']);

    // Creators CRUD (admin)
    Route::post('/creators', [CreatorController::class, 'store']);
    Route::put('/creators/{id}', [CreatorController::class, 'update']);
    Route::delete('/creators/{id}', [CreatorController::class, 'destroy']);

    // Orders overview
    Route::get('/orders', [OrderController::class, 'adminIndex']);
});
