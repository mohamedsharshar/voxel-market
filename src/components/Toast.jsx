import React from 'react';
import { CheckCircle, Info, AlertCircle, X } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Toast() {
  const { toast, showToast } = useApp();

  if (!toast) return null;

  const icons = {
    success: <CheckCircle size={18} />,
    info: <Info size={18} />,
    error: <AlertCircle size={18} />,
  };

  return (
    <div className={`toast toast-${toast.type}`} role="status" aria-live="polite">
      {icons[toast.type]}
      <span>{toast.message}</span>
      {toast.actionLabel && toast.onAction && (
        <button
          className="toast-action"
          onClick={() => {
            toast.onAction();
            showToast(null);
          }}
          aria-label={toast.actionLabel}
        >
          {toast.actionLabel}
        </button>
      )}
      <button
        onClick={() => showToast(null)}
        className="toast-close"
        aria-label="Close notification"
      >
        <X size={14} />
      </button>
    </div>
  );
}
