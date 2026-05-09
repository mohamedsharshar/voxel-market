@extends('layouts.app')

@section('title', 'Browse 3D Models - Voxel Market')

@push('styles')
<style>
    .browse-page-title {
        font-size: 36px;
        font-weight: 700;
        color: var(--white);
        margin-bottom: 8px;
    }

    .browse-page-sub {
        font-size: 16px;
        color: var(--text-secondary);
        margin-bottom: 32px;
    }

    .browse-layout {
        display: grid;
        grid-template-columns: 280px 1fr;
        gap: 32px;
    }

    /* Filters Sidebar */
    .filters-sidebar {
        background: var(--bg-secondary);
        border: 1px solid var(--border-color);
        border-radius: 16px;
        padding: 24px;
        height: fit-content;
        position: sticky;
        top: 88px;
    }

    .filters-title {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 16px;
        font-weight: 700;
        color: var(--white);
        margin-bottom: 24px;
    }

    .filter-group {
        margin-bottom: 24px;
    }

    .filter-label {
        font-size: 13px;
        font-weight: 600;
        color: var(--text-secondary);
        margin-bottom: 8px;
        text-transform: uppercase;
        letter-spacing: 0.5px;
    }

    .filter-input-wrap {
        position: relative;
        display: flex;
        align-items: center;
    }

    .filter-input-wrap svg {
        position: absolute;
        left: 12px;
        color: var(--text-muted);
    }

    .filter-input {
        width: 100%;
        padding: 10px 12px;
        background: var(--bg-tertiary);
        border: 1px solid var(--border-color);
        border-radius: 8px;
        color: var(--text-primary);
        font-size: 14px;
        transition: all 0.2s;
    }

    .filter-input:focus {
        outline: none;
        border-color: var(--cyan);
        box-shadow: 0 0 0 3px rgba(0, 200, 255, 0.1);
    }

    .custom-select {
        width: 100%;
        padding: 10px 12px;
        background: var(--bg-tertiary);
        border: 1px solid var(--border-color);
        border-radius: 8px;
        color: var(--text-primary);
        font-size: 14px;
        cursor: pointer;
        transition: all 0.2s;
    }

    .custom-select:hover {
        border-color: var(--cyan);
    }

    .filter-toggle {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .toggle-switch {
        width: 44px;
        height: 24px;
        background: var(--bg-tertiary);
        border: 1px solid var(--border-color);
        border-radius: 12px;
        position: relative;
        cursor: pointer;
        transition: all 0.2s;
    }

    .toggle-switch.on {
        background: var(--cyan);
        border-color: var(--cyan);
    }

    .toggle-knob {
        width: 18px;
        height: 18px;
        background: var(--white);
        border-radius: 50%;
        position: absolute;
        top: 2px;
        left: 2px;
        transition: all 0.2s;
    }

    .toggle-switch.on .toggle-knob {
        left: 22px;
    }

    .btn-reset {
        width: 100%;
        padding: 10px;
        background: var(--bg-tertiary);
        border: 1px solid var(--border-color);
        border-radius: 8px;
        color: var(--text-secondary);
        font-size: 14px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s;
    }

    .btn-reset:hover {
        border-color: var(--red);
        color: var(--red);
    }

    /* Browse Grid */
    .browse-grid {
        min-height: 400px;
    }

    .models-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 24px;
    }

    /* Pagination */
    .pagination {
        display: flex;
        justify-content: center;
        gap: 8px;
        margin-top: 48px;
    }

    .pagination a,
    .pagination span {
        padding: 8px 16px;
        background: var(--bg-secondary);
        border: 1px solid var(--border-color);
        border-radius: 8px;
        color: var(--text-secondary);
        text-decoration: none;
        font-size: 14px;
        font-weight: 500;
        transition: all 0.2s;
    }

    .pagination a:hover {
        border-color: var(--cyan);
        color: var(--white);
    }

    .pagination .active {
        background: var(--cyan);
        border-color: var(--cyan);
        color: var(--bg-primary);
    }

    @media (max-width: 1024px) {
        .browse-layout {
            grid-template-columns: 1fr;
        }
        .filters-sidebar {
            position: static;
        }
        .models-grid {
            grid-template-columns: repeat(2, 1fr);
        }
    }

    @media (max-width: 640px) {
        .models-grid {
            grid-template-columns: 1fr;
        }
    }
