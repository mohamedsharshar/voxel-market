@extends('layouts.app')
@section('title', 'Login - Voxel Market')

@push('styles')
<style>
    .auth-container { max-width:420px;margin:60px auto;padding:0 20px; }
    .auth-card { background:var(--bg-secondary);border:1px solid var(--border-color);border-radius:16px;padding:40px; }
    .auth-card h1 { font-size:28px;font-weight:700;color:var(--white);text-align:center;margin-bottom:8px; }
    .auth-card .subtitle { text-align:center;color:var(--text-secondary);margin-bottom:32px;font-size:14px; }
    .form-group { margin-bottom:20px; }
    .form-group label { display:block;font-size:14px;font-weight:600;color:var(--text-secondary);margin-bottom:8px; }
    .form-group input { width:100%;padding:12px;background:var(--bg-tertiary);border:1px solid var(--border-color);border-radius:8px;color:var(--text-primary);font-size:14px;transition:all .2s; }
    .form-group input:focus { outline:none;border-color:var(--cyan);box-shadow:0 0 0 3px rgba(0,200,255,.1); }
    .auth-submit { width:100%;padding:14px;margin-top:8px; }
    .auth-switch { text-align:center;margin-top:20px;font-size:14px;color:var(--text-secondary); }
    .auth-switch a { color:var(--cyan);text-decoration:none;font-weight:600; }
    .error-msg { color:var(--red);font-size:13px;margin-top:4px; }
</style>
@endpush

@section('content')
<div class="auth-container">
    <div class="auth-card">
        <h1>Welcome Back</h1>
        <p class="subtitle">Log in to your Voxel Market account</p>

        @if($errors->any())
        <div style="background:rgba(239,68,68,.1);border:1px solid var(--red);border-radius:8px;padding:12px;margin-bottom:20px;">
            @foreach($errors->all() as $error)
            <div class="error-msg">{{ $error }}</div>
            @endforeach
        </div>
        @endif

        <form method="POST" action="{{ route('login') }}">
            @csrf
            <div class="form-group"><label>Email</label><input type="email" name="email" required placeholder="you@example.com" value="{{ old('email') }}"></div>
            <div class="form-group"><label>Password</label><input type="password" name="password" required placeholder="••••••••"></div>
            <button type="submit" class="btn-primary auth-submit">Log In</button>
        </form>
        <div class="auth-switch">Don't have an account? <a href="{{ route('register') }}">Sign up</a></div>
    </div>
</div>
@endsection
