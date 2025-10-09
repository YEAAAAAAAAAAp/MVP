import React, { useState, useEffect, useRef } from 'react';

interface ArtworkHoverDescriptionProps {
  description: string;
  title: string;
  artist: string;
  price?: number;
}

const ArtworkHoverDescription: React.FC<ArtworkHoverDescriptionProps> = ({
  description,
  title,
  artist,
  price,
}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [scrollHeight, setScrollHeight] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);
  const [needsScroll, setNeedsScroll] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 컨테이너와 콘텐츠 높이 측정
    if (contentRef.current && containerRef.current) {
      const contentHeight = contentRef.current.scrollHeight;
      const containerHeightValue = containerRef.current.clientHeight;
      
      setScrollHeight(contentHeight);
      setContainerHeight(containerHeightValue);
      
      // 콘텐츠가 컨테이너보다 클 때만 스크롤 필요
      const needsScrolling = contentHeight > containerHeightValue;
      setNeedsScroll(needsScrolling);
      
      // 스크롤이 필요한 경우에만 1초 후 애니메이션 시작
      if (needsScrolling) {
        const timer = setTimeout(() => {
          setIsAnimating(true);
        }, 1000);
        
        return () => clearTimeout(timer);
      }
    }
  }, []);

  // 애니메이션 지속 시간 계산 (텍스트 길이에 비례)
  const animationDuration = Math.max(3, (scrollHeight - containerHeight) / 30);

  return (
    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/85 to-black/70 flex flex-col justify-end p-4 transition-opacity duration-300">
      <div ref={containerRef} className="h-full overflow-hidden relative">
        <div
          ref={contentRef}
          className="text-white transition-transform ease-linear"
          style={{
            transform: isAnimating && needsScroll ? `translateY(-${scrollHeight - containerHeight}px)` : 'translateY(0)',
            transitionDuration: isAnimating && needsScroll ? `${animationDuration}s` : '0s',
          }}
        >
          <div className="mb-3">
            <h3 className="text-lg font-bold text-white mb-1">{title}</h3>
            <p className="text-sm text-gray-300">by {artist}</p>
            {price && (
              <p className="text-md font-semibold text-indigo-300 mt-1">
                ₩{price.toLocaleString()}
              </p>
            )}
          </div>
          <div className="border-t border-white/30 pt-3">
            <p className="text-sm text-gray-100 leading-relaxed whitespace-pre-wrap">
              {description}
            </p>
          </div>
        </div>
      </div>
      
      {/* 하단 페이드 그라데이션 - 스크롤이 필요한 경우에만 표시 */}
      {needsScroll && (
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black to-transparent pointer-events-none" />
      )}
    </div>
  );
};

export default ArtworkHoverDescription;
