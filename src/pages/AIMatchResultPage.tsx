import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { mockArtworks } from '../utils/mockData'

const PageContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 60px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const ContentWrapper = styled.div`
  max-width: 1000px;
  width: 100%;
  text-align: center;
`

const Title = styled.h1`
  color: white;
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 20px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
`

const Subtitle = styled.p`
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.2rem;
  margin-bottom: 50px;
  line-height: 1.6;
`

const ArtworkCard = styled.div`
  background: white;
  border-radius: 20px;
  padding: 40px;
  margin-bottom: 40px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 40px;
  align-items: center;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`

const ArtworkFrame = styled.div`
  background: linear-gradient(45deg, #d4af37, #ffd700, #b8860b);
  border-radius: 15px;
  padding: 15px;
  width: 300px;
  height: 350px;
  position: relative;
  margin: 0 auto;
  
  &::before {
    content: '';
    position: absolute;
    top: 8px;
    left: 8px;
    right: 8px;
    bottom: 8px;
    background: linear-gradient(45deg, #8b7355, #a0895a);
    border-radius: 8px;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 12px;
    left: 12px;
    right: 12px;
    bottom: 12px;
    background: #2c2c2c;
    border-radius: 4px;
  }
`

const ArtworkImage = styled.img`
  position: absolute;
  top: 20px;
  left: 20px;
  right: 20px;
  bottom: 20px;
  width: calc(100% - 40px);
  height: calc(100% - 40px);
  object-fit: cover;
  border-radius: 4px;
  z-index: 2;
`

const ArtworkInfo = styled.div`
  text-align: left;
  
  @media (max-width: 768px) {
    text-align: center;
  }
  
  h2 {
    font-size: 2rem;
    color: #1a1a1a;
    margin-bottom: 10px;
    font-weight: 700;
  }
  
  .artist {
    font-size: 1.3rem;
    color: #667eea;
    font-weight: 600;
    margin-bottom: 20px;
  }
  
  .match-reason {
    color: #64748b;
    font-size: 1rem;
    line-height: 1.6;
    margin-bottom: 30px;
  }
  
  .price {
    font-size: 1.8rem;
    color: #1a1a1a;
    font-weight: 700;
    margin-bottom: 20px;
  }
`

const ActionButtons = styled.div`
  display: flex;
  gap: 15px;
  justify-content: center;
  margin-bottom: 40px;
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
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
  padding: 10px 20px;
  border-radius: 25px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
  
  &::before {
    content: '← ';
    margin-right: 5px;
  }
`

const AIMatchResultPage: React.FC = () => {
  const navigate = useNavigate()
  
  // AI가 매칭한 작품 (임시로 첫 번째 작품 사용)
  const matchedArtwork = mockArtworks[0]

  const handleViewDetails = () => {
    navigate(`/artwork/${matchedArtwork.id}`)
  }

  const handleContactArtist = () => {
    navigate(`/contact/${matchedArtwork.artist}`)
  }

  const handleTryAgain = () => {
    navigate('/')
  }

  return (
    <PageContainer>
      <ContentWrapper>
        <BackButton onClick={handleTryAgain}>
          다시 찾아보기
        </BackButton>
        
        <Title>완벽한 매칭을 찾았습니다!</Title>
        <Subtitle>
          당신의 취향을 분석한 결과, 이 작품이 가장 적합합니다
        </Subtitle>
        
        <ArtworkCard>
          <ArtworkFrame>
            <ArtworkImage src={matchedArtwork.imageUrl} alt={matchedArtwork.title} />
          </ArtworkFrame>
          
          <ArtworkInfo>
            <h2>{matchedArtwork.title}</h2>
            <div className="artist">{matchedArtwork.artist}</div>
            <div className="match-reason">
              AI 분석 결과, 당신은 클래식하면서도 현대적인 감각이 조화를 이룬 작품을 선호하시는 것 같습니다. 
              이 작품은 전통적인 기법에 현대적 해석이 더해진 독특한 매력을 가지고 있어 당신의 취향과 95% 일치합니다.
            </div>
            <div className="price">₩ {matchedArtwork.price?.toLocaleString()}</div>
          </ArtworkInfo>
        </ArtworkCard>
        
        <ActionButtons>
          <PrimaryButton onClick={handleViewDetails}>
            작품 자세히 보기
          </PrimaryButton>
          <SecondaryButton onClick={handleContactArtist}>
            작가에게 문의하기
          </SecondaryButton>
        </ActionButtons>
      </ContentWrapper>
    </PageContainer>
  )
}

export default AIMatchResultPage