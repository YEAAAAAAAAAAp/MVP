import React from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'

const Container = styled.div`
  max-width: 900px;
  margin: 40px auto;
  padding: 0 20px;
`

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 20px;
`

const ContactArtistPage: React.FC = () => {
  const { artist } = useParams<{ artist: string }>()

  return (
    <Container>
      <Title>작가에게 문의하기</Title>
      <p>대상 작가: {artist}</p>
      <p>채팅 및 문의 기능은 이후 연결합니다.</p>
    </Container>
  )
}

export default ContactArtistPage