import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import ArtworkFilter, { FilterOptions } from '../components/collector/ArtworkFilter'
import ArtworkGallery from '../components/collector/ArtworkGallery'
import ChatSidebar from '../components/common/ChatSidebar'
import { mockArtworks, mockArtists } from '../utils/mockData'

const ArtistProfilePage: React.FC = () => {
  const { artistId } = useParams<{ artistId: string }>()
  const [isFollowing, setIsFollowing] = useState(false)
  const [isChatOpen, setIsChatOpen] = useState(false)
  
  // 아티스트 정보 찾기
  const artist = mockArtists.find(a => a.id === artistId)
  
  // 해당 아티스트의 작품 필터링
  const [artistArtworks, setArtistArtworks] = useState(
    mockArtworks.filter(artwork => artwork.artist === artist?.name)
  )

  const handleFilterChange = (filters: FilterOptions) => {
    let filtered = mockArtworks.filter(artwork => artwork.artist === artist?.name)
    
    // 가격 범위 필터링
    if (filters.priceRange !== 'all') {
      if (filters.priceRange === '1000+') {
        filtered = filtered.filter(art => art.price && art.price >= 10000000)
      } else {
        const [minPrice, maxPrice] = filters.priceRange.split('-').map(v => parseInt(v) * 10000)
        filtered = filtered.filter(art => 
          art.price && art.price >= minPrice && art.price <= maxPrice
        )
      }
    }
    
    // 정렬
    if (filters.sortBy === 'price-low') {
      filtered.sort((a, b) => (a.price || 0) - (b.price || 0))
    } else if (filters.sortBy === 'price-high') {
      filtered.sort((a, b) => (b.price || 0) - (a.price || 0))
    }
    
    setArtistArtworks(filtered)
  }

  const handleFollowToggle = () => {
    setIsFollowing(!isFollowing)
  }

  const handleContactArtist = () => {
    setIsChatOpen(true)
  }

  if (!artist) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-600">아티스트를 찾을 수 없습니다.</p>
      </div>
    )
  }

  // Mock 데이터 - 실제로는 API에서 가져올 데이터
  const artistDetails = {
    birthYear: 1985,
    origin: '서울, 대한민국',
    followers: 1247,
    bio: `${artist.name}는 ${artist.genre} 분야에서 활동하는 현대 미술 작가입니다.\n\n독창적인 색감과 독특한 표현 기법으로 주목받고 있으며, 국내외 다양한 전시회에서 작품을 선보이고 있습니다. 작품을 통해 현대 사회의 복잡한 감정과 인간 본연의 아름다움을 탐구합니다.\n\n주요 전시: 서울 현대미술관 개인전(2023), 부산 비엔날레(2022), 뉴욕 아트페어(2021)`
  }

  return (
    <div 
      className="min-h-screen bg-white transition-[padding-right] duration-300 ease-out"
      style={{ paddingRight: isChatOpen && window.innerWidth >= 769 ? '470px' : undefined }}
    >
      <div className="flex">
        {/* 좌측 2/5 영역 - 아티스트 정보 (Sticky) */}
        <div className="w-2/5 sticky top-[73px] h-fit border-r border-gray-200 p-12 bg-white self-start">
          {/* 아티스트 기본 정보 */}
          <div className="mb-8">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              {artist.name}
            </h1>
            <div className="flex items-center gap-4 text-gray-600 mb-6">
              <span className="text-lg">{artistDetails.origin}</span>
              <span className="text-gray-400">•</span>
              <span className="text-lg">b. {artistDetails.birthYear}</span>
            </div>
            
            {/* 팔로우 버튼 & 팔로워 수 */}
            <div className="flex items-center gap-4">
              <button
                onClick={handleContactArtist}
                className="px-8 py-3 rounded-full font-semibold text-sm bg-gradient-to-r from-blue-400 to-cyan-400 text-white hover:from-blue-500 hover:to-cyan-500 transition-all duration-200 shadow-md hover:shadow-lg"
              >
                구매 문의하기
              </button>
              <button
                onClick={handleFollowToggle}
                className={`px-8 py-3 rounded-full font-semibold text-sm transition-all duration-200 ${
                  isFollowing
                    ? 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                    : 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:from-indigo-600 hover:to-purple-700 shadow-lg hover:shadow-xl'
                }`}
              >
                {isFollowing ? '팔로잉' : '팔로우'}
              </button>
              <span className="text-gray-600">
                팔로워 <span className="font-semibold text-gray-900">{artistDetails.followers.toLocaleString()}</span>
              </span>
            </div>
          </div>

          {/* 작가 설명 */}
          <div className="border-t border-gray-200 pt-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">About</h2>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {artistDetails.bio}
            </p>
          </div>

          {/* 장르 태그 */}
          <div className="mt-8">
            <div className="inline-block px-4 py-2 bg-indigo-50 text-indigo-700 rounded-full text-sm font-medium">
              {artist.genre}
            </div>
          </div>
        </div>

        {/* 우측 3/5 영역 - 작품 갤러리 */}
        <div className="w-3/5">
          {/* 필터 영역 */}
          <div className="sticky top-[73px] z-20 bg-white">
            <ArtworkFilter onFilterChange={handleFilterChange} />
          </div>
          
          {/* 작품 갤러리 */}
          <ArtworkGallery artworks={artistArtworks} />
        </div>
      </div>

      {/* 채팅 사이드바 */}
      <ChatSidebar
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        artistName={artist.name}
      />
    </div>
  )
}

export default ArtistProfilePage
