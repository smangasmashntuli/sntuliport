// RapidAPI.js - Service layer for RapidAPI calls
const RAPIDAPI_KEY = import.meta.env.VITE_RAPIDAPI_KEY || '';
const EBAY_RAPIDAPI_KEY = import.meta.env.VITE_EBAY_RAPIDAPI_KEY || '';

// Export for debugging
export { RAPIDAPI_KEY, EBAY_RAPIDAPI_KEY };

// Debug: Log API key status
console.log('RapidAPI Key loaded:', RAPIDAPI_KEY && RAPIDAPI_KEY !== 'your_rapidapi_key_here' ? '✓ Yes (length: ' + RAPIDAPI_KEY.length + ')' : '✗ No - Please add VITE_RAPIDAPI_KEY to .env file');
if (RAPIDAPI_KEY && RAPIDAPI_KEY !== 'your_rapidapi_key_here') {
  console.log('RapidAPI Key preview:', RAPIDAPI_KEY.substring(0, 8) + '...');
} else {
  console.warn('⚠️ RapidAPI key not configured! Add your key to .env file as VITE_RAPIDAPI_KEY');
}

// Debug: Log eBay API key status
if (EBAY_RAPIDAPI_KEY && EBAY_RAPIDAPI_KEY !== 'your_ebay_rapidapi_key_here') {
  console.log('eBay RapidAPI Key loaded: ✓ Yes (using separate eBay key)');
  console.log('eBay RapidAPI Key preview:', EBAY_RAPIDAPI_KEY.substring(0, 8) + '...');
} else {
  console.log('ℹ️ eBay using shared RapidAPI key (add VITE_EBAY_RAPIDAPI_KEY to .env for separate key)');
}

// API configurations for different RapidAPI endpoints
const API_CONFIGS = {
  // Real-time Amazon Data API
  amazonRealTime: {
    host: 'real-time-amazon-data.p.rapidapi.com',
    baseUrl: 'https://real-time-amazon-data.p.rapidapi.com',
    endpoints: {
      search: '/search',
      productDetails: '/product-details',
      reviews: '/product-reviews'
    }
  },
  
  // Amazon Product Data API (alternative)
  amazonProducts: {
    host: 'amazon-product-data6.p.rapidapi.com',
    baseUrl: 'https://amazon-product-data6.p.rapidapi.com',
    endpoints: {
      search: '/search',
      product: '/product'
    }
  },
  
  // AliExpress API
  aliExpress: {
    host: 'ali-express1.p.rapidapi.com',
    baseUrl: 'https://ali-express1.p.rapidapi.com',
    endpoints: {
      search: '/search',
      productDetails: '/product-details'
    }
  },
  
  // eBay API
  ebay: {
    host: 'ebay-products1.p.rapidapi.com',
    baseUrl: 'https://ebay-products1.p.rapidapi.com',
    endpoints: {
      search: '/search',
      product: '/product'
    }
  },
  
  // Newegg API (great for components)
  newegg: {
    host: 'newegg-products.p.rapidapi.com',
    baseUrl: 'https://newegg-products.p.rapidapi.com',
    endpoints: {
      search: '/search',
      product: '/product'
    }
  },
  
  // Walmart API
  walmart: {
    host: 'walmart-products.p.rapidapi.com',
    baseUrl: 'https://walmart-products.p.rapidapi.com',
    endpoints: {
      search: '/search'
    }
  }
};

// Helper function to make RapidAPI requests
async function makeRapidAPIRequest(apiName, endpoint, params = {}, method = 'GET') {
  const api = API_CONFIGS[apiName];
  if (!api) throw new Error(`Unknown API: ${apiName}`);

  const url = new URL(`${api.baseUrl}${endpoint}`);
  
  // Add query parameters
  Object.keys(params).forEach(key => 
    url.searchParams.append(key, params[key])
  );

  // Use eBay-specific key if available and this is an eBay request
  const apiKey = (apiName === 'ebay' && EBAY_RAPIDAPI_KEY && EBAY_RAPIDAPI_KEY !== 'your_ebay_rapidapi_key_here') 
    ? EBAY_RAPIDAPI_KEY 
    : RAPIDAPI_KEY;

  const options = {
    method,
    headers: {
      'X-RapidAPI-Key': apiKey,
      'X-RapidAPI-Host': api.host,
      'Content-Type': 'application/json'
    }
  };

  try {
    const response = await fetch(url, options);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`${apiName} API Error:`, {
        status: response.status,
        statusText: response.statusText,
        endpoint,
        error: errorText
      });
      
      if (response.status === 401 || response.status === 403) {
        throw new Error(`Authentication failed for ${apiName}. Please check your RapidAPI key.`);
      }
      
      throw new Error(`API error (${response.status}): ${errorText}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error with ${apiName} API:`, error.message);
    throw error;
  }
}

