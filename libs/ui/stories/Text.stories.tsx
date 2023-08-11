import { Meta } from '@storybook/react'

import {
  Body1 as Body1Component,
  Body2 as Body2Component,
  Body3 as Body3Component,
  Body4 as Body4Component,
  Button as ButtonComponent,
  H1,
  H2,
  H3,
  H4,
  Input1 as Input1Component,
  Input2 as Input2Component,
  Link as LinkComponent,
} from '../components/Text'

const meta: Meta = {
  title: 'Atoms/Text',
}

export default meta

export const Heading1 = () => <H1>Text</H1>

export const Heading2 = () => <H2>Text</H2>

export const Heading3 = () => <H3>Text</H3>

export const Heading4 = () => <H4>Text</H4>

export const Body1 = () => <Body1Component>Text</Body1Component>

export const Body2 = () => <Body2Component>Text</Body2Component>

export const Body3 = () => <Body3Component>Text</Body3Component>

export const Body4 = () => <Body4Component>Text</Body4Component>

export const Button = () => <ButtonComponent>Text</ButtonComponent>

export const Input1 = () => <Input1Component>Text</Input1Component>

export const Input2 = () => <Input2Component>Text</Input2Component>

export const Link = () => <LinkComponent>Text</LinkComponent>
