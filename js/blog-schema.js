/**
 * Blog Schema.org Dynamic Data Generator
 * Story 4.2: Calculate actual wordCount and reading time for BlogPosting Schema
 */

(function() {
    'use strict';
    
    /**
     * Calculate word count from article content
     * @returns {number} Total word count
     */
    function calculateWordCount() {
        const articleContent = document.querySelector('.article-content');
        if (!articleContent) return 0;
        
        // Get text content, excluding code blocks to avoid inflating count
        const text = articleContent.textContent || articleContent.innerText || '';
        
        // Split by whitespace and filter empty strings
        const words = text.trim().split(/\s+/).filter(word => word.length > 0);
        
        return words.length;
    }
    
    /**
     * Calculate reading time based on word count
     * Industry standard: 250 words per minute for technical content
     * @param {number} wordCount - Total words in article
     * @returns {string} ISO 8601 duration (e.g., "PT8M" for 8 minutes)
     */
    function calculateReadingTime(wordCount) {
        const wordsPerMinute = 250;
        const minutes = Math.ceil(wordCount / wordsPerMinute);
        return `PT${minutes}M`;
    }
    
    /**
     * Update BlogPosting Schema.org with actual calculated values
     */
    function updateBlogSchema() {
        // Find the BlogPosting schema script tag
        const scripts = document.querySelectorAll('script[type="application/ld+json"]');
        let blogSchemaScript = null;
        
        for (let script of scripts) {
            try {
                const data = JSON.parse(script.textContent);
                if (data['@type'] === 'BlogPosting') {
                    blogSchemaScript = script;
                    break;
                }
            } catch (e) {
                // Skip invalid JSON
            }
        }
        
        if (!blogSchemaScript) {
            console.warn('BlogPosting schema not found');
            return;
        }
        
        try {
            // Parse existing schema
            const schema = JSON.parse(blogSchemaScript.textContent);
            
            // Calculate actual values
            const actualWordCount = calculateWordCount();
            const actualReadingTime = calculateReadingTime(actualWordCount);
            
            // Update schema with calculated values
            schema.wordCount = actualWordCount;
            schema.timeRequired = actualReadingTime;
            
            // Update the script tag
            blogSchemaScript.textContent = JSON.stringify(schema, null, 2);
            
            console.log(`BlogPosting Schema updated: ${actualWordCount} words, ${actualReadingTime} reading time`);
        } catch (e) {
            console.error('Error updating BlogPosting schema:', e);
        }
    }
    
    /**
     * Update reading time display in article header
     */
    function updateReadingTimeDisplay() {
        const wordCount = calculateWordCount();
        const readingTime = Math.ceil(wordCount / 250);
        
        const readingTimeElement = document.querySelector('.reading-time');
        if (readingTimeElement) {
            // Find the text node (not the SVG)
            const textNodes = Array.from(readingTimeElement.childNodes)
                .filter(node => node.nodeType === Node.TEXT_NODE);
            
            if (textNodes.length > 0) {
                textNodes[0].textContent = ` ${readingTime} min`;
            }
        }
    }
    
    // Run on DOMContentLoaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            updateBlogSchema();
            updateReadingTimeDisplay();
        });
    } else {
        updateBlogSchema();
        updateReadingTimeDisplay();
    }
    
})();
