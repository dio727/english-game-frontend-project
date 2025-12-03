'use client'

import { ButtonWrapper } from './Button.styles'

type ButtonPlayProps = {
  text?: string
  height?: string
  width?: string
  background?: string
  color?: string
  borderColor?: string
  onClick?: () => void
}

export default function Button({
  text = 'Play',
  height,
  width,
  background,
  color,
  borderColor,
  onClick
}: ButtonPlayProps) {
  return (
    <ButtonWrapper
        $height={height}
        $width={width}
        $background={background}
        $color={color}
        $borderColor={borderColor}
        onClick={onClick}
    >
        {text}
    </ButtonWrapper>

  )
}
