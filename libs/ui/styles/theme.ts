const theme = {
  breakpoints: {
    extralarge: 1280,
    large: 1024,
    medium: 767,
    small: 414,
  },
  colors: {
    background: {
      dimmer: 'var(--color-dimmer)',
      error: 'var(--color-red-10)',
      grey: 'var(--color-grey-20)',
      white: 'var(--color-white)',
    },
    buttonStates: {
      defaultIcon: {
        disabled: 'var(--color-grey-20)',
        hover: 'var(--color-grey-10)',
        pressed: 'var(--color-grey-20)',
      },
      primary: {
        disabled: 'var(--color-grey-20)',
        hover: 'var(--color-purple-20)',
        pressed: 'var(--color-purple-10)',
      },
      primaryIcon: {
        disabled: 'var(--color-grey-20)',
        hover: 'var(--color-grey-20)',
        pressed: 'var(--color-purple-10)',
      },
      secondary: {
        disabled: 'var(--color-grey-20)',
        hover: 'var(--color-grey-10)',
        pressed: 'var(--color-grey-20)',
      },
    },
    clickables: {
      defaultIcon: 'var(--color-white)',
      optionHover: 'var(--color-grey-10)',
      primaryButton: 'var(--color-purple-30)',
      primaryIcon: 'var(--color-grey-10)',
      secondaryButton: 'var(--color-white)',
    },
    icon: {
      disabled: 'var(--color-grey-10)',
      main: 'var(--color-purple-30)',
      red: 'var(--color-red-20)',
      white: 'var(--color-white)',
    },
    stroke: {
      disabled: 'var(--color-grey-10)',
      error: 'var(--color-red-20)',
      grey: 'var(--color-grey-30)',
      main: 'var(--color-purple-30)',
    },
    text: {
      disabled: 'var(--color-grey-20)',
      error: 'var(--color-red-20)',
      main: 'var(--color-purple-30)',
      neutral: 'var(--color-grey-30)',
      placeholder: 'var(--color-grey-30)',
      white: 'var(--color-white)',
    },
    ui: {
      purple30: 'var(--color-purple-30)',
      white: 'var(--color-white)',
    },
  },
  font: {
    families: {
      primary: 'var(--font-primary)',
      secondary: 'var(--font-secondary)',
    },
    lineHeights: {
      default: '1.125rem',
      large: '1.5rem',
      medium: '1.375rem',
      small: '1rem',
      xl: '2.125rem',
      xxl: '2.625rem',
      xxxl: '3.5rem',
    },
    sizes: {
      default: '0.875rem',
      large: '1.125rem',
      medium: '1rem',
      small: '0.75rem',
      xl: '1.5rem',
      xxl: '2rem',
      xxxl: '3rem',
    },
    weights: {
      black: 900,
      bold: 700,
      extrabold: 800,
      extralight: 200,
      light: 300,
      medium: 500,
      regular: 400,
      semibold: 600,
      thin: 100,
    },
  },
  shadows: {
    heavy:
      '0rem 0.6875rem 0.9375rem -0.4375rem rgba(55, 40, 102, 0.1),0rem 1.5rem 2.375rem 0.1875rem rgba(55, 40, 102, 0.07),0rem 0.5625rem 2.875rem 0.5rem rgba(55, 40, 102, 0.06)',
    light:
      '0rem 0.1875rem 0.875rem 0.125rem rgba(55, 40, 102, 0.06), 0rem 0rem 0.625rem 0.0625rem rgba(55, 40, 102, 0.08), 0rem 0.3125rem 0.3125rem -0.1875rem rgba(55, 40, 102, 0.08)',
    medium:
      '0rem 0.3125rem 1.5rem 0.25rem rgba(55, 40, 102, 0.06), 0rem 0.8125rem 1.1875rem 0.125rem rgba(55, 40, 102, 0.07), 0rem 0.4375rem 0.5rem -0.25rem rgba(55, 40, 102, 0.1)',
  },
} as const

export type Theme = typeof theme

export default theme
