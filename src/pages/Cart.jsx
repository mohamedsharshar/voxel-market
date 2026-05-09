import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, BadgeCheck, ShieldCheck, ShoppingCart, Trash2 } from 'lucide-react';
import EmptyState from '../components/EmptyState';
import { useApp } from '../context/AppContext';

export default function Cart() {
  const { cart, clearCart, removeFromCart, showToast } = useApp();
  const navigate = useNavigate();

  const subtotal = cart.reduce((sum, item) => sum + item.priceValue, 0);
  const platformFee = subtotal > 0 ? 2.5 : 0;
  const total = subtotal + platformFee;

  if (cart.length === 0) {
    return (
      <div className="page">
        <EmptyState
          icon={ShoppingCart}
          title="Your cart is empty"
          message="Save time by adding assets directly from cards, quick view, or model detail pages."
          action={
            <button className="btn-primary" type="button" onClick={() => navigate('/browse')}>
              Browse Models
            </button>
          }
        />
      </div>
    );
  }

  return (
    <div className="page">
      <div className="cart-header">
        <div>
          <div className="page-kicker">Checkout preparation</div>
          <h1>Shopping Cart</h1>
          <p>{cart.length} production asset{cart.length > 1 ? 's' : ''} ready for purchase.</p>
        </div>
        <button
          className="btn-clear-cart"
          type="button"
          onClick={() => {
            clearCart();
            showToast('Cart cleared', 'info');
          }}
        >
          <Trash2 size={16} />
          Clear Cart
        </button>
      </div>

      <div className="cart-layout">
        <section className="cart-items" aria-label="Cart items">
          {cart.map((item) => (
            <article key={item.id} className="cart-item">
              <Link to={`/model/${item.id}`} className="cart-item-image">
                <img src={item.image} alt={item.name} />
              </Link>

              <div className="cart-item-details">
                <Link to={`/model/${item.id}`} className="cart-item-name">
                  {item.name}
                </Link>
                <span className="cart-item-creator">
                  by {item.creator}
                  {item.verified && <BadgeCheck size={13} />}
                </span>
                <div className="cart-item-tags">
                  <span>{item.category}</span>
                  <span>{item.formats.split(',')[0]}</span>
                  {item.gameReady && <span>Game-ready</span>}
                </div>
              </div>

              <div className="cart-item-price">{item.price}</div>

              <button
                className="cart-item-remove"
                type="button"
                onClick={() => removeFromCart(item.id)}
                aria-label={`Remove ${item.name} from cart`}
              >
                <Trash2 size={18} />
              </button>
            </article>
          ))}
        </section>

        <aside className="cart-summary">
          <h2>Order Summary</h2>
          <div className="summary-row">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Platform processing</span>
            <span>${platformFee.toFixed(2)}</span>
          </div>
          <div className="summary-divider" />
          <div className="summary-row summary-total">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>

          <Link className="btn-checkout" to="/checkout">
            Proceed to Checkout
            <ArrowRight size={18} />
          </Link>

          <div className="cart-security">
            <ShieldCheck size={16} />
            Secure checkout, instant downloads, and invoice history.
          </div>
        </aside>
      </div>
    </div>
  );
}
