import React from 'react'
import ArtistCard, { ArtistCardData } from './ArtistCard'

interface GenreSectionProps {
  title: string;
  artists: ArtistCardData[];
  onViewMore?: () => void;
}

const GenreSection: React.FC<GenreSectionProps> = ({ title, artists, onViewMore }) => {
  // 최대 4개만 표시
  const displayArtists = artists.slice(0, 4)

  return (
    <section className="py-12 px-8">
      <div className="w-full">
        {/* 섹션 헤더 */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">
            {title}
          </h2>
          {onViewMore && (
            <button
              onClick={onViewMore}
              className="text-indigo-500 font-semibold text-lg hover:text-indigo-700 transition-colors duration-200 flex items-center gap-2"
            >
              더보기
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}
        </div>

        {/* 아티스트 카드 그리드 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayArtists.map((artist) => (
            <ArtistCard 
              key={artist.id} 
              artist={artist} 
              size="small"
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default GenreSection
