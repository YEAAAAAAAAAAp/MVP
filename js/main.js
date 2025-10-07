// Artisty - Premium Art Commerce Platform
// Main JavaScript functionality

class ArtistyApp {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.initializeComponents();
        this.animateOnScroll();
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
        this.setupAuctionCardListeners();
        this.setupEditorialCardListeners();
        this.setupModalListeners();
        this.setupNewsletterListeners();
        this.setupAuthenticationListeners();
        this.setupSmoothScrolling();
    }

    initializeComponents() {
        this.initHeader();
        this.initHeroStats();
        this.initArtworkGrid();
        this.initSearchSuggestions();
        this.initStorytellingTooltips();
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
        
        if (scrollY > 20) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.borderBottomColor = 'rgba(229, 229, 229, 0.8)';
            header.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.05)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.borderBottomColor = 'var(--color-gray-100)';
            header.style.boxShadow = 'none';
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
            'Korean Artists',
            'Modern Sculpture',
            'Abstract Paintings',
            'Photography',
            'Digital Art',
            'Emerging Artists',
            'Blue Period',
            'Landscape Paintings',
            'Portrait Photography'
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

    // Auction Card Functionality
    setupAuctionCardListeners() {
        const auctionCards = document.querySelectorAll('.auction-card');
        
        auctionCards.forEach(card => {
            const bidBtn = card.querySelector('.btn-bid');
            const watchBtn = card.querySelector('.btn-watch');
            
            if (bidBtn) {
                bidBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    this.showBidModal(card);
                });
            }

            if (watchBtn) {
                watchBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    this.toggleWatchAuction(watchBtn);
                });
            }

            card.addEventListener('click', () => {
                const auctionTitle = card.querySelector('h3').textContent;
                this.showNotification(`Opening "${auctionTitle}" auction details`);
            });
        });
    }

    showBidModal(auctionCard) {
        const title = auctionCard.querySelector('h3').textContent;
        const currentBid = auctionCard.querySelector('.amount').textContent;
        
        const newBid = prompt(`Place your bid for "${title}"\nCurrent bid: ${currentBid}\n\nEnter your bid amount:`);
        
        if (newBid && !isNaN(newBid) && parseFloat(newBid) > 0) {
            this.showNotification(`Bid placed: $${newBid}`);
        }
    }

    toggleWatchAuction(watchBtn) {
        const isWatching = watchBtn.classList.contains('watching');
        
        if (isWatching) {
            watchBtn.classList.remove('watching');
            watchBtn.textContent = 'Watch';
            this.showNotification('Stopped watching auction');
        } else {
            watchBtn.classList.add('watching');
            watchBtn.textContent = 'Watching';
            this.showNotification('Now watching auction');
        }
    }

    // Editorial Card Functionality
    setupEditorialCardListeners() {
        const editorialCards = document.querySelectorAll('.editorial-card');
        
        editorialCards.forEach(card => {
            card.addEventListener('click', () => {
                const title = card.querySelector('h3, h4').textContent;
                this.showNotification(`Opening "${title}" article`);
            });
        });
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

        modal.querySelector('.modal-title').textContent = title;
        modal.querySelector('.modal-artist').textContent = artist;
        modal.querySelector('.modal-gallery').textContent = gallery;
        modal.querySelector('.modal-price').textContent = price;

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

    // Authentication Functionality
    setupAuthenticationListeners() {
        const signupBtn = document.getElementById('signup-btn');
        const loginBtn = document.getElementById('login-btn');
        const showLoginBtns = document.querySelectorAll('#show-login');
        const showSignupBtns = document.querySelectorAll('#show-signup');
        const authModalCloses = document.querySelectorAll('.auth-modal-close');
        const authModalOverlays = document.querySelectorAll('.auth-modal-overlay');

        if (signupBtn) {
            signupBtn.addEventListener('click', () => this.showAuthModal('signup'));
        }

        if (loginBtn) {
            loginBtn.addEventListener('click', () => this.showAuthModal('login'));
        }

        showLoginBtns.forEach(btn => {
            btn.addEventListener('click', () => this.switchAuthModal('login'));
        });

        showSignupBtns.forEach(btn => {
            btn.addEventListener('click', () => this.switchAuthModal('signup'));
        });

        authModalCloses.forEach(closeBtn => {
            closeBtn.addEventListener('click', () => this.hideAuthModal());
        });

        authModalOverlays.forEach(overlay => {
            overlay.addEventListener('click', () => this.hideAuthModal());
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.hideAuthModal();
            }
        });

        const signupForm = document.getElementById('signup-form');
        const loginForm = document.getElementById('login-form');

        if (signupForm) {
            signupForm.addEventListener('submit', (e) => this.handleSignup(e));
        }

        if (loginForm) {
            loginForm.addEventListener('submit', (e) => this.handleLogin(e));
        }

        this.setupPasswordToggles();
        this.setupFormValidation();
        this.setupSocialAuth();
    }

    showAuthModal(type) {
        this.hideAuthModal();
        
        const modal = document.getElementById(`${type}-modal`);
        if (modal) {
            modal.classList.add('show');
            document.body.style.overflow = 'hidden';
            
            setTimeout(() => {
                const firstInput = modal.querySelector('input');
                if (firstInput) {
                    firstInput.focus();
                }
            }, 300);
        }
    }

    switchAuthModal(type) {
        this.hideAuthModal();
        setTimeout(() => {
            this.showAuthModal(type);
        }, 300);
    }

    hideAuthModal() {
        const modals = document.querySelectorAll('.auth-modal');
        modals.forEach(modal => {
            modal.classList.remove('show');
        });
        document.body.style.overflow = '';
        
        setTimeout(() => {
            this.resetAuthForms();
        }, 300);
    }

    resetAuthForms() {
        const forms = document.querySelectorAll('.auth-form');
        forms.forEach(form => {
            form.reset();
            
            form.querySelectorAll('.form-group').forEach(group => {
                group.classList.remove('error', 'success');
            });
            
            form.querySelectorAll('.form-error').forEach(error => {
                error.textContent = '';
            });
            
            form.querySelectorAll('input, select').forEach(input => {
                input.classList.remove('error', 'success');
            });
        });
    }

    setupPasswordToggles() {
        const passwordToggles = document.querySelectorAll('.password-toggle');
        
        passwordToggles.forEach(toggle => {
            toggle.addEventListener('click', () => {
                const input = toggle.parentElement.querySelector('input');
                const eyeOpen = toggle.querySelector('.eye-open');
                const eyeClosed = toggle.querySelector('.eye-closed');
                
                if (input.type === 'password') {
                    input.type = 'text';
                    eyeOpen.style.display = 'none';
                    eyeClosed.style.display = 'block';
                } else {
                    input.type = 'password';
                    eyeOpen.style.display = 'block';
                    eyeClosed.style.display = 'none';
                }
            });
        });
    }

    setupFormValidation() {
        const signupEmail = document.getElementById('signup-email');
        const signupPassword = document.getElementById('signup-password');
        const confirmPassword = document.getElementById('signup-confirm-password');

        if (signupEmail) {
            signupEmail.addEventListener('blur', () => {
                this.validateEmail(signupEmail, 'email-error');
            });
        }

        if (signupPassword) {
            signupPassword.addEventListener('input', () => {
                this.validatePassword(signupPassword);
                this.updatePasswordStrength(signupPassword.value);
                
                if (confirmPassword && confirmPassword.value) {
                    this.validatePasswordMatch(signupPassword, confirmPassword);
                }
            });
        }

        if (confirmPassword) {
            confirmPassword.addEventListener('input', () => {
                this.validatePasswordMatch(signupPassword, confirmPassword);
            });
        }
    }

    validateEmail(input, errorId) {
        const email = input.value.trim();
        const errorElement = document.getElementById(errorId);
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!email) {
            this.setFieldError(input, errorElement, 'Email address is required');
            return false;
        }

        if (!emailRegex.test(email)) {
            this.setFieldError(input, errorElement, 'Please enter a valid email address');
            return false;
        }

        this.setFieldSuccess(input, errorElement);
        return true;
    }

    validatePassword(input) {
        const password = input.value;
        const errorElement = document.getElementById('password-error');

        if (!password) {
            this.setFieldError(input, errorElement, 'Password is required');
            return false;
        }

        if (password.length < 8) {
            this.setFieldError(input, errorElement, 'Password must be at least 8 characters long');
            return false;
        }

        this.setFieldSuccess(input, errorElement);
        return true;
    }

    validatePasswordMatch(passwordInput, confirmInput) {
        const password = passwordInput.value;
        const confirmPassword = confirmInput.value;
        const errorElement = document.getElementById('confirm-password-error');

        if (!confirmPassword) {
            this.setFieldError(confirmInput, errorElement, 'Please confirm your password');
            return false;
        }

        if (password !== confirmPassword) {
            this.setFieldError(confirmInput, errorElement, 'Passwords do not match');
            return false;
        }

        this.setFieldSuccess(confirmInput, errorElement);
        return true;
    }

    setFieldError(input, errorElement, message) {
        input.classList.remove('success');
        input.classList.add('error');
        if (errorElement) {
            errorElement.textContent = message;
        }
        input.parentElement.classList.add('error');
    }

    setFieldSuccess(input, errorElement) {
        input.classList.remove('error');
        input.classList.add('success');
        if (errorElement) {
            errorElement.textContent = '';
        }
        input.parentElement.classList.remove('error');
    }

    updatePasswordStrength(password) {
        const strengthFill = document.querySelector('.strength-fill');
        const strengthText = document.querySelector('.strength-text');
        
        if (!strengthFill || !strengthText) return;

        let strength = 0;
        let strengthLabel = '';

        if (password.length >= 8) strength++;
        if (/[a-z]/.test(password)) strength++;
        if (/[A-Z]/.test(password)) strength++;
        if (/\d/.test(password)) strength++;

        if (strength <= 1) {
            strengthFill.className = 'strength-fill weak';
            strengthLabel = 'Weak';
        } else if (strength <= 2) {
            strengthFill.className = 'strength-fill fair';
            strengthLabel = 'Fair';
        } else if (strength <= 3) {
            strengthFill.className = 'strength-fill good';
            strengthLabel = 'Good';
        } else {
            strengthFill.className = 'strength-fill strong';
            strengthLabel = 'Strong';
        }

        strengthText.textContent = password ? `Password strength: ${strengthLabel}` : 'Password strength';
    }

    setupSocialAuth() {
        const socialBtns = document.querySelectorAll('.btn-social');
        
        socialBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const provider = btn.classList.contains('google') ? 'Google' : 'Apple';
                this.showNotification(`${provider} authentication would be implemented here`, 'info');
            });
        });
    }

    async handleSignup(e) {
        e.preventDefault();
        
        const form = e.target;
        const submitBtn = form.querySelector('#signup-submit');
        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoading = submitBtn.querySelector('.btn-loading');

        if (!this.validateSignupForm(form)) {
            return;
        }

        this.setLoadingState(submitBtn, btnText, btnLoading, true);

        try {
            await this.simulateAPI(2000);
            this.showNotification('Account created successfully! Welcome to Artisty!', 'success');
            this.hideAuthModal();
        } catch (error) {
            this.showNotification('Signup failed. Please try again.', 'error');
        } finally {
            this.setLoadingState(submitBtn, btnText, btnLoading, false);
        }
    }

    async handleLogin(e) {
        e.preventDefault();
        
        const form = e.target;
        const submitBtn = form.querySelector('#login-submit');
        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoading = submitBtn.querySelector('.btn-loading');

        if (!this.validateLoginForm(form)) {
            return;
        }

        this.setLoadingState(submitBtn, btnText, btnLoading, true);

        try {
            await this.simulateAPI(1500);
            this.showNotification('Welcome back!', 'success');
            this.hideAuthModal();
        } catch (error) {
            this.showNotification('Login failed. Please check your credentials.', 'error');
        } finally {
            this.setLoadingState(submitBtn, btnText, btnLoading, false);
        }
    }

    validateSignupForm(form) {
        let isValid = true;

        const firstname = form.querySelector('#signup-firstname');
        const lastname = form.querySelector('#signup-lastname');
        const email = form.querySelector('#signup-email');
        const password = form.querySelector('#signup-password');
        const confirmPassword = form.querySelector('#signup-confirm-password');
        const terms = form.querySelector('#signup-terms');

        if (firstname && !firstname.value.trim()) {
            this.setFieldError(firstname, document.getElementById('firstname-error'), 'First name is required');
            isValid = false;
        }

        if (lastname && !lastname.value.trim()) {
            this.setFieldError(lastname, document.getElementById('lastname-error'), 'Last name is required');
            isValid = false;
        }

        if (!this.validateEmail(email, 'email-error')) isValid = false;
        if (!this.validatePassword(password)) isValid = false;
        if (!this.validatePasswordMatch(password, confirmPassword)) isValid = false;

        if (terms && !terms.checked) {
            const termsError = document.getElementById('terms-error');
            if (termsError) {
                termsError.textContent = 'You must agree to the terms and conditions';
            }
            isValid = false;
        }

        return isValid;
    }

    validateLoginForm(form) {
        let isValid = true;

        const email = form.querySelector('#login-email');
        const password = form.querySelector('#login-password');

        if (!this.validateEmail(email, 'login-email-error')) isValid = false;
        
        if (!password.value) {
            this.setFieldError(password, document.getElementById('login-password-error'), 'Password is required');
            isValid = false;
        }

        return isValid;
    }

    setLoadingState(button, textElement, loadingElement, isLoading) {
        if (isLoading) {
            button.disabled = true;
            if (textElement) textElement.style.display = 'none';
            if (loadingElement) loadingElement.style.display = 'flex';
        } else {
            button.disabled = false;
            if (textElement) textElement.style.display = 'block';
            if (loadingElement) loadingElement.style.display = 'none';
        }
    }

    async simulateAPI(delay) {
        return new Promise(resolve => setTimeout(resolve, delay));
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

        const sectionsToAnimate = document.querySelectorAll('.section-header, .artwork-card, .collection-card, .artist-card, .auction-card, .editorial-card');
        sectionsToAnimate.forEach(section => {
            observer.observe(section);
        });
    }

    // Dynamic Content Loading
    loadDynamicContent() {
        this.loadFeaturedArtworks();
        this.loadAuctionUpdates();
        this.startAuctionCountdowns();
    }

    loadFeaturedArtworks() {
        console.log('Loading featured artworks...');
    }

    loadAuctionUpdates() {
        setInterval(() => {
            this.updateAuctionBids();
        }, 30000);
    }

    updateAuctionBids() {
        const auctionCards = document.querySelectorAll('.auction-card .amount');
        
        auctionCards.forEach(amountElement => {
            const currentAmount = parseInt(amountElement.textContent.replace(/[^\d]/g, ''));
            const increase = Math.floor(Math.random() * 1000) + 100;
            const newAmount = currentAmount + increase;
            
            amountElement.textContent = `$${newAmount.toLocaleString()}`;
            
            amountElement.style.color = 'var(--color-success)';
            setTimeout(() => {
                amountElement.style.color = '';
            }, 2000);
        });
    }

    startAuctionCountdowns() {
        const timeElements = document.querySelectorAll('.auction-card .time');
        
        timeElements.forEach(timeElement => {
            const initialTime = timeElement.textContent;
            if (initialTime.includes('hours')) {
                this.startCountdown(timeElement, parseInt(initialTime) * 3600);
            } else if (initialTime.includes('days')) {
                this.startCountdown(timeElement, parseInt(initialTime) * 86400);
            }
        });
    }

    startCountdown(element, seconds) {
        const timer = setInterval(() => {
            seconds--;
            
            if (seconds <= 0) {
                element.textContent = 'Auction ended';
                clearInterval(timer);
                return;
            }
            
            const days = Math.floor(seconds / 86400);
            const hours = Math.floor((seconds % 86400) / 3600);
            const minutes = Math.floor((seconds % 3600) / 60);
            
            if (days > 0) {
                element.textContent = `${days} days`;
            } else if (hours > 0) {
                element.textContent = `${hours} hours`;
            } else {
                element.textContent = `${minutes} minutes`;
            }
        }, 60000);
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
                    background-color: var(--color-accent);
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

    // Storytelling Tooltips
    initStorytellingTooltips() {
        // Find all elements with data-story attribute
        const storyElements = document.querySelectorAll('[data-story]');
        
        storyElements.forEach(element => {
            this.setupStorytellingTooltip(element);
        });
    }

    setupStorytellingTooltip(element) {
        const story = element.getAttribute('data-story');
        if (!story) return;

        let tooltip = null;

        // Mouse enter event
        element.addEventListener('mouseenter', () => {
            if (tooltip) return;

            tooltip = this.createStorytellingTooltip(story);
            const imageContainer = element.querySelector('.artwork-image, .artist-image, .auction-image, .editorial-image') || element;
            
            // Position tooltip relative to the image container
            imageContainer.style.position = 'relative';
            imageContainer.appendChild(tooltip);

            // Trigger animation
            requestAnimationFrame(() => {
                tooltip.classList.add('show');
            });
        });

        // Mouse leave event
        element.addEventListener('mouseleave', () => {
            if (tooltip) {
                tooltip.classList.remove('show');
                setTimeout(() => {
                    if (tooltip && tooltip.parentNode) {
                        tooltip.parentNode.removeChild(tooltip);
                    }
                    tooltip = null;
                }, 300);
            }
        });
    }

    createStorytellingTooltip(story) {
        const tooltip = document.createElement('div');
        tooltip.className = 'storytelling-tooltip';
        tooltip.textContent = story;
        return tooltip;
    }

    // Image Lazy Loading
    initImageLazyLoading() {
        const images = document.querySelectorAll('img[src]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.style.transition = 'opacity 0.3s ease';
                        img.style.opacity = '1';
                        imageObserver.unobserve(img);
                    }
                });
            }, {
                rootMargin: '50px 0px',
                threshold: 0.1
            });

            images.forEach(img => {
                img.style.opacity = '0';
                imageObserver.observe(img);
            });
        } else {
            // Fallback for older browsers
            images.forEach(img => {
                img.style.opacity = '1';
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
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ArtistyApp();
});

// Export for testing purposes
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ArtistyApp;
}