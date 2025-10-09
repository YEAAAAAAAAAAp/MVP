import React from 'react'
import FeaturedArtists from '../components/artist/FeaturedArtists'
import GenreSection from '../components/artist/GenreSection'
import { artistsByGenre } from '../utils/mockData'

const ArtistPage: React.FC = () => {
  const handleViewMore = (genre: string) => {
    console.log(`${genre} 더보기 클릭`)
    alert(`${genre} 전체 보기 기능은 준비중입니다.`)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Featured Artists 섹션 */}
      <FeaturedArtists artists={artistsByGenre.featured} />

      {/* 미술사조별 섹션들 */}
      <div className="bg-white">
        <GenreSection 
          title="추상화" 
          artists={artistsByGenre.abstract}
          onViewMore={() => handleViewMore('추상화')}
        />
        
        <GenreSection 
          title="인상주의" 
          artists={artistsByGenre.impressionism}
          onViewMore={() => handleViewMore('인상주의')}
        />
        
        <GenreSection 
          title="초현실주의" 
          artists={artistsByGenre.surrealism}
          onViewMore={() => handleViewMore('초현실주의')}
        />
        
        <GenreSection 
          title="현대미술" 
          artists={artistsByGenre.modernArt}
          onViewMore={() => handleViewMore('현대미술')}
        />
        
        <GenreSection 
          title="팝아트" 
          artists={artistsByGenre.popArt}
          onViewMore={() => handleViewMore('팝아트')}
        />
        
        <GenreSection 
          title="미니멀리즘" 
          artists={artistsByGenre.minimalism}
          onViewMore={() => handleViewMore('미니멀리즘')}
        />
        
        <GenreSection 
          title="표현주의" 
          artists={artistsByGenre.expressionism}
          onViewMore={() => handleViewMore('표현주의')}
        />
        
        <GenreSection 
          title="컨템포러리" 
          artists={artistsByGenre.contemporary}
          onViewMore={() => handleViewMore('컨템포러리')}
        />
      </div>
    </div>
  )
}

export default ArtistPage