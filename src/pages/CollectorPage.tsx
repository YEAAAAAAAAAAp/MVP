import React from 'react'
import styled from 'styled-components'

const PageContainer = styled.div`
  padding: var(--spacing-8) var(--spacing-4);
  max-width: var(--wide);
  margin: 0 auto;
`

const Title = styled.h1`
  color: var(--primary-color);
  margin-bottom: var(--spacing-8);
  text-align: center;
`

const Section = styled.section`
  background-color: var(--bg-secondary);
  padding: var(--spacing-8);
  border-radius: var(--radius-xl);
  margin-bottom: var(--spacing-8);
`

const FeatureList = styled.ul`
  list-style: none;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--spacing-6);
  margin: 0;
  padding: 0;
`

const FeatureItem = styled.li`
  background-color: white;
  padding: var(--spacing-6);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow);
`

const FeatureTitle = styled.h3`
  color: var(--secondary-color);
  margin-bottom: var(--spacing-3);
`

const CollectorPage: React.FC = () => {
  return (
    <PageContainer>
      <Title>콜렉터 페이지</Title>
      
      <Section>
        <h2>콜렉터를 위한 기능</h2>
        <FeatureList>
          <FeatureItem>
            <FeatureTitle>AI 기반 작품 탐색</FeatureTitle>
            <p>AI가 추천하는 맞춤형 작품과 아티스트의 스토리를 탐색할 수 있습니다.</p>
          </FeatureItem>
          <FeatureItem>
            <FeatureTitle>진품 보장 거래</FeatureTitle>
            <p>진품 인증과 가격 정보를 제공하여 안심하고 거래할 수 있습니다.</p>
          </FeatureItem>
          <FeatureItem>
            <FeatureTitle>아티스트 직접 소통</FeatureTitle>
            <p>내부 채팅 기능으로 아티스트와 직접 소통하며 맞춤형 견적을 받을 수 있습니다.</p>
          </FeatureItem>
        </FeatureList>
      </Section>
    </PageContainer>
  )
}

export default CollectorPage