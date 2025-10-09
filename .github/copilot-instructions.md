# 앱 설명

    현재 개발하려는 앱은 ARTRA 라는 웹 앱으로, 콜렉터와 예술가를 연결하는 앱이야.
    콜렉터는:
    - AI 기반 아티스트의 스토리를 탐색하고, 진품 보장, 가격 정보 제공 및 안심거래로 앱 안에서 안전한 거래를 제공. 또한 아티스트와 내부적으로 직접 소통하는 채팅 기능을 제공하여 맞춤형 견적을 받을 수 있음.

    아티스트는:
    - 포트폴리오 최적화. 포트폴리오를 쉽게 제작하고 스토리를 효과적으로 전달 가능
    - 거래 관리. 작품 판매부터 배송까지, 모든 거래 과정을 체계적으로 관리 및 분석 가능
    - 고객 관계 관리. 콜렉터 소통을 통해 지속적 관계 구축 가능.


# 기술 스택

## Frontend
- **React 18+**: 컴포넌트 기반 UI 라이브러리
- **TypeScript**: 타입 안전성을 위한 정적 타입 언어
- **Vite**: 빠른 빌드 도구 및 개발 서버
- **React Router**: 클라이언트 사이드 라우팅
- **Styled Components** 또는 **CSS Modules**: 컴포넌트 스타일링
- **Zustand** 또는 **React Query**: 상태 관리

## 개발 도구
- **ESLint**: 코드 품질 검사
- **Prettier**: 코드 포맷팅
- **Husky**: Git hooks 관리

# 프로젝트 구조
```
src/
├── components/           # 재사용 가능한 컴포넌트
│   ├── common/          # 공통 컴포넌트
│   ├── collector/       # 콜렉터 관련 컴포넌트
│   └── artist/          # 아티스트 관련 컴포넌트
├── pages/               # 페이지 컴포넌트
├── hooks/               # 커스텀 훅
├── store/               # 상태 관리
├── services/            # API 서비스
├── utils/               # 유틸리티 함수
├── types/               # TypeScript 타입 정의
└── styles/              # 글로벌 스타일
```

# 코딩 스타일 가이드라인

## React/TypeScript
- **함수형 컴포넌트**와 **React Hooks**를 사용합니다
- **TypeScript**를 활용한 타입 안전성을 보장합니다
- 컴포넌트 파일명은 **PascalCase**를 사용합니다 (예: `ArtistProfile.tsx`)
- 커스텀 훅은 **use**로 시작합니다 (예: `useArtistData.ts`)
- Props 인터페이스는 컴포넌트명 + Props로 명명합니다 (예: `ArtistProfileProps`)

## 컴포넌트 구조
```tsx
// 타입 정의
interface ComponentProps {
  // props 타입
}

// 컴포넌트 정의
const Component: React.FC<ComponentProps> = ({ prop1, prop2 }) => {
  // 훅스
  // 로직
  // 렌더링
  return (
    <div>
      {/* JSX */}
    </div>
  );
};

export default Component;
```

## 스타일링
- **CSS-in-JS** (Styled Components) 또는 **CSS Modules** 사용
- 컴포넌트별로 스타일을 분리합니다
- 반응형 디자인을 위한 브레이크포인트를 정의합니다
- CSS 변수를 활용한 일관된 디자인 시스템을 구축합니다

## 상태 관리
- **로컬 상태**: useState, useReducer 사용
- **전역 상태**: Zustand 또는 Context API 사용
- **서버 상태**: React Query 사용 권장

## 폴더 및 파일 네이밍
- 폴더명: **kebab-case** (예: `artist-profile`)
- 컴포넌트 파일: **PascalCase** (예: `ArtistProfile.tsx`)
- 유틸리티/서비스 파일: **camelCase** (예: `apiService.ts`)
- 상수 파일: **UPPER_CASE** (예: `API_ENDPOINTS.ts`)

## 프로젝트 폴더 구조와 역할 분담

### 📁 components/ - UI 컴포넌트만 담당
- **순수 UI 렌더링**에만 집중, 비즈니스 로직 최소화
- **Props를 받아 JSX를 반환**하는 역할만 수행
- 복잡한 상태 관리나 API 호출은 **커스텀 훅으로 분리**
- 컴포넌트당 **100라인 이하** 유지 권장

