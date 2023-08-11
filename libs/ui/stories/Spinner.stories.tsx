import { Meta, StoryFn } from '@storybook/react'

import Component from '~/components/Spinner'

const meta: Meta<typeof Component> = {
  component: Component,
  title: 'Atoms/Spinner',
}

export default meta

const Template: StoryFn<typeof Component> = (args) => <Component {...args} />

export const Spinner = Template.bind({})
