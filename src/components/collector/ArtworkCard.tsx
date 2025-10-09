import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Artwork } from '../../types'

interface ArtworkCardProps {
  artwork: Artwork & { gallery?: string };
}

const ArtworkCard: React.FC<ArtworkCardProps> = ({ artwork }) => {
  const navigate = useNavigate()
  const [isLiked, setIsLiked] = useState(false)

  const handleLikeClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsLiked(!isLiked)
  }

  return (
    <div 
      onClick={() => navigate(`/artwork/${artwork.id}`)}
      className="group cursor-pointer mb-10"
    >
      {/* 작품 이미지 */}
      <div className="relative overflow-hidden rounded-lg bg-gray-200 shadow-sm hover:shadow-lg transition-shadow duration-300">
        <img 
          src={artwork.imageUrl} 
          alt={artwork.title}
          className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* 좋아요 버튼 */}
        <button
          onClick={handleLikeClick}
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:scale-110"
        >
          <span className="text-xl leading-none">
            {isLiked ? '❤️' : '🤍'}
          </span>
        </button>
      </div>

      {/* 작품 정보 */}
      <div className="mt-1.5">
        {/* 작가명 */}
        <p className="text-medium font-semibold text-gray-900 truncate leading-none mb-2">
          {artwork.artist}
        </p>
        
        {/* 작품명 */}
        <p className="text-sm text-gray-600 truncate mt-1 italic leading-none mb-2">
          {artwork.title}
        </p>
        
        {/* 갤러리명 */}
        {artwork.gallery && (
          <p className="text-xs text-gray-500 truncate mt-1 leading-none mb-2">
            {artwork.gallery}
          </p>
        )}
        
        {/* 가격 */}
        {artwork.price && (
          <p className="text-medium font-semibold text-gray-900 mt-1 leading-none mb-2">
            ₩{artwork.price.toLocaleString()}
          </p>
        )}
      </div>
    </div>
  )
}

export default ArtworkCard
