import { Meta, StoryFn } from '@storybook/react'

import Component from '~/components/Button'

const meta: Meta<typeof Component> = {
  args: {
    children: 'Button',
  },
  argTypes: {
    children: {
      table: { type: { summary: 'ReactNode' } },
    },
    disabled: {
      table: { type: { summary: 'boolean' } },
      type: 'boolean',
    },
    variant: {
      control: false,
    },
  },
  component: Component,
  title: 'Atoms/Button',
}

export default meta

const Template: StoryFn<typeof Component> = (args) => <Component {...args} />

export const Primary = Template.bind({})
Primary.args = {
  variant: 'primary',
}

export const Secondary = Template.bind({})
Secondary.args = {
  variant: 'secondary',
}
