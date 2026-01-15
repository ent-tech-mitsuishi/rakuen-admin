import type { Meta, StoryObj } from '@storybook/react'
import { LoginForm } from './LoginForm'
import { fn } from '@storybook/test'

const meta = {
  title: 'Components/LoginForm',
  component: LoginForm,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    username: {
      control: 'text',
      description: 'ユーザー名',
    },
    password: {
      control: 'text',
      description: 'パスワード',
    },
    remember: {
      control: 'boolean',
      description: 'ログイン情報を保存する',
    },
    error: {
      control: 'text',
      description: 'エラーメッセージ',
    },
    isLoading: {
      control: 'boolean',
      description: 'ローディング状態',
    },
  },
  args: {
    onUsernameChange: fn(),
    onPasswordChange: fn(),
    onRememberChange: fn(),
    onSubmit: fn(),
  },
} satisfies Meta<typeof LoginForm>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    username: '',
    password: '',
    remember: false,
    isLoading: false,
  },
}

export const WithValues: Story = {
  args: {
    username: 'admin',
    password: 'password123',
    remember: true,
    isLoading: false,
  },
}

export const WithError: Story = {
  args: {
    username: 'admin',
    password: 'wrongpassword',
    remember: false,
    error: 'ログインに失敗しました',
    isLoading: false,
  },
}

export const Loading: Story = {
  args: {
    username: 'admin',
    password: 'password123',
    remember: false,
    isLoading: true,
  },
}
