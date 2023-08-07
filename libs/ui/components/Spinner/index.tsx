import { memo } from 'react'

import { Component } from './styles'

const Spinner = ({ ...props }) => <Component aria-hidden {...props} />

export default memo(Spinner)
