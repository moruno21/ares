import { HTMLAttributes, ReactNode } from 'react'

export type ModalProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  'id' | 'title'
> & {
  'close-aria-label': string
  footer?: ReactNode
  id: string
  onClose: () => void
  title: ReactNode
}

export type UseModalProps = {
  id: ModalProps['id']
  onClose: ModalProps['onClose']
}
