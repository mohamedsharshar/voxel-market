@extends('layouts.app')
@section('title', $creator->name . ' - Voxel Market')

@push('styles')
<style>
    .back-button { display:inline-flex;align-items:center;gap:6px;padding:8px 16px;background:var(--bg-secondary);border:1px solid var(--border-color);border-radius:8px;color:var(--text-secondary);font-size:14px;cursor:pointer;transition:all .2s;text-decoration:none;margin-bottom:24px; }
    .back-button:hover { color:var(--white);border-color:var(--cyan); }
    .creator-profile-header { display:flex;gap:32px;align-items:flex-start;margin-bottom:48px; }
    .creator-profile-avatar { width:120px;height:120px;border-radius:50%;background:linear-gradient(135deg,var(--cyan),#0066ff);display:flex;align-items:center;justify-content:center;font-size:48px;font-weight:700;color:var(--white);position:relative;flex-shrink:0; }
    .creator-verified-badge { position:absolute;bottom:4px;right:4px;background:var(--bg-primary);border-radius:50%;padding:4px;color:var(--cyan); }
    .creator-profile-name { font-size:32px;font-weight:800;color:var(--white);display:flex;align-items:center;gap:10px;margin-bottom:4px; }
    .creator-profile-name svg { color:var(--cyan); }
    .creator-profile-handle { font-size:15px;color:var(--text-muted);margin-bottom:12px; }
    .creator-profile-bio { font-size:15px;color:var(--text-secondary);line-height:1.6;margin-bottom:16px; }
    .creator-profile-meta { display:flex;gap:20px;flex-wrap:wrap;margin-bottom:20px; }
    .meta-item { display:flex;align-items:center;gap:6px;font-size:13px;color:var(--text-muted); }
    .meta-item svg { color:var(--cyan); }
    .meta-item a { color:var(--cyan);text-decoration:none; }
    .creator-profile-stats { display:flex;gap:24px;margin-bottom:20px; }
    .profile-stat { display:flex;align-items:center;gap:10px;padding:12px 20px;background:var(--bg-secondary);border:1px solid var(--border-color);border-radius:12px; }
    .profile-stat svg { color:var(--cyan); }
    .stat-value { font-size:20px;font-weight:700;color:var(--white); }
    .stat-label { font-size:12px;color:var(--text-muted); }
    .btn-follow { padding:10px 28px;background:var(--cyan);color:var(--bg-primary);border:none;border-radius:8px;font-size:14px;font-weight:600;cursor:pointer;transition:all .2s; }
    .btn-follow:hover { background:var(--cyan-hover); }
    .section-title { font-size:28px;font-weight:700;color:var(--white);margin-bottom:24px; }
    .models-grid { display:grid;gap:24px; }
    .models-grid-4 { grid-template-columns:repeat(4,1fr); }
    .model-card { background:var(--bg-secondary);border:1px solid var(--border-color);border-radius:16px;overflow:hidden;transition:all .3s;text-decoration:none;display:block; }
    .model-card:hover { transform:translateY(-4px);border-color:var(--cyan);box-shadow:0 10px 40px rgba(0,200,255,.2); }
    .model-card-image { position:relative;width:100%;padding-top:75%;background:var(--bg-tertiary);overflow:hidden; }
    .model-card-image img { position:absolute;top:0;left:0;width:100%;height:100%;object-fit:cover; }
    .model-card-content { padding:16px; }
    .model-card-category { font-size:11px;font-weight:600;color:var(--cyan);text-transform:uppercase;letter-spacing:.5px;margin-bottom:8px; }
    .model-card-title { font-size:16px;font-weight:600;color:var(--white);margin-bottom:8px; }
    .model-card-footer { display:flex;justify-content:space-between;align-items:center;padding-top:12px;border-top:1px solid var(--border-color); }
    .model-card-price { font-size:18px;font-weight:700;color:var(--white); }
    .model-card-likes { display:flex;align-items:center;gap:4px;font-size:13px;color:var(--text-muted); }
    @media(max-width:1024px) { .creator-profile-header { flex-direction:column;align-items:center;text-align:center; } .creator-profile-meta,.creator-profile-stats { justify-content:center; } .models-grid-4 { grid-template-columns:repeat(2,1fr); } }
    @media(max-width:640px) { .models-grid-4 { grid-template-columns:1fr; } }
</style>
@endpush

@section('content')
<div class="page">
    <a href="{{ url()->previous() }}" class="back-button">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"></polyline></svg>
        Back
    </a>

    <div class="creator-profile-header">
        <div class="creator-profile-avatar">
            {{ $creator->initial }}
            @if($creator->verified)
            <span class="creator-verified-badge"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg></span>
            @endif
        </div>
        <div class="creator-profile-info">
            <h1 class="creator-profile-name">
                {{ $creator->name }}
                @if($creator->verified)
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                @endif
            </h1>
            <div class="creator-profile-handle">{{ $creator->handle }}</div>
            <p class="creator-profile-bio">{{ $creator->bio }}</p>
            <div class="creator-profile-meta">
                <span class="meta-item"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg> Joined March 2024</span>
                <span class="meta-item"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg> San Francisco, CA</span>
                <span class="meta-item"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg> <a href="#">portfolio.com</a></span>
            </div>
            <div class="creator-profile-stats">
                <div class="profile-stat"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path></svg><div><div class="stat-value">{{ $models->total() }}</div><div class="stat-label">Models</div></div></div>
                <div class="profile-stat"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg><div><div class="stat-value">{{ $creator->followers ?? 0 }}</div><div class="stat-label">Followers</div></div></div>
                <div class="profile-stat"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg><div><div class="stat-value">4.9</div><div class="stat-label">Rating</div></div></div>
            </div>
            <button class="btn-follow">Follow Creator</button>
        </div>
    </div>

    <h2 class="section-title">Published Models ({{ $models->total() }})</h2>
    @if($models->count() > 0)
    <div class="models-grid models-grid-4">
        @foreach($models as $model)
        <a href="{{ route('model.detail', $model->id) }}" class="model-card">
            <div class="model-card-image"><img src="{{ $model->image }}" alt="{{ $model->name }}" loading="lazy"></div>
            <div class="model-card-content">
                <div class="model-card-category">{{ $model->category }}</div>
                <div class="model-card-title">{{ $model->name }}</div>
                <div class="model-card-footer">
                    <div class="model-card-price">${{ number_format($model->price, 2) }}</div>
                    <div class="model-card-likes">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                        {{ $model->likes }}
                    </div>
                </div>
            </div>
        </a>
        @endforeach
    </div>
    @else
    <div style="color:var(--text-muted);text-align:center;padding:60px 0;">No models published yet.</div>
    @endif
</div>
@endsection
