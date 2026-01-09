import { create } from 'zustand';

export interface Toast {
  id: string;
  message: string;
  type: 'warning' | 'success';
  timerId?: NodeJS.Timeout;
}

interface NewToast extends Pick<Toast, 'message' | 'type'> {}

interface StoreState {
  toasts: Toast[];
  showToast: (newToast: NewToast) => void;
  removeToast: (id: string) => void;
}

export const useToastStore = create<StoreState>((set, get) => ({
  toasts: [],
  showToast: ({ message, type = 'success' }: NewToast) => {
    const id = crypto.randomUUID();

    const timerId = setTimeout(() => {
      get().removeToast(id);
    }, 2000);

    const newToast = { id, timerId, message, type };

    set(state => ({
      toasts: [...state.toasts, newToast],
    }));
  },
  removeToast: id => {
    const toast = get().toasts.find(toast => toast.id === id);

    if (toast?.timerId) {
      clearTimeout(toast.timerId);
    }

    set(state => ({
      toasts: state.toasts.filter(toast => toast.id !== id),
    }));
  },
}));
