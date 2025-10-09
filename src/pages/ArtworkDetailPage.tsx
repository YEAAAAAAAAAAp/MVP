import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { mockArtworks } from '../utils/mockData'

const PageContainer = styled.div`
  min-height: 100vh;
  background: #f8fafc;
  padding: 40px 20px;
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

const ArtworkDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  
  const artwork = mockArtworks.find(art => art.id === id)
  
  if (!artwork) {
    return <div>작품을 찾을 수 없습니다.</div>
  }

  const handleContactArtist = () => {
    navigate(`/contact/${artwork.artist}`)
  }

  const handlePurchase = () => {
    navigate(`/purchase/${artwork.id}`)
  }

  return (
    <PageContainer>
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
            <PrimaryButton onClick={handlePurchase}>
              가격정보 알아보기
            </PrimaryButton>
            <SecondaryButton onClick={handleContactArtist}>
              작가에게 물어보기
            </SecondaryButton>
          </ActionButtons>
        </InfoSection>
      </ContentWrapper>
    </PageContainer>
  )
}

export default ArtworkDetailPage