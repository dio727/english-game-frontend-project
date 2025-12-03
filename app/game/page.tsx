'use client'

import { useEffect, useState } from 'react'
import {
  Container,
  Card,
  Option,
  WordBox,
  WordSelected,
  TimerBar,
  FinalScoreCard
} from './styles'
import Button from '../components/Button'
import { toast } from 'react-toastify'

export default function GamePage() {
  const [data, setData] = useState<any[]>([])
  const [index, setIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [time, setTime] = useState(30)
  const [selectedWords, setSelectedWords] = useState<string[]>([])
  const [matched, setMatched] = useState<{ [key: string]: string }>({})
  const [finished, setFinished] = useState(false)

  useEffect(() => {
    async function load() {
      const res = await fetch('https://maria6571.c44.integrator.host/start')
      const json = await res.json()
      setData(json)
    }
    load()
  }, [])

  useEffect(() => {
    if (time <= 0) {
      handleWrong()
      return
    }

    const t = setTimeout(() => setTime(time - 1), 1000)
    return () => clearTimeout(t)
  }, [time])

  function restartTimer() {
    setTime(30)
  }

  function next() {
    if (index >= 4) {
      finishGame()
    } else {
      setIndex(index + 1)
      setSelectedWords([])
      setMatched({})
      restartTimer()
    }
  }

  function handleCorrect() {
    const bonus = Math.floor(time * 2)
    setScore(score + 100 + bonus)

    const points = 100 + bonus

    toast.success(`✔ Acertou! +${points} pontos 🔥`)
    next()
  }

  function handleWrong() {
    toast.error('❌ Errou! 💀')
    next()
  }

  async function finishGame() {
    setFinished(true)

    const idUser = Number(localStorage.getItem('idUser'))

    await fetch('https://maria6571.c44.integrator.host/games', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        score,
        idUser
      })
    })
  }

  if (!data.length) return <Container>Carregando...</Container>

  if (finished) {
    return (
      <Container>
        <FinalScoreCard>
          <h1>Fim de jogo!</h1>
          <h2>{score} pontos</h2>
        </FinalScoreCard>
      </Container>
    )
  }

  const item = data[index]

  return (
    <Container>
      <TimerBar percent={(time / 30) * 100} />

      {/* MULTIPLE CHOICE */}
      {item.idQuestion && (
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
      {item.idSentence && (
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

      {/* WORD MATCH */}
      {item.idWordPair && (
        <Card>
          <h2>Combine as palavras:</h2>

          <div style={{ display: 'flex', gap: 20, marginTop: 20 }}>
            <div>
              <strong>Português</strong>
              <Option onClick={() => setMatched({ ...matched, pt: item.portuguese })}>
                {item.portuguese}
              </Option>
            </div>

            <div>
              <strong>Inglês</strong>
              <Option onClick={() => setMatched({ ...matched, en: item.english })}>
                {item.english}
              </Option>
            </div>
          </div>

          <Button
                text='Confirmar'
                height='45px'
                width='130px'
                background='#4caf50'
                color='#fff'
                borderColor='#4caf50'
                onClick={() =>
                    matched.pt === item.portuguese && matched.en === item.english
                    ? handleCorrect()
                    : handleWrong()
                }
                />

        </Card>
      )}
    </Container>
  )
}
