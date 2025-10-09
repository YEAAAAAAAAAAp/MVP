import React, { useEffect, useState } from 'react'

interface AIMatchingLoaderProps {
  // onComplete 제거 - 이제 상태 표시만 담당
}

const AIMatchingLoader: React.FC<AIMatchingLoaderProps> = () => {
  const [status, setStatus] = useState('AI 분석 중...')

  useEffect(() => {
    const updateStatus = async () => {
      // 상태 메시지만 변경 (페이지 이동은 하지 않음)
      setStatus('AI 분석 중...')
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setStatus('취향 파악 중...')
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setStatus('최적의 작품 선정 중...')
    }

    updateStatus()
  }, [])

  return (
    <div className="fixed inset-0 bg-white flex items-center justify-center z-[1000] animate-fadeIn px-[60px] max-md:flex-col max-md:px-10 max-md:py-10">
      <div className="flex items-center justify-between max-w-[1200px] w-full gap-[100px] max-md:flex-col max-md:gap-[60px]">
        {/* Text Section */}
        <div className="flex-1 text-left max-md:text-center max-md:order-2">
          <div className="text-gray-900">
            <div className="text-5xl max-md:text-3xl font-bold leading-tight mb-5 tracking-tight">
              당신에게<br />
              딱 맞는<br />
              그림을<br />
              찾아드립니다
            </div>
            <p className="text-xl text-indigo-600 font-semibold mt-6">{status}</p>
          </div>
        </div>
        
        {/* Frame Section */}
        <div className="flex-shrink-0 max-md:order-1">
          <div className="w-[400px] h-[480px] bg-gradient-to-br from-[#d4af37] via-[#ffd700] to-[#b8860b] rounded-[20px] p-5 relative mb-[60px] animate-float
            before:content-[''] before:absolute before:top-3 before:left-3 before:right-3 before:bottom-3 before:bg-gradient-to-br before:from-[#8b7355] before:to-[#a0895a] before:rounded-xl
            after:content-[''] after:absolute after:top-5 after:left-5 after:right-5 after:bottom-5 after:bg-slate-50 after:rounded-lg">
            
            <div className="absolute top-[30px] left-[30px] right-[30px] bottom-[30px] flex flex-col items-center justify-center bg-transparent rounded-lg z-[2]">
              {/* AI Icon */}
              <div className="w-[120px] h-[120px] bg-white rounded-full flex items-center justify-center mb-8 animate-pulse shadow-lg
                before:content-['🤖'] before:text-6xl">
              </div>
              
              {/* Loading Dots */}
              <div className="flex gap-2">
                <div className="w-3 h-3 bg-indigo-500 rounded-full animate-pulse" style={{animationDelay: '0s'}}></div>
                <div className="w-3 h-3 bg-indigo-500 rounded-full animate-pulse" style={{animationDelay: '0.3s'}}></div>
                <div className="w-3 h-3 bg-indigo-500 rounded-full animate-pulse" style={{animationDelay: '0.6s'}}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AIMatchingLoader