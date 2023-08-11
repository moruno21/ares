import { Meta, StoryFn } from '@storybook/react'

import Component from '../components/Search'

const meta: Meta<typeof Component> = {
  args: {
    placeholder: 'Placeholder',
  },
  argTypes: {
    disabled: {
      table: { type: { summary: 'boolean' } },
      type: 'boolean',
    },
    maxLength: {
      control: { min: 1, type: 'number' },
      table: { type: { summary: 'number' } },
    },
    placeholder: {
      table: { type: { summary: 'string' } },
    },
  },
  component: Component,
  title: 'Atoms/Search',
}

export default meta

const Template: StoryFn<typeof Component> = (args) => <Component {...args} />

export const Search = Template.bind({})
