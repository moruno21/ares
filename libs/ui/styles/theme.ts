const theme = {
  breakpoints: {},
  colors: {
    text: {
      main: 'var(--color-blue-10)',
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
} as const

export type Theme = typeof theme

export default theme
