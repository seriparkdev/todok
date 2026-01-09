import type { Meta, StoryObj } from '@storybook/nextjs';
import { useState } from 'react';
import { Modal } from '.';
import { Button } from '../Button';

const meta = {
  title: 'Components/Modal',
  component: Modal,
  argTypes: {
    isOpen: {
      control: 'boolean',
      description: '모달의 열림/닫힘 상태',
    },
    onClose: {
      action: 'closed',
      description: '모달 닫기 콜백 함수',
    },
    children: {
      control: 'text',
      description: '모달 내부 콘텐츠',
    },
  },
} satisfies Meta<typeof Modal>;

export default meta;

type Story = StoryObj<typeof Modal>;

export const Default: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button variant="primary" onClick={() => setIsOpen(true)}>
          모달 열기
        </Button>
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <Modal.Content>모달 컨텐츠입니다.</Modal.Content>
        </Modal>
      </>
    );
  },
};
