# Artisty MVP - 아티스트 콜렉터 전용 플랫폼

Artisty의 핵심 기능과 Artsy의 세련된 디자인을 결합한 MVP(Minimum Viable Product)입니다.

## 🎨 주요 특징

### 핵심 기능 (Artisty 기반)
- **AI 기반 스토리 탐색**: 인공지능이 분석한 작품의 숨겨진 스토리와 의미 발견
- **안심 거래**: 검증된 작가와의 안전한 거래 시스템
- **즉시 소통·견적**: 작가와 직접 대화하며 맞춤형 견적 받기

### 디자인 (Artsy 영감)
- 미니멀하고 세련된 UI/UX
- 그리드 기반 레이아웃
- 모던한 타이포그래피
- 인터랙티브한 카드 디자인

## 🛠️ 기술 스택

- **HTML5**: 시맨틱 마크업
- **CSS3**: 
  - CSS Grid & Flexbox
  - CSS Variables (Custom Properties)
  - 반응형 디자인
  - 부드러운 애니메이션
- **JavaScript ES6+**:
  - 모듈화된 코드 구조
  - Intersection Observer API
  - Local Storage 활용
  - 이벤트 위임

## 📱 반응형 디자인

- **Mobile First**: 모바일 우선 설계
- **Breakpoints**:
  - Mobile: < 768px
  - Tablet: 768px - 1024px
  - Desktop: > 1024px

## 🚀 주요 기능

### 1. 작품 갤러리
- 6개의 작품 카드 표시
- 호버 효과와 오버레이
- 모달을 통한 상세 정보 표시
- 작가 검증 상태 표시

### 2. 작가 프로필
- 4명의 주목받는 작가 소개
- 작가별 전문 분야 표시
- 작품 수와 팔로워 수 정보

### 3. 인터랙티브 요소
- 부드러운 스크롤링
- 작품 모달 창
- 애니메이션 효과
- 반응형 네비게이션

### 4. 성능 최적화
- 이미지 레이지 로딩
- CSS 애니메이션 최적화
- 디바운스된 이벤트 핸들링

## 📂 프로젝트 구조

```
MVP/
├── index.html              # 메인 HTML 파일
├── css/
│   └── style.css          # 통합 스타일시트
├── js/
│   └── script.js          # JavaScript 인터랙션
├── assets/
│   └── images/            # 작품 및 작가 이미지
│       ├── artwork-1.jpg  # 꿈을 키우는 손
│       ├── artwork-2.jpg  # 추상의 세계
│       ├── artwork-3.jpg  # 색채의 교향곡
│       ├── artwork-4.jpg  # 도시의 흔적
│       ├── artwork-5.jpg  # 자연의 리듬
│       ├── artwork-6.jpg  # 현대의 해석
│       ├── artist-1.jpg   # 김예술 작가
│       ├── artist-2.jpg   # 박창작 작가
│       ├── artist-3.jpg   # 이화가 작가
│       └── artist-4.jpg   # 정도시 작가
└── README.md              # 프로젝트 문서
```

## 🎯 데이터 구조

### 작품 정보
```javascript
{
  id: 1,
  title: "꿈을 키우는 손",
  artist: "김예술",
  verified: true,
  medium: "수채화 • 유화",
  price: "₩500,000",
  image: "assets/images/artwork-1.jpg",
  description: "어린 시절의 순수한 꿈과 희망을 표현한 작품입니다."
}
```

## 🌟 주요 통계

- **2,500+** 등록된 작가
- **15,000+** 작품 수
- **8,500+** 활성 콜렉터
- **₩12억+** 거래 금액

## 🚀 실행 방법

1. 프로젝트 다운로드
2. `index.html` 파일을 브라우저에서 열기
3. 또는 로컬 서버 실행:
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Python 2
   python -m SimpleHTTPServer 8000
   
   # Node.js (http-server 패키지 필요)
   npx http-server
   ```

## 🔧 향후 개발 계획

### Phase 1: 기본 기능 확장
- [ ] 검색 및 필터링 기능
- [ ] 작품 좋아요/관심 목록
- [ ] 사용자 계정 시스템
- [ ] 작가 팔로우 기능

### Phase 2: 고급 기능
- [ ] AI 기반 작품 추천
- [ ] 실시간 채팅 시스템
- [ ] 결제 시스템 연동
- [ ] 작품 경매 기능

### Phase 3: 최적화 및 확장
- [ ] PWA (Progressive Web App) 구현
- [ ] 다국어 지원
- [ ] 모바일 앱 개발
- [ ] SEO 최적화

## 🎨 디자인 가이드

### 컬러 팔레트
- **Primary**: #000000 (검정)
- **Secondary**: #6366f1 (보라)
- **Accent**: #f59e0b (주황)
- **Text**: #1f2937 (진한 회색)
- **Background**: #ffffff (흰색)

### 타이포그래피
- **Font Family**: Inter, sans-serif
- **Weights**: 300, 400, 500, 600, 700
- **Scale**: 0.75rem ~ 3.75rem

### 간격 시스템
- **Base Unit**: 0.25rem (4px)
- **Scale**: 1x, 2x, 3x, 4x, 5x, 6x, 8x, 10x, 12x, 16x, 20x, 24x

## 📊 성능 지표

- **Lighthouse Score**: 95+ (목표)
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1

## 🤝 기여 가이드

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 라이센스

이 프로젝트는 MIT 라이센스 하에 배포됩니다. 자세한 내용은 `LICENSE` 파일을 참조하세요.

## 👥 팀

- **디자인**: Artsy 영감
- **기능**: Artisty 기반
- **개발**: MVP 구현

## 📞 연락처

프로젝트에 대한 문의사항이나 제안사항이 있으시면 언제든 연락 주세요.

---

**© 2025 Artisty Platform. All rights reserved.**