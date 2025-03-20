document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const productsContainer = document.getElementById('products-container');
    const productsHeading = document.getElementById('products-heading');
    
    // Function to perform search
    function performSearch() {
        const query = searchInput.value.trim();
        if (query.length > 0) {
            const searchResults = searchProducts(query);
            
            // Update heading
            productsHeading.textContent = `Search Results for "${query}"`;
            
            // Clear and display results
            productsContainer.innerHTML = '';
            
            if (searchResults.length > 0) {
                searchResults.forEach(product => {
                    const productCard = createProductCard(product);
                    productsContainer.appendChild(productCard);
                });
                
                // Initialize hover effects for new cards
                initProductHoverEffects();
            } else {
                productsContainer.innerHTML = `
                    <div class="no-results">
                        <p>No products found matching "${query}".</p>
                        <p>Try different keywords or browse our categories.</p>
                    </div>
                `;
            }
            
            // Reset category filters active state
            const filters = document.querySelectorAll('.category-filter');
            filters.forEach(filter => {
                filter.classList.remove('active');
            });
        }
    }
    
    // Search button click event
    if (searchButton) {
        searchButton.addEventListener('click', performSearch);
    }
    
    // Search input enter key event
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
    
    // Check if there's a search query in URL
    function getUrlParameter(name) {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        const results = regex.exec(location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    }
    
    const searchQuery = getUrlParameter('search');
    if (searchQuery && searchInput) {
        searchInput.value = searchQuery;
        performSearch();
    }
});