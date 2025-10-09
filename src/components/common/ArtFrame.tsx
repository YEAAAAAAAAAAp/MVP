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
  width: 500px;
  height: 650px;
  margin: 0 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  filter: drop-shadow(0 20px 50px rgba(0, 0, 0, 0.4));
  
  &:hover {
    transform: translateY(-15px);
    animation: ${frameAnimation} 0.6s ease-in-out;
  }
`

const Frame = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, #d4af37, #ffd700, #b8860b);
  border-radius: 20px;
  padding: 25px;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 15px;
    left: 15px;
    right: 15px;
    bottom: 15px;
    background: linear-gradient(45deg, #8b7355, #a0895a);
    border-radius: 12px;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 22px;
    left: 22px;
    right: 22px;
    bottom: 22px;
    background: #2c2c2c;
    border-radius: 6px;
  }
`

const ArtworkImage = styled.img`
  position: absolute;
  top: 35px;
  left: 35px;
  right: 35px;
  bottom: 35px;
  width: calc(100% - 70px);
  height: calc(100% - 70px);
  object-fit: cover;
  border-radius: 6px;
  z-index: 2;
`

const QuestionMark = styled.div`
  position: absolute;
  top: 35px;
  left: 35px;
  right: 35px;
  bottom: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  font-size: 10rem;
  font-weight: bold;
  border-radius: 6px;
  z-index: 2;
  
  &::before {
    content: '?';
    text-shadow: 4px 4px 8px rgba(0, 0, 0, 0.3);
  }
`

const ArtInfo = styled.div`
  position: absolute;
  bottom: -60px;
  left: 0;
  right: 0;
  text-align: center;
  color: var(--text-primary);
  
  h4 {
    margin: 0 0 8px 0;
    font-size: 1.1rem;
    font-weight: 600;
  }
  
  p {
    margin: 0;
    font-size: 0.95rem;
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