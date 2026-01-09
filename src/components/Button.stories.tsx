import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './Button'

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'danger'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'ボタン',
  },
}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'ボタン',
  },
}

export const Danger: Story = {
  args: {
    variant: 'danger',
    children: '削除',
  },
}

export const Small: Story = {
  args: {
    size: 'sm',
    children: '小さいボタン',
  },
}

export const Large: Story = {
  args: {
    size: 'lg',
    children: '大きいボタン',
  },
}
