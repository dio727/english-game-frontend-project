'use client'

import styled from 'styled-components'

export const Container = styled.div`
  min-height: 100vh;
  width: 100%;
  background: url('/input.webp') no-repeat center center fixed;
  background-size: cover;

  position: relative;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.55);
`

export const Content = styled.div`
  position: relative;
  z-index: 2;

  display: flex;
  flex-direction: column;
  align-items: center;
`

export const Title = styled.h1`
  font-size: 48px;
  color: #ffffff;
  margin-bottom: 50px;
  font-weight: 700;
  text-shadow: 0px 0px 12px rgba(255,255,255,0.4);
`

export const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`
