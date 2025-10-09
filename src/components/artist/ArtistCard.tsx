import React from 'react'
import { useNavigate } from 'react-router-dom'

export interface ArtistCardData {
  id: string;
  name: string;
  representativeImage: string;
  genre?: string;
}

interface ArtistCardProps {
  artist: ArtistCardData;
  size?: 'small' | 'large';
}

const ArtistCard: React.FC<ArtistCardProps> = ({ artist, size = 'small' }) => {
  const navigate = useNavigate()
  const isLarge = size === 'large'

  return (
    <div 
      className={`relative group cursor-pointer transition-all duration-300 hover:-translate-y-2 ${
        isLarge ? 'w-full' : 'w-full'
      }`}
    >
      {/* 작품 이미지 */}
      <div 
        className={`relative overflow-hidden rounded-2xl bg-gray-200 shadow-lg group-hover:shadow-2xl transition-shadow duration-300 ${
          isLarge ? 'h-[400px]' : 'h-[320px]'
        }`}
      >
        <img 
          src={artist.representativeImage} 
          alt={artist.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* 그라데이션 오버레이 */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* 작가 정보 */}
      <div className="mt-4 flex items-start justify-between gap-4">
        <div className="flex-1">
          <h3 className={`font-bold text-gray-900 mb-1 ${
            isLarge ? 'text-2xl' : 'text-xl'
          }`}>
            {artist.name}
          </h3>
          {artist.genre && (
            <p className="text-sm text-gray-600">
              {artist.genre}
            </p>
          )}
        </div>
        <button
          onClick={() => navigate(`/artist/${artist.id}`)}
          className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-2 px-4 rounded-lg font-semibold text-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 whitespace-nowrap"
        >
          프로필 보기
        </button>
      </div>
    </div>
  )
}

export default ArtistCard
