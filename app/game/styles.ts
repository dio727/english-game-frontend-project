'use client'

import styled from 'styled-components'

export const Container = styled.div`
  min-height: 100vh;
  padding: 30px;
  background: #0f1115;
  color: white;
`

export const Card = styled.div`
  background: #1b1f27;
  padding: 25px;
  border-radius: 12px;
  margin-top: 20px;
  box-shadow: 0 3px 8px rgba(0,0,0,0.4);
`

export const Option = styled.div`
  padding: 12px 20px;
  background: #2a2f38;
  border-radius: 8px;
  margin-top: 10px;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    background: #3a404b;
  }
`

export const WordBox = styled.span`
  padding: 10px 14px;
  background: #21252c;
  border-radius: 8px;
  cursor: grab;
`

export const WordSelected = styled.span`
  padding: 10px 14px;
  background: #4caf50;
  border-radius: 8px;
  margin-right: 8px;
  cursor: pointer;

  &:hover {
    opacity: .8;
  }
`

export const TimerBar = styled.div<{ percent: number }>`
  width: ${(p) => p.percent}%;
  height: 8px;
  background: #4caf50;
  margin-bottom: 20px;
  transition: width .2s;
  border-radius: 4px;
`

export const FinalScoreCard = styled.div`
  margin-top: 150px;
  background: #222831;
  padding: 40px;
  border-radius: 14px;
  text-align: center;

  h1 {
    font-size: 28px;
  }

  h2 {
    font-size: 52px;
    margin-top: 10px;
    color: #4caf50;
  }
`
