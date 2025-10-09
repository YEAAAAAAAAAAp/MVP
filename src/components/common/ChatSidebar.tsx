import React, { useState, useRef, useEffect } from 'react'

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
      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-black/15 transition-all duration-300 z-[999] ${
          isOpen ? 'opacity-100 visible pointer-events-auto' : 'opacity-0 invisible pointer-events-none'
        }`}
        onClick={onClose}
      />
      
      {/* Sidebar */}
      <div 
        className={`fixed top-0 right-0 w-[450px] max-md:w-full h-screen bg-white shadow-[-4px_0_20px_rgba(0,0,0,0.15)] transition-transform duration-300 ease-out z-[1000] flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="p-5 border-b border-gray-200 flex justify-between items-center bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
          <div>
            <h3 className="m-0 mb-1 text-xl font-semibold">{artistName}</h3>
            <p className="m-0 text-sm opacity-90">아티스트와 1:1 채팅</p>
          </div>
          <button 
            onClick={onClose}
            className="bg-none border-none text-white text-2xl cursor-pointer p-1 w-8 h-8 flex items-center justify-center rounded-full transition-all hover:bg-white/20"
          >
            ×
          </button>
        </div>

        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto p-5 bg-slate-50">
          {messages.length === 0 ? (
            <div className="text-center py-10 px-5 text-slate-500">
              <h4 className="m-0 mb-2 text-gray-900 text-lg">아티스트와 대화를 시작하세요</h4>
              <p className="m-0 leading-relaxed text-sm">
                작품에 대한 질문이나<br />
                구매 문의를 자유롭게 해주세요
              </p>
            </div>
          ) : (
            messages.map(message => (
              <div 
                key={message.id} 
                className={`flex mb-4 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[70%] px-4 py-3 rounded-[18px] shadow-md break-words ${
                  message.sender === 'user' 
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white' 
                    : 'bg-white text-gray-900'
                }`}>
                  <p className="m-0 leading-snug text-sm">{message.text}</p>
                  <span className="text-xs opacity-70 mt-1 block">
                    {formatTime(message.timestamp)}
                  </span>
                </div>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Container */}
        <div className="p-5 border-t border-gray-200 bg-white">
          <div className="flex gap-2.5">
            <input
              type="text"
              placeholder="메시지를 입력하세요..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1 px-4 py-3 border border-gray-200 rounded-[25px] text-sm outline-none transition-colors focus:border-indigo-500 placeholder:text-gray-400"
            />
            <button 
              onClick={handleSend} 
              disabled={!inputValue.trim()}
              className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white border-none rounded-full w-11 h-11 flex items-center justify-center cursor-pointer transition-transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ➤
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default ChatSidebar