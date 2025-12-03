'use client'

import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import {
  Container,
  Card,
  Option,
  WordBox,
  WordSelected,
  FinalScoreCard,
  TimerBar
} from './styles'
import Button from '../components/Button'

export default function GamePage() {
  const [data, setData] = useState<any[]>([])
  const [index, setIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [time, setTime] = useState(30)
  const [selectedWords, setSelectedWords] = useState<string[]>([])
  const [matchGame, setMatchGame] = useState<any>(null)
  const [finished, setFinished] = useState(false)

  function color(i: number) {
    const colors = ['#2196f3', '#ffeb3b', '#f44336', '#ffffff', '#4caf50']
    return colors[i % colors.length]
  }

  // CARREGA DADOS DO BACKEND
  useEffect(() => {
    async function load() {
      const res = await fetch('https://maria6571.c44.integrator.host/start')
      const json = await res.json()
      setData(json)
    }
    load()
  }, [])

  // TIMER
  useEffect(() => {
    if (time <= 0) {
      handleWrong()
      return
    }
    const t = setTimeout(() => setTime((prev) => prev - 1), 1000)
    return () => clearTimeout(t)
  }, [time])

  function restartTimer() {
    setTime(30)
  }

  // MONTA JOGO DE PARES QUANDO data CARREGAR
  useEffect(() => {
    if (!data.length) return

    const pairs = data.slice(3, 8)

    const shuffledPt = pairs
      .map(p => p.portuguese)
      .sort(() => Math.random() - 0.5)

    const shuffledEn = pairs
      .map(p => p.english)
      .sort(() => Math.random() - 0.5)

    setMatchGame({
      original: pairs,
      shuffledPt,
      shuffledEn,
      selectedPt: null,
      selectedEn: null,
      matches: []
    })
  }, [data]) // <- SEM RELAÇÃO COM INDEX!

  // CORRETO
  function handleCorrect() {
    const bonus = Math.floor(time * 2)
    const points = 100 + bonus
    setScore(s => s + points)
    toast.success(`✔ Acertou! +${points} pontos 🔥`)
    next()
  }

  function handleWrong() {
    toast.error('❌ Errou! 💀')
    next()
  }

  function next() {
    if (index >= 7) {
      finishGame()
      return
    }

    setIndex(i => i + 1)
    setSelectedWords([])
    restartTimer()
  }

  async function finishGame() {
    setFinished(true)
    const idUser = Number(localStorage.getItem('idUser'))

    await fetch('https://maria6571.c44.integrator.host/games', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ score, idUser })
    })
  }

  if (!data.length) return <Container>Carregando...</Container>

  const item = data[index]

  // TELA FINAL
  if (finished) {
    return (
      <Container>
        <FinalScoreCard>
          <h1>Game Over</h1>
          <h2>{score} points</h2>

          <div style={{ marginTop: '30px', display: 'flex', gap: '20px', justifyContent: 'center' }}>
            <Button
              text="Return to Menu"
              width="160px"
              height="70px"
              background="#555"
              color="#fff"
              borderColor="#777"
              onClick={() => (window.location.href = '/home')}
            />

            <Button
              text="View Ranking"
              width="160px"
              height="70px"
              background="#4caf50"
              color="#fff"
              borderColor="#4caf50"
              onClick={() => (window.location.href = '/ranking')}
            />
          </div>
        </FinalScoreCard>
      </Container>
    )
  }

  return (
    <Container>
      <TimerBar percent={(time / 30) * 100} />

      {/* MULTIPLE CHOICE */}
      {item.idQuestion && index < 1 && (
        <Card>
          <h2>{item.question}</h2>
          {item.alternatives.map((alt: string, i: number) => (
            <Option
              key={i}
              onClick={() =>
                alt === item.correctAnswer ? handleCorrect() : handleWrong()
              }
            >
              {alt}
            </Option>
          ))}
        </Card>
      )}

      {/* SENTENCE BUILDER */}
      {item.idSentence && index < 3 && (
        <Card>
          <h2>{item.sentencePortuguese}</h2>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 20 }}>
            {item.words.map((w: string, i: number) => (
              <WordBox
                key={i}
                onClick={() => {
                  if (selectedWords.includes(w)) return
                  setSelectedWords([...selectedWords, w])
                }}
              >
                {w}
              </WordBox>
            ))}
          </div>

          <div style={{ marginTop: 20, padding: 10, minHeight: 50 }}>
            {selectedWords.map((w, i) => (
              <WordSelected
                key={i}
                onClick={() =>
                  setSelectedWords(selectedWords.filter((x) => x !== w))
                }
              >
                {w}
              </WordSelected>
            ))}
          </div>

          <Button
            text='Confirmar'
            height='45px'
            width='130px'
            background='#4caf50'
            color='#fff'
            borderColor='#4caf50'
            onClick={() =>
              selectedWords.join(' ') === item.sentence.toLowerCase()
                ? handleCorrect()
                : handleWrong()
            }
          />
        </Card>
      )}

      {/* WORD MATCH DUOLINGO */}
      {index >= 3 && matchGame && (
        <Card>
          <h2>Combine as palavras:</h2>

          <div style={{ display: 'flex', gap: 40, marginTop: 20 }}>
            <div>
              <strong>Português</strong>
              {matchGame.shuffledPt.map((pt: string, i: number) => (
                <Option
                  key={i}
                  style={{
                    background:
                     matchGame.matches.find((m: any) => m.pt === pt)?.color
                      (matchGame.selectedPt === pt ? matchGame.currentColor : '#333')
                  }}
                  onClick={() =>
                    setMatchGame((m: any) => ({
                      ...m,
                      selectedPt: pt,
                      currentColor: color(i)
                    }))

                  }
                >
                  {pt}
                </Option>

              ))}
            </div>

            <div>
              <strong>Inglês</strong>
              {matchGame.shuffledEn.map((en: string, i: number) => (
                <Option
                  key={i}
                  style={{
                    background:
                      matchGame.matches.find((m: any) => m.en === en)?.color ??
                      (matchGame.selectedEn === en ? matchGame.currentColor : '#333')
                  }}
                  onClick={() =>
                    setMatchGame((m: any) => ({
                      ...m,
                      selectedEn: en
                    }))
                  }
                >
                  {en}
                </Option>

              ))}
            </div>
          </div>

          <Button
              text='Ligar'
              height='45px'
              width='130px'
              background='#2196f3'
              color='#fff'
              borderColor='#2196f3'
              onClick={() => {
                if (!matchGame.selectedPt || !matchGame.selectedEn) return

                setMatchGame(m => ({
                  ...m,
                  matches: [
                    ...m.matches,
                    { pt: m.selectedPt, en: m.selectedEn, color: m.currentColor }
                  ],
                  selectedPt: null,
                  selectedEn: null,
                  currentColor: null
                }))
              }}

              />
          <Button
            text='Confirmar'
            height='45px'
            width='130px'
            background='#4caf50'
            color='#fff'
            borderColor='#4caf50'
            onClick={() => {
              const correct = matchGame.original.every((pair: any) =>
                matchGame.matches.some(
                  m => m.pt === pair.portuguese && m.en === pair.english
                )
              )

              correct ? handleCorrect() : handleWrong()
            }}
          />
        </Card>
      )}
    </Container>
  )
}
