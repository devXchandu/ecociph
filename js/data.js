// Sample data for eco-friendly products
const categories = [
    { id: 1, name: "Electronics", description: "Eco-friendly electronic products" },
    { id: 2, name: "Home & Kitchen", description: "Sustainable home and kitchen items" },
    { id: 3, name: "Fashion", description: "Eco-conscious clothing and accessories" },
    { id: 4, name: "Outdoor", description: "Environmentally friendly outdoor gear" }
];

const products = [
    {
        id: 1,
        name: "Solar Powered Charger",
        description: "Charge your devices using solar energy with this portable, high-efficiency solar charger.",
        price: 49.99,
        image_url: "https://via.placeholder.com/300x200?text=Solar+Charger",
        purchase_link: "https://example.com/product1",
        featured: true,
        category_id: 1
    },
    {
        id: 2,
        name: "Bamboo Kitchen Utensils",
        description: "Set of 5 durable bamboo kitchen utensils, a sustainable alternative to plastic.",
        price: 24.99,
        image_url: "https://via.placeholder.com/300x200?text=Bamboo+Utensils",
        purchase_link: "https://example.com/product2",
        featured: true,
        category_id: 2
    },
    {
        id: 3,
        name: "Organic Cotton T-Shirt",
        description: "Comfortable, breathable t-shirt made from 100% organic cotton.",
        price: 19.99,
        image_url: "https://via.placeholder.com/300x200?text=Organic+Shirt",
        purchase_link: "https://example.com/product3",
        featured: false,
        category_id: 3
    },
    {
        id: 4,
        name: "Reusable Water Bottle",
        description: "Stainless steel, BPA-free water bottle that keeps drinks cold for 24 hours or hot for 12 hours.",
        price: 29.99,
        image_url: "https://via.placeholder.com/300x200?text=Water+Bottle",
        purchase_link: "https://example.com/product4",
        featured: true,
        category_id: 4
    },
    {
        id: 5,
        name: "Energy Efficient LED Bulbs",
        description: "Pack of 4 energy-saving LED bulbs that last up to 15 years.",
        price: 15.99,
        image_url: "https://via.placeholder.com/300x200?text=LED+Bulbs",
        purchase_link: "https://example.com/product5",
        featured: false,
        category_id: 1
    },
    {
        id: 6,
        name: "Biodegradable Cleaning Kit",
        description: "All-natural, biodegradable cleaning products that are safe for the environment.",
        price: 34.99,
        image_url: "https://via.placeholder.com/300x200?text=Cleaning+Kit",
        purchase_link: "https://example.com/product6",
        featured: true,
        category_id: 2
    },
    {
        id: 7,
        name: "Recycled Polyester Backpack",
        description: "Durable backpack made from recycled plastic bottles.",
        price: 59.99,
        image_url: "https://via.placeholder.com/300x200?text=Recycled+Backpack",
        purchase_link: "https://example.com/product7",
        featured: false,
        category_id: 3
    },
    {
        id: 8,
        name: "Compostable Phone Case",
        description: "Protective phone case made from compostable plant-based materials.",
        price: 19.99,
        image_url: "https://via.placeholder.com/300x200?text=Phone+Case",
        purchase_link: "https://example.com/product8",
        featured: false,
        category_id: 1
    },
    {
        id: 9,
        name: "Beeswax Food Wraps",
        description: "Reusable food wraps made from organic cotton, beeswax, and tree resin.",
        price: 18.99,
        image_url: "https://via.placeholder.com/300x200?text=Beeswax+Wraps",
        purchase_link: "https://example.com/product9",
        featured: true,
        category_id: 2
    },
    {
        id: 10,
        name: "Solar Powered Outdoor Light",
        description: "Weather-resistant outdoor light powered by solar energy.",
        price: 32.99,
        image_url: "https://via.placeholder.com/300x200?text=Solar+Light",
        purchase_link: "https://example.com/product10",
        featured: false,
        category_id: 4
    }
];

// Function to get featured products
function getFeaturedProducts() {
    return products.filter(product => product.featured);
}

// Function to get products by category
function getProductsByCategory(categoryId) {
    if (categoryId) {
        return products.filter(product => product.category_id === parseInt(categoryId));
    }
    return products;
}

// Function to search products
function searchProducts(query) {
    if (!query) {
        return products;
    }
    
    const lowerQuery = query.toLowerCase();
    return products.filter(product => 
        product.name.toLowerCase().includes(lowerQuery) || 
        product.description.toLowerCase().includes(lowerQuery)
    );
}

// Function to get category by ID
function getCategoryById(categoryId) {
    return categories.find(category => category.id === parseInt(categoryId));
}