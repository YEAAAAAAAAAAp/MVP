import React from 'react'
import styled, { keyframes } from 'styled-components'
import { Artwork } from '../../types'

interface ArtFrameProps {
  artwork?: Artwork;
  isQuestionMark?: boolean;
  onClick?: () => void;
}

const frameAnimation = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.02); }
  100% { transform: scale(1); }
`

const FrameContainer = styled.div<{ $isHovered?: boolean }>`
  position: relative;
  width: 200px;
  height: 250px;
  margin: 0 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  filter: drop-shadow(0 10px 30px rgba(0, 0, 0, 0.3));
  
  &:hover {
    transform: translateY(-10px);
    animation: ${frameAnimation} 0.6s ease-in-out;
  }
`

const Frame = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, #d4af37, #ffd700, #b8860b);
  border-radius: 15px;
  padding: 15px;
  position: relative;
  
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

const QuestionMark = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  right: 20px;
  bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  font-size: 4rem;
  font-weight: bold;
  border-radius: 4px;
  z-index: 2;
  
  &::before {
    content: '?';
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  }
`

const ArtInfo = styled.div`
  position: absolute;
  bottom: -40px;
  left: 0;
  right: 0;
  text-align: center;
  color: var(--text-primary);
  
  h4 {
    margin: 0 0 5px 0;
    font-size: var(--font-size-sm);
    font-weight: 600;
  }
  
  p {
    margin: 0;
    font-size: var(--font-size-xs);
    color: var(--text-secondary);
  }
`

const ArtFrame: React.FC<ArtFrameProps> = ({ 
  artwork, 
  isQuestionMark = false, 
  onClick 
}) => {
  return (
    <FrameContainer onClick={onClick}>
      <Frame>
        {isQuestionMark ? (
          <QuestionMark />
        ) : (
          <>
            <ArtworkImage 
              src={artwork?.imageUrl || '/placeholder-art.jpg'} 
              alt={artwork?.title || 'Artwork'} 
            />
            <ArtInfo>
              <h4>{artwork?.title || 'Unknown Title'}</h4>
              <p>{artwork?.artist || 'Unknown Artist'}</p>
            </ArtInfo>
          </>
        )}
      </Frame>
    </FrameContainer>
  )
}

export default ArtFrame