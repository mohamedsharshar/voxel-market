import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Trash2, ArrowRight, BadgeCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Cart() {
  const { cart, removeFromCart, clearCart, showToast } = useApp();
  const navigate = useNavigate();

  const subtotal = cart.reduce((sum, item) => {
    return sum + parseFloat(item.price.replace('$', ''));
  }, 0);

  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  const handleCheckout = () => {
    showToast('Checkout feature coming soon!', 'info');
  };

  if (cart.length === 0) {
    return (
      <div className="page">
        <div className="empty-cart">
          <ShoppingCart size={64} />
          <h2>Your cart is empty</h2>
          <p>Discover amazing 3D models and add them to your cart</p>
          <button className="btn-primary" onClick={() => navigate('/browse')}>
            Browse Models
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="cart-header">
        <h1>Shopping Cart</h1>
        <button className="btn-clear-cart" onClick={clearCart}>
          <Trash2 size={16} />
          Clear Cart
        </button>
      </div>

      <div className="cart-layout">
        <div className="cart-items">
          {cart.map(item => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} className="cart-item-image" />
              
              <div className="cart-item-details">
                <Link 
                  to={`/model/${item.id}`}
                  className="cart-item-name"
                >
                  {item.name}
                </Link>
                <div className="cart-item-creator">
                  by {item.creator}
                  {item.verified && <BadgeCheck size={13} />}
                </div>
                <div className="cart-item-category">{item.category}</div>
              </div>

              <div className="cart-item-price">{item.price}</div>

              <button 
                className="cart-item-remove"
                onClick={() => removeFromCart(item.id)}
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <h3>Order Summary</h3>
          
          <div className="summary-row">
            <span>Subtotal ({cart.length} items)</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          
          <div className="summary-row">
            <span>Tax (10%)</span>
            <span>${tax.toFixed(2)}</span>
          </div>

          <div className="summary-divider" />

          <div className="summary-row summary-total">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>

          <button className="btn-checkout" onClick={handleCheckout}>
            Proceed to Checkout
            <ArrowRight size={18} />
          </button>

          <div className="cart-security">
            <BadgeCheck size={16} />
            <span>Secure checkout guaranteed</span>
          </div>
        </div>
      </div>
    </div>
  );
}
