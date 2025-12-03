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

// ---------------- TIPAGENS ----------------
type Question = {
  idQuestion: number
  question: string
  alternatives: string[]
  correctAnswer: string
}

type Sentence = {
  idSentence: number
  sentence: string
  sentencePortuguese: string
  words: string[]
}

type WordPair = {
  idWordPair: number
  portuguese: string
  english: string
}

type Match = { pt: string; en: string; color: string }

type MatchGame = {
  original: WordPair[]
  shuffledPt: string[]
  shuffledEn: string[]
  selectedPt: string | null
  selectedEn: string | null
  currentColor: string | null
  matches: Match[]
}

export default function GamePage() {
  const [data, setData] = useState<any[]>([])
  const [index, setIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [time, setTime] = useState(30)
  const [selectedWords, setSelectedWords] = useState<string[]>([])
  const [matchGame, setMatchGame] = useState<MatchGame | null>(null)
  const [finished, setFinished] = useState(false)

  function color(i: number) {
    const colors = ['#2196f3', '#ffeb3b', '#f44336', '#ffffff', '#4caf50']
    return colors[i % colors.length]
  }

  // ---------------- CARREGAR BACKEND ----------------
  useEffect(() => {
    async function load() {
      const res = await fetch('https://maria6571.c44.integrator.host/start')
      const json = await res.json()
      setData(json)
    }
    load()
  }, [])

  // ---------------- TIMER ----------------
  useEffect(() => {
    if (time <= 0) {
      handleWrong()
      return
    }
    const t = setTimeout(() => setTime(t => t - 1), 1000)
    return () => clearTimeout(t)
  }, [time])

  function restartTimer() {
    setTime(30)
  }

  // ---------------- WORD MATCH: MONTAR JOGO ----------------
  useEffect(() => {
    if (!data.length) return
    if (index !== 3 && index !== 4) return

    // Seleciona lista correta
    const list: WordPair[] = index === 3
      ? (data[3] as WordPair[])
      : (data[4] as WordPair[])

    const shuffledPt = list.map(p => p.portuguese).sort(() => Math.random() - 0.5)
    const shuffledEn = list.map(p => p.english).sort(() => Math.random() - 0.5)

    setMatchGame({
      original: list,
      shuffledPt,
      shuffledEn,
      selectedPt: null,
      selectedEn: null,
      currentColor: null,
      matches: []
    })
  }, [data, index])


  // ---------------- ACERTO / ERRO ----------------
  function handleCorrect() {
    const bonus = Math.floor(time * 2)
    const points = bonus + 100
    setScore(s => s + points)
    toast.success(`✔ Acertou! +${points} pontos 🔥`)
    next()
  }

  function handleWrong() {
    toast.error('❌ Errou! 💀')
    next()
  }

  // ---------------- PRÓXIMA QUESTÃO ----------------
  function next() {
    if (index >= 4) {
      finishGame()
      return
    }

    setIndex(i => i + 1)
    setSelectedWords([])
    restartTimer()
  }

  // ---------------- FINALIZAR ----------------
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

  // ---------------- TELA FINAL ----------------
  if (finished) {
    return (
      <Container>
        <FinalScoreCard>
          <h1>Game Over</h1>
          <h2>{score} points</h2>

          <div style={{ display: 'flex', marginTop: 30, gap: 20 }}>
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

      {/* ---------------- MULTIPLE CHOICE ---------------- */}
      {item.idQuestion && index === 0 && (
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

      {/* ---------------- SENTENCE BUILDER ---------------- */}
      {item.idSentence && index <= 2 && (
        <Card>
          <h2>{item.sentencePortuguese}</h2>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {item.words.map((w: string, i: number) => (
              <WordBox
                key={i}
                onClick={() =>
                  !selectedWords.includes(w) &&
                  setSelectedWords([...selectedWords, w])
                }
              >
                {w}
              </WordBox>
            ))}
          </div>

          <div style={{ marginTop: 20, minHeight: 50 }}>
            {selectedWords.map((w, i) => (
              <WordSelected
                key={i}
                onClick={() =>
                  setSelectedWords(selectedWords.filter(x => x !== w))
                }
              >
                {w}
              </WordSelected>
            ))}
          </div>

          <Button
            text="Confirmar"
            width="130px"
            height="45px"
            background="#4caf50"
            color="#fff"
            borderColor="#4caf50"
            onClick={() =>
              selectedWords.join(' ') === item.sentence.toLowerCase()
                ? handleCorrect()
                : handleWrong()
            }
          />
        </Card>
      )}

      {/* ---------------- WORD MATCH ---------------- */}
      {index >= 3 && matchGame && (
        <Card>
          <h2>Combine as palavras</h2>

          <div style={{ display: 'flex', gap: 40 }}>
            {/* ----------- PT ----------- */}
            <div>
              <strong>Português</strong>
              {matchGame.shuffledPt.map((pt, i) => (
                <Option
                  key={i}
                  style={{
                    background:
                      matchGame.matches.find(m => m.pt === pt)?.color ??
                      (matchGame.selectedPt === pt
                        ? matchGame.currentColor
                        : '#333')
                  }}
                  onClick={() =>
                    setMatchGame(m => ({
                      ...m!,
                      selectedPt: pt,
                      currentColor: color(i)
                    }))
                  }
                >
                  {pt}
                </Option>
              ))}
            </div>

            {/* ----------- EN ----------- */}
            <div>
              <strong>Inglês</strong>
              {matchGame.shuffledEn.map((en, i) => (
                <Option
                  key={i}
                  style={{
                    background:
                      matchGame.matches.find(m => m.en === en)?.color ??
                      (matchGame.selectedEn === en
                        ? matchGame.currentColor
                        : '#333')
                  }}
                  onClick={() =>
                    setMatchGame(m => ({
                      ...m!,
                      selectedEn: en
                    }))
                  }
                >
                  {en}
                </Option>
              ))}
            </div>
          </div>

          {/* ----------- LIGAR ----------- */}
          <Button
            text="Ligar"
            width="130px"
            height="45px"
            background="#2196f3"
            color="#fff"
            borderColor="#2196f3"
            onClick={() => {
              if (!matchGame.selectedPt || !matchGame.selectedEn) return

              setMatchGame(m => ({
                ...m!,
                matches: [
                  ...m!.matches,
                  {
                    pt: m!.selectedPt!,
                    en: m!.selectedEn!,
                    color: m!.currentColor!
                  }
                ],
                selectedPt: null,
                selectedEn: null,
                currentColor: null
              }))
            }}
          />

          {/* ----------- CONFIRMAR ----------- */}
          <Button
            text="Confirmar"
            width="130px"
            height="45px"
            background="#4caf50"
            color="#fff"
            borderColor="#4caf50"
            onClick={() => {
              const correct = matchGame.original.every(pair =>
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
