import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import { Button } from '../Button';
import { Modal } from '.';

const meta = {
  title: 'Components/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    isOpen: {
      control: 'boolean',
      description: '모달 열림/닫힘 상태',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', 'full'],
      description: '모달의 크기',
    },
    closeOnOverlayClick: {
      control: 'boolean',
      description: '오버레이 클릭 시 모달 닫기',
    },
    closeOnEscape: {
      control: 'boolean',
      description: 'ESC 키로 모달 닫기',
    },
    showCloseButton: {
      control: 'boolean',
      description: '닫기 버튼 표시 여부',
    },
  },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 모달
export const Default: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>모달 열기</Button>
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="기본 모달">
          <p>이것은 기본 모달입니다.</p>
          <p>모달 내용을 여기에 작성할 수 있습니다.</p>
        </Modal>
      </>
    );
  },
};

// 제목 없는 모달
export const WithoutTitle: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>제목 없는 모달 열기</Button>
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} showCloseButton={true}>
          <p>제목이 없는 모달입니다.</p>
        </Modal>
      </>
    );
  },
};

// 푸터가 있는 모달
export const WithFooter: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>푸터 있는 모달 열기</Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="푸터가 있는 모달"
          footer={
            <>
              <Button variant="outline" onClick={() => setIsOpen(false)}>
                취소
              </Button>
              <Button variant="primary" onClick={() => setIsOpen(false)}>
                확인
              </Button>
            </>
          }
        >
          <p>이 모달은 푸터가 있습니다.</p>
          <p>푸터에 버튼이나 다른 액션을 추가할 수 있습니다.</p>
        </Modal>
      </>
    );
  },
};

// 크기 변형
export const Sizes: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const [size, setSize] = useState<'sm' | 'md' | 'lg' | 'xl' | 'full'>('md');
    return (
      <>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <Button
            onClick={() => {
              setSize('sm');
              setIsOpen(true);
            }}
          >
            Small
          </Button>
          <Button
            onClick={() => {
              setSize('md');
              setIsOpen(true);
            }}
          >
            Medium
          </Button>
          <Button
            onClick={() => {
              setSize('lg');
              setIsOpen(true);
            }}
          >
            Large
          </Button>
          <Button
            onClick={() => {
              setSize('xl');
              setIsOpen(true);
            }}
          >
            Extra Large
          </Button>
          <Button
            onClick={() => {
              setSize('full');
              setIsOpen(true);
            }}
          >
            Full
          </Button>
        </div>
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} size={size} title={`${size.toUpperCase()} 크기 모달`}>
          <p>이 모달은 {size} 크기입니다.</p>
        </Modal>
      </>
    );
  },
};

// 긴 내용이 있는 모달
export const LongContent: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>긴 내용 모달 열기</Button>
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="긴 내용이 있는 모달">
          <div>
            <p>이 모달은 스크롤 가능한 긴 내용을 포함합니다.</p>
            {Array.from({ length: 20 }, (_, i) => (
              <p key={i}>
                문단 {i + 1}: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt
                ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
            ))}
          </div>
        </Modal>
      </>
    );
  },
};

// 오버레이 클릭 비활성화
export const NoOverlayClose: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>오버레이 클릭 비활성화 모달</Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="오버레이 클릭 비활성화"
          closeOnOverlayClick={false}
        >
          <p>이 모달은 오버레이를 클릭해도 닫히지 않습니다.</p>
          <p>닫기 버튼이나 ESC 키를 사용해야 합니다.</p>
        </Modal>
      </>
    );
  },
};

// ESC 키 비활성화
export const NoEscapeClose: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>ESC 키 비활성화 모달</Button>
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="ESC 키 비활성화" closeOnEscape={false}>
          <p>이 모달은 ESC 키로 닫을 수 없습니다.</p>
          <p>닫기 버튼이나 오버레이 클릭을 사용해야 합니다.</p>
        </Modal>
      </>
    );
  },
};

// 닫기 버튼 없음
export const NoCloseButton: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>닫기 버튼 없는 모달</Button>
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="닫기 버튼 없음" showCloseButton={false}>
          <p>이 모달은 닫기 버튼이 없습니다.</p>
          <p>오버레이 클릭이나 ESC 키를 사용해야 합니다.</p>
        </Modal>
      </>
    );
  },
};




