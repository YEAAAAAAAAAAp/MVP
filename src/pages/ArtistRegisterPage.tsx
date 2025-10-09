import React from 'react'
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

const ArtistRegisterPage: React.FC = () => {
  return (
    <Container>
      <Title>아티스트 등록</Title>
      <p>아티스트 등록 폼은 이후 구현합니다.</p>
    </Container>
  )
}

export default ArtistRegisterPage