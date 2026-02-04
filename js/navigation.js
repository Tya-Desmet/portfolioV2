// Navigation Active Link Highlighting & Mobile Menu Toggle
(function() {
    'use strict';
    
    // Elements
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id], header[id]');
    
    // Focus trap elements for mobile menu
    let focusableElements = [];
    let firstFocusableElement = null;
    let lastFocusableElement = null;
    
    // Update focusable elements when menu opens
    function updateFocusableElements() {
        if (!navMenu.classList.contains('open')) return;
        
        focusableElements = Array.from(navMenu.querySelectorAll(
            'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
        ));
        firstFocusableElement = focusableElements[0];
        lastFocusableElement = focusableElements[focusableElements.length - 1];
    }
    
    // Focus trap handler (Story 1.5 - WCAG 2.4.3 compliance)
    function handleFocusTrap(e) {
        if (!navMenu.classList.contains('open')) return;
        
        const isTabPressed = e.key === 'Tab';
        if (!isTabPressed) return;
        
        // Shift + Tab (backward)
        if (e.shiftKey) {
            if (document.activeElement === firstFocusableElement) {
                lastFocusableElement.focus();
                e.preventDefault();
            }
        } 
        // Tab (forward)
        else {
            if (document.activeElement === lastFocusableElement) {
                firstFocusableElement.focus();
                e.preventDefault();
            }
        }
    }
    
    // Mobile Menu Toggle
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
            
            // Toggle menu
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('open');
            
            // Update ARIA
            navToggle.setAttribute('aria-expanded', !isExpanded);
            navToggle.setAttribute('aria-label', 
                isExpanded ? 'Ouvrir le menu de navigation' : 'Fermer le menu de navigation'
            );
            
            // Setup focus trap when opening
            if (!isExpanded) {
                updateFocusableElements();
                if (firstFocusableElement) {
                    // Small delay to ensure menu is visible
                    setTimeout(() => firstFocusableElement.focus(), 100);
                }
                document.addEventListener('keydown', handleFocusTrap);
            } else {
                document.removeEventListener('keydown', handleFocusTrap);
            }
        });
    }
    
    // Close mobile menu when clicking nav link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth < 768 && navMenu.classList.contains('open')) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('open');
                navToggle.setAttribute('aria-expanded', 'false');
                navToggle.setAttribute('aria-label', 'Ouvrir le menu de navigation');
                document.removeEventListener('keydown', handleFocusTrap);
            }
        });
    });
    
    // Close mobile menu on Escape key (Story 1.5 fix)
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navMenu.classList.contains('open')) {
            navToggle.click();
        }
    });
    
    // Active Link Highlighting on Scroll
    function updateActiveLink() {
        let currentSection = '';
        const scrollPosition = window.scrollY + 100; // Offset for sticky nav
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }
    
    // Update active link on scroll (throttled with requestAnimationFrame)
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (scrollTimeout) {
            window.cancelAnimationFrame(scrollTimeout);
        }
        scrollTimeout = window.requestAnimationFrame(updateActiveLink);
    });
    
    // Initial active link update
    updateActiveLink();
})();
