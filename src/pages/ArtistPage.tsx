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
  color: var(--primary-color);
  margin-bottom: var(--spacing-3);
`

const ArtistPage: React.FC = () => {
  return (
    <PageContainer>
      <Title>아티스트 대시보드</Title>
      
      <Section>
        <h2>아티스트를 위한 기능</h2>
        <FeatureList>
          <FeatureItem>
            <FeatureTitle>포트폴리오 최적화</FeatureTitle>
            <p>포트폴리오를 쉽게 제작하고 스토리를 효과적으로 전달할 수 있습니다.</p>
          </FeatureItem>
          <FeatureItem>
            <FeatureTitle>거래 관리</FeatureTitle>
            <p>작품 판매부터 배송까지, 모든 거래 과정을 체계적으로 관리하고 분석할 수 있습니다.</p>
          </FeatureItem>
          <FeatureItem>
            <FeatureTitle>고객 관계 관리</FeatureTitle>
            <p>콜렉터와의 소통을 통해 지속적인 관계를 구축할 수 있습니다.</p>
          </FeatureItem>
        </FeatureList>
      </Section>
    </PageContainer>
  )
}

export default ArtistPage