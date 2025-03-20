document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('nav');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenuBtn.classList.toggle('active');
            nav.classList.toggle('active');
        });
    }
    
    // Forms validation
    const contactForm = document.getElementById('contactForm');
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        });
    }
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            if (!isValidEmail(email)) {
                showError(document.getElementById('email'), 'Please enter a valid email address');
                return;
            }
            
            if (password.length < 6) {
                showError(document.getElementById('password'), 'Password must be at least 6 characters');
                return;
            }
            
            alert('Login successful!');
            loginForm.reset();
        });
    }
    
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirm-password').value;
            
            if (username.length < 3) {
                showError(document.getElementById('username'), 'Username must be at least 3 characters');
                return;
            }
            
            if (!isValidEmail(email)) {
                showError(document.getElementById('email'), 'Please enter a valid email address');
                return;
            }
            
            if (password.length < 6) {
                showError(document.getElementById('password'), 'Password must be at least 6 characters');
                return;
            }
            
            if (password !== confirmPassword) {
                showError(document.getElementById('confirm-password'), 'Passwords do not match');
                return;
            }
            
            alert('Account created successfully!');
            signupForm.reset();
        });
    }
    
    // Load products based on page
    const featuredProductsContainer = document.getElementById('featured-products-container');
    const productsContainer = document.getElementById('products-container');
    const categoryFilters = document.getElementById('category-filters');
    
    // Load featured products on home page
    if (featuredProductsContainer) {
        const featuredProducts = getFeaturedProducts();
        featuredProducts.forEach(product => {
            const productCard = createProductCard(product);
            featuredProductsContainer.appendChild(productCard);
        });
    }
    
    // Load all products and category filters on products page
    if (productsContainer && categoryFilters) {
        // Add "All" filter
        const allFilter = document.createElement('div');
        allFilter.classList.add('category-filter', 'active');
        allFilter.textContent = 'All';
        allFilter.setAttribute('data-category', '');
        categoryFilters.appendChild(allFilter);
        
        // Add category filters
        categories.forEach(category => {
            const filter = document.createElement('div');
            filter.classList.add('category-filter');
            filter.textContent = category.name;
            filter.setAttribute('data-category', category.id);
            categoryFilters.appendChild(filter);
        });
        
        // Filter functionality
        const filters = document.querySelectorAll('.category-filter');
        filters.forEach(filter => {
            filter.addEventListener('click', function() {
                // Update active state
                filters.forEach(f => f.classList.remove('active'));
                this.classList.add('active');
                
                // Filter products
                const categoryId = this.getAttribute('data-category');
                const filteredProducts = categoryId ? getProductsByCategory(categoryId) : products;
                
                // Update heading
                const productsHeading = document.getElementById('products-heading');
                if (categoryId) {
                    const category = getCategoryById(parseInt(categoryId));
                    productsHeading.textContent = `${category.name} Products`;
                } else {
                    productsHeading.textContent = 'All Products';
                }
                
                // Clear and reload products
                productsContainer.innerHTML = '';
                filteredProducts.forEach(product => {
                    const productCard = createProductCard(product);
                    productsContainer.appendChild(productCard);
                });
                
                // Initialize hover effects for new cards
                initProductHoverEffects();
            });
        });
        
        // Initial load of all products
        products.forEach(product => {
            const productCard = createProductCard(product);
            productsContainer.appendChild(productCard);
        });
    }
    
    // Initialize product hover effects
    initProductHoverEffects();
    
    // Input fields validation
    const inputs = document.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            removeError(this);
        });
    });
});

// Function to create product card
function createProductCard(product) {
    const card = document.createElement('div');
    card.classList.add('product-card');
    
    const category = getCategoryById(product.category_id);
    
    card.innerHTML = `
        <img src="${product.image_url}" alt="${product.name}" class="product-image">
        <div class="product-details">
            <span class="product-category">${category.name}</span>
            <h3 class="product-title">${product.name}</h3>
            <p class="product-price">$${product.price.toFixed(2)}</p>
            <p class="product-description">${product.description}</p>
            <a href="${product.purchase_link}" class="buy-button" target="_blank">Buy Now</a>
        </div>
    `;
    
    return card;
}

// Function to show form error
function showError(input, message) {
    removeError(input);
    const errorMessage = document.createElement('div');
    errorMessage.classList.add('error-message');
    errorMessage.textContent = message;
    errorMessage.style.color = 'red';
    errorMessage.style.fontSize = '0.8rem';
    errorMessage.style.marginTop = '5px';
    input.parentNode.appendChild(errorMessage);
    input.style.borderColor = 'red';
}

// Function to remove form error
function removeError(input) {
    const errorMessage = input.parentNode.querySelector('.error-message');
    if (errorMessage) {
        errorMessage.remove();
    }
    input.style.borderColor = '';
}

// Function to validate email
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Function to initialize product hover effects
function initProductHoverEffects() {
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
}