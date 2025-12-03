'use client'

import styled from 'styled-components'
import { theme } from '../../utils/styles/theme'

type ButtonProps = {
  $height?: string
  $width?: string
  $background?: string
  $color?: string
  $borderColor?: string
  $buttonBackgroundHover?: string
}

export const ButtonWrapper = styled.button<ButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;

  margin: 0 12px; /* 👈 AGORA TEM RESPIRO DE VERDADE */

  /* MOBILE FIRST */
  width: calc(100% - 24px); /* 👈 ESSENCIAL PARA RESPONSIVIDADE */
  max-width: ${props => props.$width || '300px'};
  min-width: 180px;

  height: ${props => props.$height || '60px'};

  background: ${props => props.$background || theme.colors.buttonBackground};
  color: ${props => props.$color || theme.colors.buttonText};

  border: 3px solid ${props => props.$borderColor || theme.colors.buttonBorder};
  border-radius: 14px;

  font-size: 20px;
  font-weight: bold;
  cursor: pointer;

  transition: transform .1s ease-in-out, background .2s ease;

  &:hover {
    background: ${theme.colors.buttonBackgroundHover};
  }

  &:active {
    transform: scale(.96);
  }

  /* TABLET */
  @media (min-width: 480px) {
    font-size: 22px;
    max-width: ${props => props.$width || '260px'};
  }

  /* DESKTOP */
  @media (min-width: 768px) {
    font-size: 24px;
    max-width: ${props => props.$width || '220px'};
  }
`


