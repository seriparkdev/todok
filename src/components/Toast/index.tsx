'use client';

import { css, cx } from '@styled/css';
import { forwardRef, type HTMLAttributes } from 'react';
import { useToastStore, Toast as ToastType } from './toastStore';
import SuccessIcon from '@/assets/icons/success.svg';
import WarningIcon from '@/assets/icons/warning.svg';

const toastStyles = css({
  backgroundColor: 'gray.600',
  color: 'white',
  display: 'flex',
  alignItems: 'center',
  padding: '4',
  gap: '3',
  borderRadius: '3xl',
});

const containerStyles = css({
  position: 'fixed',
  left: '50%',
  bottom: '0',
  transform: 'translateX(-50%)',
  display: 'flex',
  flexDirection: 'column',
  gap: '2',
  width: 'full',
  maxWidth: '480px',
  padding: '4',
});

export interface ToastProps extends HTMLAttributes<HTMLDivElement> {}

export const ToastIcon = ({ type }: { type: ToastType['type'] }) => {
  switch (type) {
    case 'success':
      return <SuccessIcon aria-hidden="true" />;
    case 'warning':
      return <WarningIcon aria-hidden="true" />;
    default:
      return null;
  }
};

export const Toast = forwardRef<HTMLDivElement, ToastProps>(({ className, ...props }, ref) => {
  const { toasts } = useToastStore();

  return (
    <div ref={ref} className={containerStyles}>
      {toasts.map(toast => (
        <div key={toast.id} role="alert" aria-live="polite" className={cx(toastStyles, className)} {...props}>
          <ToastIcon type={toast.type} />
          {toast.message}
        </div>
      ))}
    </div>
  );
});

Toast.displayName = 'Toast';
