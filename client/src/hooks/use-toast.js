import { useState, useCallback } from "react";

let toastId = 0;

export function useToast() {
  const [toasts, setToasts] = useState([]);

  const toast = useCallback(({ title, description, variant = "default", duration = 5000 }) => {
    const id = toastId++;
    const newToast = {
      id,
      title,
      description,
      variant,
      open: true,
    };

    setToasts((prev) => [...prev, newToast]);

    if (duration > 0) {
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, duration);
    }

    return {
      id,
      dismiss: () => setToasts((prev) => prev.filter((t) => t.id !== id)),
      update: (props) =>
        setToasts((prev) =>
          prev.map((t) => (t.id === id ? { ...t, ...props } : t))
        ),
    };
  }, []);

  const dismiss = useCallback((toastId) => {
    setToasts((prev) =>
      toastId
        ? prev.filter((t) => t.id !== toastId)
        : []
    );
  }, []);

  return {
    toast,
    dismiss,
    toasts,
  };
}