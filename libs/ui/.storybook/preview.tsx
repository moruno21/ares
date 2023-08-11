// To control the way stories are rendered and add global decorators and parameters,
// create a .storybook/preview.js file.  This is loaded in the Canvas tab, the “preview”
// iframe that renders your components in isolation. Use preview.js for global code
// (such as CSS imports or JavaScript mocks) that applies to all stories.

// https://storybook.js.org/docs/react/configure/overview

import { ThemeProvider } from 'styled-components'

import { Preview, StoryFn } from '@storybook/react'
import React from 'react'
import GlobalStyle from '../styles/global'
import theme from '../styles/theme'

const withThemeProvider = (Story: StoryFn) => (
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    <Story />
  </ThemeProvider>
)

const preview: Preview = {
  decorators: [withThemeProvider],
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      hideNoControlsWarning: true,
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
      sort: 'requiredFirst',
    },
  },
}

export default preview
