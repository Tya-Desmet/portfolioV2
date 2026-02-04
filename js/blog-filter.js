/**
 * Blog Filter System
 * Story 4.6: Client-side tag filtering for blog articles
 */

(function() {
    'use strict';
    
    // DOM Elements
    const filterButtons = document.querySelectorAll('.filter-tag');
    const resetButton = document.getElementById('resetFilters');
    const articleCards = document.querySelectorAll('.article-card');
    const filterResults = document.getElementById('filterResults');
    const articlesGrid = document.querySelector('.articles-grid');
    
    // Current active filter
    let activeFilter = 'all';
    
    /**
     * Filter articles based on selected tag
     * @param {string} filterValue - The tag to filter by ('all' or specific tag)
     */
    function filterArticles(filterValue) {
        let visibleCount = 0;
        
        articleCards.forEach(card => {
            const cardTags = card.dataset.tags.toLowerCase();
            const shouldShow = filterValue === 'all' || cardTags.includes(filterValue.toLowerCase());
            
            if (shouldShow) {
                card.style.display = '';
                card.classList.remove('hidden');
                // Smooth fade in animation
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 10);
                visibleCount++;
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                    card.classList.add('hidden');
                }, 300);
            }
        });
        
        // Update results message
        updateResultsMessage(filterValue, visibleCount);
        
        // Show empty state if no results
        if (visibleCount === 0) {
            showEmptyState();
        } else {
            hideEmptyState();
        }
    }
    
    /**
     * Update filter results message
     * @param {string} filter - Current filter value
     * @param {number} count - Number of visible articles
     */
    function updateResultsMessage(filter, count) {
        if (filter === 'all') {
            filterResults.textContent = `${count} article${count > 1 ? 's' : ''} au total`;
        } else {
            const filterName = filter.charAt(0).toUpperCase() + filter.slice(1);
            filterResults.textContent = `${count} article${count > 1 ? 's' : ''} avec le tag "${filterName}"`;
        }
    }
    
    /**
     * Show empty state when no articles match filter
     */
    function showEmptyState() {
        let emptyState = document.querySelector('.empty-state');
        
        if (!emptyState) {
            emptyState = document.createElement('div');
            emptyState.className = 'empty-state';
            emptyState.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="empty-icon">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                </svg>
                <h3>Aucun article trouvé</h3>
                <p>Aucun article ne correspond à ce filtre. Essayez un autre tag ou réinitialisez les filtres.</p>
                <button class="btn-reset-empty" onclick="document.getElementById('resetFilters').click()">
                    Voir tous les articles
                </button>
            `;
            articlesGrid.appendChild(emptyState);
        }
        
        emptyState.style.display = 'flex';
    }
    
    /**
     * Hide empty state
     */
    function hideEmptyState() {
        const emptyState = document.querySelector('.empty-state');
        if (emptyState) {
            emptyState.style.display = 'none';
        }
    }
    
    /**
     * Update active filter button styling
     * @param {string} filterValue - The filter to activate
     */
    function updateActiveFilter(filterValue) {
        filterButtons.forEach(btn => {
            if (btn.dataset.filter === filterValue) {
                btn.classList.add('active');
                btn.setAttribute('aria-pressed', 'true');
            } else {
                btn.classList.remove('active');
                btn.setAttribute('aria-pressed', 'false');
            }
        });
        
        activeFilter = filterValue;
    }
    
    /**
     * Reset all filters to show all articles
     */
    function resetFilters() {
        activeFilter = 'all';
        updateActiveFilter('all');
        filterArticles('all');
        
        // Smooth scroll to top of articles
        articlesGrid.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    
    /**
     * Initialize filter event listeners
     */
    function initializeFilters() {
        // Add click event to filter buttons
        filterButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const filterValue = button.dataset.filter;
                updateActiveFilter(filterValue);
                filterArticles(filterValue);
                
                // Accessibility: announce filter change
                filterResults.setAttribute('role', 'status');
            });
        });
        
        // Reset button
        if (resetButton) {
            resetButton.addEventListener('click', (e) => {
                e.preventDefault();
                resetFilters();
            });
        }
        
        // Initial state
        articleCards.forEach(card => {
            card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        });
    }
    
    /**
     * Count articles by tag for display in filters
     */
    function updateTagCounts() {
        const tagCounts = {};
        
        articleCards.forEach(card => {
            const tags = card.dataset.tags.toLowerCase().split(' ');
            tags.forEach(tag => {
                if (tag) {
                    tagCounts[tag] = (tagCounts[tag] || 0) + 1;
                }
            });
        });
        
        // Update count displays
        filterButtons.forEach(button => {
            const filter = button.dataset.filter;
            const countElement = button.querySelector('.tag-count');
            
            if (countElement) {
                if (filter === 'all') {
                    countElement.textContent = `(${articleCards.length})`;
                } else {
                    const count = tagCounts[filter] || 0;
                    countElement.textContent = `(${count})`;
                }
            }
        });
    }
    
    // Initialize on DOMContentLoaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            initializeFilters();
            updateTagCounts();
        });
    } else {
        initializeFilters();
        updateTagCounts();
    }
    
})();
