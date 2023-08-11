import styled, { css } from 'styled-components'

export const Body1Styles = css`
  font-family: ${({ theme }) => theme.font.families.primary};
  font-size: ${({ theme }) => theme.font.sizes.medium};
  font-weight: ${({ theme }) => theme.font.weights.regular};
  line-height: ${({ theme }) => theme.font.lineHeights.medium};
`

export const Body1 = styled.span`
  ${Body1Styles}
`

export const Body2Styles = css`
  font-family: ${({ theme }) => theme.font.families.primary};
  font-size: ${({ theme }) => theme.font.sizes.default};
  font-weight: ${({ theme }) => theme.font.weights.semibold};
  line-height: ${({ theme }) => theme.font.lineHeights.default};
`

export const Body2 = styled.span`
  ${Body2Styles}
`

export const Body3Styles = css`
  font-family: ${({ theme }) => theme.font.families.primary};
  font-size: ${({ theme }) => theme.font.sizes.default};
  font-style: italic;
  font-weight: ${({ theme }) => theme.font.weights.regular};
  line-height: ${({ theme }) => theme.font.lineHeights.default};
`

export const Body3 = styled.span`
  ${Body3Styles}
`

export const Body4Styles = css`
  font-family: ${({ theme }) => theme.font.families.primary};
  font-size: ${({ theme }) => theme.font.sizes.small};
  font-weight: ${({ theme }) => theme.font.weights.regular};
  letter-spacing: 0.02em;
  line-height: ${({ theme }) => theme.font.lineHeights.small};
`

export const Body4 = styled.span`
  ${Body4Styles}
`

export const ButtonStyles = css`
  font-family: ${({ theme }) => theme.font.families.primary};
  font-size: ${({ theme }) => theme.font.sizes.default};
  font-weight: ${({ theme }) => theme.font.weights.bold};
  letter-spacing: 0.02em;
  line-height: ${({ theme }) => theme.font.lineHeights.default};
`

export const Button = styled.span`
  ${ButtonStyles}
`

export const H1Styles = css`
  font-family: ${({ theme }) => theme.font.families.primary};
  font-size: ${({ theme }) => theme.font.sizes.xxxl};
  font-weight: ${({ theme }) => theme.font.weights.bold};
  line-height: ${({ theme }) => theme.font.lineHeights.xxxl};
`

export const H1 = styled.h1`
  ${H1Styles}
`

export const H2Styles = css`
  font-family: ${({ theme }) => theme.font.families.primary};
  font-size: ${({ theme }) => theme.font.sizes.xxl};
  font-weight: ${({ theme }) => theme.font.weights.regular};
  line-height: ${({ theme }) => theme.font.lineHeights.xxl};
`

export const H2 = styled.h2`
  ${H2Styles}
`

export const H3Styles = css`
  font-family: ${({ theme }) => theme.font.families.primary};
  font-size: ${({ theme }) => theme.font.sizes.xl};
  font-weight: ${({ theme }) => theme.font.weights.bold};
  line-height: ${({ theme }) => theme.font.lineHeights.xl};
`

export const H3 = styled.h3`
  ${H3Styles}
`

export const H4Styles = css`
  font-family: ${({ theme }) => theme.font.families.primary};
  font-size: ${({ theme }) => theme.font.sizes.large};
  font-weight: ${({ theme }) => theme.font.weights.bold};
  line-height: ${({ theme }) => theme.font.lineHeights.large};
`

export const H4 = styled.h4`
  ${H4Styles}
`

export const InputStyles = css`
  font-family: ${({ theme }) => theme.font.families.primary};
  font-size: ${({ theme }) => theme.font.sizes.default};
  font-weight: ${({ theme }) => theme.font.weights.regular};
  line-height: 1.25rem;
`

export const Input = styled.span`
  ${InputStyles}
`

export const LinkHoverStyles = css`
  font-family: ${({ theme }) => theme.font.families.primary};
  font-size: ${({ theme }) => theme.font.sizes.default};
  font-weight: ${({ theme }) => theme.font.weights.regular};
  line-height: ${({ theme }) => theme.font.lineHeights.default};
`

export const LinkStyles = css`
  ${LinkHoverStyles}
  text-decoration: underline;

  :enabled:focus-visible,
  :enabled:hover {
    text-decoration: unset;
  }
`

export const Link = styled.span`
  ${LinkStyles}
`
