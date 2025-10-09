import React, { useState } from 'react'

interface SearchBarProps {
  onSearch?: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (onSearch && searchQuery.trim()) {
      onSearch(searchQuery.trim())
    }
  }

  return (
    <div className="w-full max-w-3xl mx-auto px-5 py-4">
      <form onSubmit={handleSearch} className="relative">
        <div className="relative flex items-center">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="작품명, 작가명으로 검색해보세요..."
            className="w-full px-6 py-4 pr-28 text-lg border-2 border-gray-300 rounded-full outline-none transition-all duration-300 focus:border-indigo-500 focus:shadow-[0_0_0_4px_rgba(102,126,234,0.1)] placeholder:text-gray-400"
          />
          <button
            type="submit"
            className="absolute right-2 px-6 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white border-none rounded-full font-semibold cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
          >
            검색
          </button>
        </div>
        
        {/* 검색 제안 (선택사항) */}
        <div className="mt-4 flex flex-wrap gap-2 justify-center">
          <button
            type="button"
            onClick={() => {
              setSearchQuery('추상화')
              if (onSearch) onSearch('추상화')
            }}
            className="px-4 py-1.5 bg-gray-100 text-gray-700 border-none rounded-full text-sm cursor-pointer transition-all duration-200 hover:bg-gray-200"
          >
            #추상화
          </button>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('풍경화')
              if (onSearch) onSearch('풍경화')
            }}
            className="px-4 py-1.5 bg-gray-100 text-gray-700 border-none rounded-full text-sm cursor-pointer transition-all duration-200 hover:bg-gray-200"
          >
            #풍경화
          </button>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('초상화')
              if (onSearch) onSearch('초상화')
            }}
            className="px-4 py-1.5 bg-gray-100 text-gray-700 border-none rounded-full text-sm cursor-pointer transition-all duration-200 hover:bg-gray-200"
          >
            #초상화
          </button>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('현대미술')
              if (onSearch) onSearch('현대미술')
            }}
            className="px-4 py-1.5 bg-gray-100 text-gray-700 border-none rounded-full text-sm cursor-pointer transition-all duration-200 hover:bg-gray-200"
          >
            #현대미술
          </button>
        </div>
      </form>
    </div>
  )
}

export default SearchBar
