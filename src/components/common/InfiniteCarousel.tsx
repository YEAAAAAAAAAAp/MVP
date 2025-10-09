import React, { useEffect, useState } from 'react'
import styled, { keyframes } from 'styled-components'
import { Artwork } from '../../types'
import ArtFrame from './ArtFrame'

interface InfiniteCarouselProps {
  artworks: Artwork[];
  onArtworkClick: (artwork: Artwork) => void;
  onAIMatchClick: () => void;
}

const scroll = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
`

const CarouselContainer = styled.div`
  width: 100%;
  height: 80vh;
  min-height: 800px;
  overflow: hidden;
  position: relative;
  margin: 40px 0;
  
  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 0;
    width: 300px;
    height: 100%;
    z-index: 10;
    pointer-events: none;
  }
  
  &::before {
    left: 0;
    background: linear-gradient(to right, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0));
  }
  
  &::after {
    right: 0;
    background: linear-gradient(to left, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0));
  }
`

const CarouselTrack = styled.div<{ $speed: number }>`
  display: flex;
  align-items: center;
  width: fit-content;
  animation: ${scroll} ${props => props.$speed}s linear infinite;
  
  &:hover {
    animation-play-state: paused;
  }
`

const InfiniteCarousel: React.FC<InfiniteCarouselProps> = ({ 
  artworks, 
  onArtworkClick, 
  onAIMatchClick 
}) => {
  const [displayItems, setDisplayItems] = useState<(Artwork | 'question')[]>([])

  useEffect(() => {
    // 작품들과 물음표를 섞어서 배열 생성
    const items: (Artwork | 'question')[] = []
    
    artworks.forEach((artwork, index) => {
      items.push(artwork)
      // 3-4개마다 물음표 삽입
      if ((index + 1) % 3 === 0) {
        items.push('question')
      }
    })
    
    // 무한 스크롤을 위해 배열을 두 번 복제
    const infiniteItems = [...items, ...items, ...items]
    setDisplayItems(infiniteItems)
  }, [artworks])

  const handleItemClick = (item: Artwork | 'question') => {
    if (item === 'question') {
      onAIMatchClick()
    } else {
      onArtworkClick(item)
    }
  }

  return (
    <CarouselContainer>
      <CarouselTrack $speed={120}>
        {displayItems.map((item, index) => (
          <ArtFrame
            key={`${typeof item === 'string' ? 'question' : item.id}-${index}`}
            artwork={typeof item === 'string' ? undefined : item}
            isQuestionMark={item === 'question'}
            onClick={() => handleItemClick(item)}
          />
        ))}
      </CarouselTrack>
    </CarouselContainer>
  )
}

export default InfiniteCarousel