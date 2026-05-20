import { useState, useEffect } from 'react';
import '../styles/Toast.css';

let toastId = 0;
const toastListeners = new Set();

export const toast = {
  success: (message, duration = 3000) => {
    showToast({ type: 'success', message, duration });
  },
  error: (message, duration = 4000) => {
    showToast({ type: 'error', message, duration });
  },
  warning: (message, duration = 3500) => {
    showToast({ type: 'warning', message, duration });
  },
  info: (message, duration = 3000) => {
    showToast({ type: 'info', message, duration });
  }
};

function showToast(toast) {
  const id = toastId++;
  const toastWithId = { ...toast, id };
  toastListeners.forEach(listener => listener(toastWithId));
}

export default function ToastContainer() {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    const listener = (toast) => {
      setToasts(prev => [...prev, toast]);
      
      setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== toast.id));
      }, toast.duration);
    };

    toastListeners.add(listener);
    return () => toastListeners.delete(listener);
  }, []);

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  return (
    <div className="toast-container">
      {toasts.map(toast => (
        <div 
          key={toast.id} 
          className={`toast toast-${toast.type}`}
          onClick={() => removeToast(toast.id)}
        >
          <div className="toast-icon">
            {toast.type === 'success' && '✓'}
            {toast.type === 'error' && '✕'}
            {toast.type === 'warning' && '⚠'}
            {toast.type === 'info' && 'ℹ'}
          </div>
          <div className="toast-message">{toast.message}</div>
          <button 
            className="toast-close"
            onClick={(e) => {
              e.stopPropagation();
              removeToast(toast.id);
            }}
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
}
