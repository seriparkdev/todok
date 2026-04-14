import { styled } from '@styled/jsx';

type SpinnerProps = {
  size?: 'sm' | 'md' | 'lg';
};

export function Spinner({ size = 'md' }: SpinnerProps) {
  return <SpinnerCircle size={size} role="status" aria-label="로딩 중" />;
}

const SpinnerCircle = styled('div', {
  base: {
    borderRadius: 'full',
    borderStyle: 'solid',
    borderColor: 'gray.200',
    borderTopColor: 'gray.600',
    animation: 'spin 0.8s linear infinite',
  },
  variants: {
    size: {
      sm: {
        width: '4',
        height: '4',
        borderWidth: '2px',
      },
      md: {
        width: '6',
        height: '6',
        borderWidth: '2px',
      },
      lg: {
        width: '8',
        height: '8',
        borderWidth: '3px',
      },
    },
  },
  defaultVariants: {
    size: 'md',
  },
});
