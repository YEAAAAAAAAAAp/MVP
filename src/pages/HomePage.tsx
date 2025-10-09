import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import InfiniteCarousel from '../components/common/InfiniteCarousel'
import AIMatchingLoader from '../components/common/AIMatchingLoader'
import { useAuthStore } from '../store/authStore'
import { Artwork } from '../types'
import { mockArtworks } from '../utils/mockData'

const HomePage: React.FC = () => {
  const [showAILoader, setShowAILoader] = useState(false)
  const navigate = useNavigate()
  const { user } = useAuthStore()

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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-200 relative">
        <section className="text-center py-10 px-5 pb-[60px] bg-white min-h-[40vh] flex flex-col justify-center">
          <h1 className="text-8xl max-md:text-5xl font-black text-gray-900 mb-8 tracking-tight">
            ARTRA
          </h1>
          <h2 className="text-3xl max-md:text-2xl text-slate-500 font-light m-0 tracking-[0.375rem] max-md:tracking-[0.1875rem]">
            FIND YOUR OWN ART
          </h2>
        </section>

        <section className="py-20 pb-[120px] bg-transparent min-h-[120vh]">
          <InfiniteCarousel
            artworks={mockArtworks}
            onArtworkClick={handleArtworkClick}
            onAIMatchClick={handleAIMatchClick}
          />
        </section>
      </div>

      {!user && (
        <button 
          onClick={() => navigate('/artist/register')}
          className="fixed bottom-10 right-10 max-md:bottom-5 max-md:right-5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white border-none px-6 py-4 max-md:px-5 max-md:py-3 rounded-full text-base max-md:text-sm font-semibold cursor-pointer transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 active:-translate-y-0.5 z-[100] whitespace-nowrap"
        >
          아티스트인가요?
        </button>
      )}

      {showAILoader && (
        <AIMatchingLoader onComplete={handleAIMatchComplete} />
      )}
    </>
  )
}

export default HomePage