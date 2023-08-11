import { Meta, StoryFn } from '@storybook/react'

import Component from '../components/Dropdown'

const meta: Meta<typeof Component> = {
  args: {
    noResultsMessage: 'No results found.',
    options: [
      { text: 'Option 1', value: '1' },
      { text: 'Option 2', value: '2' },
      { text: 'Option 3', value: '3' },
      { text: 'Option 4', value: '4' },
      { text: 'Option 5', value: '5' },
      { text: 'Option 6', value: '6' },
      { text: 'Option 7', value: '7' },
      { text: 'Option 8', value: '8' },
      { text: 'Option 9', value: '9' },
      { text: 'Option 10', value: '10' },
    ],
    placeholder: 'Placeholder',
  },
  argTypes: {
    disabled: {
      table: { type: { summary: 'boolean' } },
      type: 'boolean',
    },
    placeholder: {
      table: { type: { summary: 'string' } },
    },
  },
  component: Component,
  title: 'Molecules/Dropdown',
}

export default meta

const Template: StoryFn<typeof Component> = (args) => <Component {...args} />

export const Dropdown = Template.bind({})
