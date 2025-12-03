import { cva, cx } from '@styled/css';
import { forwardRef, useEffect, type ReactNode, type HTMLAttributes } from 'react';

const overlayStyles = cva({
  base: {
    position: 'fixed',
    inset: '0',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '10',
  },
});

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const ContainerStyles = cva({
  base: {
    backgroundColor: 'white',
    borderRadius: '3xl',
    maxWidth: '500px',
    padding: '6',
    overflow: 'auto',
  },
});

const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ isOpen, onClose, children, className, ...props }, ref) => {
    useEffect(() => {
      if (!isOpen) return;

      const handleEscape = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          onClose();
        }
      };

      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';

      return () => {
        document.removeEventListener('keydown', handleEscape);
        document.body.style.overflow = '';
      };
    }, [isOpen, onClose]);

    const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
      if (event.target === event.currentTarget) {
        onClose();
      }
    };

    if (!isOpen) return null;

    return (
      <div aria-hidden="true" className={overlayStyles()} onClick={handleOverlayClick}>
        <div ref={ref} role="dialog" aria-modal="true" className={cx(ContainerStyles(), className)} {...props}>
          {children}
        </div>
      </div>
    );
  }
);

interface ContentProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

const Content = forwardRef<HTMLDivElement, ContentProps>(({ children, className, ...props }, ref) => {
  return (
    <p ref={ref} className={className} {...props}>
      {children}
    </p>
  );
});

export const Modal = Object.assign(Container, {
  Content,
});

export default Modal;
