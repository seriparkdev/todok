import type { Meta, StoryObj } from '@storybook/nextjs';
import { Toast } from '.';
import { useToastStore } from './toastStore';
import { Button } from '../Button';

const meta = {
  title: 'Components/Toast',
  component: Toast,
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof Toast>;

// Success 토스트
export const Success: Story = {
  render: () => {
    const { showToast } = useToastStore();

    return (
      <>
        <Button
          variant="primary"
          size="md"
          onClick={() => showToast({ type: 'success', message: '작업이 완료되었습니다' })}
        >
          Success 토스트 표시
        </Button>
        <Toast />
      </>
    );
  },
};

// Warning 토스트
export const Warning: Story = {
  render: () => {
    const { showToast } = useToastStore();

    return (
      <>
        <Button
          variant="secondary"
          size="md"
          onClick={() => showToast({ type: 'warning', message: '주의가 필요합니다' })}
        >
          Warning 토스트 표시
        </Button>
        <Toast />
      </>
    );
  },
};
