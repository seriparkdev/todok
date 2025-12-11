import { css, cx } from '@styled/css';
import { forwardRef, type InputHTMLAttributes } from 'react';

const containerStyles = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '1',
});

const labelStyles = css({
  fontSize: 'sm',
  fontWeight: 'medium',
  marginLeft: '2',
});

const inputStyles = css({
  display: 'flex',
  width: '100%',
  borderRadius: 'lg',
  backgroundColor: 'gray.100',
  borderWidth: '1px',
  borderStyle: 'solid',
  borderColor: 'gray.200',
  lineHeight: '1.5',
  color: 'gray.900',
  outline: 'none',
  paddingX: '3',
  paddingY: '2',
  _placeholder: {
    color: 'gray.400',
  },
  _disabled: {
    cursor: 'not-allowed',
    backgroundColor: 'gray.200',
    color: 'gray.400',
  },
});

const errorStyles = css({
  color: 'error.600',
  fontSize: 'sm',
  fontWeight: 'medium',
  marginLeft: '2',
});

const helperTextStyles = css({
  color: 'gray.500',
  fontSize: 'sm',
  fontWeight: 'medium',
  marginLeft: '2',
});

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  helperText?: string;
  error?: string;
  label?: string;
  id?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ helperText, error, label, id, required, className, name, ...props }, ref) => {
    const inputId = id || name;
    const errorId = error ? `${inputId}-error` : undefined;
    const helperTextId = helperText ? `${inputId}-helper-text` : undefined;

    return (
      <div className={containerStyles}>
        {label && (
          <label htmlFor={inputId} className={labelStyles}>
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          required={required}
          aria-describedby={errorId || helperTextId}
          aria-invalid={error ? 'true' : 'false'}
          aria-required={required}
          className={cx(inputStyles, className)}
          {...props}
        />
        {error && (
          <p id={errorId} className={errorStyles} role="alert">
            {error}
          </p>
        )}
        {helperText && (
          <p id={helperTextId} className={helperTextStyles} role="alert">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
