// Artfinder - Premium Art Marketplace

class ArtfinderApp {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.initializeComponents();
        this.animateOnScroll();
        this.optimizePerformance();
    }

    setupEventListeners() {
        // DOM Content Loaded
        document.addEventListener('DOMContentLoaded', () => {
            this.initializeComponents();
        });

        // Window events
        window.addEventListener('resize', this.debounce(() => {
            this.handleResize();
        }, 250));

        window.addEventListener('scroll', this.throttle(() => {
            this.handleScroll();
        }, 16));

        // Mobile Menu Toggle
        const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
        if (mobileMenuToggle) {
            mobileMenuToggle.addEventListener('click', () => {
                this.toggleMobileMenu();
            });
        }

        // Search functionality
        const searchInput = document.querySelector('.search-input');
        const searchBtn = document.querySelector('.search-btn');
        
        if (searchInput) {
            searchInput.addEventListener('input', this.debounce((e) => {
                this.handleSearch(e.target.value);
            }, 300));

            searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.performSearch(e.target.value);
                }
            });
        }

        if (searchBtn) {
            searchBtn.addEventListener('click', () => {
                this.performSearch(searchInput.value);
            });
        }

        // Setup component listeners
        this.setupArtworkCardListeners();
        this.setupCollectionCardListeners();
        this.setupArtistCardListeners();
        this.setupModalListeners();
        this.setupNewsletterListeners();
        this.setupSmoothScrolling();
        this.setupStorytellingTooltips();
        this.setupScrollAnimations();
    }

    initializeComponents() {
        this.initHeader();
        this.initHeroStats();
        this.initArtworkGrid();
        this.initSearchSuggestions();
        this.initImageLazyLoading();
        this.loadDynamicContent();
    }

    // Header functionality
    initHeader() {
        const header = document.querySelector('.header');
        if (!header) return;
        this.updateHeaderOnScroll();
    }

    updateHeaderOnScroll() {
        const header = document.querySelector('.header');
        if (!header) return;

        const scrollY = window.scrollY;
        
        if (scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    // Mobile Menu
    toggleMobileMenu() {
        const navMenu = document.querySelector('.nav-menu');
        const mobileToggle = document.querySelector('.mobile-menu-toggle');
        
        if (!navMenu || !mobileToggle) return;

        const isOpen = navMenu.classList.contains('active');
        
        if (isOpen) {
            navMenu.classList.remove('active');
            mobileToggle.classList.remove('open');
            document.body.style.overflow = '';
        } else {
            navMenu.classList.add('active');
            mobileToggle.classList.add('open');
            document.body.style.overflow = 'hidden';
        }
    }

    // Hero Stats Animation
    initHeroStats() {
        const statNumbers = document.querySelectorAll('.stat-number');
        
        statNumbers.forEach(stat => {
            const finalValue = stat.textContent;
            const numericValue = parseInt(finalValue.replace(/[^\d]/g, ''));
            
            if (numericValue) {
                this.animateCounter(stat, 0, numericValue, 2000, finalValue);
            }
        });
    }

    animateCounter(element, start, end, duration, suffix) {
        const range = end - start;
        const increment = range / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            
            if (current >= end) {
                current = end;
                clearInterval(timer);
            }
            
            const formattedValue = this.formatStatNumber(Math.floor(current));
            element.textContent = formattedValue + suffix.replace(/[\d,]/g, '');
        }, 16);
    }

    formatStatNumber(num) {
        if (num >= 1000) {
            return (num / 1000).toFixed(0) + 'K';
        }
        return num.toLocaleString();
    }

    // Search functionality
    handleSearch(query) {
        if (query.length < 2) {
            this.hideSuggestions();
            return;
        }

        const suggestions = this.generateSearchSuggestions(query);
        this.showSearchSuggestions(suggestions);
    }

    generateSearchSuggestions(query) {
        const mockSuggestions = [
            'Contemporary Art',
            'Abstract Paintings',
            'Digital Art',
            'Photography',
            'Sculpture',
            'Portrait Art',
            'Landscape Paintings',
            'Modern Art',
            'Street Art',
            'Minimalist Art'
        ];

        return mockSuggestions
            .filter(suggestion => 
                suggestion.toLowerCase().includes(query.toLowerCase())
            )
            .slice(0, 5);
    }

    showSearchSuggestions(suggestions) {
        let suggestionsList = document.querySelector('.search-suggestions');
        
        if (!suggestionsList) {
            suggestionsList = document.createElement('div');
            suggestionsList.className = 'search-suggestions';
            document.querySelector('.search-container').appendChild(suggestionsList);
        }

        if (suggestions.length === 0) {
            this.hideSuggestions();
            return;
        }

        suggestionsList.innerHTML = suggestions
            .map(suggestion => `
                <div class="suggestion-item" data-query="${suggestion}">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    ${suggestion}
                </div>
            `)
            .join('');

        suggestionsList.style.display = 'block';

        suggestionsList.querySelectorAll('.suggestion-item').forEach(item => {
            item.addEventListener('click', () => {
                const query = item.getAttribute('data-query');
                this.performSearch(query);
                this.hideSuggestions();
            });
        });
    }

    hideSuggestions() {
        const suggestionsList = document.querySelector('.search-suggestions');
        if (suggestionsList) {
            suggestionsList.style.display = 'none';
        }
    }

    initSearchSuggestions() {
        const style = document.createElement('style');
        style.textContent = `
            .search-suggestions {
                position: absolute;
                top: 100%;
                left: 0;
                right: 0;
                background: white;
                border: 1px solid var(--color-gray-200);
                border-radius: var(--radius-lg);
                box-shadow: var(--shadow-lg);
                z-index: var(--z-dropdown);
                display: none;
                margin-top: 4px;
            }
            .suggestion-item {
                display: flex;
                align-items: center;
                gap: var(--space-3);
                padding: var(--space-3) var(--space-4);
                cursor: pointer;
                font-size: var(--font-size-sm);
                color: var(--color-gray-700);
                transition: background-color var(--transition-fast);
            }
            .suggestion-item:hover {
                background-color: var(--color-gray-50);
            }
            .suggestion-item svg {
                color: var(--color-gray-400);
            }
        `;
        document.head.appendChild(style);
    }

    performSearch(query) {
        if (!query.trim()) return;
        console.log('Searching for:', query);
        this.showNotification(`Searching for: "${query}"`);
        
        const searchInput = document.querySelector('.search-input');
        if (searchInput) {
            searchInput.value = query;
        }
    }

    // Artwork Card Functionality
    setupArtworkCardListeners() {
        const artworkCards = document.querySelectorAll('.artwork-card');
        
        artworkCards.forEach(card => {
            const saveBtn = card.querySelector('.btn-save');
            if (saveBtn) {
                saveBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    this.toggleSaveArtwork(saveBtn);
                });
            }

            const viewBtn = card.querySelector('.btn-view');
            if (viewBtn) {
                viewBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    this.showArtworkModal(card);
                });
            }

            card.addEventListener('click', () => {
                this.showArtworkModal(card);
            });
        });
    }

    toggleSaveArtwork(saveBtn) {
        const isSaved = saveBtn.classList.contains('saved');
        
        if (isSaved) {
            saveBtn.classList.remove('saved');
            saveBtn.innerHTML = `
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2v16z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            `;
            this.showNotification('Artwork removed from saved items');
        } else {
            saveBtn.classList.add('saved');
            saveBtn.innerHTML = `
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2v16z"/>
                </svg>
            `;
            this.showNotification('Artwork saved to your collection');
        }

        saveBtn.style.transform = 'scale(1.2)';
        setTimeout(() => {
            saveBtn.style.transform = 'scale(1)';
        }, 150);
    }

    // Collection Card Functionality
    setupCollectionCardListeners() {
        const collectionCards = document.querySelectorAll('.collection-card');
        
        collectionCards.forEach(card => {
            card.addEventListener('click', () => {
                const title = card.querySelector('h3').textContent;
                this.showNotification(`Opening "${title}" collection`);
            });
        });
    }

    // Artist Card Functionality
    setupArtistCardListeners() {
        const artistCards = document.querySelectorAll('.artist-card');
        
        artistCards.forEach(card => {
            const followBtn = card.querySelector('.btn-follow');
            
            if (followBtn) {
                followBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    this.toggleFollowArtist(followBtn);
                });
            }

            card.addEventListener('click', () => {
                const artistName = card.querySelector('.artist-name').textContent;
                this.showNotification(`Opening ${artistName}'s profile`);
            });
        });
    }

    toggleFollowArtist(followBtn) {
        const isFollowing = followBtn.classList.contains('following');
        
        if (isFollowing) {
            followBtn.classList.remove('following');
            followBtn.textContent = 'Follow';
            this.showNotification('Unfollowed artist');
        } else {
            followBtn.classList.add('following');
            followBtn.textContent = 'Following';
            this.showNotification('Now following artist');
        }

        followBtn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            followBtn.style.transform = 'scale(1)';
        }, 150);
    }

    // Modal Functionality
    setupModalListeners() {
        const modal = document.querySelector('.modal');
        const modalOverlay = document.querySelector('.modal-overlay');
        const modalClose = document.querySelector('.modal-close');

        if (modalClose) {
            modalClose.addEventListener('click', () => {
                this.hideModal();
            });
        }

        if (modalOverlay) {
            modalOverlay.addEventListener('click', () => {
                this.hideModal();
            });
        }

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal && modal.style.display === 'flex') {
                this.hideModal();
            }
        });
    }

    showArtworkModal(artworkCard) {
        const modal = document.querySelector('.modal');
        if (!modal) return;

        const title = artworkCard.querySelector('.artwork-title').textContent;
        const artist = artworkCard.querySelector('.artist-name').textContent;
        const gallery = artworkCard.querySelector('.gallery-name').textContent;
        const price = artworkCard.querySelector('.artwork-price').textContent;
        const story = artworkCard.getAttribute('data-story');

        modal.querySelector('.modal-title').textContent = title;
        modal.querySelector('.modal-artist').textContent = artist;
        modal.querySelector('.modal-gallery').textContent = gallery;
        modal.querySelector('.modal-price').textContent = price;
        
        if (story) {
            modal.querySelector('.modal-description').textContent = story;
        }

        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }

    hideModal() {
        const modal = document.querySelector('.modal');
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = '';
        }
    }

    // Newsletter Functionality
    setupNewsletterListeners() {
        const newsletterForm = document.querySelector('.newsletter-form');
        
        if (newsletterForm) {
            newsletterForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleNewsletterSubscription(e.target);
            });
        }
    }

    handleNewsletterSubscription(form) {
        const emailInput = form.querySelector('input[type="email"]');
        const email = emailInput.value.trim();

        if (!email) {
            this.showNotification('Please enter your email address', 'error');
            return;
        }

        if (!this.isValidEmail(email)) {
            this.showNotification('Please enter a valid email address', 'error');
            return;
        }

        this.showNotification('Successfully subscribed to our newsletter!', 'success');
        emailInput.value = '';
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Smooth Scrolling
    setupSmoothScrolling() {
        const anchorLinks = document.querySelectorAll('a[href^="#"]');
        
        anchorLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                
                if (href === '#') return;
                
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = target.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // Animation on Scroll
    animateOnScroll() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-fade-in-up');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        const sectionsToAnimate = document.querySelectorAll('.section-header, .artwork-card, .collection-card, .artist-card');
        sectionsToAnimate.forEach(section => {
            observer.observe(section);
        });
    }

    // Dynamic Content Loading
    loadDynamicContent() {
        this.loadFeaturedArtworks();
    }

    loadFeaturedArtworks() {
        console.log('Loading featured artworks...');
    }

    // Notification System
    showNotification(message, type = 'info') {
        let notificationContainer = document.querySelector('.notification-container');
        
        if (!notificationContainer) {
            notificationContainer = document.createElement('div');
            notificationContainer.className = 'notification-container';
            document.body.appendChild(notificationContainer);
            
            const style = document.createElement('style');
            style.textContent = `
                .notification-container {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    z-index: var(--z-tooltip);
                    display: flex;
                    flex-direction: column;
                    gap: var(--space-2);
                }

                .notification {
                    padding: var(--space-4) var(--space-6);
                    border-radius: var(--radius-lg);
                    font-size: var(--font-size-sm);
                    font-weight: var(--font-weight-medium);
                    box-shadow: var(--shadow-lg);
                    transform: translateX(100%);
                    transition: transform var(--transition-normal);
                    max-width: 300px;
                }

                .notification.show {
                    transform: translateX(0);
                }

                .notification.info {
                    background-color: var(--color-primary);
                    color: var(--color-secondary);
                }

                .notification.success {
                    background-color: var(--color-success);
                    color: var(--color-secondary);
                }

                .notification.error {
                    background-color: var(--color-error);
                    color: var(--color-secondary);
                }
            `;
            document.head.appendChild(style);
        }

        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        notificationContainer.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }

    // Event Handlers
    handleResize() {
        this.updateHeaderOnScroll();
        this.hideSuggestions();
    }

    handleScroll() {
        this.updateHeaderOnScroll();
        this.hideSuggestions();
    }

    // Image Lazy Loading
    initImageLazyLoading() {
        const images = document.querySelectorAll('img[src]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        
                        // Add loading animation
                        img.style.transition = 'opacity 0.5s ease, transform 0.3s ease';
                        img.style.opacity = '1';
                        img.style.transform = 'scale(1)';
                        
                        // Add error handling
                        img.addEventListener('error', () => {
                            img.style.display = 'none';
                            console.warn('Failed to load image:', img.src);
                        });
                        
                        // Add load success handling
                        img.addEventListener('load', () => {
                            img.classList.add('loaded');
                        });
                        
                        imageObserver.unobserve(img);
                    }
                });
            }, {
                rootMargin: '100px 0px',
                threshold: 0.1
            });

            images.forEach(img => {
                img.style.opacity = '0';
                img.style.transform = 'scale(0.95)';
                imageObserver.observe(img);
            });
        } else {
            // Fallback for older browsers
            images.forEach(img => {
                img.style.opacity = '1';
                img.style.transform = 'scale(1)';
            });
        }
    }

    initializeArtworkGrid() {
        const artworkImages = document.querySelectorAll('.artwork-placeholder');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        imageObserver.unobserve(entry.target);
                    }
                });
            });

            artworkImages.forEach(img => {
                imageObserver.observe(img);
            });
        }
    }

    // Utility Functions
    debounce(func, wait) {
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

    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    // Performance Optimization
    optimizePerformance() {
        this.setupLazyLoading();
        this.setupImageOptimization();
    }

    setupLazyLoading() {
        if ('IntersectionObserver' in window) {
            const lazyImages = document.querySelectorAll('img[data-src]');
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                });
            }, {
                rootMargin: '50px 0px',
                threshold: 0.1
            });

            lazyImages.forEach(img => {
                imageObserver.observe(img);
            });
        }
    }

    setupImageOptimization() {
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            // Add loading="lazy" for better performance
            if (!img.hasAttribute('loading')) {
                img.setAttribute('loading', 'lazy');
            }
            
            // Add error handling
            img.addEventListener('error', () => {
                img.style.display = 'none';
            });
        });
    }

    // Accessibility Enhancements
    setupAccessibility() {
        // Add keyboard navigation support
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-navigation');
            }
        });

        document.addEventListener('mousedown', () => {
            document.body.classList.remove('keyboard-navigation');
        });

        // Add ARIA labels where needed
        const interactiveElements = document.querySelectorAll('button, a, input');
        interactiveElements.forEach(element => {
            if (!element.getAttribute('aria-label') && !element.textContent.trim()) {
                element.setAttribute('aria-label', 'Interactive element');
            }
        });
    }

    // Storytelling Tooltips
    setupStorytellingTooltips() {
        const artworkCards = document.querySelectorAll('.artwork-card[data-story]');
        
        artworkCards.forEach(card => {
            this.setupStorytellingTooltip(card);
        });
    }

    setupStorytellingTooltip(card) {
        const story = card.getAttribute('data-story');
        if (!story) return;

        let tooltip = null;
        let hoverTimeout = null;

        // Mouse enter event
        card.addEventListener('mouseenter', () => {
            // Clear any existing timeout
            if (hoverTimeout) {
                clearTimeout(hoverTimeout);
            }

            // Create tooltip after a short delay for smoother experience
            hoverTimeout = setTimeout(() => {
                if (tooltip) return;

                tooltip = this.createStorytellingTooltip(story);
                const imageContainer = card.querySelector('.artwork-image');
                
                if (imageContainer) {
                    imageContainer.style.position = 'relative';
                    imageContainer.appendChild(tooltip);

                    // Trigger animation with a slight delay
                    requestAnimationFrame(() => {
                        setTimeout(() => {
                            tooltip.classList.add('show');
                            this.startAutoScroll(tooltip);
                        }, 50);
                    });
                }
            }, 200);
        });

        // Mouse leave event
        card.addEventListener('mouseleave', () => {
            // Clear hover timeout
            if (hoverTimeout) {
                clearTimeout(hoverTimeout);
                hoverTimeout = null;
            }

            if (tooltip) {
                this.stopAutoScroll(tooltip);
                tooltip.classList.remove('show');
                setTimeout(() => {
                    if (tooltip && tooltip.parentNode) {
                        tooltip.parentNode.removeChild(tooltip);
                    }
                    tooltip = null;
                }, 500);
            }
        });
    }

    createStorytellingTooltip(story) {
        const tooltip = document.createElement('div');
        tooltip.className = 'storytelling-tooltip';
        
        // Split story into sentences for auto-scrolling
        const sentences = story.split('.').filter(s => s.trim().length > 0);
        
        tooltip.innerHTML = `
            <div class="story-content">
                <div class="story-text-container">
                    <div class="story-text active" data-index="0">${sentences[0] ? sentences[0].trim() + '.' : ''}</div>
                </div>
            </div>
        `;
        
        // Store sentences for auto-scrolling
        tooltip.sentences = sentences;
        tooltip.currentIndex = 0;
        
        return tooltip;
    }

    // Auto-scroll storytelling text
    startAutoScroll(tooltip) {
        if (!tooltip.sentences || tooltip.sentences.length <= 1) return;

        const container = tooltip.querySelector('.story-text-container');
        let currentIndex = 0;
        
        const showNextText = () => {
            if (currentIndex >= tooltip.sentences.length - 1) {
                currentIndex = 0; // Loop back to start
            } else {
                currentIndex++;
            }
            
            const currentText = tooltip.querySelector('.story-text.active');
            if (currentText) {
                currentText.classList.remove('active');
                currentText.classList.add('fade-out');
                
                setTimeout(() => {
                    currentText.textContent = tooltip.sentences[currentIndex].trim() + '.';
                    currentText.classList.remove('fade-out');
                    currentText.classList.add('fade-in');
                    
                    setTimeout(() => {
                        currentText.classList.remove('fade-in');
                        currentText.classList.add('active');
                    }, 300);
                }, 300);
            }
        };

        // Start auto-scroll after initial display
        tooltip.autoScrollInterval = setInterval(showNextText, 3000); // Change every 3 seconds
    }

    stopAutoScroll(tooltip) {
        if (tooltip.autoScrollInterval) {
            clearInterval(tooltip.autoScrollInterval);
            tooltip.autoScrollInterval = null;
        }
    }

    // Scroll Animations
    setupScrollAnimations() {
        const animatedElements = document.querySelectorAll('.artwork-card, .artist-card, .collection-card');
        
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('reveal-animation', 'revealed');
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            });

            animatedElements.forEach(element => {
                element.classList.add('reveal-animation');
                observer.observe(element);
            });
        }
    }

    // Error Handling
    setupErrorHandling() {
        window.addEventListener('error', (event) => {
            console.error('JavaScript Error:', event.error);
            this.showNotification('일시적인 오류가 발생했습니다. 페이지를 새로고침해주세요.', 'error');
        });

        window.addEventListener('unhandledrejection', (event) => {
            console.error('Unhandled Promise Rejection:', event.reason);
            this.showNotification('네트워크 오류가 발생했습니다. 잠시 후 다시 시도해주세요.', 'error');
        });
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ArtfinderApp();
});

// Export for testing purposes
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ArtfinderApp;
}
