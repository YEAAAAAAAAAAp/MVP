import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import InfiniteCarousel from '../components/common/InfiniteCarousel'
import AIMatchingLoader from '../components/common/AIMatchingLoader'
import AIMatchModal from '../components/common/AIMatchModal'
import SearchBar from '../components/common/SearchBar'
import { useAuthStore } from '../store/authStore'
import { Artwork } from '../types'
import { mockArtworks } from '../utils/mockData'
import { getAIArtRecommendation, UserPreferences } from '../services/geminiService'

const HomePage: React.FC = () => {
  const [showAIModal, setShowAIModal] = useState(false)
  const [showAILoader, setShowAILoader] = useState(false)
  const navigate = useNavigate()
  const { user } = useAuthStore()

  const handleArtworkClick = (artwork: Artwork) => {
    // 작품 상세 페이지로 이동
    navigate(`/artwork/${artwork.id}`)
  }

  const handleAIMatchClick = () => {
    // 모달 열기
    setShowAIModal(true)
  }

  const handleAIMatchSubmit = async (preferences: UserPreferences) => {
    setShowAILoader(true)
    
    try {
      // Gemini API 호출 (사용자 취향 전달)
      const recommendation = await getAIArtRecommendation(preferences)
      console.log('AI 추천 결과:', recommendation)
      
      // AI 추천 결과로 작품 페이지 이동 (3초 후)
      setTimeout(() => {
        setShowAILoader(false)
        navigate(`/artwork/${recommendation.artworkId}`, {
          state: { aiRecommendation: recommendation }
        })
      }, 3000)
    } catch (error) {
      console.error('AI 매칭 오류:', error)
      // 오류 발생 시 랜덤 작품으로 이동
      setTimeout(() => {
        setShowAILoader(false)
        const randomArtwork = mockArtworks[Math.floor(Math.random() * mockArtworks.length)]
        navigate(`/artwork/${randomArtwork.id}`)
      }, 3000)
    }
  }

  const handleSearch = (query: string) => {
    // TODO: 실제 검색 기능 구현
    console.log('검색어:', query)
    alert(`"${query}" 검색 기능은 준비중입니다.`)
  }

  const handleScrollToCarousel = () => {
    const carouselSection = document.querySelector('section.py-10.pb-\\[40px\\]')
    if (carouselSection) {
      const yOffset = -100; // 위쪽 여백 (100px 위로)
      const y = carouselSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-200 relative">
        <section className="text-center px-5 pb-0 bg-white min-h-[30vh] flex flex-col justify-center">
          <h1 className="text-8xl max-md:text-5xl font-black text-gray-900 mb-8 tracking-tight">
            ARTRA
          </h1>
          <h2 className="text-3xl max-md:text-2xl text-slate-500 font-light m-0 tracking-[0.375rem] max-md:tracking-[0.1875rem]">
            FIND YOUR OWN ART
          </h2>
        </section>

        {/* 검색바 섹션 */}
        <section className="bg-white pt-0 pb-4">
          <SearchBar onSearch={handleSearch} />
        </section>

        <section className="py-10 pb-[40px] bg-transparent min-h-[100vh]">
          <InfiniteCarousel
            artworks={mockArtworks}
            onArtworkClick={handleArtworkClick}
            onAIMatchClick={handleAIMatchClick}
          />
        </section>
      </div>

      {/* 로그인하지 않은 경우: 아티스트 등록 유도 버튼 */}
      {!user && (
        <button 
          onClick={() => navigate('/artist/register')}
          className="fixed bottom-10 right-10 max-md:bottom-5 max-md:right-5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white border-none px-6 py-4 max-md:px-5 max-md:py-3 rounded-full text-base max-md:text-sm font-semibold cursor-pointer transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 active:-translate-y-0.5 z-[100] whitespace-nowrap"
        >
          아티스트인가요?
        </button>
      )}

      {/* 콜렉터로 로그인한 경우: AI 매칭 버튼 */}
      {user && user.type === 'collector' && (
        <button 
          onClick={handleScrollToCarousel}
          className="fixed bottom-10 right-10 max-md:bottom-5 max-md:right-5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white border-none px-6 py-4 max-md:px-5 max-md:py-3 rounded-full text-base max-md:text-sm font-semibold cursor-pointer transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 active:-translate-y-0.5 z-[100] whitespace-nowrap"
        >
          🎨 AI로 원하는 스타일의 작품 찾기
        </button>
      )}

      {/* AI 매칭 모달 */}
      <AIMatchModal
        isOpen={showAIModal}
        onClose={() => setShowAIModal(false)}
        onSubmit={handleAIMatchSubmit}
      />

      {/* AI 매칭 로더 */}
      {showAILoader && (
        <AIMatchingLoader />
      )}
    </>
  )
}

export default HomePage