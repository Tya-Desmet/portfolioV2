/**
 * Animations & Micro-Interactions for mystya.dev
 * - Scroll reveal animations
 * - Smooth scroll behavior
 * - Loading states
 * - Interactive hover effects
 */

// ===================================================================
// SCROLL REVEAL ANIMATIONS
// ===================================================================

/**
 * Observe elements and animate them when they enter the viewport
 */
function initScrollReveal() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Unobserve after animation
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Select elements to animate
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    animateElements.forEach(el => observer.observe(el));
}

// ===================================================================
// SMOOTH SCROLL TO TOP BUTTON
// ===================================================================

function initScrollToTop() {
    // Create scroll to top button
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 4L10 16M10 4L4 10M10 4L16 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    `;
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.setAttribute('aria-label', 'Retour en haut');
    document.body.appendChild(scrollBtn);

    // Show/hide button on scroll
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 500) {
            scrollBtn.classList.add('visible');
        } else {
            scrollBtn.classList.remove('visible');
        }
    });

    // Scroll to top on click
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===================================================================
// LOADING ANIMATION
// ===================================================================

function initLoadingAnimation() {
    // Add fade-in class to body when page loads
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
    });
}

// ===================================================================
// HOVER RIPPLE EFFECT (Optional)
// ===================================================================

function initRippleEffect() {
    const buttons = document.querySelectorAll('.btn-submit, .btn-view-blog, .stack-badge');

    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');

            this.appendChild(ripple);

            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// ===================================================================
// PARALLAX EFFECT FOR HERO SECTION
// ===================================================================

function initParallax() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxSpeed = 0.5;
        
        if (scrolled < window.innerHeight) {
            hero.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
        }
    });
}

// ===================================================================
// ACTIVE NAV LINK HIGHLIGHT
// ===================================================================

function initActiveNavHighlight() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// ===================================================================
// ADD ANIMATE CLASS TO ELEMENTS
// ===================================================================

function addAnimationClasses() {
    // Add animate-on-scroll class to elements that should animate
    const selectors = [
        '.tech-category',
        '.project-card',
        '.timeline-item',
        '.article-card',
        '.contact-form'
    ];

    selectors.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach((el, index) => {
            if (!el.classList.contains('animate-on-scroll')) {
                el.classList.add('animate-on-scroll');
                el.style.animationDelay = `${index * 0.1}s`;
            }
        });
    });
}

// ===================================================================
// CSS FOR ANIMATIONS (inject into document)
// ===================================================================

function injectAnimationStyles() {
    const style = document.createElement('style');
    style.textContent = `
        /* Scroll Reveal Animation */
        .animate-on-scroll {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }

        .animate-on-scroll.visible {
            opacity: 1;
            transform: translateY(0);
        }

        /* Page Load Animation */
        body {
            opacity: 0;
            transition: opacity 0.5s ease-in;
        }

        body.loaded {
            opacity: 1;
        }

        /* Scroll to Top Button */
        .scroll-to-top {
            position: fixed;
            bottom: 2rem;
            right: 2rem;
            width: 50px;
            height: 50px;
            background: var(--gradient-primary);
            color: white;
            border: none;
            border-radius: var(--radius-full);
            cursor: pointer;
            box-shadow: var(--shadow-lg);
            opacity: 0;
            visibility: hidden;
            transform: translateY(100px);
            transition: all var(--transition-default);
            z-index: 1000;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .scroll-to-top.visible {
            opacity: 1;
            visibility: visible;
            transform: translateY(0);
        }

        .scroll-to-top:hover {
            transform: translateY(-4px) scale(1.1);
            box-shadow: var(--shadow-purple-glow);
        }

        .scroll-to-top svg {
            width: 24px;
            height: 24px;
        }

        /* Ripple Effect */
        .ripple {
            position: absolute;
            border-radius: var(--radius-full);
            background: rgba(255, 255, 255, 0.6);
            transform: scale(0);
            animation: ripple-animation 0.6s ease-out;
            pointer-events: none;
        }

        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }

        /* Reduce motion for accessibility */
        @media (prefers-reduced-motion: reduce) {
            *,
            *::before,
            *::after {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
            }

            .animate-on-scroll {
                opacity: 1;
                transform: none;
            }
        }
    `;
    document.head.appendChild(style);
}

// ===================================================================
// INITIALIZE ALL ANIMATIONS
// ===================================================================

document.addEventListener('DOMContentLoaded', () => {
    injectAnimationStyles();
    addAnimationClasses();
    initScrollReveal();
    initScrollToTop();
    initLoadingAnimation();
    initRippleEffect();
    initParallax();
    initActiveNavHighlight();

    console.log('✨ Animations initialized');
});
