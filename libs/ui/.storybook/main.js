/* eslint-disable @typescript-eslint/no-var-requires */
const { mergeConfig } = require('vite')
const viteTsConfigPaths = require('vite-tsconfig-paths').default

module.exports = {
  addons: ['@storybook/addon-a11y', '@storybook/addon-essentials'],
  core: { builder: '@storybook/builder-vite' },
  stories: [
    '../stories/**/*.stories.mdx',
    '../stories/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  async viteFinal(config, { configType }) {
    return mergeConfig(config, {
      plugins: [
        viteTsConfigPaths({
          root: '../../../',
        }),
      ],
    })
  },
}