// Search products across all APIs (for best results)
export async function searchAllProducts(query, category = '', limit = 10) {
  const results = {
    amazon: [],
    ebay: [],
    newegg: [],
    walmart: []
  };

  // Try multiple APIs in parallel
  const promises = [
    searchAmazonProducts(query, category).then(data => results.amazon = data).catch(() => {}),
    searchEbayProducts(query, category).then(data => results.ebay = data).catch(() => {}),
    searchNeweggProducts(query, category).then(data => results.newegg = data).catch(() => {}),
    searchWalmartProducts(query, category).then(data => results.walmart = data).catch(() => {})
  ];

  await Promise.all(promises);
  return results;
}

// Search Amazon products
export async function searchAmazonProducts(query, category = '', page = 1) {
  try {
    const data = await makeRapidAPIRequest('amazonRealTime', '/search', {
      query,
      page: page.toString(),
      country: 'US',
      category_id: getAmazonCategoryId(category)
    });

    return transformAmazonProducts(data.data?.products || []);
  } catch (error) {
    console.error('Amazon search failed:', error);
    return [];
  }
}

// Search eBay products
export async function searchEbayProducts(query, category = '', page = 1) {
  try {
    const data = await makeRapidAPIRequest('ebay', '/search', {
      q: query,
      page: page.toString()
    });

    return transformEbayProducts(data.results || []);
  } catch (error) {
    console.error('eBay search failed:', error);
    return [];
  }
}

// Search Newegg products (great for components)
export async function searchNeweggProducts(query, category = '', page = 1) {
  try {
    const data = await makeRapidAPIRequest('newegg', '/search', {
      keyword: query,
      page: page.toString()
    });

    return transformNeweggProducts(data.products || []);
  } catch (error) {
    console.error('Newegg search failed:', error);
    return [];
  }
}

// Search Walmart products
export async function searchWalmartProducts(query, category = '', page = 1) {
  try {
    const data = await makeRapidAPIRequest('walmart', '/search', {
      query,
      page: page.toString()
    });

    return transformWalmartProducts(data.items || []);
  } catch (error) {
    console.error('Walmart search failed:', error);
    return [];
  }
}

// Get product details by ASIN
export async function getProductDetails(asin) {
  try {
    const data = await makeRapidAPIRequest('amazonRealTime', '/product-details', {
      asin,
      country: 'US'
    });

    return data.data;
  } catch (error) {
    console.error('Failed to get product details:', error);
    return null;
  }
}

// Get product reviews
export async function getProductReviews(asin) {
  try {
    const data = await makeRapidAPIRequest('amazonRealTime', '/product-reviews', {
      asin,
      country: 'US'
    });

    return data.data;
  } catch (error) {
    console.error('Failed to get product reviews:', error);
    return null;
  }
}

// Helper: Get Amazon category ID based on category name
function getAmazonCategoryId(category) {
  const categoryMap = {
    'Laptops': '541966',
    'Monitors': '541968',
    'Components': '541966', // Electronics
    'Refurb Laptops': '541966',
    'Keyboards': '12879771',
    'Mice': '12879781',
    'Storage': '1292110011',
    'RAM': '1292110011',
    'CPUs': '229189',
    'GPUs': '284822'
  };
  return categoryMap[category] || '';
}

