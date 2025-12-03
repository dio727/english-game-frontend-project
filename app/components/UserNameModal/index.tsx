'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Button from '../Button'

import {
  ModalWrapper,
  ModalBox,
  Title,
  Input,
  Buttons
} from './styles'
import Loading from '../Loading'

export default function UserNameModal({ onClose }: { onClose: () => void }) {
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const router = useRouter()

  async function handleStart() {
  if (!name.trim()) {
    setError('Please enter your name')
    return
  }

  setLoading(true)

  try {
    const response = await fetch('https://maria6571.c44.integrator.host/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userName: name })
    })

    if (!response.ok) {
      setError('Error creating user')
      setLoading(false)
      return
    }

    const userData = await response.json()

    localStorage.setItem('idUser', userData.idUser)
    localStorage.setItem('userName', userData.userName)

    router.push('/game')

  } catch (err) {
    setError('Unexpected error. Try again.')
  } finally {
    setLoading(false)
  }
}

  

  return (
  <>
    {loading ? (
      <Loading />
    ) : (
      <ModalWrapper>
        <ModalBox>
          <Title>Enter your name</Title>

          <Input
            placeholder='Your name...'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          {error && <p style={{ color: 'red' }}>{error}</p>}

          <Buttons>
            <Button
              text='Cancel'
              width='110px'
              height='45px'
              background='#777'
              borderColor='#999'
              color='#fff'
              onClick={onClose}
            />

            <Button
              text="Let's go"
              width='110px'
              height='45px'
              background='#4caf50'
              borderColor='#4caf50'
              color='#fff'
              onClick={handleStart}
            />
          </Buttons>
        </ModalBox>
      </ModalWrapper>
    )}
  </>
)

}
