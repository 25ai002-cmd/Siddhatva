/**
 * Siddhatva Builders - Core Script
 * Handles Navigation, Slide Animations, Portfolio Filter, and Lightbox
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. Loading Screen Handler
    // ==========================================
    const loaderScreen = document.querySelector('.loading-screen');
    if (loaderScreen) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                loaderScreen.classList.add('fade-out');
            }, 600); // Smooth transition
        });
    }

    // ==========================================
    // 2. Sticky Header Scroll Effect
    // ==========================================
    const siteHeader = document.querySelector('.site-header');
    const handleScroll = () => {
        if (window.scrollY > 50) {
            siteHeader.classList.add('scrolled');
        } else {
            siteHeader.classList.remove('scrolled');
        }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial invocation on page load

    // ==========================================
    // 3. Mobile Navigation Menu Drawer
    // ==========================================
    const mobileToggle = document.querySelector('.mobile-nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            mobileToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!mobileToggle.contains(e.target) && !navMenu.contains(e.target)) {
                mobileToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });

        // Close menu when clicking links
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // ==========================================
    // 4. Hero Slider Controls
    // ==========================================
    const slides = document.querySelectorAll('.slide');
    const indicatorsContainer = document.querySelector('.slider-indicators');
    const arrowLeft = document.querySelector('.slider-arrow-left');
    const arrowRight = document.querySelector('.slider-arrow-right');
    
    if (slides.length > 0) {
        let currentSlide = 0;
        let slideInterval;
        const intervalTime = 6000; // 6 seconds

        // Create Indicators
        if (indicatorsContainer) {
            slides.forEach((_, idx) => {
                const indicator = document.createElement('div');
                indicator.classList.add('indicator');
                if (idx === 0) indicator.classList.add('active');
                indicator.addEventListener('click', () => {
                    goToSlide(idx);
                    resetInterval();
                });
                indicatorsContainer.appendChild(indicator);
            });
        }

        const indicators = document.querySelectorAll('.indicator');

        function goToSlide(n) {
            slides[currentSlide].classList.remove('active');
            if (indicators.length > 0) indicators[currentSlide].classList.remove('active');
            
            currentSlide = (n + slides.length) % slides.length;
            
            slides[currentSlide].classList.add('active');
            if (indicators.length > 0) indicators[currentSlide].classList.add('active');
        }

        function nextSlide() {
            goToSlide(currentSlide + 1);
        }

        function prevSlide() {
            goToSlide(currentSlide - 1);
        }

        // Arrow Buttons
        if (arrowLeft) {
            arrowLeft.addEventListener('click', () => {
                prevSlide();
                resetInterval();
            });
        }

        if (arrowRight) {
            arrowRight.addEventListener('click', () => {
                nextSlide();
                resetInterval();
            });
        }

        // Automatic Loop
        function startInterval() {
            slideInterval = setInterval(nextSlide, intervalTime);
        }

        function resetInterval() {
            clearInterval(slideInterval);
            startInterval();
        }

        startInterval();
    }

    // ==========================================
    // 5. Portfolio & Gallery Filter Logic
    // ==========================================
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const projectCards = document.querySelectorAll('.project-card');

    function applyFilter(buttons, items, attributeName) {
        if (buttons.length > 0 && items.length > 0) {
            buttons.forEach(btn => {
                btn.addEventListener('click', () => {
                    // Reset Active Button
                    buttons.forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');

                    const filterValue = btn.getAttribute('data-filter');

                    // Filter Items
                    items.forEach(item => {
                        const itemCategory = item.getAttribute(attributeName);
                        if (filterValue === 'all' || itemCategory === filterValue) {
                            item.style.display = 'block';
                            // Triggers opacity animation
                            setTimeout(() => {
                                item.style.opacity = '1';
                                item.style.transform = 'scale(1)';
                            }, 50);
                        } else {
                            item.style.opacity = '0';
                            item.style.transform = 'scale(0.95)';
                            // Hide after transition
                            setTimeout(() => {
                                item.style.display = 'none';
                            }, 300);
                        }
                    });
                });
            });
        }
    }

    // Apply filters to gallery items & project cards
    applyFilter(filterButtons, galleryItems, 'data-category');
    // We can also reuse the filter controls for projects if they are on the page
    const projectFilters = document.querySelectorAll('.project-filter-btn');
    if (projectFilters.length > 0 && projectCards.length > 0) {
        applyFilter(projectFilters, projectCards, 'data-category');
    }

    // ==========================================
    // 6. Interactive Gallery Lightbox Modal
    // ==========================================
    const lightbox = document.querySelector('.lightbox');
    const lightboxImg = document.querySelector('.lightbox-img');
    const lightboxCaption = document.querySelector('.lightbox-caption');
    const lightboxClose = document.querySelector('.lightbox-close');

    if (lightbox && galleryItems.length > 0) {
        galleryItems.forEach(item => {
            item.addEventListener('click', () => {
                const img = item.querySelector('img');
                const title = item.querySelector('.gallery-item-title');
                
                if (img) {
                    lightboxImg.src = img.src;
                    lightboxCaption.textContent = title ? title.textContent : '';
                    lightbox.classList.add('active');
                    document.body.style.overflow = 'hidden'; // Stop scrolling
                }
            });
        });

        // Close lightbox
        const closeLightbox = () => {
            lightbox.classList.remove('active');
            document.body.style.overflow = 'auto'; // Re-enable scrolling
        };

        if (lightboxClose) {
            lightboxClose.addEventListener('click', closeLightbox);
        }

        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox || e.target.classList.contains('lightbox-content')) {
                closeLightbox();
            }
        });

        // Escape Key Close
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && lightbox.classList.contains('active')) {
                closeLightbox();
            }
        });
    }

    // ==========================================
    // 7. Contact Form Simulation Handler
    // ==========================================
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Perform simple inputs validations
            const name = document.getElementById('form-name').value.trim();
            const email = document.getElementById('form-email').value.trim();
            const phone = document.getElementById('form-phone').value.trim();
            const message = document.getElementById('form-message-text').value.trim();

            if (!name || !email || !message) {
                showFormMessage('Please fill in all required fields.', 'error');
                return;
            }

            // Show submitting loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            // Simulate server request latency
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                
                // Show Success
                showFormMessage('Thank you! Your message has been sent successfully. Our team will contact you shortly.', 'success');
                contactForm.reset();
            }, 1500);
        });

        function showFormMessage(text, type) {
            if (formMessage) {
                formMessage.textContent = text;
                formMessage.className = `form-message ${type}`;
                formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                
                // Autohide success messages after 8 seconds
                if (type === 'success') {
                    setTimeout(() => {
                        formMessage.style.display = 'none';
                    }, 8000);
                }
            }
        }
    }
});