```tsx
// ❌ 나쁜 예: 컴포넌트에 비즈니스 로직 혼재
const ArtworkCard = ({ artworkId }: Props) => {
  const [artwork, setArtwork] = useState(null);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    // API 호출 로직이 컴포넌트에 있음 (잘못된 구조)
    fetchArtwork(artworkId).then(setArtwork);
  }, [artworkId]);
  
  return <div>{/* 긴 JSX */}</div>;
};

// ✅ 좋은 예: 비즈니스 로직을 훅으로 분리
const ArtworkCard = ({ artworkId }: Props) => {
  const { artwork, loading } = useArtwork(artworkId); // 커스텀 훅 사용
  
  return <div>{/* 간결한 JSX */}</div>;
};
```

### 🎣 hooks/ - 비즈니스 로직과 상태 관리
- **API 호출, 상태 관리, 부수 효과** 처리
- 컴포넌트에서 **복잡한 로직을 분리**하여 재사용성 증대
- **하나의 훅은 하나의 관심사**만 다룸

### 🌐 services/ - 외부 통신 및 데이터 처리
- **API 호출, 데이터 변환, 외부 서비스 연동**
- 순수 함수로 작성하여 **테스트 용이성** 확보

### 🗃️ store/ - 전역 상태 관리
- **여러 컴포넌트에서 공유**하는 상태만 관리
- 로컬 상태는 가능한 **useState나 커스텀 훅**에서 처리

## 코드 구조 원칙

### 컴포넌트 작성 규칙
1. **관심사 분리**: UI 렌더링과 비즈니스 로직 분리
2. **단일 책임**: 한 컴포넌트는 하나의 UI 역할만 담당
3. **작은 크기**: 100라인 이하, 복잡하면 분할
4. **명확한 Props**: 인터페이스로 타입 정의
5. **조건부 렌더링**: 복잡한 조건은 별도 함수로 분리

### 커스텀 훅 작성 규칙
1. **use 접두사** 사용
2. **하나의 관심사**만 다룸 (useAuth, useArtwork 등)
3. **반환값은 객체**로 구조화 (`{ data, loading, error }`)
4. **에러 처리** 포함
5. **메모이제이션** 적절히 활용

### 파일 분할 기준
```tsx
// 컴포넌트가 100라인을 넘으면 분할
// ❌ 큰 컴포넌트
const ArtistDashboard = () => {
  // 150라인의 긴 컴포넌트
};

// ✅ 작은 컴포넌트들로 분할
const ArtistDashboard = () => {
  return (
    <div>
      <DashboardHeader />
      <ArtworkSection />
      <AnalyticsSection />
      <OrderSection />
    </div>
  );
};
```

## 코드 품질 관리
- **ESLint**와 **Prettier** 설정을 준수합니다
- 컴포넌트는 **단일 책임 원칙**을 따릅니다
- **재사용 가능한 컴포넌트**를 우선적으로 개발합니다
- **접근성(a11y)** 가이드라인을 준수합니다
- **성능 최적화**를 위해 React.memo, useMemo, useCallback을 적절히 사용합니다
- **타입 안전성**: any 타입 사용 금지, 모든 Props와 State 타입 정의
- **에러 경계**: 각 페이지와 주요 컴포넌트에 Error Boundary 적용

## 성능 최적화 원칙
1. **불필요한 리렌더링 방지**: React.memo, useMemo, useCallback 활용
2. **코드 스플리팅**: React.lazy로 페이지별 분할 로딩
3. **이미지 최적화**: WebP 포맷, lazy loading 적용
4. **번들 사이즈 관리**: 필요한 라이브러리만 import
5. **메모리 누수 방지**: useEffect cleanup 함수 작성

## Git 컨벤션
- 커밋 메시지는 한국어로 작성합니다
- feat: 새로운 기능
- fix: 버그 수정
- style: 스타일 변경
- refactor: 리팩토링
- docs: 문서 수정

# ARTRA 앱 특별 지침
- **사용자 경험(UX)**을 최우선으로 고려합니다
- **예술가와 콜렉터** 두 사용자 그룹의 니즈를 모두 고려합니다
- **안전한 거래**를 위한 보안 기능을 구현합니다
- **실시간 채팅** 기능을 위한 WebSocket 연결을 고려합니다
- **반응형 디자인**으로 모바일과 데스크톱 모두 지원합니다
- **이미지 최적화**에 특별히 신경씁니다 (예술 작품 이미지)

#