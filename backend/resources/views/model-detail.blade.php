@extends('layouts.app')

@section('title', $model->name . ' - Voxel Market')

@push('styles')
<style>
    .back-button { display:inline-flex;align-items:center;gap:6px;padding:8px 16px;background:var(--bg-secondary);border:1px solid var(--border-color);border-radius:8px;color:var(--text-secondary);font-size:14px;cursor:pointer;transition:all .2s;text-decoration:none;margin-bottom:24px; }
    .back-button:hover { color:var(--white);border-color:var(--cyan); }
    .model-detail-layout { display:grid;grid-template-columns:1.2fr 1fr;gap:48px; }
    .model-3d-viewer-wrapper { background:var(--bg-secondary);border:1px solid var(--border-color);border-radius:16px;overflow:hidden;aspect-ratio:4/3; }
    .model-3d-viewer-wrapper model-viewer { width:100%;height:100%;min-height:400px; }
    .model-detail-category { font-size:12px;font-weight:700;color:var(--cyan);text-transform:uppercase;letter-spacing:1px;margin-bottom:8px; }
    .model-detail-title { font-size:32px;font-weight:800;color:var(--white);margin-bottom:16px; }
    .model-detail-creator { display:flex;align-items:center;gap:12px;padding:16px;background:var(--bg-secondary);border:1px solid var(--border-color);border-radius:12px;margin-bottom:24px;text-decoration:none;transition:all .2s; }
    .model-detail-creator:hover { border-color:var(--cyan); }
    .creator-avatar-small { width:44px;height:44px;border-radius:50%;background:linear-gradient(135deg,var(--cyan),#0066ff);display:flex;align-items:center;justify-content:center;font-size:18px;font-weight:700;color:var(--white); }
    .creator-name-small { font-size:15px;font-weight:600;color:var(--white);display:flex;align-items:center;gap:6px; }
    .creator-name-small svg { color:var(--cyan); }
    .creator-handle-small { font-size:13px;color:var(--text-muted); }
    .model-detail-stats { display:flex;gap:24px;margin-bottom:24px; }
    .stat-item { display:flex;align-items:center;gap:6px;font-size:14px;color:var(--text-secondary); }
    .stat-item svg { color:var(--cyan); }
    .model-detail-price-section { display:flex;justify-content:space-between;align-items:center;padding:24px;background:var(--bg-secondary);border:1px solid var(--border-color);border-radius:16px;margin-bottom:24px; }
    .price-label { font-size:13px;color:var(--text-muted);margin-bottom:4px; }
    .model-detail-price { font-size:32px;font-weight:800;color:var(--white); }
    .btn-add-to-cart { display:flex;align-items:center;gap:8px;padding:14px 32px;background:var(--cyan);color:var(--bg-primary);border:none;border-radius:12px;font-size:16px;font-weight:700;cursor:pointer;transition:all .2s; }
    .btn-add-to-cart:hover { background:var(--cyan-hover);transform:translateY(-2px); }
    .btn-add-to-cart.in-cart { background:var(--green);cursor:default; }
    .model-detail-specs { background:var(--bg-secondary);border:1px solid var(--border-color);border-radius:16px;padding:24px;margin-bottom:24px; }
    .model-detail-specs h3 { font-size:18px;font-weight:700;color:var(--white);margin-bottom:16px; }
    .specs-grid { display:grid;grid-template-columns:1fr 1fr;gap:12px; }
    .spec-item { display:flex;justify-content:space-between;padding:10px 14px;background:var(--bg-tertiary);border-radius:8px; }
    .spec-label { font-size:13px;color:var(--text-muted); }
    .spec-value { font-size:13px;font-weight:600;color:var(--white); }
    .model-detail-tags { display:flex;flex-wrap:wrap;gap:8px;margin-bottom:32px; }
    .tag { padding:6px 14px;background:var(--bg-secondary);border:1px solid var(--border-color);border-radius:20px;font-size:12px;color:var(--text-secondary); }
    .model-detail-description { margin-top:32px; }
    .model-detail-description h3 { font-size:18px;font-weight:700;margin-bottom:16px;color:var(--white); }
    .model-detail-description p { font-size:14px;color:var(--text-secondary);line-height:1.6; }
    .related-section { margin-top:64px; }
    .section-title { font-size:28px;font-weight:700;color:var(--white);margin-bottom:24px; }
    .models-grid { display:grid;gap:24px; }
    .models-grid-4 { grid-template-columns:repeat(4,1fr); }
    .model-card { background:var(--bg-secondary);border:1px solid var(--border-color);border-radius:16px;overflow:hidden;transition:all .3s;cursor:pointer;text-decoration:none;display:block; }
    .model-card:hover { transform:translateY(-4px);border-color:var(--cyan);box-shadow:0 10px 40px rgba(0,200,255,.2); }
    .model-card-image { position:relative;width:100%;padding-top:75%;background:var(--bg-tertiary);overflow:hidden; }
    .model-card-image img { position:absolute;top:0;left:0;width:100%;height:100%;object-fit:cover; }
    .model-card-content { padding:16px; }
    .model-card-category { font-size:11px;font-weight:600;color:var(--cyan);text-transform:uppercase;letter-spacing:.5px;margin-bottom:8px; }
    .model-card-title { font-size:16px;font-weight:600;color:var(--white);margin-bottom:8px; }
    .model-card-creator { display:flex;align-items:center;gap:8px;font-size:13px;color:var(--text-secondary);margin-bottom:12px; }
    .model-card-footer { display:flex;justify-content:space-between;align-items:center;padding-top:12px;border-top:1px solid var(--border-color); }
    .model-card-price { font-size:18px;font-weight:700;color:var(--white); }
    .model-card-likes { display:flex;align-items:center;gap:4px;font-size:13px;color:var(--text-muted); }
    @media(max-width:1024px) { .model-detail-layout { grid-template-columns:1fr; } .models-grid-4 { grid-template-columns:repeat(2,1fr); } }
    @media(max-width:640px) { .models-grid-4 { grid-template-columns:1fr; } }
</style>
<script type="module" src="https://ajax.googleapis.com/ajax/libs/model-viewer/3.5.0/model-viewer.min.js"></script>
@endpush

@section('content')
<div class="page">
    <a href="{{ url()->previous() }}" class="back-button">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"></polyline></svg>
        Back
    </a>

    <div class="model-detail-layout">
        <div>
            <div class="model-3d-viewer-wrapper">
                <model-viewer
                    src="{{ $model->model_url }}"
                    alt="{{ $model->name }}"
                    auto-rotate
                    camera-controls
                    shadow-intensity="1"
                    environment-image="neutral"
                    style="width:100%;height:100%;min-height:400px;background:#0a0d10;"
                ></model-viewer>
            </div>
            <div class="model-detail-description">
                <h3>Description</h3>
                <p>{{ $model->description }}</p>
            </div>
        </div>

        <div>
            <div class="model-detail-category">{{ $model->category }}</div>
            <h1 class="model-detail-title">{{ $model->name }}</h1>

            <a href="{{ route('creator.profile', strtolower(str_replace(' ', '-', $model->creator->name))) }}" class="model-detail-creator">
                <div class="creator-avatar-small">{{ substr($model->creator->name, 0, 1) }}</div>
                <div>
                    <div class="creator-name-small">
                        {{ $model->creator->name }}
                        @if($model->creator->verified)
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                        @endif
                    </div>
                    <div class="creator-handle-small">{{ $model->creator->handle }}</div>
                </div>
            </a>

            <div class="model-detail-stats">
                <div class="stat-item">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                    <span>{{ $model->likes }} likes</span>
                </div>
                <div class="stat-item">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                    <span>{{ number_format($model->views) }} views</span>
                </div>
                <div class="stat-item">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                    <span>{{ rand(100,500) }} downloads</span>
                </div>
            </div>

            <div class="model-detail-price-section">
                <div>
                    <div class="price-label">Price</div>
                    <div class="model-detail-price">${{ number_format($model->price, 2) }}</div>
                </div>
                <button class="btn-add-to-cart" onclick="addToCart({{ $model->id }})">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
                    Add to Cart
                </button>
            </div>

            <div class="model-detail-specs">
                <h3>Specifications</h3>
                <div class="specs-grid">
                    <div class="spec-item"><span class="spec-label">Polygons</span><span class="spec-value">{{ number_format($model->polygons) }}</span></div>
                    <div class="spec-item"><span class="spec-label">Vertices</span><span class="spec-value">{{ number_format($model->vertices) }}</span></div>
                    <div class="spec-item"><span class="spec-label">Textures</span><span class="spec-value">{{ $model->textures }}</span></div>
                    <div class="spec-item"><span class="spec-label">Format</span><span class="spec-value">{{ $model->formats }}</span></div>
                    <div class="spec-item"><span class="spec-label">Rigged</span><span class="spec-value">{{ $model->rigged ? 'Yes' : 'No' }}</span></div>
                    <div class="spec-item"><span class="spec-label">Animated</span><span class="spec-value">{{ $model->animated ? 'Yes' : 'No' }}</span></div>
                </div>
            </div>

            <div class="model-detail-tags">
                <span class="tag">3D Model</span>
                <span class="tag">{{ $model->category }}</span>
                <span class="tag">Game Ready</span>
                <span class="tag">PBR</span>
                <span class="tag">Low Poly</span>
            </div>
        </div>
    </div>

    @if($relatedModels->count() > 0)
    <div class="related-section">
        <h2 class="section-title">More from this category</h2>
        <div class="models-grid models-grid-4">
            @foreach($relatedModels as $related)
            <a href="{{ route('model.detail', $related->id) }}" class="model-card">
                <div class="model-card-image"><img src="{{ $related->image }}" alt="{{ $related->name }}" loading="lazy"></div>
                <div class="model-card-content">
                    <div class="model-card-category">{{ $related->category }}</div>
                    <div class="model-card-title">{{ $related->name }}</div>
                    <div class="model-card-creator">by {{ $related->creator->name }}</div>
                    <div class="model-card-footer">
                        <div class="model-card-price">${{ number_format($related->price, 2) }}</div>
                        <div class="model-card-likes">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                            {{ $related->likes }}
                        </div>
                    </div>
                </div>
            </a>
            @endforeach
        </div>
    </div>
    @endif
</div>
@endsection

@push('scripts')
<script>
function addToCart(id) {
    fetch('/cart/add/' + id, { method: 'POST', headers: { 'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content, 'Accept': 'application/json' }})
    .then(r => r.json()).then(d => { if(d.success) { alert('Added to cart!'); location.reload(); } else { alert(d.message); }});
}
</script>
@endpush
