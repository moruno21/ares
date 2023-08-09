import { ButtonHTMLAttributes } from 'react'

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?:
    | 'cta-outstanding'
    | 'cta-primary'
    | 'cta-secondary'
    | 'ghost-link'
    | 'primary'
    | 'raw-link'
    | 'secondary'
}

export type ComponentProps = {
  $variant: ButtonProps['variant']
}
