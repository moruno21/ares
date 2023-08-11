import { Meta, StoryFn } from '@storybook/react'

import { ReactComponent as SearchIcon } from '~/assets/icons/close.svg'
import Component from '~/components/IconButton'

const meta: Meta<typeof Component> = {
  argTypes: {
    disabled: {
      table: { type: { summary: 'boolean' } },
      type: 'boolean',
    },
  },
  component: Component,
  title: 'Atoms/Button/Icon',
}

export default meta

const Template: StoryFn<typeof Component> = (args) => (
  <Component {...args}>
    <SearchIcon />
  </Component>
)

export const Icon = Template.bind({})
