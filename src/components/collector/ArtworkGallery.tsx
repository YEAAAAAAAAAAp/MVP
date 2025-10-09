import React from 'react'
import Masonry from 'react-masonry-css'
import ArtworkCard from './ArtworkCard'
import { Artwork } from '../../types'

interface ArtworkGalleryProps {
  artworks: (Artwork & { gallery?: string })[];
}

const ArtworkGallery: React.FC<ArtworkGalleryProps> = ({ artworks }) => {
  const breakpointColumnsObj = {
    default: 6,
    2000: 5,
    1536: 4,
    1280: 3,
    768: 2,
    640: 1
  }

  return (
    <div className="py-4 px-2">
      {/* 작품 수 표시 */}
      <div className="px-1 pb-3">
        <p className="text-sm text-gray-600">
          {artworks.length.toLocaleString()} Artworks
        </p>
      </div>

      {/* Masonry 레이아웃 - Artsy/Pinterest 스타일 */}
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="flex -ml-3 w-auto"
        columnClassName="pl-3 bg-clip-padding"
      >
        {artworks.map((artwork) => (
          <ArtworkCard key={artwork.id} artwork={artwork} />
        ))}
      </Masonry>

      {/* 더 많은 작품이 없을 때 표시 */}
      {artworks.length === 0 && (
        <div className="text-center py-20">
          <p className="text-gray-500 text-lg">
            검색 결과가 없습니다.
          </p>
        </div>
      )}
    </div>
  )
}

export default ArtworkGallery
