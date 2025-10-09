import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'

interface ChatSidebarProps {
  isOpen: boolean
  onClose: () => void
  artistName: string
}

interface Message {
  id: string
  text: string
  sender: 'user' | 'artist'
  timestamp: Date
}

const Overlay = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.15);
  opacity: ${props => props.$isOpen ? 1 : 0};
  visibility: ${props => props.$isOpen ? 'visible' : 'hidden'};
  transition: opacity 0.3s ease, visibility 0.3s ease;
  z-index: 999;
  pointer-events: ${props => props.$isOpen ? 'auto' : 'none'};
`

const SidebarContainer = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  right: 0;
  width: 450px;
  height: 100vh;
  background: white;
  box-shadow: -4px 0 20px rgba(0, 0, 0, 0.15);
  transform: translateX(${props => props.$isOpen ? '0' : '100%'});
  transition: transform 0.3s ease-out;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  
  @media (max-width: 768px) {
    width: 100%;
  }
`

const Header = styled.div`
  padding: 20px;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
`

const HeaderTitle = styled.div`
  h3 {
    margin: 0 0 5px 0;
    font-size: 1.2rem;
    font-weight: 600;
  }
  
  p {
    margin: 0;
    font-size: 0.9rem;
    opacity: 0.9;
  }
`

const CloseButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 5px;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: background 0.2s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`

const MessagesContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  background: #f8fafc;
`

const MessageBubble = styled.div<{ $sender: 'user' | 'artist' }>`
  display: flex;
  justify-content: ${props => props.$sender === 'user' ? 'flex-end' : 'flex-start'};
  margin-bottom: 15px;
`

const BubbleContent = styled.div<{ $sender: 'user' | 'artist' }>`
  max-width: 70%;
  padding: 12px 16px;
  border-radius: 18px;
  background: ${props => props.$sender === 'user' 
    ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' 
    : 'white'};
  color: ${props => props.$sender === 'user' ? 'white' : '#1a1a1a'};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  word-wrap: break-word;
`

const MessageText = styled.p`
  margin: 0;
  line-height: 1.4;
  font-size: 0.95rem;
`

const Timestamp = styled.span`
  font-size: 0.75rem;
  opacity: 0.7;
  margin-top: 4px;
  display: block;
`

const InputContainer = styled.div`
  padding: 20px;
  border-top: 1px solid #e5e7eb;
  background: white;
`

const InputWrapper = styled.div`
  display: flex;
  gap: 10px;
`

const Input = styled.input`
  flex: 1;
  padding: 12px 16px;
  border: 1px solid #e5e7eb;
  border-radius: 25px;
  font-size: 0.95rem;
  outline: none;
  transition: border-color 0.2s ease;
  
  &:focus {
    border-color: #667eea;
  }
  
  &::placeholder {
    color: #9ca3af;
  }
`

const SendButton = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 50%;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: transform 0.2s ease;
  
  &:hover {
    transform: scale(1.05);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

const WelcomeMessage = styled.div`
  text-align: center;
  padding: 40px 20px;
  color: #64748b;
  
  h4 {
    margin: 0 0 10px 0;
    color: #1a1a1a;
    font-size: 1.1rem;
  }
  
  p {
    margin: 0;
    line-height: 1.6;
    font-size: 0.9rem;
  }
`

const ChatSidebar: React.FC<ChatSidebarProps> = ({ isOpen, onClose, artistName }) => {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // 웰컴 메시지
      setTimeout(() => {
        setMessages([{
          id: '1',
          text: `안녕하세요! ${artistName}입니다. 작품에 대해 궁금하신 점이 있으시면 편하게 물어보세요.`,
          sender: 'artist',
          timestamp: new Date()
        }])
      }, 500)
    }
  }, [isOpen, artistName])

  const handleSend = () => {
    if (!inputValue.trim()) return

    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, newMessage])
    setInputValue('')

    // 자동 응답 시뮬레이션
    setTimeout(() => {
      const artistResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: '메시지를 확인했습니다. 곧 답변 드리겠습니다!',
        sender: 'artist',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, artistResponse])
    }, 1000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <>
      <Overlay $isOpen={isOpen} onClick={onClose} />
      <SidebarContainer $isOpen={isOpen}>
        <Header>
          <HeaderTitle>
            <h3>{artistName}</h3>
            <p>작가와 1:1 채팅</p>
          </HeaderTitle>
          <CloseButton onClick={onClose}>×</CloseButton>
        </Header>

        <MessagesContainer>
          {messages.length === 0 ? (
            <WelcomeMessage>
              <h4>작가와 대화를 시작하세요</h4>
              <p>
                작품에 대한 질문이나<br />
                구매 문의를 자유롭게 해주세요
              </p>
            </WelcomeMessage>
          ) : (
            messages.map(message => (
              <MessageBubble key={message.id} $sender={message.sender}>
                <BubbleContent $sender={message.sender}>
                  <MessageText>{message.text}</MessageText>
                  <Timestamp>{formatTime(message.timestamp)}</Timestamp>
                </BubbleContent>
              </MessageBubble>
            ))
          )}
          <div ref={messagesEndRef} />
        </MessagesContainer>

        <InputContainer>
          <InputWrapper>
            <Input
              type="text"
              placeholder="메시지를 입력하세요..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <SendButton onClick={handleSend} disabled={!inputValue.trim()}>
              ➤
            </SendButton>
          </InputWrapper>
        </InputContainer>
      </SidebarContainer>
    </>
  )
}

export default ChatSidebar