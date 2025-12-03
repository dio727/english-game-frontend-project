'use client'

import styled from 'styled-components'

export const ModalWrapper = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.6);
  backdrop-filter: blur(3px);

  display: flex;
  justify-content: center;
  align-items: center;

  z-index: 9999;
`

export const ModalBox = styled.div`
  background: #1f1f1f;
  padding: 35px;
  width: 380px;
  border-radius: 12px;

  box-shadow: 0 0 22px rgba(255,255,255,0.15);

  display: flex;
  flex-direction: column;
  align-items: center;
`

export const Title = styled.h2`
  color: white;
  font-size: 24px;
  margin-bottom: 20px;
`

export const Input = styled.input`
  width: 100%;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #555;
  background: #2a2a2a;
  color: white;
  font-size: 16px;

  &:focus {
    border-color: #4caf50;
  }
`

export const Buttons = styled.div`
  margin-top: 20px;
  display: flex;
  gap: 12px;
`
