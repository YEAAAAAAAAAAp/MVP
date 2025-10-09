import React, { useState } from 'react'

export interface FilterOptions {
  priceRange: string;
  genre: string;
  artist: string;
  sortBy: string;
}

interface ArtworkFilterProps {
  onFilterChange: (filters: FilterOptions) => void;
}

const ArtworkFilter: React.FC<ArtworkFilterProps> = ({ onFilterChange }) => {
  const [filters, setFilters] = useState<FilterOptions>({
    priceRange: 'all',
    genre: 'all',
    artist: 'all',
    sortBy: 'recommended'
  })

  const handleFilterChange = (key: keyof FilterOptions, value: string) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  return (
    <div className="bg-white sticky top-[72px] z-50 border-b border-gray-200">
      {/* 필터 바 */}
      <div className="py-4 px-6">
        <div className="flex justify-between items-center">
          {/* 왼쪽: 필터 버튼들 */}
          <div className="flex gap-3 items-center">
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
              All Filters
            </button>

            <select
              value={filters.genre}
              onChange={(e) => handleFilterChange('genre', e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium bg-white cursor-pointer appearance-none pr-8"
              style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3E%3C/svg%3E")`, backgroundPosition: 'right 0.5rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.5em 1.5em' }}
            >
              <option value="all">장르</option>
              <option value="abstract">추상화</option>
              <option value="impressionism">인상주의</option>
              <option value="surrealism">초현실주의</option>
              <option value="modern">현대미술</option>
              <option value="pop">팝아트</option>
              <option value="minimalism">미니멀리즘</option>
              <option value="expressionism">표현주의</option>
            </select>

            <select
              value={filters.priceRange}
              onChange={(e) => handleFilterChange('priceRange', e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium bg-white cursor-pointer appearance-none pr-8"
              style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3E%3C/svg%3E")`, backgroundPosition: 'right 0.5rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.5em 1.5em' }}
            >
              <option value="all">가격 범위</option>
              <option value="0-100">~100만원</option>
              <option value="100-300">100만원~300만원</option>
              <option value="300-500">300만원~500만원</option>
              <option value="500-1000">500만원~1000만원</option>
              <option value="1000+">1000만원 이상</option>
            </select>
          </div>

          {/* 오른쪽: 정렬 */}
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
            </svg>
            <span className="text-sm text-gray-600 font-medium">Sort:</span>
            <select
              value={filters.sortBy}
              onChange={(e) => handleFilterChange('sortBy', e.target.value)}
              className="text-sm font-medium border-none bg-transparent cursor-pointer focus:outline-none"
            >
              <option value="recommended">Recommended</option>
              <option value="recent">최신순</option>
              <option value="price-low">가격 낮은순</option>
              <option value="price-high">가격 높은순</option>
              <option value="popular">인기순</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ArtworkFilter
