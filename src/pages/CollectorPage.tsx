import React, { useState } from 'react'
import ArtworkFilter, { FilterOptions } from '../components/collector/ArtworkFilter'
import ArtworkGallery from '../components/collector/ArtworkGallery'
import { mockArtworks } from '../utils/mockData'

const CollectorPage: React.FC = () => {
  const [filteredArtworks, setFilteredArtworks] = useState(mockArtworks)

  const handleFilterChange = (filters: FilterOptions) => {
    // TODO: 실제 필터링 로직 구현
    console.log('필터 변경:', filters)
    
    let filtered = [...mockArtworks]
    
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
      
      {/* 작품 갤러리 */}
      <ArtworkGallery artworks={filteredArtworks} />
    </div>
  )
}

export default CollectorPage