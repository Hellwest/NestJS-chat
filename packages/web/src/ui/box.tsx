import styled from "styled-components"
import {
  border,
  BordersProps,
  color,
  ColorProps,
  compose,
  flexbox,
  FlexboxProps,
  layout,
  LayoutProps,
  space,
  SpaceProps,
  typography,
  TypographyProps,
} from "styled-system"

export type BoxProps = SpaceProps &
  ColorProps &
  LayoutProps &
  FlexboxProps &
  TypographyProps &
  BordersProps

export const Box = styled.div<BoxProps>`
  min-width: 0;
  box-sizing: border-box;
  overflow: hidden;

  ${compose(space, color, layout, flexbox, typography, border)}
`
