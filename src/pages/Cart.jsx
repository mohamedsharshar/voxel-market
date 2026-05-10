import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, BadgeCheck, ShieldCheck, ShoppingCart, Trash2 } from 'lucide-react';
import EmptyState from '../components/EmptyState';
import { useApp } from '../context/AppContext';
import PageTransition from '../components/PageTransition';
import { motion, AnimatePresence } from 'framer-motion';

export default function Cart() {
  const { cart, clearCart, removeFromCart, showToast } = useApp();
  const navigate = useNavigate();

  const subtotal = cart.reduce((sum, item) => sum + item.priceValue, 0);
  const platformFee = subtotal > 0 ? 2.5 : 0;
  const total = subtotal + platformFee;

  if (cart.length === 0) {
    return (
      <PageTransition className="page">
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
      </PageTransition>
    );
  }

  return (
    <PageTransition className="page">
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
        <motion.section 
          className="cart-items" 
          aria-label="Cart items"
          initial="hidden"
          animate="show"
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { staggerChildren: 0.1 } }
          }}
        >
          <AnimatePresence>
            {cart.map((item) => (
              <motion.article 
                key={item.id} 
                className="cart-item"
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
              >
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
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.section>

        <motion.aside 
          className="cart-summary"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
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
        </motion.aside>
      </div>
    </PageTransition>
  );
}
