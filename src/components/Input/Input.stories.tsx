import type { Meta, StoryObj } from '@storybook/nextjs';
import { Input } from '.';

const meta = {
  title: 'Components/Input',
  component: Input,
  argTypes: {
    label: {
      control: 'text',
      description: '입력 필드의 라벨',
    },
    placeholder: {
      control: 'text',
      description: '입력 필드의 플레이스홀더',
    },
    error: {
      control: 'text',
      description: '에러 메시지',
    },
    disabled: {
      control: 'boolean',
      description: '입력 필드 비활성화 상태',
    },
    required: {
      control: 'boolean',
      description: '필수 입력 여부',
    },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    placeholder: '텍스트를 입력하세요',
  },
};

export const WithLabel: Story = {
  args: {
    label: '이름',
    placeholder: '이름을 입력하세요',
    id: 'name',
  },
};

export const WithError: Story = {
  args: {
    label: '비밀번호',
    placeholder: '비밀번호를 입력하세요',
    type: 'password',
    error: '비밀번호는 최소 8자 이상이어야 합니다',
    id: 'password',
  },
};

export const WithHelperText: Story = {
  args: {
    label: '이메일',
    placeholder: 'example@email.com',
    type: 'email',
    helperText: '이메일 주소를 입력해주세요',
    id: 'email',
  },
};

export const Disabled: Story = {
  args: {
    label: '사용자명',
    placeholder: '사용자명',
    disabled: true,
    value: 'disabled_user',
    id: 'username',
  },
};