</style>
@endpush

@section('content')
<div class="page">
    <h1 class="browse-page-title">Browse Catalog</h1>
    <p class="browse-page-sub">Discover high-quality 3D assets for your projects.</p>

    <div class="browse-layout">
        <!-- Filters Sidebar -->
        <aside class="filters-sidebar">
            <div class="filters-title">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="4" y1="21" x2="4" y2="14"></line>
                    <line x1="4" y1="10" x2="4" y2="3"></line>
                    <line x1="12" y1="21" x2="12" y2="12"></line>
                    <line x1="12" y1="8" x2="12" y2="3"></line>
                    <line x1="20" y1="21" x2="20" y2="16"></line>
                    <line x1="20" y1="12" x2="20" y2="3"></line>
                    <line x1="1" y1="14" x2="7" y2="14"></line>
                    <line x1="9" y1="8" x2="15" y2="8"></line>
                    <line x1="17" y1="16" x2="23" y2="16"></line>
                </svg>
                Filters
            </div>

            <form action="{{ route('browse') }}" method="GET">
                <!-- Search -->
                <div class="filter-group">
                    <div class="filter-input-wrap">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="11" cy="11" r="8"></circle>
                            <path d="m21 21-4.35-4.35"></path>
                        </svg>
                        <input 
                            type="text" 
                            name="q" 
                            class="filter-input" 
                            placeholder="Search models..." 
                            value="{{ request('q') }}"
                            style="padding-left: 36px;"
                        >
                    </div>
                </div>

                <!-- Category -->
                <div class="filter-group">
                    <div class="filter-label">Category</div>
                    <select name="category" class="custom-select">
                        <option value="All Categories">All Categories</option>
                        @foreach($categories as $category)
                        <option value="{{ $category->category }}" {{ request('category') == $category->category ? 'selected' : '' }}>
                            {{ $category->category }} ({{ $category->count }})
                        </option>
                        @endforeach
                    </select>
                </div>

                <!-- Sort -->
                <div class="filter-group">
                    <div class="filter-label">Sort By</div>
                    <select name="sort" class="custom-select">
                        <option value="Newest First" {{ request('sort') == 'Newest First' ? 'selected' : '' }}>Newest First</option>
                        <option value="Price: Low to High" {{ request('sort') == 'Price: Low to High' ? 'selected' : '' }}>Price: Low to High</option>
                        <option value="Price: High to Low" {{ request('sort') == 'Price: High to Low' ? 'selected' : '' }}>Price: High to Low</option>
                        <option value="Most Popular" {{ request('sort') == 'Most Popular' ? 'selected' : '' }}>Most Popular</option>
                    </select>
                </div>

                <!-- Verified Toggle -->
                <div class="filter-group">
                    <div class="filter-toggle">
                        <span style="font-size: 14px; color: var(--text-secondary);">Verified Creators Only</span>
                        <input type="checkbox" name="verified" value="1" id="verified" {{ request('verified') ? 'checked' : '' }} style="display: none;">
                        <div 
                            class="toggle-switch {{ request('verified') ? 'on' : '' }}" 
                            onclick="document.getElementById('verified').checked = !document.getElementById('verified').checked; this.classList.toggle('on');"
                        >
                            <div class="toggle-knob"></div>
                        </div>
                    </div>
                </div>

                <button type="submit" class="btn-primary" style="width: 100%; margin-bottom: 12px;">Apply Filters</button>
                <a href="{{ route('browse') }}" class="btn-reset">Reset Filters</a>
            </form>
        </aside>

        <!-- Models Grid -->
        <div class="browse-grid">
            @if($models->count() === 0)
                <div style="color: var(--text-muted); padding: 60px 0; text-align: center;">
                    No models found.
                </div>
            @else
                <div class="models-grid">
                    @foreach($models as $model)
                    <a href="{{ route('model.detail', $model->id) }}" class="model-card">
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

                <!-- Pagination -->
                <div class="pagination">
                    {{ $models->links() }}
                </div>
            @endif
        </div>
    </div>
</div>
@endsection
