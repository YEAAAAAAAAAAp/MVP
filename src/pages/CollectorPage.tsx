import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import ArtworkFilter, { FilterOptions } from '../components/collector/ArtworkFilter'
import ArtworkGallery from '../components/collector/ArtworkGallery'
import { mockArtworks } from '../utils/mockData'

const CollectorPage: React.FC = () => {
  const location = useLocation()
  const [filteredArtworks, setFilteredArtworks] = useState(mockArtworks)
  const [searchQuery, setSearchQuery] = useState<string>('')

  // 홈에서 검색어와 함께 이동한 경우 처리
  useEffect(() => {
    if (location.state?.searchQuery) {
      const query = location.state.searchQuery as string
      setSearchQuery(query)
      applySearch(query, mockArtworks)
    }
  }, [location.state])

  const applySearch = (query: string, artworks: typeof mockArtworks) => {
    if (!query.trim()) {
      setFilteredArtworks(artworks)
      return artworks
    }

    const lowerQuery = query.toLowerCase()
    const filtered = artworks.filter(art => 
      art.title.toLowerCase().includes(lowerQuery) ||
      art.artist.toLowerCase().includes(lowerQuery) ||
      art.genre?.toLowerCase().includes(lowerQuery)
    )
    
    setFilteredArtworks(filtered)
    return filtered
  }

  const handleFilterChange = (filters: FilterOptions) => {
    console.log('필터 변경:', filters)
    
    let filtered = [...mockArtworks]
    
    // 검색어 필터링 먼저 적용
    if (searchQuery.trim()) {
      filtered = applySearch(searchQuery, filtered)
    }
    
    // 장르 필터링
    if (filters.genre !== 'all') {
      filtered = filtered.filter(art => art.genre === filters.genre)
    }
    
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
    
    setFilteredArtworks(filtered)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* 필터 영역 */}
      <ArtworkFilter 
        onFilterChange={handleFilterChange}
      />
      
      {/* 검색 결과 표시 */}
      {searchQuery && (
        <div className="bg-gray-50 border-b border-gray-200 py-4 px-6">
          <div className="max-w-7xl mx-auto">
            <p className="text-gray-700">
              <span className="font-semibold text-indigo-600">"{searchQuery}"</span> 검색 결과 
              <span className="ml-2 text-gray-500">({filteredArtworks.length}개 작품)</span>
            </p>
          </div>
        </div>
      )}
      
      {/* 작품 갤러리 */}
      <ArtworkGallery artworks={filteredArtworks} />
    </div>
  )
}

export default CollectorPage