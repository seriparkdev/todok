import { cva, cx } from '@styled/css';
import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';

const buttonStyles = cva({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '2',
    fontWeight: 'medium',
    borderRadius: 'md',
    transition: 'all 0.2s',
    outline: 'none',
    border: 'none',
    userSelect: 'none',
    whiteSpace: 'nowrap',
    _disabled: {
      opacity: 0.5,
      cursor: 'not-allowed',
    },
    _focusVisible: {
      ringWidth: '2',
      ringOffset: '2',
      ringColor: 'gray.600',
    },
  },
  variants: {
    variant: {
      primary: {
        backgroundColor: 'gray.600',
        color: 'white',
        _hover: {
          backgroundColor: 'gray.700',
          _disabled: {
            backgroundColor: 'gray.600',
          },
        },
        _active: {
          backgroundColor: 'gray.800',
        },
      },
      secondary: {
        backgroundColor: 'gray.200',
        color: 'gray.900',
        _hover: {
          backgroundColor: 'gray.300',
          _disabled: {
            backgroundColor: 'gray.200',
          },
        },
        _active: {
          backgroundColor: 'gray.400',
        },
      },
      outline: {
        backgroundColor: 'transparent',
        color: 'gray.600',
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: 'gray.600',
        _hover: {
          backgroundColor: 'gray.50',
          _disabled: {
            backgroundColor: 'transparent',
          },
        },
        _active: {
          backgroundColor: 'gray.100',
        },
      },
    },
    size: {
      sm: {
        height: '8',
        paddingX: '3',
        fontSize: 'sm',
        gap: '1.5',
      },
      md: {
        height: '10',
        paddingX: '4',
        fontSize: 'md',
        gap: '2',
      },
      lg: {
        height: '12',
        paddingX: '6',
        fontSize: 'lg',
        gap: '2.5',
      },
    },
    fullWidth: {
      true: {
        width: '100%',
      },
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
});

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  children: ReactNode;
  'aria-label'?: string;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      fullWidth = false,
      disabled = false,
      className,
      children,
      'aria-label': ariaLabel,
      'aria-describedby': ariaDescribedby,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        type="button"
        disabled={disabled}
        aria-disabled={disabled}
        aria-label={ariaLabel}
        className={cx(buttonStyles({ variant, size, fullWidth }), className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
