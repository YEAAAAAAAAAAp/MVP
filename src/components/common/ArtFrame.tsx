import React from 'react'
import { Artwork } from '../../types'

interface ArtFrameProps {
  artwork?: Artwork;
  isQuestionMark?: boolean;
  onClick?: () => void;
}

const ArtFrame: React.FC<ArtFrameProps> = ({ 
  artwork, 
  isQuestionMark = false, 
  onClick 
}) => {
  return (
    <div 
      onClick={onClick}
      className="relative w-[500px] h-[650px] mx-5 cursor-pointer transition-all duration-300 drop-shadow-[0_20px_50px_rgba(0,0,0,0.4)] hover:-translate-y-4 hover:animate-[frame_0.6s_ease-in-out]"
    >
      <div className="w-full h-full bg-gradient-to-br from-[#d4af37] via-[#ffd700] to-[#b8860b] rounded-[20px] p-[25px] relative
        before:content-[''] before:absolute before:top-[15px] before:left-[15px] before:right-[15px] before:bottom-[15px] before:bg-gradient-to-br before:from-[#8b7355] before:to-[#a0895a] before:rounded-xl
        after:content-[''] after:absolute after:top-[22px] after:left-[22px] after:right-[22px] after:bottom-[22px] after:bg-[#2c2c2c] after:rounded-md"
      >
        {isQuestionMark ? (
          <div className="absolute top-[35px] left-[35px] right-[35px] bottom-[35px] flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600 text-white text-[10rem] font-bold rounded-md z-[2]
            before:content-['?'] before:drop-shadow-[4px_4px_8px_rgba(0,0,0,0.3)]"
          />
        ) : (
          <>
            <img 
              src={artwork?.imageUrl || '/placeholder-art.jpg'} 
              alt={artwork?.title || 'Artwork'}
              className="absolute top-[35px] left-[35px] right-[35px] bottom-[35px] w-[calc(100%-70px)] h-[calc(100%-70px)] object-cover rounded-md z-[2]"
            />
            <div className="absolute -bottom-[80px] left-0 right-0 text-center text-gray-800">
              <h4 className="m-0 mb-2 text-lg font-semibold">
                {artwork?.title || 'Unknown Title'}
              </h4>
              <p className="m-0 text-[0.95rem] text-gray-600">
                {artwork?.artist || 'Unknown Artist'}
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default ArtFrame