@extends('layouts.app')
@section('title', 'Creators Directory - Voxel Market')

@push('styles')
<style>
    .browse-page-title { font-size:36px;font-weight:700;color:var(--white);margin-bottom:8px; }
    .browse-page-sub { font-size:16px;color:var(--text-secondary);margin-bottom:32px;max-width:520px; }
    .creators-search-bar { display:flex;align-items:center;justify-content:space-between;gap:24px;margin-bottom:32px;flex-wrap:wrap; }
    .creators-search-wrap { position:relative;display:flex;align-items:center;flex:1;min-width:280px; }
    .creators-search-wrap svg { position:absolute;left:14px;color:var(--text-muted); }
    .creators-search-wrap input { width:100%;padding:12px 12px 12px 40px;background:var(--bg-secondary);border:1px solid var(--border-color);border-radius:10px;color:var(--text-primary);font-size:14px;transition:all .2s; }
    .creators-search-wrap input:focus { outline:none;border-color:var(--cyan);box-shadow:0 0 0 3px rgba(0,200,255,.1); }
    .creators-grid { display:grid;grid-template-columns:repeat(3,1fr);gap:20px; }
    .creator-card { background:var(--bg-secondary);border:1px solid var(--border-color);border-radius:16px;padding:24px;text-align:center;transition:all .3s;text-decoration:none;display:block; }
    .creator-card:hover { transform:translateY(-4px);border-color:var(--cyan);box-shadow:0 10px 40px rgba(0,200,255,.15); }
    .creator-avatar { width:80px;height:80px;border-radius:50%;background:linear-gradient(135deg,var(--cyan),#0066ff);display:flex;align-items:center;justify-content:center;font-size:32px;font-weight:700;color:var(--white);margin:0 auto 16px; }
    .creator-name { font-size:16px;font-weight:600;color:var(--white);margin-bottom:4px;display:flex;align-items:center;justify-content:center;gap:6px; }
    .creator-handle { font-size:13px;color:var(--text-muted);margin-bottom:8px; }
    .creator-bio { font-size:13px;color:var(--text-secondary);margin-bottom:16px;line-height:1.5; }
    .creator-stats { display:flex;justify-content:center;gap:16px;padding-top:12px;border-top:1px solid var(--border-color); }
    .creator-stat { display:flex;align-items:center;gap:4px;font-size:13px;color:var(--text-secondary); }
    .creator-stat svg { color:var(--cyan); }
    .toggle-switch { width:44px;height:24px;background:var(--bg-tertiary);border:1px solid var(--border-color);border-radius:12px;position:relative;cursor:pointer;transition:all .2s; }
    .toggle-switch.on { background:var(--cyan);border-color:var(--cyan); }
    .toggle-knob { width:18px;height:18px;background:var(--white);border-radius:50%;position:absolute;top:2px;left:2px;transition:all .2s; }
    .toggle-switch.on .toggle-knob { left:22px; }
    .pagination { display:flex;justify-content:center;gap:8px;margin-top:48px; }
    .pagination a,.pagination span { padding:8px 16px;background:var(--bg-secondary);border:1px solid var(--border-color);border-radius:8px;color:var(--text-secondary);text-decoration:none;font-size:14px;transition:all .2s; }
    .pagination a:hover { border-color:var(--cyan);color:var(--white); }
    .pagination .active { background:var(--cyan);border-color:var(--cyan);color:var(--bg-primary); }
    @media(max-width:1024px) { .creators-grid { grid-template-columns:repeat(2,1fr); } }
    @media(max-width:640px) { .creators-grid { grid-template-columns:1fr; } }
</style>
@endpush

@section('content')
<div class="page">
    <h1 class="browse-page-title">Creators Directory</h1>
    <p class="browse-page-sub">Discover talented 3D artists, game developers, and technical directors publishing their work on Voxel Market.</p>

    <div class="creators-search-bar">
        <form action="{{ route('creators') }}" method="GET" class="creators-search-wrap">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.35-4.35"></path></svg>
            <input type="text" name="q" placeholder="Search creators by name or handle..." value="{{ request('q') }}">
        </form>
    </div>

    <div class="creators-grid">
        @foreach($creators as $creator)
        <a href="{{ route('creator.profile', strtolower(str_replace(' ', '-', $creator->name))) }}" class="creator-card">
            <div class="creator-avatar">{{ substr($creator->name, 0, 1) }}</div>
            <div class="creator-name">
                {{ $creator->name }}
                @if($creator->verified)
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" style="color:var(--cyan)"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                @endif
            </div>
            <div class="creator-handle">{{ $creator->handle }}</div>
            <div class="creator-bio">{{ $creator->bio }}</div>
            <div class="creator-stats">
                <span class="creator-stat">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path></svg>
                    {{ $creator->models_count }}
                </span>
                <span class="creator-stat">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
                    {{ $creator->followers ?? 0 }} followers
                </span>
            </div>
        </a>
        @endforeach
    </div>

    @if($creators->isEmpty())
    <div style="color:var(--text-muted);text-align:center;padding:60px 0;">No creators found.</div>
    @endif

    <div class="pagination">{{ $creators->links() }}</div>
</div>
@endsection