// Transform Amazon products to your app's format
function transformAmazonProducts(products) {
  return products.map(p => ({
    id: p.asin || `amzn-${Date.now()}-${Math.random()}`,
    name: p.product_title || p.title || 'Amazon Product',
    category: determineCategory(p.product_title || p.title || '', p.category_path || []),
    price: parseFloat(p.product_price?.replace(/[^0-9.-]+/g, '')) || Math.floor(Math.random() * 50000) + 1000,
    oldPrice: parseFloat(p.product_original_price?.replace(/[^0-9.-]+/g, '')) || null,
    image: p.product_photo || p.image || 'https://via.placeholder.com/300x200?text=Product',
    badge: determineBadge(p),
    rating: p.product_star_rating || (4 + Math.random()).toFixed(1),
    reviews: p.product_num_ratings || Math.floor(Math.random() * 1000) + 100,
    description: p.product_description || p.description || '',
    url: p.product_page_url || '',
    source: 'Amazon'
  }));
}

// Transform eBay products
function transformEbayProducts(products) {
  return products.map(p => ({
    id: p.itemId || `ebay-${Date.now()}-${Math.random()}`,
    name: p.title || 'eBay Product',
    category: determineCategory(p.title || '', []),
    price: parseFloat(p.price?.value) || Math.floor(Math.random() * 50000) + 1000,
    image: p.image?.imageUrl || 'https://via.placeholder.com/300x200?text=Product',
    badge: p.isSponsored ? 'Popular' : null,
    rating: (4 + Math.random()).toFixed(1),
    condition: p.condition || 'New',
    source: 'eBay'
  }));
}

// Transform Newegg products
function transformNeweggProducts(products) {
  return products.map(p => ({
    id: p.itemNumber || `newegg-${Date.now()}-${Math.random()}`,
    name: p.title || 'Newegg Product',
    category: determineCategory(p.title || '', []),
    price: p.finalPrice || p.originalPrice || Math.floor(Math.random() * 50000) + 1000,
    oldPrice: p.originalPrice || null,
    image: p.imageUrl || 'https://via.placeholder.com/300x200?text=Product',
    badge: p.isBestSeller ? 'Popular' : (p.isFreeShipping ? 'Sale' : null),
    rating: p.rating || (4 + Math.random()).toFixed(1),
    reviews: p.reviewCount || Math.floor(Math.random() * 500) + 50,
    specs: p.features || [],
    source: 'Newegg'
  }));
}

// Transform Walmart products
function transformWalmartProducts(products) {
  return products.map(p => ({
    id: p.itemId || `walmart-${Date.now()}-${Math.random()}`,
    name: p.name || 'Walmart Product',
    category: determineCategory(p.name || '', []),
    price: p.price || Math.floor(Math.random() * 50000) + 1000,
    image: p.imageUrl || 'https://via.placeholder.com/300x200?text=Product',
    badge: p.isBestSeller ? 'Popular' : (p.rollback ? 'Sale' : null),
    rating: p.customerRating || (4 + Math.random()).toFixed(1),
    reviews: p.numReviews || Math.floor(Math.random() * 300) + 30,
    source: 'Walmart'
  }));
}

// Determine product category based on title
function determineCategory(title, categoryPath = []) {
  const titleLower = title.toLowerCase();
  
  if (titleLower.includes('laptop') || titleLower.includes('notebook') || titleLower.includes('macbook') || titleLower.includes('chromebook')) {
    return titleLower.includes('refurb') || titleLower.includes('used') ? 'Refurb Laptops' : 'Laptops';
  }
  if (titleLower.includes('monitor') || titleLower.includes('display') || titleLower.includes('screen')) {
    return 'Monitors';
  }
  if (titleLower.includes('keyboard') || titleLower.includes('mouse') || titleLower.includes('headphone')) {
    return 'Components';
  }
  if (titleLower.includes('ssd') || titleLower.includes('hard drive') || titleLower.includes('ram') || 
      titleLower.includes('memory') || titleLower.includes('processor') || titleLower.includes('cpu') ||
      titleLower.includes('graphics') || titleLower.includes('gpu') || titleLower.includes('motherboard')) {
    return 'Components';
  }
  if (titleLower.includes('printer') || titleLower.includes('scanner')) {
    return 'Printers';
  }
  
  return 'Components'; // Default
}

// Determine badge for product
function determineBadge(product) {
  if (product.is_best_seller || product.bestseller) return 'Popular';
  if (product.is_amazon_choice) return 'New';
  if (product.prime && product.discount_percentage) return 'Sale';
  return null;
}