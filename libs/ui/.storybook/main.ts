import type { StorybookConfig } from '@storybook/react-vite'
import { mergeConfig } from 'vite'
import svgr from 'vite-plugin-svgr'
import tsconfigPaths from 'vite-tsconfig-paths'

const config: StorybookConfig = {
  addons: [
    '@storybook/addon-a11y',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-links',
  ],
  docs: {
    autodocs: true,
  },
  framework: '@storybook/react-vite',
  stories: [
    '../stories/**/*.stories.mdx',
    '../stories/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  async viteFinal(config) {
    return mergeConfig(config, {
      plugins: [svgr(), tsconfigPaths()],
    })
  },
}

export default config
