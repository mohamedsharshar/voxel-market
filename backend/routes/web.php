<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\WebController;
use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

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

Route::post('/login', function (Request $request) {
    $credentials = $request->validate([
        'email' => 'required|email',
        'password' => 'required',
    ]);

    if (Auth::attempt($credentials)) {
        $request->session()->regenerate();
        return redirect()->intended(route('home'));
    }

    return back()->withErrors(['email' => 'Invalid credentials.']);
});

Route::get('/register', function () {
    return view('auth.register');
})->name('register');

Route::post('/register', function (Request $request) {
    $data = $request->validate([
        'name' => 'required|string|max:255',
        'email' => 'required|email|unique:users',
        'password' => 'required|min:8|confirmed',
    ]);

    $user = User::create([
        'name' => $data['name'],
        'email' => $data['email'],
        'password' => Hash::make($data['password']),
        'role' => 'user',
    ]);

    Auth::login($user);
    return redirect()->route('home');
});

Route::post('/logout', function (Request $request) {
    Auth::logout();
    $request->session()->invalidate();
    $request->session()->regenerateToken();
    return redirect()->route('home');
})->name('logout');

// Authenticated Routes
Route::middleware('auth')->group(function () {
    Route::get('/settings', [WebController::class, 'settings'])->name('settings');
});

// Admin Routes
Route::middleware(['auth', 'admin'])->prefix('admin')->group(function () {
    Route::get('/dashboard', [WebController::class, 'adminDashboard'])->name('admin.dashboard');
});
