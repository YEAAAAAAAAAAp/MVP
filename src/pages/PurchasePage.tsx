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

const PurchasePage: React.FC = () => {
  const { id } = useParams<{ id: string }>()

  return (
    <Container>
      <Title>가격정보 및 결제</Title>
      <p>작품 ID: {id}</p>
      <p>가격 상세 및 결제 플로우는 이후 연결합니다.</p>
    </Container>
  )
}

export default PurchasePage