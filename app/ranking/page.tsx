'use client'

import { useEffect, useState } from 'react'
import {
  Container,
  Title,
  List,
  Item,
  Position,
  UserName,
  Score,
  BackButton
} from './styles'

export default function RankingPage() {
  const [ranking, setRanking] = useState<any[]>([])

  useEffect(() => {
    async function load() {
      const res = await fetch('https://maria6571.c44.integrator.host/games')
      const json = await res.json()

      // Agrupar por usuário e pegar a maior pontuação
      const bestScores: { [key: string]: any } = {}

      json.forEach((game: any) => {
        const user = game.user.userName
        const score = game.score

        if (!bestScores[user] || score > bestScores[user].score) {
          bestScores[user] = {
            user,
            score
          }
        }
      })

      // Converter para array e ordenar
      const finalRanking = Object.values(bestScores)
        .sort((a: any, b: any) => b.score - a.score)
        .slice(0, 10)

      setRanking(finalRanking)
    }

    load()
  }, [])

  return (
    <Container>
      <Title>Top 10 Ranking</Title>

      <List>
        {ranking.map((item, index) => (
          <Item key={index}>
            <Position>#{index + 1}</Position>
            <UserName>{item.user}</UserName>
            <Score>{item.score} pts</Score>
          </Item>
        ))}
      </List>

      <BackButton onClick={() => window.location.href = '/home'}>
        Back to Menu
      </BackButton>
    </Container>
  )
}
