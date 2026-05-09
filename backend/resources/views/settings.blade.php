@extends('layouts.app')
@section('title', 'Settings - Voxel Market')

@push('styles')
<style>
    .settings-title { font-size:32px;font-weight:700;color:var(--white);margin-bottom:8px; }
    .settings-sub { font-size:16px;color:var(--text-secondary);margin-bottom:32px; }
    .settings-card { background:var(--bg-secondary);border:1px solid var(--border-color);border-radius:16px;padding:32px;margin-bottom:24px; }
    .settings-card h3 { font-size:20px;font-weight:700;color:var(--white);margin-bottom:24px; }
    .form-group { margin-bottom:20px; }
    .form-group label { display:block;font-size:14px;font-weight:600;color:var(--text-secondary);margin-bottom:8px; }
    .form-group input { width:100%;padding:12px;background:var(--bg-tertiary);border:1px solid var(--border-color);border-radius:8px;color:var(--text-primary);font-size:14px;transition:all .2s;max-width:400px; }
    .form-group input:focus { outline:none;border-color:var(--cyan);box-shadow:0 0 0 3px rgba(0,200,255,.1); }
    .btn-save { padding:10px 24px; }
</style>
@endpush

@section('content')
<div class="page">
    <h1 class="settings-title">Settings</h1>
    <p class="settings-sub">Manage your account preferences.</p>

    <div class="settings-card">
        <h3>Profile Information</h3>
        <form>
            <div class="form-group"><label>Name</label><input type="text" value="{{ auth()->user()->name ?? 'User' }}"></div>
            <div class="form-group"><label>Email</label><input type="email" value="{{ auth()->user()->email ?? '' }}"></div>
            <button type="button" class="btn-primary btn-save" onclick="alert('Settings saved!')">Save Changes</button>
        </form>
    </div>

    <div class="settings-card">
        <h3>Change Password</h3>
        <form>
            <div class="form-group"><label>Current Password</label><input type="password" placeholder="••••••••"></div>
            <div class="form-group"><label>New Password</label><input type="password" placeholder="••••••••"></div>
            <div class="form-group"><label>Confirm New Password</label><input type="password" placeholder="••••••••"></div>
            <button type="button" class="btn-primary btn-save" onclick="alert('Password updated!')">Update Password</button>
        </form>
    </div>
</div>
@endsection
