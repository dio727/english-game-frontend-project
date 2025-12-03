'use client'

import styled from 'styled-components'

export const Container = styled.div`
  min-height: 100vh;
  padding: 30px;
  background: #0f1115;
  color: white;

  /* Centraliza todo o conteúdo vertical e horizontal */
  display: flex;
  flex-direction: column;
  align-items: center;
`
export const Card = styled.div`
  background: #1b1f27;
  padding: 40px 50px; /* MAIS ESPAÇO INTERNO */
  border-radius: 12px;
  margin-top: 20px;
  box-shadow: 0 3px 8px rgba(0,0,0,0.4);

  width: 100%;
  max-width: 720px; /* MAIS LARGO */
  
  display: flex;
  flex-direction: column;
  align-items: center;  /* CENTRALIZA TUDO */
  justify-content: center;
  text-align: center;

  @media (max-width: 480px) {
    padding: 22px;
    max-width: 95%;
  }
`



export const Option = styled.div`
  padding: 12px 20px;
  background: #2a2f38;
  border-radius: 8px;
  margin-top: 10px;
  cursor: pointer;
  transition: 0.2s;

  text-align: center;     /* centraliza o texto */
  font-size: 1rem;

  &:hover {
    background: #3a404b;
  }
`

export const WordBox = styled.span`
  padding: 10px 14px;
  background: #21252c;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.95rem;

  /* aumenta área de toque em telas pequenas */
  @media (max-width: 480px) {
    padding: 8px 12px;
    font-size: 0.88rem;
  }
`

export const WordSelected = styled.span`
  padding: 10px 14px;
  background: #4caf50;
  border-radius: 8px;
  margin-right: 8px;
  cursor: pointer;

  font-size: 0.95rem;

  &:hover {
    opacity: .8;
  }

  @media (max-width: 480px) {
    padding: 8px 12px;
    font-size: 0.88rem;
  }
`

export const TimerBar = styled.div<{ percent: number }>`
  width: ${(p) => p.percent}%;
  height: 8px;
  background: #4caf50;
  margin-bottom: 20px;
  transition: width .2s;
  border-radius: 4px;

  max-width: 600px;
`

export const FinalScoreCard = styled.div`
  margin-top: 150px;
  background: #222831;
  padding: 40px;
  border-radius: 14px;
  text-align: center;
  width: 100%;
  max-width: 600px;

  h1 {
    font-size: 28px;

    @media (max-width: 480px) {
      font-size: 22px;
    }
  }

  h2 {
    font-size: 52px;
    margin-top: 10px;
    color: #4caf50;

    @media (max-width: 480px) {
      font-size: 38px;
    }
  }
`
