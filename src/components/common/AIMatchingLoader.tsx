import React, { useEffect } from 'react'
import styled, { keyframes } from 'styled-components'

interface AIMatchingLoaderProps {
  onComplete: () => void;
}

const fadeIn = keyframes`
  from { opacity: 0; transform: scale(0.8); }
  to { opacity: 1; transform: scale(1); }
`

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
`

const pulse = keyframes`
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.05); opacity: 0.8; }
`

const LoaderContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: ${fadeIn} 0.5s ease-out;
  padding: 0 60px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    padding: 40px 20px;
  }
`

const ContentWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  width: 100%;
  gap: 100px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 60px;
  }
`

const TextSection = styled.div`
  flex: 1;
  text-align: left;
  
  @media (max-width: 768px) {
    text-align: center;
    order: 2;
  }
`

const FrameSection = styled.div`
  flex-shrink: 0;
  
  @media (max-width: 768px) {
    order: 1;
  }
`

const LoaderFrame = styled.div`
  width: 400px;
  height: 480px;
  background: linear-gradient(45deg, #d4af37, #ffd700, #b8860b);
  border-radius: 20px;
  padding: 20px;
  position: relative;
  margin-bottom: 60px;
  animation: ${float} 3s ease-in-out infinite;
  
  &::before {
    content: '';
    position: absolute;
    top: 12px;
    left: 12px;
    right: 12px;
    bottom: 12px;
    background: linear-gradient(45deg, #8b7355, #a0895a);
    border-radius: 12px;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 20px;
    left: 20px;
    right: 20px;
    bottom: 20px;
    background: #f8fafc;
    border-radius: 8px;
  }
`

const LoaderContent = styled.div`
  position: absolute;
  top: 30px;
  left: 30px;
  right: 30px;
  bottom: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: transparent;
  border-radius: 8px;
  z-index: 2;
`

const AIIcon = styled.div`
  width: 120px;
  height: 120px;
  background: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;
  animation: ${pulse} 2s ease-in-out infinite;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  
  &::before {
    content: '🤖';
    font-size: 4rem;
  }
`

const LoadingDots = styled.div`
  display: flex;
  gap: 8px;
  
  .dot {
    width: 12px;
    height: 12px;
    background: #667eea;
    border-radius: 50%;
    animation: ${pulse} 1.5s ease-in-out infinite;
    
    &:nth-child(1) { animation-delay: 0s; }
    &:nth-child(2) { animation-delay: 0.3s; }
    &:nth-child(3) { animation-delay: 0.6s; }
  }
`

const MainText = styled.div`
  color: #1a1a1a;
  
  .main-text {
    font-size: 3rem;
    font-weight: 700;
    line-height: 1.2;
    margin-bottom: 20px;
    letter-spacing: -1px;
    
    @media (max-width: 768px) {
      font-size: 2rem;
    }
  }
  
  .sub-text {
    font-size: 1.2rem;
    color: #64748b;
    line-height: 1.6;
    
    @media (max-width: 768px) {
      font-size: 1rem;
    }
  }
`

const AIMatchingLoader: React.FC<AIMatchingLoaderProps> = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete()
    }, 3000) // 3초 후 완료

    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <LoaderContainer>
      <ContentWrapper>
        <TextSection>
          <MainText>
            <div className="main-text">
              당신에게<br />
              딱 맞는<br />
              그림을<br />
              찾아드립니다
            </div>
          </MainText>
        </TextSection>
        
        <FrameSection>
          <LoaderFrame>
            <LoaderContent>
              <AIIcon />
              <LoadingDots>
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
              </LoadingDots>
            </LoaderContent>
          </LoaderFrame>
        </FrameSection>
      </ContentWrapper>
    </LoaderContainer>
  )
}

export default AIMatchingLoader