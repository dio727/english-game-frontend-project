'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

import Button from '../components/Button'
import UserNameModal from '../components/UserNameModal'

import {
  Container,
  Overlay,
  Content,
  Title,
  ButtonsWrapper
} from './Home.styles'

export default function Home() {
  const [openModal, setOpenModal] = useState(false)
  const router = useRouter()

  return (
    <Container>
      <Overlay />

      <Content>
        <Title>English Game</Title>

        <ButtonsWrapper>
          <Button
            text='Start'
            width='200px'
            height='55px'
            background='#4CAF50'
            color='#fff'
            borderColor='#4CAF50'
            onClick={() => setOpenModal(true)}
          />

          <Button
            text='Ranking'
            width='200px'
            height='55px'
            background='#2196F3'
            color='#fff'
            borderColor='#2196F3'
            onClick={() => router.push('/ranking')}
          />
        </ButtonsWrapper>
      </Content>

      {openModal && <UserNameModal onClose={() => setOpenModal(false)} />}
    </Container>
  )
}
