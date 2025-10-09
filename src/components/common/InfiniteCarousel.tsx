import React, { useEffect, useState } from 'react'
import { Artwork } from '../../types'
import ArtFrame from './ArtFrame'

interface InfiniteCarouselProps {
  artworks: Artwork[];
  onArtworkClick: (artwork: Artwork) => void;
  onAIMatchClick: () => void;
}

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
    <div className="w-full h-[80vh] min-h-[800px] overflow-hidden relative my-10 before:content-[''] before:absolute before:top-0 before:left-0 before:w-[300px] before:h-full before:z-10 before:pointer-events-none before:bg-gradient-to-r before:from-white before:to-transparent after:content-[''] after:absolute after:top-0 after:right-0 after:w-[300px] after:h-full after:z-10 after:pointer-events-none after:bg-gradient-to-l after:from-white after:to-transparent">
      <div className="flex items-center w-fit animate-scroll hover:[animation-play-state:paused]">
        {displayItems.map((item, index) => (
          <ArtFrame
            key={`${typeof item === 'string' ? 'question' : item.id}-${index}`}
            artwork={typeof item === 'string' ? undefined : item}
            isQuestionMark={item === 'question'}
            onClick={() => handleItemClick(item)}
          />
        ))}
      </div>
    </div>
  )
}

export default InfiniteCarousel