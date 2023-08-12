import { Meta, StoryFn } from '@storybook/react'

import Component from '../components/Modal'

const meta: Meta<typeof Component> = {
  args: {
    children: 'Children',
    footer: 'Footer',
    title: 'Title',
  },
  argTypes: {
    children: {
      table: { type: { summary: 'ReactNode' } },
    },
    footer: {
      type: 'string',
    },
  },
  component: Component,
  title: 'Molecules/Modal',
}

export default meta

const Template: StoryFn<typeof Component> = (args) => <Component {...args} />

export const Dialog = Template.bind({})
