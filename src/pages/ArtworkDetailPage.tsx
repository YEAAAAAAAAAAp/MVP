import React, { useState } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { mockArtworks, mockArtists } from '../utils/mockData'
import ChatSidebar from '../components/common/ChatSidebar'

interface LocationState {
  aiRecommendation?: {
    artworkId: string
    reason: string
    matchScore: number
  }
}

const ArtworkDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const location = useLocation()
  const [isChatOpen, setIsChatOpen] = useState(false)
  
  const state = location.state as LocationState
  const aiRecommendation = state?.aiRecommendation
  
  const artwork = mockArtworks.find(art => art.id === id)
  
  if (!artwork) {
    return <div>작품을 찾을 수 없습니다.</div>
  }

  // 작가 정보 찾기
  const artist = mockArtists.find(a => a.name === artwork.artist)

  const handleContactArtist = () => {
    setIsChatOpen(true)
  }

  const handlePurchase = () => {
    navigate(`/purchase/${artwork.id}`)
  }

  const handleScrollToPricing = () => {
    const pricingSection = document.getElementById('pricing-section')
    if (pricingSection) {
      pricingSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      })
    }
  }

  return (
    <div 
      className="min-h-screen bg-slate-50 py-10 px-5 transition-[padding-right] duration-300 ease-out"
      style={{ paddingRight: isChatOpen && window.innerWidth >= 769 ? '470px' : undefined }}
    >
      <div className="max-w-[1200px] mx-auto grid grid-cols-2 gap-[60px] items-start max-[968px]:grid-cols-1 max-[968px]:gap-10">
        <div className="sticky top-10">
          <button 
            onClick={() => navigate('/')}
            className="bg-transparent border-0 text-slate-500 text-base cursor-pointer mb-[50px] py-[10px] px-0 transition-colors duration-200 hover:text-[#1a1a1a] before:content-['←_'] before:mr-[5px]"
          >
            홈으로 돌아가기
          </button>
          <div className="bg-gradient-to-br from-[#d4af37] via-[#ffd700] to-[#b8860b] rounded-[20px] p-5 shadow-[0_20px_40px_rgba(0,0,0,0.15)] relative overflow-visible" style={{ paddingTop: '60px', height: '600px' }}>
            <img 
              src={artwork.imageUrl} 
              alt={artwork.title}
              className="absolute -top-[40px] left-[30px] w-[calc(100%-60px)] h-[600px] object-cover rounded-lg z-10 shadow-[0_15px_35px_rgba(0,0,0,0.2)]"
            />
          </div>
        </div>
        
        <div className="py-5">
          {/* AI 추천 배지 */}
          {aiRecommendation && (
            <div className="mb-6 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 border-2 border-indigo-200 rounded-xl">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">🤖</span>
                <span className="text-lg font-bold text-indigo-600">AI 추천 작품</span>
                <span className="ml-auto px-3 py-1 bg-indigo-500 text-white rounded-full text-sm font-semibold">
                  매칭도 {aiRecommendation.matchScore}%
                </span>
              </div>
              <p className="text-gray-700 text-sm leading-relaxed">
                {aiRecommendation.reason}
              </p>
            </div>
          )}

          <div className="mb-10">
            <h1 className="text-[2.5rem] text-[#1a1a1a] mb-[10px] font-bold">{artwork.title}</h1>
            <button
              onClick={() => artist && navigate(`/artist/${artist.id}`)}
              className="text-[1.3rem] text-[#667eea] font-semibold mb-5 bg-transparent border-0 cursor-pointer hover:text-[#5568d3] transition-all duration-200 p-0 hover:translate-x-1"
            >
              {artwork.artist} →
            </button>
            <div className="text-[2rem] text-[#1a1a1a] font-bold mb-[30px]">
              ₩ {artwork.price?.toLocaleString()}
            </div>
          </div>
          
          <div className="mb-10">
            <h3 className="text-[1.2rem] text-[#1a1a1a] mb-[15px] font-semibold">작품 설명</h3>
            <p className="text-slate-500 leading-[1.7] mb-[15px]">
              시미안의 초상화는 19세기 말 프랑스의 가장 유명한 시미안의 내면을 그림 작품으로 알려져 있다. 
              시미안은 원래 저명한 미술가였으나, 인간의 얼굴이 사회적 가면에 불과하다는 깨달음을 이후 
              초상화의 전통적 개념을 해체하기 시작했다.
            </p>
            <p className="text-slate-500 leading-[1.7] mb-[15px]">
              그는 모델의 외형보다 그들의 욕망, 좌절감, 두려움 같은 심리의 그림자를 그리려 했다. 
              이 작품은 그의 미지막 시기, 광기에 가까운 고독 속에서 완성된 것으로 전해진다. 
              완성 직후 시미안은 세상을 떠났다. 그래서 시미안의 초상화는 단순한 초상이 아니라, 
              한 예술가의 '인간'이라는 존재를 묻까지 추적하다가 미친 한 절벽의 기록으로 평가된다.
            </p>
          </div>
          
          <div className="flex gap-[15px] flex-wrap">
            <button 
              onClick={handleScrollToPricing}
              className="bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white border-0 py-[15px] px-[30px] rounded-[50px] text-base font-semibold cursor-pointer transition-all duration-300 shadow-[0_4px_15px_rgba(102,126,234,0.4)] hover:-translate-y-0.5 hover:shadow-[0_8px_25px_rgba(102,126,234,0.6)]"
            >
              가격정보 알아보기
            </button>
            <button 
              onClick={handleContactArtist}
              className="bg-white text-[#667eea] border-2 border-[#667eea] py-[13px] px-[30px] rounded-[50px] text-base font-semibold cursor-pointer transition-all duration-300 hover:bg-[#667eea] hover:text-white hover:-translate-y-0.5"
            >
              아티스트에게 물어보기
            </button>
          </div>
        </div>
      </div>
      
      <section id="pricing-section" className="bg-slate-50 py-20 px-5 mt-[60px]">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="text-[2.5rem] text-[#1a1a1a] text-center mb-[60px] font-bold">가격 정보와 거래 과정</h2>
          
          <div className="grid grid-cols-[1fr_1.5fr] gap-[60px] mb-[60px] max-[968px]:grid-cols-1 max-[968px]:gap-10">
            <div className="bg-white p-10 rounded-[20px] shadow-[0_10px_30px_rgba(0,0,0,0.1)] text-center h-fit">
              <h3 className="text-[1.2rem] text-slate-500 mb-5 font-semibold">작품 가격</h3>
              <div className="text-5xl text-[#1a1a1a] font-bold mb-[30px] max-md:text-[2.2rem]">₩ {artwork.price?.toLocaleString()}</div>
              <div className="text-slate-500 leading-[1.8] text-[0.95rem]">
                • 안전거래를 보장합니다<br/>
                • 진품 인증서 포함<br/>
                • 시장 데이터 기반 적정가격 표시
              </div>
            </div>
            
            <div className="bg-white p-10 rounded-[20px] shadow-[0_10px_30px_rgba(0,0,0,0.1)]">
              <h3 className="text-2xl text-[#1a1a1a] mb-[30px] font-semibold">작품 상세 정보</h3>
              <div className="flex flex-col gap-0">
                <div className="grid grid-cols-[140px_1fr] border-b border-gray-200 py-[15px] max-md:grid-cols-1 max-md:gap-2">
                  <div className="text-slate-500 font-medium text-[0.95rem] flex items-start pt-0.5">작품명</div>
                  <div className="text-[#1a1a1a] font-medium leading-[1.5]">{artwork.title}</div>
                </div>
                <div className="grid grid-cols-[140px_1fr] border-b border-gray-200 py-[15px] max-md:grid-cols-1 max-md:gap-2">
                  <div className="text-slate-500 font-medium text-[0.95rem] flex items-start pt-0.5">아티스트명</div>
                  <div className="text-[#1a1a1a] font-medium leading-[1.5]">{artwork.artist}</div>
                </div>
                <div className="grid grid-cols-[140px_1fr] border-b border-gray-200 py-[15px] max-md:grid-cols-1 max-md:gap-2">
                  <div className="text-slate-500 font-medium text-[0.95rem] flex items-start pt-0.5">작품 크기 / 재료</div>
                  <div className="text-[#1a1a1a] font-medium leading-[1.5]">60x80cm / Oil on canvas</div>
                </div>
                <div className="grid grid-cols-[140px_1fr] border-b border-gray-200 py-[15px] max-md:grid-cols-1 max-md:gap-2">
                  <div className="text-slate-500 font-medium text-[0.95rem] flex items-start pt-0.5">등록일 / 거래 상태</div>
                  <div className="text-[#1a1a1a] font-medium leading-[1.5]">2025.09.12 / 판매 중</div>
                </div>
                <div className="grid grid-cols-[140px_1fr] border-b border-gray-200 py-[15px] max-md:grid-cols-1 max-md:gap-2">
                  <div className="text-slate-500 font-medium text-[0.95rem] flex items-start pt-0.5">희망가(₩)</div>
                  <div className="text-[#1a1a1a] font-medium leading-[1.5]">{artwork.price?.toLocaleString()}원</div>
                </div>
                <div className="grid grid-cols-[140px_1fr] py-[15px] max-md:grid-cols-1 max-md:gap-2">
                  <div className="text-slate-500 font-medium text-[0.95rem] flex items-start pt-0.5">설명</div>
                  <div className="text-[#1a1a1a] font-medium leading-[1.5]">
                    클릭 시 아티스트 프로필로 이동<br/>
                    시장 데이터 기반 가이드 표시
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex gap-[15px] justify-center items-center flex-wrap mb-5">
            <button 
              onClick={handlePurchase}
              className="bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white border-0 py-[18px] px-10 rounded-[50px] text-[1.2rem] font-semibold cursor-pointer transition-all duration-300 shadow-[0_8px_25px_rgba(102,126,234,0.4)] hover:-translate-y-0.5 hover:shadow-[0_12px_35px_rgba(102,126,234,0.6)]"
            >
              작품 구매하기
            </button>
            <button 
              onClick={handleContactArtist}
              className="bg-white text-[#667eea] border-2 border-[#667eea] py-4 px-[38px] rounded-[50px] text-[1.2rem] font-semibold cursor-pointer transition-all duration-300 hover:bg-[#667eea] hover:text-white hover:-translate-y-0.5 hover:shadow-[0_8px_25px_rgba(102,126,234,0.3)]"
            >
              아티스트에게 구매 문의하기
            </button>
          </div>
          <div className="text-slate-500 text-[0.95rem] font-medium text-center">
            🛡️ 안전거래 보장 • 진품 인증 • 전액 환불 보장
          </div>
        </div>
      </section>
      
      <ChatSidebar 
        isOpen={isChatOpen} 
        onClose={() => setIsChatOpen(false)}
        artistName={artwork.artist}
      />
    </div>
  )
}

export default ArtworkDetailPage