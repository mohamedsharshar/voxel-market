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
    <div className={`toast toast-${toast.type}`}>
      {icons[toast.type]}
      <span>{toast.message}</span>
      <button onClick={() => showToast(null)} className="toast-close">
        <X size={14} />
      </button>
    </div>
  );
}
