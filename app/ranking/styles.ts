'use client'

import styled from 'styled-components'

export const Container = styled.div`
  min-height: 100vh;
  background: #10141a;
  color: white;
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const Title = styled.h1`
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 30px;
`

export const List = styled.div`
  width: 90%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  gap: 15px;
`

export const Item = styled.div`
  background: #1c1f26;
  padding: 18px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const Position = styled.span`
  font-size: 22px;
  font-weight: bold;
  color: #4caf50;
`

export const UserName = styled.span`
  font-size: 20px;
  font-weight: 500;
`

export const Score = styled.span`
  font-size: 20px;
  color: #4caf50;
  font-weight: bold;
`

export const BackButton = styled.button`
  margin-top: 40px;
  background: #4caf50;
  border: none;
  padding: 12px 25px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 18px;
  color: white;
  transition: 0.2s;

  &:hover {
    opacity: 0.8;
  }
`
