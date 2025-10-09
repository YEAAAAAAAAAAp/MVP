import React from 'react'
import { useNavigate } from 'react-router-dom'
import { mockArtworks } from '../utils/mockData'

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
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 py-[60px] px-5 flex flex-col items-center justify-center">
      <div className="max-w-[1000px] w-full text-center">
        <button 
          onClick={handleTryAgain}
          className="bg-white/20 text-white border border-white/30 py-2.5 px-5 rounded-[25px] text-base cursor-pointer transition-all hover:bg-white/30 mb-8 before:content-['←_']"
        >
          다시 찾아보기
        </button>
        
        <h1 className="text-white text-4xl font-bold mb-5 drop-shadow-md">
          완벽한 매칭을 찾았습니다!
        </h1>
        <p className="text-white/90 text-xl mb-[50px] leading-relaxed">
          당신의 취향을 분석한 결과, 이 작품이 가장 적합합니다
        </p>
        
        <div className="bg-white rounded-[20px] p-10 mb-10 shadow-[0_20px_40px_rgba(0,0,0,0.2)] grid grid-cols-[300px_1fr] gap-10 items-center max-md:grid-cols-1 max-md:text-center">
          {/* Artwork Frame */}
          <div className="bg-gradient-to-br from-[#d4af37] via-[#ffd700] to-[#b8860b] rounded-[15px] p-4 w-[300px] h-[350px] relative mx-auto
            before:content-[''] before:absolute before:top-2 before:left-2 before:right-2 before:bottom-2 before:bg-gradient-to-br before:from-[#8b7355] before:to-[#a0895a] before:rounded-lg
            after:content-[''] after:absolute after:top-3 after:left-3 after:right-3 after:bottom-3 after:bg-[#2c2c2c] after:rounded">
            <img 
              src={matchedArtwork.imageUrl} 
              alt={matchedArtwork.title}
              className="absolute top-5 left-5 right-5 bottom-5 w-[calc(100%-40px)] h-[calc(100%-40px)] object-cover rounded z-[2]"
            />
          </div>
          
          <div className="text-left max-md:text-center">
            <h2 className="text-3xl text-gray-900 mb-2 font-bold">{matchedArtwork.title}</h2>
            <div className="text-xl text-indigo-500 font-semibold mb-5">{matchedArtwork.artist}</div>
            <div className="text-slate-500 text-base leading-relaxed mb-8">
              AI 분석 결과, 당신은 클래식하면서도 현대적인 감각이 조화를 이룬 작품을 선호하시는 것 같습니다. 
              이 작품은 전통적인 기법에 현대적 해석이 더해진 독특한 매력을 가지고 있어 당신의 취향과 95% 일치합니다.
            </div>
            <div className="text-3xl font-bold text-gray-900">₩ {matchedArtwork.price?.toLocaleString()}</div>
          </div>
        </div>
        
        <div className="flex gap-4 justify-center mb-10 flex-wrap">
          <button 
            onClick={handleViewDetails}
            className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white border-none py-4 px-8 rounded-full text-base font-semibold cursor-pointer transition-all shadow-md hover:-translate-y-0.5 hover:shadow-lg"
          >
            작품 자세히 보기
          </button>
          <button 
            onClick={handleContactArtist}
            className="bg-white text-indigo-500 border-2 border-indigo-500 py-[13px] px-8 rounded-full text-base font-semibold cursor-pointer transition-all hover:bg-indigo-500 hover:text-white hover:-translate-y-0.5"
          >
            아티스트에게 문의하기
          </button>
        </div>
      </div>
    </div>
  )
}

export default AIMatchResultPage