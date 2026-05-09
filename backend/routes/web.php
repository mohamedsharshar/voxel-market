<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\WebController;
use App\Http\Controllers\AuthController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
*/

// Home
Route::get('/', [WebController::class, 'home'])->name('home');

// Browse & Models
Route::get('/browse', [WebController::class, 'browse'])->name('browse');
Route::get('/model/{id}', [WebController::class, 'modelDetail'])->name('model.detail');

// Creators
Route::get('/creators', [WebController::class, 'creators'])->name('creators');
Route::get('/creator/{name}', [WebController::class, 'creatorProfile'])->name('creator.profile');

// Cart
Route::get('/cart', [WebController::class, 'cart'])->name('cart');
Route::post('/cart/add/{id}', [WebController::class, 'addToCart'])->name('cart.add');
Route::delete('/cart/remove/{id}', [WebController::class, 'removeFromCart'])->name('cart.remove');
Route::delete('/cart/clear', [WebController::class, 'clearCart'])->name('cart.clear');

// Static Pages
Route::get('/about', [WebController::class, 'about'])->name('about');
Route::get('/support', [WebController::class, 'support'])->name('support');

// Auth Routes
Route::get('/login', function () {
    return view('auth.login');
})->name('login');

Route::get('/register', function () {
    return view('auth.register');
})->name('register');

Route::post('/logout', function () {
    auth()->logout();
    return redirect()->route('home');
})->name('logout');

// Authenticated Routes
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/settings', [WebController::class, 'settings'])->name('settings');
});

// Admin Routes
Route::middleware(['auth:sanctum', 'admin'])->prefix('admin')->group(function () {
    Route::get('/dashboard', [WebController::class, 'adminDashboard'])->name('admin.dashboard');
});
