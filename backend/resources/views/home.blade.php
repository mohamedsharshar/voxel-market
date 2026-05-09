@extends('layouts.app')

@section('title', 'Voxel Market - Premium 3D Models Marketplace')

@push('styles')
<style>
    /* Hero Section */
    .hero {
        position: relative;
        min-height: 600px;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        background: linear-gradient(135deg, var(--bg-primary) 0%, var(--bg-secondary) 100%);
    }

    .hero-bg {
        position: absolute;
        inset: 0;
        background: 
            radial-gradient(circle at 20% 50%, rgba(0, 200, 255, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 80% 50%, rgba(0, 200, 255, 0.1) 0%, transparent 50%);
        animation: pulse 8s ease-in-out infinite;
    }

    @keyframes pulse {
        0%, 100% { opacity: 0.5; }
        50% { opacity: 1; }
    }

    .hero-city {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 200px;
        background: linear-gradient(to top, var(--bg-secondary), transparent);
        opacity: 0.3;
    }

    .hero-inner {
        position: relative;
        z-index: 1;
        max-width: 1400px;
        width: 100%;
        padding: 80px 24px;
    }

    .hero-content {
        max-width: 700px;
        margin: 0 auto;
        text-align: center;
    }

    .hero-badge {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 8px 16px;
        background: rgba(0, 200, 255, 0.1);
        border: 1px solid rgba(0, 200, 255, 0.3);
        border-radius: 20px;
        color: var(--cyan);
        font-size: 13px;
        font-weight: 600;
        margin-bottom: 24px;
    }

    .hero h1 {
        font-size: 56px;
        font-weight: 800;
        line-height: 1.1;
        margin-bottom: 24px;
        color: var(--white);
    }

    .hero p {
        font-size: 18px;
        color: var(--text-secondary);
        line-height: 1.6;
        margin-bottom: 32px;
    }

    .hero-buttons {
        display: flex;
        gap: 16px;
        justify-content: center;
        flex-wrap: wrap;
    }

    /* Categories */
    .section-title {
        font-size: 28px;
        font-weight: 700;
        color: var(--white);
        margin-bottom: 24px;
    }

    .category-pills {
        display: flex;
        gap: 12px;
        flex-wrap: wrap;
        margin-bottom: 48px;
    }

    .category-pill {
        padding: 10px 20px;
        background: var(--bg-secondary);
        border: 1px solid var(--border-color);
        border-radius: 24px;
        color: var(--text-secondary);
        font-size: 14px;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s;
        display: flex;
        align-items: center;
        gap: 8px;
    }

    .category-pill:hover {
        border-color: var(--cyan);
        color: var(--white);
    }

    .category-pill.active {
        background: var(--cyan);
        border-color: var(--cyan);
        color: var(--bg-primary);
    }

    .category-pill .count {
        opacity: 0.7;
        font-size: 12px;
    }

    /* Featured Header */
    .featured-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        margin-bottom: 24px;
    }

    .featured-label {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        color: var(--cyan);
        font-size: 12px;
        font-weight: 700;
        letter-spacing: 1px;
        margin-bottom: 8px;
    }

    .view-all {
        display: flex;
        align-items: center;
        gap: 4px;
        color: var(--cyan);
        text-decoration: none;
        font-size: 14px;
        font-weight: 600;
        transition: gap 0.2s;
    }

    .view-all:hover {
        gap: 8px;
    }

    /* Models Grid */
    .models-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
        gap: 24px;
        margin-bottom: 48px;
    }

    .models-grid-4 {
        grid-template-columns: repeat(4, 1fr);
    }

    .model-card {
        background: var(--bg-secondary);
        border: 1px solid var(--border-color);
        border-radius: 16px;
        overflow: hidden;
        transition: all 0.3s;
        cursor: pointer;
    }

    .model-card:hover {
        transform: translateY(-4px);
        border-color: var(--cyan);
        box-shadow: 0 10px 40px rgba(0, 200, 255, 0.2);
    }

    .model-card-image {
        position: relative;
        width: 100%;
        padding-top: 75%;
        background: var(--bg-tertiary);
        overflow: hidden;
    }

    .model-card-image img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .model-card-content {
        padding: 16px;
    }

    .model-card-category {
        font-size: 11px;
        font-weight: 600;
        color: var(--cyan);
        text-transform: uppercase;
        letter-spacing: 0.5px;
        margin-bottom: 8px;
    }

    .model-card-title {
        font-size: 16px;
        font-weight: 600;
        color: var(--white);
        margin-bottom: 8px;
    }

    .model-card-creator {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 13px;
        color: var(--text-secondary);
        margin-bottom: 12px;
    }

    .model-card-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-top: 12px;
        border-top: 1px solid var(--border-color);
    }

    .model-card-price {
        font-size: 18px;
        font-weight: 700;
        color: var(--white);
    }

    .model-card-likes {
        display: flex;
        align-items: center;
        gap: 4px;
        font-size: 13px;
        color: var(--text-muted);
    }

    /* Creators Grid */
    .top-creators-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 20px;
    }

    .top-creators-grid-bottom {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 20px;
    }

    .creator-card {
        background: var(--bg-secondary);
        border: 1px solid var(--border-color);
        border-radius: 16px;
        padding: 24px;
        text-align: center;
        transition: all 0.3s;
        text-decoration: none;
        display: block;
    }

    .creator-card:hover {
        transform: translateY(-4px);
        border-color: var(--cyan);
        box-shadow: 0 10px 40px rgba(0, 200, 255, 0.15);
    }

    .creator-avatar {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        background: linear-gradient(135deg, var(--cyan), #0066ff);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 32px;
        font-weight: 700;
        color: var(--white);
        margin: 0 auto 16px;
    }

    .creator-name {
        font-size: 16px;
        font-weight: 600;
        color: var(--white);
        margin-bottom: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 6px;
    }

    .creator-handle {
        font-size: 13px;
        color: var(--text-muted);
        margin-bottom: 12px;
    }

    .creator-stats {
        display: flex;
        justify-content: center;
        gap: 16px;
        padding-top: 12px;
        border-top: 1px solid var(--border-color);
    }

    .creator-stat {
        text-align: center;
    }

    .creator-stat-value {
        font-size: 18px;
        font-weight: 700;
        color: var(--white);
    }

    .creator-stat-label {
        font-size: 11px;
        color: var(--text-muted);
        text-transform: uppercase;
    }

    /* Responsive */
    @media (max-width: 1200px) {
        .models-grid-4 {
            grid-template-columns: repeat(3, 1fr);
        }
        .top-creators-grid,
        .top-creators-grid-bottom {
            grid-template-columns: repeat(3, 1fr);
        }
    }

    @media (max-width: 768px) {
        .hero h1 {
            font-size: 36px;
        }
        .models-grid-4 {
            grid-template-columns: repeat(2, 1fr);
        }
        .top-creators-grid,
        .top-creators-grid-bottom {
            grid-template-columns: repeat(2, 1fr);
        }
    }

    @media (max-width: 480px) {
        .models-grid-4 {
            grid-template-columns: 1fr;
        }
        .top-creators-grid,
        .top-creators-grid-bottom {
            grid-template-columns: 1fr;
        }
    }
</style>
@endpush

@section('content')
<!-- Hero Section -->
<section class="hero">
    <div class="hero-city"></div>
    <div class="hero-bg"></div>
    <div class="hero-inner">
        <div class="hero-content">
            <div class="hero-badge">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                    <line x1="3" y1="6" x2="21" y2="6"></line>
                    <path d="M16 10a4 4 0 0 1-8 0"></path>
                </svg>
                Premium Game Assets
            </div>
            <h1>
                Game-ready <span class="cyan">3D</span> <span class="cyan">models</span><br>
                for your next project
            </h1>
            <p>
                Discover thousands of high-quality meshes, props, and characters from verified
                independent creators. Built for indie devs and 3D enthusiasts.
            </p>
            <div class="hero-buttons">
                <a href="{{ route('browse') }}" class="btn-primary">Browse Catalog</a>
                <a href="{{ route('creators') }}" class="btn-secondary">Meet Creators</a>
            </div>
        </div>
    </div>
</section>

<!-- Main Content -->
<div class="page">
    <!-- Browse by Category -->
    <h2 class="section-title">Browse by Category</h2>
    <div class="category-pills" x-data="{ active: 'All' }">
        <button 
            class="category-pill" 
            :class="{ 'active': active === 'All' }"
            @click="active = 'All'"
        >
            All <span class="count">{{ $featuredModels->count() }}</span>
        </button>
        @foreach($categories as $category)
        <button 
            class="category-pill"
            :class="{ 'active': active === '{{ $category->category }}' }"
            @click="active = '{{ $category->category }}'"
        >
            {{ $category->category }} <span class="count">{{ $category->count }}</span>
        </button>
        @endforeach
    </div>

    <!-- Featured Models -->
    <div class="featured-header">
        <div>
            <div class="featured-label">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
                FEATURED
            </div>
            <h2 class="section-title" style="margin-bottom: 0;">Curated Models</h2>
        </div>
        <a href="{{ route('browse') }}" class="view-all">
            View all
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
        </a>
    </div>

    <div class="models-grid models-grid-4" x-data="{ activeCategory: 'All' }">
        @foreach($featuredModels as $model)
        <a 
            href="{{ route('model.detail', $model->id) }}" 
            class="model-card"
            x-show="activeCategory === 'All' || activeCategory === '{{ $model->category }}'"
            x-transition
        >
            <div class="model-card-image">
                <img src="{{ $model->image }}" alt="{{ $model->name }}" loading="lazy">
            </div>
            <div class="model-card-content">
                <div class="model-card-category">{{ $model->category }}</div>
                <div class="model-card-title">{{ $model->name }}</div>
                <div class="model-card-creator">
                    by {{ $model->creator->name }}
                    @if($model->creator->verified)
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" style="color: var(--cyan)">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                    @endif
                </div>
                <div class="model-card-footer">
                    <div class="model-card-price">${{ number_format($model->price, 2) }}</div>
                    <div class="model-card-likes">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                        </svg>
                        {{ $model->likes }}
                    </div>
                </div>
            </div>
        </a>
        @endforeach
    </div>

    <!-- Top Creators -->
    <div class="featured-header" style="margin-top: 64px;">
        <div>
            <h2 class="section-title" style="margin-bottom: 4px;">Top Creators</h2>
            <p style="font-size: 14px; color: var(--text-secondary);">
                The most popular artists on the platform.
            </p>
        </div>
        <a href="{{ route('creators') }}" class="view-all">
            View all
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
        </a>
    </div>

    <div class="top-creators-grid">
        @foreach($topCreators->take(4) as $creator)
        <a href="{{ route('creator.profile', strtolower(str_replace(' ', '-', $creator->name))) }}" class="creator-card">
            <div class="creator-avatar">{{ substr($creator->name, 0, 1) }}</div>
            <div class="creator-name">
                {{ $creator->name }}
                @if($creator->verified)
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" style="color: var(--cyan)">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
                @endif
            </div>
            <div class="creator-handle">{{ $creator->handle }}</div>
            <div class="creator-stats">
                <div class="creator-stat">
                    <div class="creator-stat-value">{{ $creator->models_count }}</div>
                    <div class="creator-stat-label">Models</div>
                </div>
                <div class="creator-stat">
                    <div class="creator-stat-value">{{ number_format($creator->followers ?? 0) }}</div>
                    <div class="creator-stat-label">Followers</div>
                </div>
            </div>
        </a>
        @endforeach
    </div>

    @if($topCreators->count() > 4)
    <div class="top-creators-grid-bottom" style="margin-top: 16px;">
        @foreach($topCreators->skip(4)->take(4) as $creator)
        <a href="{{ route('creator.profile', strtolower(str_replace(' ', '-', $creator->name))) }}" class="creator-card">
            <div class="creator-avatar">{{ substr($creator->name, 0, 1) }}</div>
            <div class="creator-name">
                {{ $creator->name }}
                @if($creator->verified)
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" style="color: var(--cyan)">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
                @endif
            </div>
            <div class="creator-handle">{{ $creator->handle }}</div>
            <div class="creator-stats">
                <div class="creator-stat">
                    <div class="creator-stat-value">{{ $creator->models_count }}</div>
                    <div class="creator-stat-label">Models</div>
                </div>
                <div class="creator-stat">
                    <div class="creator-stat-value">{{ number_format($creator->followers ?? 0) }}</div>
                    <div class="creator-stat-label">Followers</div>
                </div>
            </div>
        </a>
        @endforeach
    </div>
    @endif
</div>
@endsection
