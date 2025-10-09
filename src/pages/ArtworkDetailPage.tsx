import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { mockArtworks } from '../utils/mockData'
import ChatSidebar from '../components/common/ChatSidebar'

const PageContainer = styled.div<{ $chatOpen: boolean }>`
  min-height: 100vh;
  background: #f8fafc;
  padding: 40px 20px;
  transition: padding-right 0.3s ease-out;
  
  @media (min-width: 769px) {
    padding-right: ${props => props.$chatOpen ? '470px' : '20px'};
  }
`

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: start;
  
  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    gap: 40px;
  }
`

const ImageSection = styled.div`
  position: sticky;
  top: 40px;
`

const ArtworkFrame = styled.div`
  background: linear-gradient(45deg, #d4af37, #ffd700, #b8860b);
  border-radius: 20px;
  padding: 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  
  &::before {
    content: '';
    display: block;
    padding-bottom: 125%; /* 4:5 비율 */
  }
`

const ArtworkImage = styled.img`
  position: absolute;
  top: 30px;
  left: 30px;
  right: 30px;
  bottom: 30px;
  width: calc(100% - 60px);
  height: calc(100% - 60px);
  object-fit: cover;
  border-radius: 8px;
`

const InfoSection = styled.div`
  padding: 20px 0;
`

const ArtistInfo = styled.div`
  margin-bottom: 40px;
  
  h1 {
    font-size: 2.5rem;
    color: #1a1a1a;
    margin-bottom: 10px;
    font-weight: 700;
  }
  
  .artist-name {
    font-size: 1.3rem;
    color: #667eea;
    font-weight: 600;
    margin-bottom: 20px;
  }
  
  .price {
    font-size: 2rem;
    color: #1a1a1a;
    font-weight: 700;
    margin-bottom: 30px;
  }
`

const Description = styled.div`
  margin-bottom: 40px;
  
  h3 {
    font-size: 1.2rem;
    color: #1a1a1a;
    margin-bottom: 15px;
    font-weight: 600;
  }
  
  p {
    color: #64748b;
    line-height: 1.7;
    margin-bottom: 15px;
  }
`

const ActionButtons = styled.div`
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
`

const PrimaryButton = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 15px 30px;
  border-radius: 50px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.6);
  }
`

const SecondaryButton = styled.button`
  background: white;
  color: #667eea;
  border: 2px solid #667eea;
  padding: 13px 30px;
  border-radius: 50px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: #667eea;
    color: white;
    transform: translateY(-2px);
  }
`

const BackButton = styled.button`
  background: none;
  border: none;
  color: #64748b;
  font-size: 1rem;
  cursor: pointer;
  margin-bottom: 30px;
  padding: 10px 0;
  transition: color 0.2s ease;
  
  &:hover {
    color: #1a1a1a;
  }
  
  &::before {
    content: '← ';
    margin-right: 5px;
  }
`

const PricingSection = styled.section`
  background: #f8fafc;
  padding: 80px 20px;
  margin-top: 60px;
`

const PricingContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  color: #1a1a1a;
  text-align: center;
  margin-bottom: 60px;
  font-weight: 700;
`

const PricingContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 60px;
  margin-bottom: 60px;
  
  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    gap: 40px;
  }
`

const PriceCard = styled.div`
  background: white;
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  text-align: center;
  height: fit-content;
`

const PriceTitle = styled.h3`
  font-size: 1.2rem;
  color: #64748b;
  margin-bottom: 20px;
  font-weight: 600;
`

const MainPrice = styled.div`
  font-size: 3rem;
  color: #1a1a1a;
  font-weight: 700;
  margin-bottom: 30px;
  
  @media (max-width: 768px) {
    font-size: 2.2rem;
  }
`

const PriceNote = styled.div`
  color: #64748b;
  line-height: 1.8;
  font-size: 0.95rem;
`

const InfoTable = styled.div`
  background: white;
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
`

const InfoTitle = styled.h3`
  font-size: 1.5rem;
  color: #1a1a1a;
  margin-bottom: 30px;
  font-weight: 600;
`

const TableContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
`

const InfoRow = styled.div`
  display: grid;
  grid-template-columns: 140px 1fr;
  border-bottom: 1px solid #e5e7eb;
  padding: 15px 0;
  
  &:last-child {
    border-bottom: none;
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 8px;
  }
`

const InfoLabel = styled.div`
  color: #64748b;
  font-weight: 500;
  font-size: 0.95rem;
  display: flex;
  align-items: flex-start;
  padding-top: 2px;
`

const InfoValue = styled.div`
  color: #1a1a1a;
  font-weight: 500;
  line-height: 1.5;
`

const FinalActions = styled.div`
  display: flex;
  gap: 15px;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 20px;
`

const FinalPrimaryButton = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 18px 40px;
  border-radius: 50px;
  font-size: 1.2rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 35px rgba(102, 126, 234, 0.6);
  }
`

const FinalSecondaryButton = styled.button`
  background: white;
  color: #667eea;
  border: 2px solid #667eea;
  padding: 16px 38px;
  border-radius: 50px;
  font-size: 1.2rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: #667eea;
    color: white;
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
  }
`

const GuaranteeText = styled.div`
  color: #64748b;
  font-size: 0.95rem;
  font-weight: 500;
`

const ArtworkDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [isChatOpen, setIsChatOpen] = useState(false)
  
  const artwork = mockArtworks.find(art => art.id === id)
  
  if (!artwork) {
    return <div>작품을 찾을 수 없습니다.</div>
  }

  const handleContactArtist = () => {
    setIsChatOpen(true)
  }

  const handlePurchase = () => {
    navigate(`/purchase/${artwork.id}`)
  }

  const handleScrollToPricing = () => {
    const pricingSection = document.getElementById('pricing-section')
    if (pricingSection) {
      pricingSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      })
    }
  }

  return (
    <PageContainer $chatOpen={isChatOpen}>
      <ContentWrapper>
        <ImageSection>
          <BackButton onClick={() => navigate('/')}>
            홈으로 돌아가기
          </BackButton>
          <ArtworkFrame>
            <ArtworkImage src={artwork.imageUrl} alt={artwork.title} />
          </ArtworkFrame>
        </ImageSection>
        
        <InfoSection>
          <ArtistInfo>
            <h1>{artwork.title}</h1>
            <div className="artist-name">{artwork.artist}</div>
            <div className="price">
              ₩ {artwork.price?.toLocaleString()}
            </div>
          </ArtistInfo>
          
          <Description>
            <h3>작품 설명</h3>
            <p>
              시미안의 초상화는 19세기 말 프랑스의 가장 유명한 시미안의 내면을 그림 작품으로 알려져 있다. 
              시미안은 원래 저명한 미술가였으나, 인간의 얼굴이 사회적 가면에 불과하다는 깨달음을 이후 
              초상화의 전통적 개념을 해체하기 시작했다.
            </p>
            <p>
              그는 모델의 외형보다 그들의 욕망, 좌절감, 두려움 같은 심리의 그림자를 그리려 했다. 
              이 작품은 그의 미지막 시기, 광기에 가까운 고독 속에서 완성된 것으로 전해진다. 
              완성 직후 시미안은 세상을 떠났다. 그래서 시미안의 초상화는 단순한 초상이 아니라, 
              한 예술가의 '인간'이라는 존재를 묻까지 추적하다가 미친 한 절벽의 기록으로 평가된다.
            </p>
          </Description>
          
          <ActionButtons>
            <PrimaryButton onClick={handleScrollToPricing}>
              가격정보 알아보기
            </PrimaryButton>
            <SecondaryButton onClick={handleContactArtist}>
              작가에게 물어보기
            </SecondaryButton>
          </ActionButtons>
        </InfoSection>
      </ContentWrapper>
      
      <PricingSection id="pricing-section">
        <PricingContainer>
          <SectionTitle>가격 정보와 거래 과정</SectionTitle>
          
          <PricingContent>
            <PriceCard>
              <PriceTitle>작품 가격</PriceTitle>
              <MainPrice>₩ {artwork.price?.toLocaleString()}</MainPrice>
              <PriceNote>
                • 안전거래를 보장합니다<br/>
                • 진품 인증서 포함<br/>
                • 시장 데이터 기반 적정가격 표시
              </PriceNote>
            </PriceCard>
            
            <InfoTable>
              <InfoTitle>작품 상세 정보</InfoTitle>
              <TableContainer>
                <InfoRow>
                  <InfoLabel>작품명</InfoLabel>
                  <InfoValue>{artwork.title}</InfoValue>
                </InfoRow>
                <InfoRow>
                  <InfoLabel>작가명</InfoLabel>
                  <InfoValue>{artwork.artist}</InfoValue>
                </InfoRow>
                <InfoRow>
                  <InfoLabel>작품 크기 / 재료</InfoLabel>
                  <InfoValue>60x80cm / Oil on canvas</InfoValue>
                </InfoRow>
                <InfoRow>
                  <InfoLabel>등록일 / 거래 상태</InfoLabel>
                  <InfoValue>2025.09.12 / 판매 중</InfoValue>
                </InfoRow>
                <InfoRow>
                  <InfoLabel>희망가(₩)</InfoLabel>
                  <InfoValue>{artwork.price?.toLocaleString()}원</InfoValue>
                </InfoRow>
                <InfoRow>
                  <InfoLabel>설명</InfoLabel>
                  <InfoValue>
                    클럽 시 작가 프로필로 이동<br/>
                    시장 데이터 기반 가이드 표시
                  </InfoValue>
                </InfoRow>
              </TableContainer>
            </InfoTable>
          </PricingContent>
          
          <FinalActions>
            <FinalPrimaryButton onClick={handlePurchase}>
              작품 구매하기
            </FinalPrimaryButton>
            <FinalSecondaryButton onClick={handleContactArtist}>
              작가에게 구매 문의하기
            </FinalSecondaryButton>
          </FinalActions>
          <GuaranteeText>
            🛡️ 안전거래 보장 • 진품 인증 • 전액 환불 보장
          </GuaranteeText>
        </PricingContainer>
      </PricingSection>
      
      <ChatSidebar 
        isOpen={isChatOpen} 
        onClose={() => setIsChatOpen(false)}
        artistName={artwork.artist}
      />
    </PageContainer>
  )
}

export default ArtworkDetailPage