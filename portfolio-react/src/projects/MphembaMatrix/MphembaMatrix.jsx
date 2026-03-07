import React, { useState, useEffect } from 'react';
import { 
  FaSearch, FaShoppingCart, FaTimes, FaPlus, FaMinus, FaBars, 
  FaHeart, FaRegHeart, FaChevronDown, FaStar, FaChevronLeft, FaChevronRight,
  FaAmazon, FaEbay, FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, 
  FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaWhatsapp,
  FaLock, FaCreditCard, FaMapMarked, FaCheckCircle
} from 'react-icons/fa';
import { 
  searchAmazonProducts,
  searchEbayProducts,
  searchNeweggProducts,
  searchWalmartProducts,
  searchAllProducts,
  getProductDetails,
  getProductReviews
} from './RapidAPI'; // Import the new RapidAPI service
import './MphembaMatrix.css';

export default function MphembaMatrix() {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState('home');
  const [productsDropdownOpen, setProductsDropdownOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  
  // Checkout form state
  const [deliveryInfo, setDeliveryInfo] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    province: '',
    postalCode: '',
    notes: ''
  });
  
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: ''
  });
  
  // API State
  const [apiProducts, setApiProducts] = useState({
    laptops: [],
    monitors: [],
    components: [],
    refurbLaptops: [],
    printers: [],
    allProducts: []
  });
  
  const [loading, setLoading] = useState({
    laptops: true,
    monitors: true,
    components: true,
    refurbLaptops: true,
    printers: true
  });
  
  const [error, setError] = useState(null);
  const [activeSource, setActiveSource] = useState('all'); // 'amazon', 'ebay', 'newegg', 'walmart', 'all'

  // Hero slider images
  const heroSlides = [
    { src: `${import.meta.env.BASE_URL}images/amd-crimson-desert-bundle-woot.jpg`, alt: 'AMD Crimson Desert Bundle' },
    { src: `${import.meta.env.BASE_URL}images/amd-ryzen7-9850x3d-woot.jpg`, alt: 'AMD Ryzen 7 9850X3D' },
    { src: `${import.meta.env.BASE_URL}images/asus-rer-bundle-woot.jpg`, alt: 'ASUS Bundle' },
    { src: `${import.meta.env.BASE_URL}images/msi-rer-bundle-woot.jpg`, alt: 'MSI Bundle' },
    { src: `${import.meta.env.BASE_URL}images/nvgf-rerb-50series-woot.jpg`, alt: 'NVIDIA GeForce 50 Series' }
  ];

  // Fetch all products on component mount
  useEffect(() => {
    console.log('🔄 Initializing Mphemba Matrix - Fetching products from RapidAPI...');
    fetchAllCategoryProducts();
  }, []);

  // Fetch products for all categories
  const fetchAllCategoryProducts = async () => {
    setLoading({
      laptops: true,
      monitors: true,
      components: true,
      refurbLaptops: true,
      printers: true
    });

    try {
      console.log('🔍 Fetching products from multiple sources...');
      
      // Fetch laptops from multiple sources
      const laptopPromises = [
        searchAmazonProducts('laptop', 'Laptops').catch(err => { console.log('Amazon laptops failed:', err.message); return []; }),
        searchEbayProducts('laptop', 'Laptops').catch(err => { console.log('eBay laptops failed:', err.message); return []; }),
        searchNeweggProducts('laptop', 'Laptops').catch(err => { console.log('Newegg laptops failed:', err.message); return []; }),
        searchWalmartProducts('laptop', 'Laptops').catch(err => { console.log('Walmart laptops failed:', err.message); return []; })
      ];
      
      const laptopResults = await Promise.all(laptopPromises);
      const allLaptops = laptopResults.flat();
      const laptops = allLaptops.filter(p => p.category === 'Laptops');
      console.log(`✓ Fetched ${laptops.length} laptops`);
      
      // Fetch monitors
      const monitorPromises = [
        searchAmazonProducts('monitor', 'Monitors').catch(err => { console.log('Amazon monitors failed:', err.message); return []; }),
        searchEbayProducts('monitor', 'Monitors').catch(err => { console.log('eBay monitors failed:', err.message); return []; }),
        searchNeweggProducts('monitor', 'Monitors').catch(err => { console.log('Newegg monitors failed:', err.message); return []; }),
        searchWalmartProducts('monitor', 'Monitors').catch(err => { console.log('Walmart monitors failed:', err.message); return []; })
      ];
      
      const monitorResults = await Promise.all(monitorPromises);
      const monitors = monitorResults.flat().filter(p => p.category === 'Monitors');
      console.log(`✓ Fetched ${monitors.length} monitors`);
      
      // Fetch components (search multiple terms)
      const componentTerms = ['ssd', 'ram', 'cpu', 'gpu', 'keyboard', 'mouse'];
      const componentPromises = componentTerms.map(term => 
        searchAmazonProducts(term, 'Components').catch(err => { console.log(`Amazon ${term} failed:`, err.message); return []; })
      );
      
      const componentResults = await Promise.all(componentPromises);
      const components = componentResults.flat().filter(p => p.category === 'Components');
      console.log(`✓ Fetched ${components.length} components`);
      
      // Fetch refurbished laptops
      const refurbPromises = [
        searchAmazonProducts('refurbished laptop', 'Refurb Laptops').catch(err => { console.log('Amazon refurb failed:', err.message); return []; }),
        searchEbayProducts('refurbished laptop', 'Refurb Laptops').catch(err => { console.log('eBay refurb failed:', err.message); return []; })
      ];
      
      const refurbResults = await Promise.all(refurbPromises);
      const refurbLaptops = refurbResults.flat().filter(p => p.category === 'Refurb Laptops');
      console.log(`✓ Fetched ${refurbLaptops.length} refurbished laptops`);
      
      // Fetch printers
      const printerPromises = [
        searchAmazonProducts('printer', 'Printers').catch(err => { console.log('Amazon printers failed:', err.message); return []; }),
        searchEbayProducts('printer', 'Printers').catch(err => { console.log('eBay printers failed:', err.message); return []; }),
        searchNeweggProducts('printer', 'Printers').catch(err => { console.log('Newegg printers failed:', err.message); return []; }),
        searchWalmartProducts('printer', 'Printers').catch(err => { console.log('Walmart printers failed:', err.message); return []; })
      ];
      
      const printerResults = await Promise.all(printerPromises);
      const printers = printerResults.flat().filter(p => p.category === 'Printers');
      console.log(`✓ Fetched ${printers.length} printers`);

      // Combine all products for search
      const allProducts = [
        ...laptops,
        ...monitors,
        ...components,
        ...refurbLaptops,
        ...printers
      ];

      // Check if we got any real data
      const hasRealData = allProducts.length > 0;
      
      if (hasRealData) {
        console.log(`✅ Successfully fetched ${allProducts.length} total products from APIs`);
        setApiProducts({
          laptops: laptops.slice(0, 8),
          monitors: monitors.slice(0, 8),
          components: components.slice(0, 8),
          refurbLaptops: refurbLaptops.slice(0, 6),
          printers: printers.slice(0, 6),
          allProducts
        });
      } else {
        console.warn('⚠️ No products fetched from APIs, using fallback data');
        const fallback = getFallbackProducts();
        fallback.allProducts = [
          ...fallback.laptops,
          ...fallback.monitors,
          ...fallback.components,
          ...fallback.refurbLaptops,
          ...fallback.printers
        ];
        setApiProducts(fallback);
      }

    } catch (err) {
      const errorMsg = 'Error fetching products: ' + err.message;
      setError(errorMsg);
      console.error('❌ Fetch error details:', err);
      console.log('ℹ️ Using fallback products due to API error');
      
      // Fallback to some default products if API fails
      const fallback = getFallbackProducts();
      fallback.allProducts = [
        ...fallback.laptops,
        ...fallback.monitors,
        ...fallback.components,
        ...fallback.refurbLaptops,
        ...fallback.printers
      ];
      setApiProducts(fallback);
    } finally {
      setLoading({
        laptops: false,
        monitors: false,
        components: false,
        refurbLaptops: false,
        printers: false
      });
    }
  };

  // Search handler
  const handleSearch = async (keyword) => {
    if (!keyword.trim()) return;
    
    setLoading(prev => ({ ...prev, search: true }));
    try {
      const results = await searchAllProducts(keyword);
      
      // Combine all results
      const combinedResults = [
        ...(results.amazon || []),
        ...(results.ebay || []),
        ...(results.newegg || []),
        ...(results.walmart || [])
      ];
      
      setApiProducts(prev => ({
        ...prev,
        searchResults: combinedResults
      }));
      
      setCurrentPage('search-results');
    } catch (err) {
      console.error('Search failed:', err);
    } finally {
      setLoading(prev => ({ ...prev, search: false }));
    }
  };

  // Filter products by source
  const getProductsBySource = (products, source) => {
    if (source === 'all') return products;
    return products.filter(p => p.source === source);
  };

  // Auto-play slider
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % heroSlides.length);
    }, 10000);
    return () => clearInterval(interval);
  }, [heroSlides.length]);

  const nextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide(prev => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // Cart functions
  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const toggleWishlist = (product) => {
    setWishlist(prev => {
      const exists = prev.find(item => item.id === product.id);
      if (exists) {
        return prev.filter(item => item.id !== product.id);
      }
      return [...prev, product];
    });
  };

  const updateQuantity = (id, delta) => {
    setCart(prev => prev.map(item => 
      item.id === id 
        ? { ...item, quantity: Math.max(1, item.quantity + delta) }
        : item
    ));
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Checkout handlers
  const handleDeliveryChange = (e) => {
    const { name, value } = e.target;
    setDeliveryInfo(prev => ({ ...prev, [name]: value }));
  };

  const handlePaymentChange = (e) => {
    const { name, value } = e.target;
    setPaymentInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckout = () => {
    setCartOpen(false);
    setCheckoutOpen(true);
  };

  const handleCheckoutSubmit = (e) => {
    e.preventDefault();
    
    // Validate all fields are filled
    const deliveryComplete = Object.values(deliveryInfo).filter((v, i) => i < 7).every(v => v.trim() !== '');
    const paymentComplete = Object.values(paymentInfo).every(v => v.trim() !== '');
    
    if (deliveryComplete && paymentComplete) {
      // Show success alert
      alert('Test Successful');
      
      // Clear cart and close modal
      setCart([]);
      setCheckoutOpen(false);
      
      // Reset forms
      setDeliveryInfo({
        fullName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        province: '',
        postalCode: '',
        notes: ''
      });
      setPaymentInfo({
        cardNumber: '',
        cardName: '',
        expiryDate: '',
        cvv: ''
      });
    } else {
      alert('Please fill in all required fields');
    }
  };

  // Product Card Component
  const ProductCard = ({ product }) => (
    <div className="product-card-mini">
      <div className="product-image-mini">
        {product.badge && <span className={`badge badge-${product.badge.toLowerCase()}`}>{product.badge}</span>}
        <img src={product.image} alt={product.name} />
        <button className="wishlist-btn" onClick={() => toggleWishlist(product)}>
          {wishlist.find(item => item.id === product.id) ? <FaHeart /> : <FaRegHeart />}
        </button>
        {product.source && (
          <span className="source-badge">
            {product.source === 'Amazon' && <FaAmazon />}
            {product.source === 'eBay' && <FaEbay />}
            {product.source}
          </span>
        )}
      </div>
      <div className="product-info-mini">
        <h4>{product.name.length > 50 ? product.name.substring(0, 50) + '...' : product.name}</h4>
        <div className="product-rating">
          {[...Array(5)].map((_, i) => (
            <FaStar key={i} className={i < Math.floor(product.rating) ? 'filled' : ''} />
          ))}
          <span>({product.reviews || Math.floor(Math.random() * 500) + 50})</span>
        </div>
        <div className="product-price-row">
          <div>
            <span className="product-price">R{product.price.toLocaleString()}</span>
            {product.oldPrice && <span className="product-old-price">R{product.oldPrice.toLocaleString()}</span>}
          </div>
          <button className="quick-add-btn" onClick={() => addToCart(product)}>
            <FaShoppingCart />
          </button>
        </div>
      </div>
    </div>
  );

  // Loading Spinner
  const LoadingSpinner = () => (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <p>Loading products from Amazon, eBay, and more...</p>
    </div>
  );

  // Source Filter Component
  const SourceFilter = () => (
    <div className="source-filter">
      <button 
        className={`source-btn ${activeSource === 'all' ? 'active' : ''}`}
        onClick={() => setActiveSource('all')}
      >
        All Sources
      </button>
      <button 
        className={`source-btn ${activeSource === 'Amazon' ? 'active' : ''}`}
        onClick={() => setActiveSource('Amazon')}
      >
        <FaAmazon /> Amazon
      </button>
      <button 
        className={`source-btn ${activeSource === 'eBay' ? 'active' : ''}`}
        onClick={() => setActiveSource('eBay')}
      >
        <FaEbay /> eBay
      </button>
    </div>
  );

  // Home Page
  const HomePage = () => (
    <>
      {/* Hero Slider Section */}
      <section className="matrix-hero">
        <div className="hero-slider">
          {heroSlides.map((slide, index) => (
            <div
              key={index}
              className={`hero-slide ${index === currentSlide ? 'active' : ''}`}
            >
              <img src={slide.src} alt={slide.alt} />
            </div>
          ))}
          
          <button className="slider-btn prev-btn" onClick={prevSlide}>
            <FaChevronLeft />
          </button>
          <button className="slider-btn next-btn" onClick={nextSlide}>
            <FaChevronRight />
          </button>
          
          <div className="slider-dots">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                className={`dot ${index === currentSlide ? 'active' : ''}`}
                onClick={() => goToSlide(index)}
              />
            ))}
          </div>
        </div>
      </section>

      <SourceFilter />

      {Object.values(loading).some(l => l) ? (
        <LoadingSpinner />
      ) : error ? (
        <div className="error-message">{error}</div>
      ) : (
        <section className="featured-categories">
          {/* Laptops Section */}
          {getProductsBySource(apiProducts.laptops, activeSource).length > 0 && (
            <section className="laptops-section">
              <div className="category-showcase">
                <div className="category-header">
                  <h3>Laptops</h3>
                  <a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('laptops'); }}>View All →</a>
                </div>
                <div className="products-grid">
                  {getProductsBySource(apiProducts.laptops, activeSource).slice(0, 4).map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Monitors Section */}
          {getProductsBySource(apiProducts.monitors, activeSource).length > 0 && (
            <section className="monitors-section">
              <div className="category-showcase">
                <div className="category-header">
                  <h3>Monitors</h3>
                  <a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('monitors'); }}>View All →</a>
                </div>
                <div className="products-grid">
                  {getProductsBySource(apiProducts.monitors, activeSource).slice(0, 4).map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Components Section */}
          {getProductsBySource(apiProducts.components, activeSource).length > 0 && (
            <section className="components-section">
              <div className="category-showcase">
                <div className="category-header">
                  <h3>Components</h3>
                  <a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('components'); }}>View All →</a>
                </div>
                <div className="products-grid">
                  {getProductsBySource(apiProducts.components, activeSource).slice(0, 4).map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Refurb Laptops Section */}
          {getProductsBySource(apiProducts.refurbLaptops, activeSource).length > 0 && (
            <section className="refurb-section">
              <div className="category-showcase">
                <div className="category-header">
                  <h3>Refurb Laptops</h3>
                  <a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('refurbished'); }}>View All →</a>
                </div>
                <div className="products-grid">
                  {getProductsBySource(apiProducts.refurbLaptops, activeSource).slice(0, 4).map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Printers Section */}
          {getProductsBySource(apiProducts.printers, activeSource).length > 0 && (
            <section className="printers-section">
              <div className="category-showcase">
                <div className="category-header">
                  <h3>Printers</h3>
                  <a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('printers'); }}>View All →</a>
                </div>
                <div className="products-grid">
                  {getProductsBySource(apiProducts.printers, activeSource).slice(0, 4).map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </div>
            </section>
          )}
        </section>
      )}
    </>
  );

  // Category Page
  const CategoryPage = ({ category, title }) => {
    const categoryKey = category.toLowerCase().replace(' ', '');
    const products = getProductsBySource(apiProducts[categoryKey] || [], activeSource);
    
    return (
      <section className="matrix-products">
        <div className="matrix-container">
          <h2>{title} ({products.length} products)</h2>
          <SourceFilter />
          {loading[categoryKey] ? (
            <LoadingSpinner />
          ) : products.length > 0 ? (
            <div className="products-grid-large">
              {products.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="no-products">No products found in this category</div>
          )}
        </div>
      </section>
    );
  };

  // Search Results Page
  const SearchResultsPage = () => (
    <section className="matrix-products">
      <div className="matrix-container">
        <h2>Search Results for "{searchTerm}"</h2>
        <SourceFilter />
        {loading.search ? (
          <LoadingSpinner />
        ) : apiProducts.searchResults?.length > 0 ? (
          <div className="products-grid-large">
            {getProductsBySource(apiProducts.searchResults, activeSource).map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="no-products">No products found matching your search</div>
        )}
      </div>
    </section>
  );

  // Fallback products (used when API fails or returns no results)
  const getFallbackProducts = () => ({
    laptops: [
      {
        id: 'fallback-laptop-1',
        name: 'Apple MacBook Pro 16" M3 Pro',
        category: 'Laptops',
        price: 32999,
        image: 'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/mbp16-spacegray-select-202310',
        badge: 'New',
        rating: 4.9,
        reviews: 1245,
        description: 'Professional laptop with M3 Pro chip',
        source: 'Fallback'
      },
      {
        id: 'fallback-laptop-2',
        name: 'Dell XPS 15 9530',
        category: 'Laptops',
        price: 28999,
        image: 'https://via.placeholder.com/300x200?text=Dell+XPS+15',
        badge: 'Popular',
        rating: 4.7,
        reviews: 892,
        description: 'High-performance business laptop',
        source: 'Fallback'
      },
      {
        id: 'fallback-laptop-3',
        name: 'HP Spectre x360 14',
        category: 'Laptops',
        price: 24999,
        image: 'https://via.placeholder.com/300x200?text=HP+Spectre',
        badge: null,
        rating: 4.6,
        reviews: 654,
        description: 'Convertible premium laptop',
        source: 'Fallback'
      },
      {
        id: 'fallback-laptop-4',
        name: 'Lenovo ThinkPad X1 Carbon',
        category: 'Laptops',
        price: 26999,
        image: 'https://via.placeholder.com/300x200?text=ThinkPad',
        badge: 'Popular',
        rating: 4.8,
        reviews: 1023,
        description: 'Business laptop with excellent keyboard',
        source: 'Fallback'
      }
    ],
    monitors: [
      {
        id: 'fallback-monitor-1',
        name: 'LG UltraGear 27" 4K Gaming',
        category: 'Monitors',
        price: 8999,
        image: 'https://via.placeholder.com/300x200?text=LG+Monitor',
        badge: 'Popular',
        rating: 4.6,
        reviews: 567,
        description: '4K gaming monitor with 144Hz',
        source: 'Fallback'
      },
      {
        id: 'fallback-monitor-2',
        name: 'Samsung Odyssey G7 32"',
        category: 'Monitors',
        price: 11999,
        image: 'https://via.placeholder.com/300x200?text=Samsung+G7',
        badge: 'New',
        rating: 4.7,
        reviews: 432,
        description: 'Curved gaming monitor',
        source: 'Fallback'
      },
      {
        id: 'fallback-monitor-3',
        name: 'Dell UltraSharp 27" 4K',
        category: 'Monitors',
        price: 9999,
        image: 'https://via.placeholder.com/300x200?text=Dell+UltraSharp',
        badge: null,
        rating: 4.8,
        reviews: 789,
        description: 'Professional monitor for creators',
        source: 'Fallback'
      }
    ],
    components: [
      {
        id: 'fallback-component-1',
        name: 'Samsung 980 Pro 1TB NVMe SSD',
        category: 'Components',
        price: 2499,
        image: 'https://via.placeholder.com/300x200?text=Samsung+SSD',
        badge: 'New',
        rating: 4.8,
        reviews: 923,
        description: 'High-speed NVMe SSD',
        source: 'Fallback'
      },
      {
        id: 'fallback-component-2',
        name: 'Corsair Vengeance 32GB DDR5',
        category: 'Components',
        price: 3499,
        image: 'https://via.placeholder.com/300x200?text=Corsair+RAM',
        badge: 'Popular',
        rating: 4.7,
        reviews: 645,
        description: 'High-performance DDR5 memory',
        source: 'Fallback'
      },
      {
        id: 'fallback-component-3',
        name: 'Logitech MX Master 3S',
        category: 'Components',
        price: 1799,
        image: 'https://via.placeholder.com/300x200?text=MX+Master',
        badge: null,
        rating: 4.9,
        reviews: 1234,
        description: 'Premium wireless mouse',
        source: 'Fallback'
      },
      {
        id: 'fallback-component-4',
        name: 'Keychron K8 Pro Mechanical',
        category: 'Components',
        price: 2299,
        image: 'https://via.placeholder.com/300x200?text=Keychron+K8',
        badge: 'New',
        rating: 4.6,
        reviews: 456,
        description: 'Wireless mechanical keyboard',
        source: 'Fallback'
      }
    ],
    refurbLaptops: [
      {
        id: 'fallback-refurb-1',
        name: 'Refurbished MacBook Air M1',
        category: 'Refurb Laptops',
        price: 13999,
        oldPrice: 19999,
        image: 'https://via.placeholder.com/300x200?text=MacBook+Air',
        badge: 'Sale',
        rating: 4.8,
        reviews: 234,
        description: 'Apple certified refurbished',
        source: 'Fallback'
      },
      {
        id: 'fallback-refurb-2',
        name: 'Refurbished Dell XPS 13',
        category: 'Refurb Laptops',
        price: 14999,
        oldPrice: 21999,
        image: 'https://via.placeholder.com/300x200?text=Dell+XPS+13',
        badge: 'Sale',
        rating: 4.6,
        reviews: 178,
        description: 'Like new condition with warranty',
        source: 'Fallback'
      }
    ],
    printers: [
      {
        id: 'fallback-printer-1',
        name: 'HP LaserJet Pro MFP M428fdw',
        category: 'Printers',
        price: 8999,
        image: 'https://via.placeholder.com/300x200?text=HP+LaserJet',
        badge: 'Popular',
        rating: 4.5,
        reviews: 345,
        description: 'Multifunction laser printer',
        source: 'Fallback'
      },
      {
        id: 'fallback-printer-2',
        name: 'Canon PIXMA TR8620',
        category: 'Printers',
        price: 3999,
        image: 'https://via.placeholder.com/300x200?text=Canon+PIXMA',
        badge: null,
        rating: 4.4,
        reviews: 289,
        description: 'All-in-one inkjet printer',
        source: 'Fallback'
      }
    ],
    allProducts: []
  });

  return (
    <div className="mphemba-matrix">
      {/* Header */}
      <header className="matrix-header">
        <div className="matrix-container">
          <div className="matrix-logo">
            <h1>MPHEMBA <span>MATRIX</span></h1>
            <p>Premium Tech Solutions</p>
          </div>
          
          <nav className={`matrix-nav ${mobileMenuOpen ? 'mobile-open' : ''}`}>
            <ul>
              <li>
                <a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('home'); }}>Home</a>
              </li>
              <li 
                className="dropdown"
                onMouseEnter={() => setProductsDropdownOpen(true)}
                onMouseLeave={() => setProductsDropdownOpen(false)}
              >
                <a href="#" onClick={(e) => e.preventDefault()}>
                  Products <FaChevronDown />
                </a>
                {productsDropdownOpen && (
                  <ul className="dropdown-menu show">
                    <li>
                      <a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('laptops'); setProductsDropdownOpen(false); }}>
                        Laptops
                      </a>
                    </li>
                    <li>
                      <a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('monitors'); setProductsDropdownOpen(false); }}>
                        Monitors
                      </a>
                    </li>
                    <li>
                      <a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('components'); setProductsDropdownOpen(false); }}>
                        Components
                      </a>
                    </li>
                    <li>
                      <a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('refurbished'); setProductsDropdownOpen(false); }}>
                        Refurb Laptops
                      </a>
                    </li>
                    <li>
                      <a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('printers'); setProductsDropdownOpen(false); }}>
                        Printers
                      </a>
                    </li>
                  </ul>
                )}
              </li>
              <li>
                <a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('about'); }}>About</a>
              </li>
              <li>
                <a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('contact'); }}>Contact</a>
              </li>
            </ul>
          </nav>
          
          <div className="matrix-actions">
            <div className="matrix-search">
              <input 
                type="text" 
                placeholder="Search products..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch(searchTerm)}
              />
              <FaSearch onClick={() => handleSearch(searchTerm)} />
            </div>
            <div className="matrix-cart-icon" onClick={() => setCartOpen(true)}>
              <FaShoppingCart />
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </div>
          </div>
          
          <button className="mobile-menu-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <FaBars />
          </button>
        </div>
      </header>

      {/* Page Content */}
      {currentPage === 'home' && <HomePage />}
      {currentPage === 'laptops' && <CategoryPage category="Laptops" title="Laptops" />}
      {currentPage === 'monitors' && <CategoryPage category="Monitors" title="Monitors" />}
      {currentPage === 'components' && <CategoryPage category="Components" title="Components" />}
      {currentPage === 'refurbished' && <CategoryPage category="Refurb Laptops" title="Refurbished Laptops" />}
      {currentPage === 'printers' && <CategoryPage category="Printers" title="Printers" />}
      {currentPage === 'search-results' && <SearchResultsPage />}
      
      {/* About Page */}
      {currentPage === 'about' && (
        <section className="matrix-about">
          <div className="about-hero">
            <div className="matrix-container">
              <h1>About Mphemba Matrix</h1>
              <p className="about-subtitle">Your Trusted Partner for Premium Tech Solutions</p>
            </div>
          </div>
          
          <div className="matrix-container">
            <div className="about-grid">
              <div className="about-card">
                {/* Who We Are */}
                <div className="about-icon">
                  <FaStar />
                </div>
                <h3>Who We Are</h3>
                <p>
                  Mphemba Matrix is a leading technology solutions provider based in South Africa. 
                  We specialize in delivering premium laptops, monitors, computer components, and 
                  refurbished tech products to individuals and businesses across the region.
                </p>
                <p>
                  With years of experience in the tech industry, we pride ourselves on offering 
                  quality products, competitive prices, and exceptional customer service.
                </p>
              </div>

              <div className="about-card">
                {/* What We Offer */}
                <div className="about-icon">
                  <FaShoppingCart />
                </div>
                <h3>What We Offer</h3>
                <ul className="about-list">
                  <li>High-performance laptops from top brands</li>
                  <li>Professional-grade monitors for work and gaming</li>
                  <li>Quality computer components and peripherals</li>
                  <li>Certified refurbished laptops with warranty</li>
                  <li>Printers and office equipment</li>
                  <li>Expert technical support and advice</li>
                </ul>
              </div>

              <div className="about-card">
                {/* Where We're Based */}
                <div className="about-icon">
                  <FaHeart />
                </div>
                <h3>Where We're Based</h3>
                <p>
                  We operate from Johannesburg, South Africa, serving customers nationwide. 
                  Our strategic location allows us to provide fast delivery and excellent 
                  after-sales support throughout the country.
                </p>
                <p>
                  Whether you're in Cape Town, Durban, Pretoria, or anywhere in between, 
                  we're committed to bringing premium tech solutions right to your doorstep.
                </p>
              </div>

              <div className="about-card">
                {/* Shipping & Delivery */}
                <div className="about-icon">
                  <FaShoppingCart />
                </div>
                <h3>Shipping & Delivery</h3>
                <p>
                  We offer reliable nationwide shipping with tracking on all orders. 
                  Delivery times vary by location:
                </p>
                <ul className="about-list">
                  <li>Gauteng: 1-2 business days</li>
                  <li>Major cities: 2-3 business days</li>
                  <li>Remote areas: 3-5 business days</li>
                </ul>
                <p>Free shipping on orders over R5,000!</p>
              </div>
            </div>
          </div>
        </section>
      )}
      
      {currentPage === 'contact' && (
        <section className="matrix-contact">
          <div className="contact-hero">
            <div className="matrix-container">
              <h1>Contact Us</h1>
              <p className="contact-subtitle">We're here to help! Get in touch with our team</p>
            </div>
          </div>
          
          <div className="matrix-container">
            <div className="contact-grid">
              {/* Contact Information Cards */}
              <div className="contact-info">
                <div className="contact-card">
                  <div className="contact-icon">
                    <FaPhone />
                  </div>
                  <h3>Phone</h3>
                  <p>+27 11 123 4567</p>
                  <p>+27 82 456 7890</p>
                  <p className="contact-note">Mon-Fri: 8AM - 5PM</p>
                </div>

                <div className="contact-card">
                  <div className="contact-icon">
                    <FaEnvelope />
                  </div>
                  <h3>Email</h3>
                  <p>info@mphembamatrix.co.za</p>
                  <p>sales@mphembamatrix.co.za</p>
                  <p>support@mphembamatrix.co.za</p>
                </div>

                <div className="contact-card">
                  <div className="contact-icon">
                    <FaMapMarkerAlt />
                  </div>
                  <h3>Address</h3>
                  <p>123 Tech Plaza</p>
                  <p>Sandton City, Johannesburg</p>
                  <p>Gauteng, 2196</p>
                  <p>South Africa</p>
                </div>

                <div className="contact-card">
                  <div className="contact-icon">
                    <FaClock />
                  </div>
                  <h3>Business Hours</h3>
                  <p><strong>Monday - Friday:</strong></p>
                  <p>8:00 AM - 5:00 PM</p>
                  <p><strong>Saturday:</strong></p>
                  <p>9:00 AM - 2:00 PM</p>
                  <p><strong>Sunday:</strong> Closed</p>
                </div>

                <div className="contact-card">
                  <div className="contact-icon">
                    <FaWhatsapp />
                  </div>
                  <h3>WhatsApp</h3>
                  <p>+27 82 456 7890</p>
                  <p className="contact-note">Quick response for urgent queries</p>
                </div>

                <div className="contact-card social-card">
                  <h3>Follow Us</h3>
                  <div className="social-links">
                    <a href="#" className="social-link">
                      <FaFacebook />
                    </a>
                    <a href="#" className="social-link">
                      <FaTwitter />
                    </a>
                    <a href="#" className="social-link">
                      <FaInstagram />
                    </a>
                    <a href="#" className="social-link">
                      <FaLinkedin />
                    </a>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="contact-form-wrapper">
                <div className="contact-form-card">
                  <h2>Send Us a Message</h2>
                  <p>Have a question or need assistance? Fill out the form below and we'll get back to you shortly.</p>
                  
                  <form className="contact-form">
                    <div className="form-group">
                      <label htmlFor="name">Full Name *</label>
                      <input 
                        type="text" 
                        id="name" 
                        name="name" 
                        placeholder="Enter your full name"
                        required 
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="email">Email Address *</label>
                      <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        placeholder="your.email@example.com"
                        required 
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="phone">Phone Number</label>
                      <input 
                        type="tel" 
                        id="phone" 
                        name="phone" 
                        placeholder="+27 XX XXX XXXX"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="subject">Subject *</label>
                      <select id="subject" name="subject" required>
                        <option value="">Select a subject</option>
                        <option value="general">General Inquiry</option>
                        <option value="product">Product Question</option>
                        <option value="order">Order Status</option>
                        <option value="support">Technical Support</option>
                        <option value="partnership">Business Partnership</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label htmlFor="message">Message *</label>
                      <textarea 
                        id="message" 
                        name="message" 
                        rows="6"
                        placeholder="Tell us how we can help you..."
                        required
                      ></textarea>
                    </div>

                    <button type="submit" className="submit-btn">
                      <FaEnvelope /> Send Message
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Cart Sidebar */}
      {cartOpen && (
        <>
          <div className="cart-overlay" onClick={() => setCartOpen(false)}></div>
          <div className="cart-sidebar">
            <div className="cart-header">
              <h2>Shopping Cart ({cart.length})</h2>
              <button className="close-btn" onClick={() => setCartOpen(false)}>
                <FaTimes />
              </button>
            </div>
            {cart.length === 0 ? (
              <div className="empty-cart">
                <FaShoppingCart />
                <p>Your cart is empty</p>
              </div>
            ) : (
              <div className="cart-items">
                {cart.map(item => (
                  <div key={item.id} className="cart-item">
                    <img src={item.image} alt={item.name} />
                    <div className="item-details">
                      <h4>{item.name}</h4>
                      <p className="item-price">R{item.price.toLocaleString()}</p>
                      <div className="quantity-controls">
                        <button onClick={() => updateQuantity(item.id, -1)}>
                          <FaMinus />
                        </button>
                        <span>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, 1)}>
                          <FaPlus />
                        </button>
                      </div>
                    </div>
                    <button className="remove-btn" onClick={() => removeFromCart(item.id)}>
                      <FaTimes />
                    </button>
                  </div>
                ))}
              </div>
            )}
            {cart.length > 0 && (
              <div className="cart-footer">
                <div className="cart-total">
                  <span>Total:</span>
                  <span>R{cartTotal.toLocaleString()}</span>
                </div>
                <button className="checkout-btn" onClick={handleCheckout}>Checkout</button>
                <button className="continue-shopping" onClick={() => setCartOpen(false)}>
                  Continue Shopping
                </button>
              </div>
            )}
          </div>
        </>
      )}

      {/* Checkout Modal */}
      {checkoutOpen && (
        <>
          <div className="checkout-overlay" onClick={() => setCheckoutOpen(false)}></div>
          <div className="checkout-modal">
            <div className="checkout-header">
              <h2><FaLock /> Secure Checkout</h2>
              <button className="close-btn" onClick={() => setCheckoutOpen(false)}>
                <FaTimes />
              </button>
            </div>

            <div className="checkout-content">
              <form onSubmit={handleCheckoutSubmit}>
                {/* Order Summary */}
                <div className="checkout-section">
                  <h3><FaShoppingCart /> Order Summary</h3>
                  <div className="checkout-items">
                    {cart.map(item => (
                      <div key={item.id} className="checkout-item">
                        <img src={item.image} alt={item.name} />
                        <div className="checkout-item-info">
                          <h4>{item.name}</h4>
                          <p>Qty: {item.quantity} × R{item.price.toLocaleString()}</p>
                        </div>
                        <div className="checkout-item-total">
                          R{(item.price * item.quantity).toLocaleString()}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="checkout-total">
                    <span>Total Amount:</span>
                    <span className="total-amount">R{cartTotal.toLocaleString()}</span>
                  </div>
                </div>

                {/* Delivery Information */}
                <div className="checkout-section">
                  <h3><FaMapMarked /> Delivery Information</h3>
                  <div className="checkout-form-grid">
                    <div className="form-group">
                      <label htmlFor="fullName">Full Name *</label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={deliveryInfo.fullName}
                        onChange={handleDeliveryChange}
                        placeholder="Enter your full name"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="email">Email Address *</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={deliveryInfo.email}
                        onChange={handleDeliveryChange}
                        placeholder="your.email@example.com"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="phone">Phone Number *</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={deliveryInfo.phone}
                        onChange={handleDeliveryChange}
                        placeholder="+27 XX XXX XXXX"
                        required
                      />
                    </div>

                    <div className="form-group full-width">
                      <label htmlFor="address">Street Address *</label>
                      <input
                        type="text"
                        id="address"
                        name="address"
                        value={deliveryInfo.address}
                        onChange={handleDeliveryChange}
                        placeholder="123 Main Street, Apartment 4B"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="city">City *</label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={deliveryInfo.city}
                        onChange={handleDeliveryChange}
                        placeholder="Johannesburg"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="province">Province *</label>
                      <select
                        id="province"
                        name="province"
                        value={deliveryInfo.province}
                        onChange={handleDeliveryChange}
                        required
                      >
                        <option value="">Select Province</option>
                        <option value="Gauteng">Gauteng</option>
                        <option value="Western Cape">Western Cape</option>
                        <option value="Eastern Cape">Eastern Cape</option>
                        <option value="KwaZulu-Natal">KwaZulu-Natal</option>
                        <option value="Free State">Free State</option>
                        <option value="Limpopo">Limpopo</option>
                        <option value="Mpumalanga">Mpumalanga</option>
                        <option value="Northern Cape">Northern Cape</option>
                        <option value="North West">North West</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label htmlFor="postalCode">Postal Code *</label>
                      <input
                        type="text"
                        id="postalCode"
                        name="postalCode"
                        value={deliveryInfo.postalCode}
                        onChange={handleDeliveryChange}
                        placeholder="2196"
                        required
                      />
                    </div>

                    <div className="form-group full-width">
                      <label htmlFor="notes">Delivery Notes (Optional)</label>
                      <textarea
                        id="notes"
                        name="notes"
                        value={deliveryInfo.notes}
                        onChange={handleDeliveryChange}
                        placeholder="Any special delivery instructions..."
                        rows="2"
                      ></textarea>
                    </div>
                  </div>
                </div>

                {/* Payment Information */}
                <div className="checkout-section">
                  <h3><FaCreditCard /> Payment Information</h3>
                  <div className="secure-badge">
                    <FaLock /> Secure SSL Encrypted Payment
                  </div>
                  
                  <div className="checkout-form-grid">
                    <div className="form-group full-width">
                      <label htmlFor="cardNumber">Card Number *</label>
                      <input
                        type="text"
                        id="cardNumber"
                        name="cardNumber"
                        value={paymentInfo.cardNumber}
                        onChange={handlePaymentChange}
                        placeholder="1234 5678 9012 3456"
                        maxLength="19"
                        required
                      />
                    </div>

                    <div className="form-group full-width">
                      <label htmlFor="cardName">Cardholder Name *</label>
                      <input
                        type="text"
                        id="cardName"
                        name="cardName"
                        value={paymentInfo.cardName}
                        onChange={handlePaymentChange}
                        placeholder="Name as shown on card"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="expiryDate">Expiry Date *</label>
                      <input
                        type="text"
                        id="expiryDate"
                        name="expiryDate"
                        value={paymentInfo.expiryDate}
                        onChange={handlePaymentChange}
                        placeholder="MM/YY"
                        maxLength="5"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="cvv">CVV *</label>
                      <input
                        type="text"
                        id="cvv"
                        name="cvv"
                        value={paymentInfo.cvv}
                        onChange={handlePaymentChange}
                        placeholder="123"
                        maxLength="4"
                        required
                      />
                    </div>
                  </div>

                  <div className="payment-methods">
                    <p>We accept:</p>
                    <div className="payment-icons">
                      <span>💳 Visa</span>
                      <span>💳 Mastercard</span>
                      <span>💳 Amex</span>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="checkout-actions">
                  <button type="submit" className="complete-order-btn">
                    <FaCheckCircle /> Complete Order - R{cartTotal.toLocaleString()}
                  </button>
                  <button type="button" className="cancel-btn" onClick={() => setCheckoutOpen(false)}>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
}