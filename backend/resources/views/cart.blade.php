@extends('layouts.app')
@section('title', 'Shopping Cart - Voxel Market')

@push('styles')
<style>
    .cart-header { display:flex;justify-content:space-between;align-items:center;margin-bottom:32px; }
    .cart-header h1 { font-size:32px;font-weight:700;color:var(--white); }
    .btn-clear-cart { display:flex;align-items:center;gap:8px;padding:10px 20px;background:var(--bg-secondary);border:1px solid var(--border-color);border-radius:8px;color:var(--text-secondary);font-size:14px;cursor:pointer;transition:all .2s; }
    .btn-clear-cart:hover { border-color:var(--red);color:var(--red); }
    .cart-layout { display:grid;grid-template-columns:1fr 380px;gap:32px; }
    .cart-item { display:flex;align-items:center;gap:20px;padding:20px;background:var(--bg-secondary);border:1px solid var(--border-color);border-radius:16px;margin-bottom:16px;transition:all .2s; }
    .cart-item:hover { border-color:var(--cyan); }
    .cart-item-image { width:100px;height:75px;border-radius:10px;object-fit:cover; }
    .cart-item-details { flex:1; }
    .cart-item-name { font-size:16px;font-weight:600;color:var(--white);text-decoration:none;display:block;margin-bottom:4px; }
    .cart-item-name:hover { color:var(--cyan); }
    .cart-item-creator { font-size:13px;color:var(--text-secondary);margin-bottom:4px; }
    .cart-item-category { font-size:12px;color:var(--cyan); }
    .cart-item-price { font-size:18px;font-weight:700;color:var(--white);min-width:80px;text-align:right; }
    .cart-item-remove { padding:8px;background:none;border:none;color:var(--text-muted);cursor:pointer;transition:color .2s;border-radius:8px; }
    .cart-item-remove:hover { color:var(--red);background:rgba(239,68,68,.1); }
    .cart-summary { background:var(--bg-secondary);border:1px solid var(--border-color);border-radius:16px;padding:28px;height:fit-content;position:sticky;top:88px; }
    .cart-summary h3 { font-size:20px;font-weight:700;color:var(--white);margin-bottom:24px; }
    .summary-row { display:flex;justify-content:space-between;font-size:15px;color:var(--text-secondary);margin-bottom:12px; }
    .summary-divider { height:1px;background:var(--border-color);margin:16px 0; }
    .summary-total { font-size:18px;font-weight:700;color:var(--white); }
    .btn-checkout { width:100%;padding:14px;background:var(--cyan);color:var(--bg-primary);border:none;border-radius:12px;font-size:16px;font-weight:700;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:8px;margin-top:24px;transition:all .2s; }
    .btn-checkout:hover { background:var(--cyan-hover);transform:translateY(-2px); }
    .cart-security { display:flex;align-items:center;justify-content:center;gap:8px;margin-top:16px;font-size:13px;color:var(--text-muted); }
    .cart-security svg { color:var(--green); }
    .empty-cart { text-align:center;padding:100px 20px; }
    .empty-cart svg { color:var(--text-muted);margin-bottom:24px; }
    .empty-cart h2 { font-size:24px;color:var(--white);margin-bottom:12px; }
    .empty-cart p { color:var(--text-secondary);margin-bottom:24px; }
    @media(max-width:1024px) { .cart-layout { grid-template-columns:1fr; } }
</style>
@endpush

@section('content')
<div class="page">
    @if(count($cartItems) === 0)
    <div class="empty-cart">
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
        <h2>Your cart is empty</h2>
        <p>Discover amazing 3D models and add them to your cart</p>
        <a href="{{ route('browse') }}" class="btn-primary">Browse Models</a>
    </div>
    @else
    <div class="cart-header">
        <h1>Shopping Cart</h1>
        <button class="btn-clear-cart" onclick="clearCart()">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
            Clear Cart
        </button>
    </div>

    <div class="cart-layout">
        <div class="cart-items">
            @foreach($cartItems as $id => $item)
            <div class="cart-item">
                <img src="{{ $item['image'] }}" alt="{{ $item['name'] }}" class="cart-item-image">
                <div class="cart-item-details">
                    <a href="{{ route('model.detail', $item['id']) }}" class="cart-item-name">{{ $item['name'] }}</a>
                    <div class="cart-item-creator">by Creator</div>
                </div>
                <div class="cart-item-price">${{ number_format($item['price'], 2) }}</div>
                <button class="cart-item-remove" onclick="removeFromCart({{ $id }})">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                </button>
            </div>
            @endforeach
        </div>

        @php $tax = $total * 0.1; @endphp
        <div class="cart-summary">
            <h3>Order Summary</h3>
            <div class="summary-row"><span>Subtotal ({{ count($cartItems) }} items)</span><span>${{ number_format($total, 2) }}</span></div>
            <div class="summary-row"><span>Tax (10%)</span><span>${{ number_format($tax, 2) }}</span></div>
            <div class="summary-divider"></div>
            <div class="summary-row summary-total"><span>Total</span><span>${{ number_format($total + $tax, 2) }}</span></div>
            <button class="btn-checkout" onclick="alert('Checkout coming soon!')">Proceed to Checkout <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg></button>
            <div class="cart-security">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                <span>Secure checkout guaranteed</span>
            </div>
        </div>
    </div>
    @endif
</div>
@endsection

@push('scripts')
<script>
function removeFromCart(id) { fetch('/cart/remove/' + id, { method:'DELETE', headers:{'X-CSRF-TOKEN':document.querySelector('meta[name="csrf-token"]').content}}).then(()=>location.reload()); }
function clearCart() { if(!confirm('Clear cart?')) return; fetch('/cart/clear', { method:'DELETE', headers:{'X-CSRF-TOKEN':document.querySelector('meta[name="csrf-token"]').content}}).then(()=>location.reload()); }
</script>
@endpush
