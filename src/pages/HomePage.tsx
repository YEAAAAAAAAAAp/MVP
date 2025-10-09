import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import InfiniteCarousel from '../components/common/InfiniteCarousel'
import AIMatchingLoader from '../components/common/AIMatchingLoader'
import { Artwork } from '../types'
import { mockArtworks } from '../utils/mockData'

const PageContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  position: relative;
`

const HeroSection = styled.section`
  text-align: center;
  padding: 40px 20px 60px;
  background: white;
  min-height: 40vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const MainTitle = styled.h1`
  font-size: 5rem;
  font-weight: 900;
  color: #1a1a1a;
  margin-bottom: 30px;
  letter-spacing: -2px;
  
  @media (max-width: 768px) {
    font-size: 3rem;
  }
`

const Subtitle = styled.h2`
  font-size: 2rem;
  color: #64748b;
  font-weight: 300;
  margin: 0;
  letter-spacing: 6px;
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
    letter-spacing: 3px;
  }
`

const CarouselSection = styled.section`
  padding: 80px 0 120px;
  background: transparent;
  min-height: 120vh;
`

const FloatingArtistButton = styled.button`
  position: fixed;
  bottom: 40px;
  right: 40px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 15px 25px;
  border-radius: 50px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
  z-index: 100;
  white-space: nowrap;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 30px rgba(102, 126, 234, 0.6);
  }
  
  &:active {
    transform: translateY(-1px);
  }
  
  @media (max-width: 768px) {
    bottom: 20px;
    right: 20px;
    padding: 12px 20px;
    font-size: 0.9rem;
  }
`

const HomePage: React.FC = () => {
  const [showAILoader, setShowAILoader] = useState(false)
  const navigate = useNavigate()

  const handleArtworkClick = (artwork: Artwork) => {
    // 작품 상세 페이지로 이동
    navigate(`/artwork/${artwork.id}`)
  }

  const handleAIMatchClick = () => {
    setShowAILoader(true)
  }

  const handleAIMatchComplete = () => {
    setShowAILoader(false)
    // AI 매칭 후 바로 작품 정보 페이지로 이동 (랜덤 작품)
    const randomArtwork = mockArtworks[Math.floor(Math.random() * mockArtworks.length)]
    navigate(`/artwork/${randomArtwork.id}`)
  }

  return (
    <>
      <PageContainer>
        <HeroSection>
          <MainTitle>ARTRA</MainTitle>
          <Subtitle>FIND YOUR OWN ART</Subtitle>
        </HeroSection>

        <CarouselSection>
          <InfiniteCarousel
            artworks={mockArtworks}
            onArtworkClick={handleArtworkClick}
            onAIMatchClick={handleAIMatchClick}
          />
        </CarouselSection>


      </PageContainer>

      <FloatingArtistButton onClick={() => navigate('/artist/register')}>
        작가인가요?
      </FloatingArtistButton>

      {showAILoader && (
        <AIMatchingLoader onComplete={handleAIMatchComplete} />
      )}
    </>
  )
}

export default HomePage