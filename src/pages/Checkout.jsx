import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CheckCircle2, CreditCard, Download, Lock, PackageCheck, ShieldCheck } from 'lucide-react';
import EmptyState from '../components/EmptyState';
import { useApp } from '../context/AppContext';
import PageTransition from '../components/PageTransition';
import { motion } from 'framer-motion';

export default function Checkout() {
  const { cart, clearCart, showToast } = useApp();
  const navigate = useNavigate();
  const [complete, setComplete] = React.useState(false);
  const subtotal = cart.reduce((sum, item) => sum + item.priceValue, 0);
  const total = subtotal + (subtotal > 0 ? 2.5 : 0);

  const handleSubmit = (event) => {
    event.preventDefault();
    setComplete(true);
    clearCart();
    showToast('Purchase complete. Downloads are ready.', 'success');
  };

  if (complete) {
    return (
      <PageTransition className="page">
        <motion.section 
          className="checkout-success"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", bounce: 0.5 }}
        >
          <CheckCircle2 size={58} />
          <h1>Purchase Complete</h1>
          <p>Your assets are ready in download history and purchase records.</p>
          <div className="checkout-success-actions">
            <Link className="btn-primary" to="/profile">
              View Downloads
            </Link>
            <Link className="btn-secondary" to="/browse">
              Continue Browsing
            </Link>
          </div>
        </motion.section>
      </PageTransition>
    );
  }

  if (cart.length === 0) {
    return (
      <PageTransition className="page">
        <EmptyState
          icon={CreditCard}
          title="No items to checkout"
          message="Add a model to your cart before opening checkout."
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
      <div className="page-kicker">
        <Lock size={15} /> Secure checkout
      </div>
      <div className="checkout-layout">
        <motion.form 
          className="checkout-form panel" 
          onSubmit={handleSubmit}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="panel-heading">
            <h1>Checkout</h1>
            <ShieldCheck size={20} />
          </div>

          <div className="checkout-steps" aria-label="Checkout steps">
            <span className="active">Account</span>
            <span className="active">License</span>
            <span>Payment</span>
            <span>Downloads</span>
          </div>

          <div className="form-grid">
            <label>
              Full name
              <input required placeholder="Your name" />
            </label>
            <label>
              Email
              <input type="email" required placeholder="you@example.com" />
            </label>
            <label>
              Company
              <input placeholder="Optional" />
            </label>
            <label>
              License use
              <select defaultValue="commercial">
                <option value="commercial">Commercial game or app</option>
                <option value="prototype">Internal prototype</option>
                <option value="education">Education</option>
              </select>
            </label>
          </div>

          <div className="payment-box">
            <CreditCard size={20} />
            <span>
              <strong>Demo payment</strong>
              <small>No real payment is processed in this frontend prototype.</small>
            </span>
          </div>

          <button className="btn-checkout" type="submit">
            Complete Purchase
            <Download size={18} />
          </button>
        </motion.form>

        <motion.aside 
          className="cart-summary checkout-summary"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <h2>Assets</h2>
          <div className="compact-list">
            {cart.map((item) => (
              <Link key={item.id} to={`/model/${item.id}`}>
                <img src={item.image} alt="" />
                <span>
                  <strong>{item.name}</strong>
                  <small>{item.formats}</small>
                </span>
                <em>{item.price}</em>
              </Link>
            ))}
          </div>
          <div className="summary-divider" />
          <div className="summary-row">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="summary-row summary-total">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <div className="cart-security">
            <PackageCheck size={16} />
            Assets are attached to purchase history after checkout.
          </div>
        </motion.aside>
      </div>
    </PageTransition>
  );
}
