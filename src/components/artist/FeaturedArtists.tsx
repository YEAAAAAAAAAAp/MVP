import React, { useState } from 'react'
import ArtistCard, { ArtistCardData } from './ArtistCard'

interface FeaturedArtistsProps {
  artists: ArtistCardData[];
}

const FeaturedArtists: React.FC<FeaturedArtistsProps> = ({ artists }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const itemsPerPage = 1 // 한 번에 1장씩 이동

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - itemsPerPage))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => 
      Math.min(artists.length - 3, prev + itemsPerPage) // 3개 표시되므로 마지막에서 3번째까지만
    )
  }

  const canGoPrev = currentIndex > 0
  const canGoNext = currentIndex < artists.length - 3

  return (
    <section className="py-16 px-8 bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="w-full">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Featured Artists
          </h2>
          <p className="text-lg text-gray-600">
            주목받는 아티스트들을 만나보세요
          </p>
        </div>

        <div className="relative">
          {/* 이전 버튼 */}
          <button
            onClick={handlePrev}
            disabled={!canGoPrev}
            className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center transition-all duration-300 text-2xl font-bold ${
              canGoPrev 
                ? 'hover:bg-indigo-500 hover:text-white cursor-pointer text-gray-700' 
                : 'cursor-not-allowed text-gray-400'
            }`}
          >
            ‹
          </button>

          {/* 카드 컨테이너 */}
          <div className="overflow-hidden px-8">
            <div 
              className="flex transition-transform duration-500 ease-in-out gap-8"
              style={{ transform: `translateX(-${currentIndex * (100 / 3)}%)` }}
            >
              {artists.map((artist) => (
                <div key={artist.id} className="flex-shrink-0" style={{ width: 'calc(33.333% - 21.33px)' }}>
                  <ArtistCard 
                    artist={artist} 
                    size="large"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* 다음 버튼 */}
          <button
            onClick={handleNext}
            disabled={!canGoNext}
            className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center transition-all duration-300 text-2xl font-bold ${
              canGoNext 
                ? 'hover:bg-indigo-500 hover:text-white cursor-pointer text-gray-700' 
                : 'cursor-not-allowed text-gray-400'
            }`}
          >
            ›
          </button>
        </div>

        {/* 페이지 인디케이터 */}
        <div className="flex justify-center mt-8 gap-2">
          {Array.from({ length: artists.length - 2 }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                currentIndex === idx
                  ? 'bg-indigo-500 w-8'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturedArtists
