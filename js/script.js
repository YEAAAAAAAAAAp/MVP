// DOM 요소들
const artworkCards = document.querySelectorAll('.artwork-card');
const modal = document.getElementById('artworkModal');
const modalClose = document.querySelector('.modal-close');
const modalImage = document.getElementById('modalImage');
const modalTitle = document.getElementById('modalTitle');
const modalArtist = document.getElementById('modalArtist');
const modalMedium = document.getElementById('modalMedium');
const modalPrice = document.getElementById('modalPrice');

// 작품 데이터
const artworksData = [
    {
        id: 1,
        title: "꿈을 키우는 손",
        artist: "김예술",
        verified: true,
        medium: "수채화 • 유화",
        price: "₩500,000",
        image: "assets/images/artwork-1.jpg",
        description: "어린 시절의 순수한 꿈과 희망을 표현한 작품입니다. 섬세한 터치와 따뜻한 색감이 특징입니다."
    },
    {
        id: 2,
        title: "추상의 세계",
        artist: "박창작",
        verified: true,
        medium: "아크릴화",
        price: "₩750,000",
        image: "assets/images/artwork-2.jpg",
        description: "현대적 감각의 추상화로, 역동적인 형태와 대담한 색채가 인상적인 작품입니다."
    },
    {
        id: 3,
        title: "색채의 교향곡",
        artist: "이화가",
        verified: true,
        medium: "혼합 매체",
        price: "₩1,200,000",
        image: "assets/images/artwork-3.jpg",
        description: "다양한 재료를 활용하여 음악적 리듬감을 시각적으로 표현한 독창적인 작품입니다."
    },
    {
        id: 4,
        title: "도시의 흔적",
        artist: "정도시",
        verified: true,
        medium: "디지털 아트",
        price: "₩900,000",
        image: "assets/images/artwork-4.jpg",
        description: "현대 도시의 모습을 디지털 기법으로 재해석한 혁신적인 작품입니다."
    },
    {
        id: 5,
        title: "자연의 리듬",
        artist: "한자연",
        verified: true,
        medium: "조각",
        price: "₩2,100,000",
        image: "assets/images/artwork-5.jpg",
        description: "자연의 생명력과 리듬감을 입체적으로 표현한 조각 작품입니다."
    },
    {
        id: 6,
        title: "현대의 해석",
        artist: "최현대",
        verified: true,
        medium: "설치 미술",
        price: "₩3,500,000",
        image: "assets/images/artwork-6.jpg",
        description: "전통과 현대를 아우르는 설치 미술 작품으로 공간과의 조화를 중시합니다."
    }
];

// 초기화 함수
document.addEventListener('DOMContentLoaded', function() {
    initializeArtworkCards();
    initializeModal();
    initializeSmoothScrolling();
    initializeNavigation();
    initializeAnimations();
    initializePlaceholderImages();
});

// 작품 카드 초기화
function initializeArtworkCards() {
    artworkCards.forEach((card, index) => {
        // 작품 데이터가 있는 경우에만 클릭 이벤트 추가
        if (artworksData[index]) {
            card.addEventListener('click', () => openArtworkModal(artworksData[index]));
            
            // 호버 효과 개선
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-8px)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
            });
        }
    });
}

// 모달 관련 함수들
function initializeModal() {
    // 모달 닫기 이벤트
    modalClose.addEventListener('click', closeArtworkModal);
    
    // 모달 외부 클릭시 닫기
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeArtworkModal();
        }
    });
    
    // ESC 키로 모달 닫기
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            closeArtworkModal();
        }
    });
}

function openArtworkModal(artwork) {
    modalImage.src = artwork.image;
    modalImage.alt = artwork.title;
    modalTitle.textContent = artwork.title;
    modalArtist.innerHTML = `${artwork.artist} ${artwork.verified ? '✓ 검증됨' : ''}`;
    modalMedium.textContent = artwork.medium;
    modalPrice.textContent = artwork.price;
    
    // 설명 추가 (모달에 description 요소가 있다면)
    const modalDescription = document.getElementById('modalDescription');
    if (modalDescription && artwork.description) {
        modalDescription.textContent = artwork.description;
    }
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // 배경 스크롤 방지
    
    // 모달 애니메이션
    const modalContent = modal.querySelector('.modal-content');
    modalContent.style.opacity = '0';
    modalContent.style.transform = 'translateY(-50px) scale(0.9)';
    
    setTimeout(() => {
        modalContent.style.transition = 'all 0.3s ease-out';
        modalContent.style.opacity = '1';
        modalContent.style.transform = 'translateY(-50%) scale(1)';
    }, 10);
}

function closeArtworkModal() {
    const modalContent = modal.querySelector('.modal-content');
    modalContent.style.transition = 'all 0.2s ease-in';
    modalContent.style.opacity = '0';
    modalContent.style.transform = 'translateY(-50%) scale(0.9)';
    
    setTimeout(() => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // 배경 스크롤 복원
    }, 200);
}

// 부드러운 스크롤링
function initializeSmoothScrolling() {
    // 모든 앵커 링크에 부드러운 스크롤 적용
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// 네비게이션 효과
function initializeNavigation() {
    const header = document.querySelector('.header');
    let lastScrollY = window.scrollY;
    
    // 스크롤에 따른 헤더 효과
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        // 헤더 배경 투명도 조절
        if (currentScrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.backdropFilter = 'blur(20px)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
            header.style.boxShadow = 'none';
        }
        
        // 스크롤 방향에 따른 헤더 숨김/표시 (모바일에서만)
        if (window.innerWidth <= 768) {
            if (currentScrollY > lastScrollY && currentScrollY > 200) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }
        }
        
        lastScrollY = currentScrollY;
    });
    
    // 모바일 메뉴 토글 (향후 추가 가능)
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', toggleMobileMenu);
    }
}

// 애니메이션 초기화
function initializeAnimations() {
    // Intersection Observer를 사용한 스크롤 애니메이션
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);
    
    // 애니메이션을 적용할 요소들 관찰
    const animatedElements = document.querySelectorAll(
        '.feature-card, .artwork-card, .artist-card, .section-header'
    );
    
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// 플레이스홀더 이미지 처리
function initializePlaceholderImages() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        // 이미지 로드 실패시 플레이스홀더 표시
        img.addEventListener('error', function() {
            this.style.background = 'linear-gradient(135deg, #f9fafb, #e5e7eb)';
            this.style.display = 'flex';
            this.style.alignItems = 'center';
            this.style.justifyContent = 'center';
            this.style.color = '#6b7280';
            this.style.fontSize = '2rem';
            this.innerHTML = '🎨';
        });
        
        // 이미지 로딩 애니메이션
        img.addEventListener('load', function() {
            this.style.opacity = '0';
            this.style.transition = 'opacity 0.3s ease-in-out';
            setTimeout(() => {
                this.style.opacity = '1';
            }, 100);
        });
    });
}

// 검색 및 필터링 기능 (향후 확장 가능)
function initializeSearch() {
    const searchInput = document.querySelector('.search-input');
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    if (searchInput) {
        searchInput.addEventListener('input', debounce(handleSearch, 300));
    }
    
    filterButtons.forEach(btn => {
        btn.addEventListener('click', handleFilter);
    });
}

function handleSearch(e) {
    const searchTerm = e.target.value.toLowerCase();
    const artworkCards = document.querySelectorAll('.artwork-card');
    
    artworkCards.forEach((card, index) => {
        const artwork = artworksData[index];
        if (artwork) {
            const isMatch = artwork.title.toLowerCase().includes(searchTerm) ||
                           artwork.artist.toLowerCase().includes(searchTerm) ||
                           artwork.medium.toLowerCase().includes(searchTerm);
            
            card.style.display = isMatch ? 'block' : 'none';
        }
    });
}

function handleFilter(e) {
    const filterType = e.target.dataset.filter;
    const artworkCards = document.querySelectorAll('.artwork-card');
    
    // 필터 버튼 활성화 상태 변경
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    e.target.classList.add('active');
    
    // 작품 필터링
    artworkCards.forEach((card, index) => {
        const artwork = artworksData[index];
        if (artwork) {
            const shouldShow = filterType === 'all' || 
                             artwork.medium.toLowerCase().includes(filterType.toLowerCase());
            
            card.style.display = shouldShow ? 'block' : 'none';
        }
    });
}

// 유틸리티 함수
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 모바일 메뉴 토글
function toggleMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    const body = document.body;
    
    navMenu.classList.toggle('active');
    body.classList.toggle('menu-open');
}

// 좋아요 기능
function toggleLike(artworkId) {
    const likedArtworks = JSON.parse(localStorage.getItem('likedArtworks') || '[]');
    const isLiked = likedArtworks.includes(artworkId);
    
    if (isLiked) {
        const index = likedArtworks.indexOf(artworkId);
        likedArtworks.splice(index, 1);
    } else {
        likedArtworks.push(artworkId);
    }
    
    localStorage.setItem('likedArtworks', JSON.stringify(likedArtworks));
    updateLikeButton(artworkId, !isLiked);
    
    return !isLiked;
}

function updateLikeButton(artworkId, isLiked) {
    const likeBtn = document.querySelector(`[data-artwork-id="${artworkId}"] .like-btn`);
    if (likeBtn) {
        likeBtn.textContent = isLiked ? '❤️' : '🤍';
        likeBtn.classList.toggle('liked', isLiked);
    }
}

// 장바구니 기능 (향후 확장)
function addToCart(artworkId) {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    
    if (!cart.includes(artworkId)) {
        cart.push(artworkId);
        localStorage.setItem('cart', JSON.stringify(cart));
        
        // 성공 메시지 표시
        showNotification('작품이 관심 목록에 추가되었습니다!', 'success');
    } else {
        showNotification('이미 관심 목록에 있는 작품입니다.', 'info');
    }
}

// 알림 메시지 표시
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        z-index: 3000;
        transform: translateX(400px);
        transition: transform 0.3s ease-in-out;
    `;
    
    document.body.appendChild(notification);
    
    // 애니메이션
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // 자동 제거
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// 로딩 상태 관리
function showLoading() {
    const loader = document.createElement('div');
    loader.id = 'loading';
    loader.innerHTML = `
        <div class="loader">
            <div class="loader-spinner"></div>
            <p>로딩 중...</p>
        </div>
    `;
    
    loader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(255, 255, 255, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 4000;
    `;
    
    document.body.appendChild(loader);
}

function hideLoading() {
    const loader = document.getElementById('loading');
    if (loader) {
        document.body.removeChild(loader);
    }
}

// 성능 최적화를 위한 이미지 레이지 로딩
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
}

// 윈도우 리사이즈 이벤트 핸들러
window.addEventListener('resize', debounce(() => {
    // 모바일 메뉴 상태 초기화
    if (window.innerWidth > 768) {
        const navMenu = document.querySelector('.nav-menu');
        const body = document.body;
        
        navMenu.classList.remove('active');
        body.classList.remove('menu-open');
        
        // 헤더 위치 초기화
        const header = document.querySelector('.header');
        header.style.transform = 'translateY(0)';
    }
}, 250));

// 페이지 떠나기 전 확인 (개발 중에만 활성화)
// window.addEventListener('beforeunload', function(e) {
//     e.preventDefault();
//     e.returnValue = '';
// });