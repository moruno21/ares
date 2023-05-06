import 'styled-components'

import { Theme } from '@ares/ui/styles/theme'

declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}
