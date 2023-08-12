import {
  KeyboardEventHandler,
  MouseEventHandler,
  useCallback,
  useEffect,
  useRef,
} from 'react'

import { UseModalProps } from './types'

export const useModal = ({ id, onClose }: UseModalProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const root = document.getElementById('root')
  const titleId = `${id}Title`

  const handleClick: MouseEventHandler<HTMLDivElement> = useCallback(
    (event) => {
      event.stopPropagation()
    },
    [],
  )

  const handleKeyDown: KeyboardEventHandler<HTMLDivElement> = useCallback(
    (event) => {
      if (!['Escape'].includes(event.key)) return

      event.preventDefault()
      event.stopPropagation()

      switch (event.key) {
        case 'Escape':
          return onClose()
      }
    },
    [onClose],
  )

  useEffect(() => {
    document.body.style.setProperty('overflow', 'hidden')
    ref.current?.focus()

    return () => {
      document.body.style.removeProperty('overflow')
    }
  }, [])

  return { handleClick, handleKeyDown, ref, root, titleId }
}
