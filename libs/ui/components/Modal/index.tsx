import { memo } from 'react'
import { createPortal } from 'react-dom'

import { ReactComponent as CloseIcon } from '../../assets/icons/close.svg'
import { useModal } from './hooks'
import { Body, Component, Content, Dimmer, IconButton, Title } from './styles'
import { ModalProps } from './types'

const Modal = ({
  children,
  'close-aria-label': closeAriaLabel,
  footer,
  id,
  onClose,
  title,
  ...props
}: ModalProps) => {
  const { handleClick, handleKeyDown, ref, root, titleId } = useModal({
    id,
    onClose,
  })

  if (!root) return null

  return createPortal(
    <Dimmer onClick={onClose} onKeyDown={handleKeyDown} ref={ref} tabIndex={0}>
      <Component
        aria-labelledby={titleId}
        aria-modal="true"
        id={id}
        onClick={handleClick}
        role="dialog"
        {...props}
      >
        <IconButton aria-label={closeAriaLabel} onClick={onClose}>
          <CloseIcon />
        </IconButton>
        <Body>
          <Content>
            <Title id={titleId}>{title}</Title>
            {children}
          </Content>
          {footer}
        </Body>
      </Component>
    </Dimmer>,
    root,
  )
}

export default memo(Modal)

export type { ModalProps }
