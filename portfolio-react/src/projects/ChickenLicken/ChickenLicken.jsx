import React, { useState, useEffect, useRef } from 'react';
import { FaChevronLeft, FaChevronRight, FaTimes, FaMapMarkerAlt, FaPhone, FaUser, FaClock, FaHome, FaCheckCircle, FaShoppingCart, FaPlus, FaMinus, FaTrash, FaBars, FaClock as FaClockAlt, FaTruck, FaFire, FaStar, FaEye, FaCartPlus, FaArrowRight } from 'react-icons/fa';
import './ChickenLicken.css';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';

const promoItems = [
  {
    id: 1,
    image: '/images/demo2.png',
    name: 'Salad Chicken',
    price: 12.00,
    badge: 'NEW',
    description: 'Fresh & Healthy'
  },
  {
    id: 2,
    image: '/images/chick2.png',
    name: 'New Burger',
    price: 75.00,
    badge: 'HOT',
    description: 'Double Patty'
  },
  {
    id: 3,
    image: '/images/demo3.png',
    name: 'SoulBites',
    price: 45.00,
    badge: '-20%',
    description: 'Crispy Chicken Bites'
  },
  {
    id: 4,
    image: '/images/demo4.png',
    name: "Sundae Lick'n",
    price: 25.00,
    badge: 'NEW',
    description: 'Ice Cream Delight'
  },
  {
    id: 5,
    image: '/images/demo5.png',
    name: 'Breakfast',
    price: 68.00,
    badge: 'BEST',
    description: 'Eggs, Bacon, Toast'
  },
  {
    id: 6,
    image: '/images/demo1.png',
    name: 'Pop Chicken Shaker',
    price: 30.00,
    badge: 'POP',
    description: 'Spicy Shake'
  }
];

const menuItems = [
  {
    id: 1,
    name: 'LUNCH Meal',
    price: 75.00,
    description: '2 pieces + toast + 300ml Coke',
    image: '/images/meal1.png',
    category: 'meals',
    badge: 'Popular'
  },
  {
    id: 2,
    name: 'HOTWINGS MEAL MAX®',
    price: 92.00,
    description: '8 Hotwings® + toast + 440ml Coke',
    image: '/images/meal2.png',
    category: 'meals',
    badge: 'Spicy'
  },
  {
    id: 3,
    name: 'SOULSISTER Party®',
    price: 120.00,
    description: '5 pieces + 2 regular Soul Fries™',
    image: '/images/meal3.png',
    category: 'meals',
    badge: 'Family'
  },
  {
    id: 4,
    name: 'SOULSISTER®',
    price: 43.00,
    description: '2 pieces + Soul Fries™',
    image: '/images/meal4.png',
    category: 'meals',
    badge: null
  },
  {
    id: 5,
    name: 'SOULSISTER Max®',
    price: 65.00,
    description: '2 pieces + Soul Fries™ + 440ml Coke',
    image: '/images/meal5.png',
    category: 'meals',
    badge: 'Value'
  },
  {
    id: 6,
    name: 'Chicken INN®',
    price: 150.00,
    description: '9 pieces SoulFire® chicken',
    image: '/images/meal6.png',
    category: 'meals',
    badge: 'Share'
  },
  {
    id: 7,
    name: 'FAMILY Barrel®',
    price: 300.00,
    description: '16 Hotwings®',
    image: '/images/meal7.png',
    category: 'meals',
    badge: 'Party'
  },
  {
    id: 8,
    name: 'ROCK MY SOUL®',
    price: 60.00,
    description: '3 pieces + Soul Fries™ + SoulFire® sauce',
    image: '/images/meal8.png',
    category: 'meals',
    badge: 'Special'
  },
  {
    id: 9,
    name: 'FAMILY Full House',
    price: 170.00,
    description: '8 pieces + 2 Soul Fries™ + 2 Soulslaw® + 2 Licken Loafs®',
    image: '/images/meal9.png',
    category: 'meals',
    badge: 'Feast'
  }
];

const heroSlides = [
  {
    id: 1,
    image: '/images/chick2.png',
    title: 'SoulFire Chicken',
    description: 'Spicy, Juicy, Perfectly Fried'
  },
  {
    id: 2,
    image: '/images/meal6.png',
    title: 'Family Meals',
    description: 'Feed the whole family for less'
  },
  {
    id: 3,
    image: '/images/meal2.png',
    title: 'New Hotwings Max',
    description: '8 Hotwings + Toast + Coke - R92'
  }
];

const chickenLickenStores = [
  { name: "Chicken Licken Braamfontein", lat: -26.1931, lon: 28.0301 },
  { name: "Chicken Licken Sandton", lat: -26.1076, lon: 28.0567 },
  { name: "Chicken Licken Soweto", lat: -26.2485, lon: 27.8540 },
  { name: "Chicken Licken Pretoria", lat: -25.7461, lon: 28.1881 },
  { name: "Chicken Licken Cape Town", lat: -33.9249, lon: 18.4241 },
  { name: "Chicken Licken Durban", lat: -29.8587, lon: 31.0218 },
  { name: "Chicken Licken Cape Town, Mowbray", lat: -33.94798505820656, lon: 18.473358699234137 },
  { name: "Chicken Licken Cape Town Viking Way, Salberau", lat: -33.922918825723535, lon: 18.550091333475166 },
  { name: "Chicken Licken Cape Town Athlone", lat: -33.9646443230828, lon: 18.52949196934994 }
];

function ChickenLicken() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [menuFilter, setMenuFilter] = useState('all');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const [toast, setToast] = useState({ show: false, message: '' });
  const [selectedStore, setSelectedStore] = useState(chickenLickenStores[0]);
  const mapRef = useRef(null);
  const [mapInstance, setMapInstance] = useState(null);
  const [userMarker, setUserMarker] = useState(null);
  const [storeMarker, setStoreMarker] = useState(null);
  const [deliveryMarker, setDeliveryMarker] = useState(null);
  const [routeControl, setRouteControl] = useState(null);
  
  // Delivery page state
  const [orderDetails, setOrderDetails] = useState({
    meal: null,
    quantity: 1
  });
  const [deliveryInfo, setDeliveryInfo] = useState({
    name: '',
    phone: '',
    address: '',
    suburb: '',
    city: '',
    instructions: '',
    deliveryTime: 'asap'
  });
  const [scrolled, setScrolled] = useState(false);

  // Hero slider auto-play
  useEffect(() => {
    if (currentPage === 'home') {
      const timer = setInterval(() => {
        setCurrentSlide(prev => (prev + 1) % heroSlides.length);
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [currentPage]);

  // Cart functions
  const addToCart = (item) => {
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    
    if (existingItem) {
      setCart(cart.map(cartItem =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      ));
    } else {
      setCart([...cart, { ...item, quantity: 1, cartId: Date.now() }]);
    }
    
    showNotification(`${item.name} added to cart!`);
  };

  const updateCartQuantity = (cartId, delta) => {
    setCart(cart.map(item => {
      if (item.cartId === cartId) {
        const newQuantity = item.quantity + delta;
        return newQuantity > 0 ? { ...item, quantity: newQuantity } : null;
      }
      return item;
    }).filter(Boolean));
  };

  const removeFromCart = (cartId) => {
    setCart(cart.filter(item => item.cartId !== cartId));
  };

  const getCartTotal = () => {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const getCartCount = () => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  };

  const showNotification = (message) => {
    setToast({ show: true, message });
    setTimeout(() => {
      setToast({ show: false, message: '' });
    }, 3000);
  };

  const proceedToCheckout = () => {
    if (cart.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    // Navigate to delivery page
    setCurrentPage('delivery');
    setCartOpen(false);
  };

  // Menu filter
  const getFilteredMenu = () => {
    if (menuFilter === 'all') return menuItems;
    return menuItems.filter(item => item.category === menuFilter);
  };

  // Delivery page handlers
  const handleDeliveryChange = (e) => {
    const { name, value } = e.target;
    setDeliveryInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleQuantityChange = (delta) => {
    setOrderDetails(prev => ({
      ...prev,
      quantity: Math.max(1, prev.quantity + delta)
    }));
  };

  const handleDeliverySubmit = (e) => {
    e.preventDefault();
    // Navigate to map tracking page
    setCurrentPage('map');
  };

  const getTotalPrice = () => {
    if (!orderDetails.meal) return 0;
    return orderDetails.meal.price * orderDetails.quantity;
  };

  // Handle scroll for sticky navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    // Set initial state
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Initialize Leaflet map
  useEffect(() => {
    if (currentPage === 'map' && mapRef.current && !mapInstance) {
      // Small delay to ensure DOM is ready
      const timer = setTimeout(() => {
        if (mapRef.current) {
          const map = L.map(mapRef.current).setView([-26.1931, 28.0301], 12);
          
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '© OpenStreetMap contributors'
          }).addTo(map);

          setMapInstance(map);
        }
      }, 100);

      return () => {
        clearTimeout(timer);
        if (mapInstance) {
          mapInstance.remove();
        }
      };
    }
  }, [currentPage]);

  // Geocode user location and start delivery simulation
  const simulateDelivery = async () => {
    if (!mapInstance || !deliveryInfo.address) {
      alert('Please ensure map is loaded and address is provided.');
      return;
    }

    try {
      const geocodeApiUrl = import.meta.env.VITE_GEOCODE_API_URL || 'https://nominatim.openstreetmap.org/search';
      // Geocode user location
      const response = await fetch(
        `${geocodeApiUrl}?format=json&q=${encodeURIComponent(
          deliveryInfo.address + ', ' + deliveryInfo.suburb + ', ' + deliveryInfo.city
        )}`
      );
      const data = await response.json();

      if (data.length === 0) {
        alert('Location not found. Using default location.');
        return;
      }

      const userLat = parseFloat(data[0].lat);
      const userLon = parseFloat(data[0].lon);

      // Clear previous markers
      if (userMarker) mapInstance.removeLayer(userMarker);
      if (storeMarker) mapInstance.removeLayer(storeMarker);
      if (deliveryMarker) mapInstance.removeLayer(deliveryMarker);
      if (routeControl) mapInstance.removeControl(routeControl);

      // Add user marker
      const newUserMarker = L.marker([userLat, userLon])
        .addTo(mapInstance)
        .bindPopup('Your Location')
        .openPopup();
      setUserMarker(newUserMarker);

      // Add store marker
      const newStoreMarker = L.marker([selectedStore.lat, selectedStore.lon])
        .addTo(mapInstance)
        .bindPopup(selectedStore.name);
      setStoreMarker(newStoreMarker);

      // Create route
      const newRouteControl = L.Routing.control({
        waypoints: [
          L.latLng(selectedStore.lat, selectedStore.lon),
          L.latLng(userLat, userLon)
        ],
        routeWhileDragging: false,
        createMarker: () => null,
        lineOptions: {
          styles: [{ color: '#ff8c00', weight: 5, opacity: 0.7 }]
        },
        show: false,
        addWaypoints: false,
        draggableWaypoints: false,
        fitSelectedRoutes: true
      }).addTo(mapInstance);

      setRouteControl(newRouteControl);

      // Animate delivery
      newRouteControl.on('routesfound', function (e) {
        const route = e.routes[0];
        const coordinates = route.coordinates;
        let currentIndex = 0;

        const customIcon = L.icon({
          iconUrl: 'https://cdn-icons-png.flaticon.com/512/3448/3448339.png',
          iconSize: [40, 40],
          iconAnchor: [20, 40]
        });

        const newDeliveryMarker = L.marker(coordinates[0], { icon: customIcon })
          .addTo(mapInstance)
          .bindPopup('Delivery in progress...')
          .openPopup();
        setDeliveryMarker(newDeliveryMarker);

        const interval = setInterval(() => {
          if (currentIndex >= coordinates.length - 1) {
            clearInterval(interval);
            newDeliveryMarker
              .setLatLng(coordinates[coordinates.length - 1])
              .bindPopup('Order Delivered!')
              .openPopup();
            showNotification(`${deliveryInfo.name}, your delivery has arrived!`);
            return;
          }

          currentIndex++;
          newDeliveryMarker.setLatLng(coordinates[currentIndex]);
        }, 350);
      });

      mapInstance.fitBounds([
        [selectedStore.lat, selectedStore.lon],
        [userLat, userLon]
      ]);
    } catch (error) {
      console.error('Error geocoding location:', error);
      alert('Error finding location. Please try again.');
    }
  };

  // Map Tracking Page
  if (currentPage === 'map') {
    return (
      <div className="chicken-licken">
        {/* Sticky Navigation */}
        <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
          <div className="nav-container">
            <div className="nav-logo">
              <img src="https://chickenlicken.co.za/images/CL-small-logo.svg" alt="Chicken Licken" />
              <span className="logo-text">Chicken Licken</span>
            </div>
            <div className="nav-actions">
              <button className="cart-btn" onClick={() => setCartOpen(!cartOpen)}>
                <FaShoppingCart />
                <span className="cart-count">{getCartCount()}</span>
              </button>
            </div>
          </div>
        </nav>

        <div className="map-tracking-page">
          <div className="map-header">
            <button className="back-btn" onClick={() => {
              setCurrentPage('home');
              setCart([]);
              setOrderDetails({ meal: null, quantity: 1 });
              setDeliveryInfo({
                name: '',
                phone: '',
                address: '',
                suburb: '',
                city: '',
                instructions: '',
                deliveryTime: 'asap'
              });
              if (mapInstance) {
                mapInstance.remove();
                setMapInstance(null);
              }
            }}>
              <FaChevronLeft /> Back to Home
            </button>
            <h1>Track Your Order</h1>
          </div>

          <div className="map-tracking-content">
            <div className="tracking-info">
              <div className="status-card">
                <div className="status-icon">
                  <FaTruck />
                </div>
                <h2>Complete Your Order</h2>
                <p>Select your nearest store and start delivery</p>
                
                <div className="store-selection-card">
                  <h3>Select Store</h3>
                  <select 
                    value={JSON.stringify(selectedStore)} 
                    onChange={(e) => setSelectedStore(JSON.parse(e.target.value))}
                    className="store-select"
                  >
                    {chickenLickenStores.map((store, index) => (
                      <option key={index} value={JSON.stringify(store)}>
                        {store.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="order-details-card">
                  <h3>Order Summary</h3>
                  {cart.length > 0 ? (
                    <>
                      {cart.map((item) => (
                        <div key={item.cartId} className="order-summary-item">
                          <img src={item.image} alt={item.name} />
                          <div>
                            <h4>{item.name}</h4>
                            <p>Quantity: {item.quantity}</p>
                            <p className="price">R{(item.price * item.quantity).toFixed(2)}</p>
                          </div>
                        </div>
                      ))}
                      <div className="order-total-map">
                        <span>Total:</span>
                        <span className="total-price">R{getCartTotal().toFixed(2)}</span>
                      </div>
                    </>
                  ) : (
                    <p>No items in order</p>
                  )}
                </div>

                <div className="delivery-details-card">
                  <h3>Delivery Address</h3>
                  <p><FaMapMarkerAlt /> {deliveryInfo.address}</p>
                  <p>{deliveryInfo.suburb}, {deliveryInfo.city}</p>
                  <p><FaPhone /> {deliveryInfo.phone}</p>
                  <p><FaUser /> {deliveryInfo.name}</p>
                </div>

                <button className="start-delivery-btn" onClick={simulateDelivery}>
                  <FaTruck /> Start Delivery Simulation
                </button>

                <div className="eta-card">
                  <h3>Estimated Time</h3>
                  <p className="eta-time">30-45 minutes</p>
                </div>
              </div>
            </div>

            <div className="map-container-tracking">
              <div ref={mapRef} className="tracking-map" style={{ height: '700px', width: '100%' }}></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (currentPage === 'delivery') {
    return (
      <div className="chicken-licken">
        <div className="delivery-page">
          <div className="delivery-header">
            <button className="back-btn" onClick={() => setCurrentPage('home')}>
              <FaChevronLeft /> Back to Menu
            </button>
            <h1>Complete Your Order</h1>
          </div>

          <div className="delivery-content">
            <div className="delivery-container">
              {/* Order Summary */}
              <div className="order-summary-section">
                <h2>Order Summary</h2>
                {cart.length > 0 ? (
                  <>
                    {cart.map((item) => (
                      <div key={item.cartId} className="order-item">
                        <img src={item.image} alt={item.name} />
                        <div className="order-item-details">
                          <h3>{item.name}</h3>
                          <p className="order-item-desc">{item.description}</p>
                          <div className="order-item-footer">
                            <p className="order-item-price">R{item.price.toFixed(2)}</p>
                            <p className="order-item-quantity">Qty: {item.quantity}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </>
                ) : (
                  <p>No items in cart</p>
                )}
                
                <div className="order-total">
                  <span>Total:</span>
                  <span className="total-amount">R{getCartTotal().toFixed(2)}</span>
                </div>
              </div>

              {/* Delivery Form */}
              <div className="delivery-form-section">
                <h2><FaMapMarkerAlt /> Delivery Details</h2>
                <form onSubmit={handleDeliverySubmit}>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="name"><FaUser /> Full Name *</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={deliveryInfo.name}
                        onChange={handleDeliveryChange}
                        placeholder="Enter your full name"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="phone"><FaPhone /> Phone Number *</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={deliveryInfo.phone}
                        onChange={handleDeliveryChange}
                        placeholder="0XX XXX XXXX"
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="address"><FaHome /> Street Address *</label>
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

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="suburb">Suburb *</label>
                      <input
                        type="text"
                        id="suburb"
                        name="suburb"
                        value={deliveryInfo.suburb}
                        onChange={handleDeliveryChange}
                        placeholder="Sandton"
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
                  </div>

                  <div className="form-group">
                    <label htmlFor="deliveryTime"><FaClock /> Delivery Time</label>
                    <select
                      id="deliveryTime"
                      name="deliveryTime"
                      value={deliveryInfo.deliveryTime}
                      onChange={handleDeliveryChange}
                    >
                      <option value="asap">As soon as possible</option>
                      <option value="30min">In 30 minutes</option>
                      <option value="1hour">In 1 hour</option>
                      <option value="2hours">In 2 hours</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="instructions">Delivery Instructions (Optional)</label>
                    <textarea
                      id="instructions"
                      name="instructions"
                      value={deliveryInfo.instructions}
                      onChange={handleDeliveryChange}
                      placeholder="Gate code, parking instructions, etc..."
                      rows="3"
                    ></textarea>
                  </div>

                  <div className="delivery-info-box">
                    <h3>📦 Delivery Information</h3>
                    <p>• Estimated delivery time: 30-45 minutes</p>
                    <p>• Delivery fee: R25.00 (Free for orders over R150)</p>
                    <p>• We accept cash and card on delivery</p>
                  </div>

                  <button type="submit" className="place-order-btn">
                    <FaCheckCircle /> Place Order - R{getCartTotal().toFixed(2)}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="chicken-licken">
      {/* Loading Screen */}
      <div className="loading-screen hide">
        <div className="loader"></div>
        <img src="https://chickenlicken.co.za/images/CL-small-logo.svg" alt="Chicken Licken" />
        <p>Loading SoulFood...</p>
      </div>

      {/* Navigation */}
      <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
        <div className="nav-container">
          <div className="nav-logo">
            <img src="https://chickenlicken.co.za/images/CL-small-logo.svg" alt="Chicken Licken" />
            <span className="logo-text">Chicken Licken</span>
          </div>
          
          <div className={`nav-menu ${mobileMenuOpen ? 'show' : ''}`}>
            <a href="#home" className="nav-link active">Home</a>
            <a href="#menu" className="nav-link">Menu</a>
            <a href="#specials" className="nav-link">Specials</a>
            <a href="#locations" className="nav-link">Locations</a>
            <a href="#contact" className="nav-link">Contact</a>
          </div>

          <div className="nav-actions">
            <button className="cart-btn" onClick={() => setCartOpen(!cartOpen)}>
              <FaShoppingCart />
              <span className="cart-count">{getCartCount()}</span>
            </button>
            <button className="menu-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              <FaBars />
            </button>
          </div>
        </div>
      </nav>

      {/* Cart Sidebar */}
      <div className={`cart-sidebar ${cartOpen ? 'open' : ''}`}>
        <div className="cart-header">
          <h3>Your Order</h3>
          <button onClick={() => setCartOpen(false)}><FaTimes /></button>
        </div>
        <div className="cart-items">
          {cart.length === 0 ? (
            <div className="empty-cart">
              <FaShoppingCart />
              <p>Your cart is empty</p>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.cartId} className="cart-item">
                <img src={item.image} alt={item.name} />
                <div style={{ flex: 1 }}>
                  <h4>{item.name}</h4>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '5px' }}>
                    <span style={{ color: '#ff8c00' }}>R{item.price.toFixed(2)}</span>
                    <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
                      <button onClick={() => updateCartQuantity(item.cartId, -1)} className="cart-qty-btn">-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateCartQuantity(item.cartId, 1)} className="cart-qty-btn">+</button>
                    </div>
                  </div>
                </div>
                <button onClick={() => removeFromCart(item.cartId)} className="cart-remove-btn">
                  <FaTrash />
                </button>
              </div>
            ))
          )}
        </div>
        <div className="cart-footer">
          <div className="cart-total">
            <span>Total:</span>
            <span>R{getCartTotal().toFixed(2)}</span>
          </div>
          <button className="checkout-btn" onClick={proceedToCheckout}>
            Proceed to Checkout <FaArrowRight />
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <section id="home" className="hero-section">
        <div className="hero-slider">
          {heroSlides.map((slide, index) => (
            <div
              key={slide.id}
              className={`slide ${index === currentSlide ? 'active' : ''}`}
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="slide-content">
                <h1>{slide.title}</h1>
                <p>{slide.description}</p>
                <button className="hero-btn" onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })}>
                  Order Now <FaChevronRight />
                </button>
              </div>
            </div>
          ))}
          
          <div className="slider-controls">
            <button className="slider-prev" onClick={() => setCurrentSlide(prev => (prev - 1 + heroSlides.length) % heroSlides.length)}>
              <FaChevronLeft />
            </button>
            <button className="slider-next" onClick={() => setCurrentSlide(prev => (prev + 1) % heroSlides.length)}>
              <FaChevronRight />
            </button>
          </div>
          
          <div className="slider-dots">
            {heroSlides.map((_, index) => (
              <div
                key={index}
                className={`dot ${index === currentSlide ? 'active' : ''}`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Features Bar */}
      <div className="features-bar">
        <div className="feature">
          <FaClockAlt />
          <span>Open 9am - 9pm</span>
        </div>
        <div className="feature">
          <FaTruck />
          <span>Free Delivery over R100</span>
        </div>
        <div className="feature">
          <FaFire />
          <span>SoulFire Spice</span>
        </div>
        <div className="feature">
          <FaStar />
          <span>4.5 Rating</span>
        </div>
      </div>

      {/* Promo Section */}
      <section className="promo-section" id="specials">
        <h2 className="section-title">Today's Specials</h2>
        <div className="carousel-container">
          <div className="carousel">
            {promoItems.map(item => (
              <div key={item.id} className="promo-card">
                <img src={item.image} alt={item.name} />
                <div className="promo-badge">{item.badge}</div>
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <div className="promo-price">R{item.price.toFixed(2)}</div>
                <button className="add-to-cart-btn" onClick={() => addToCart(item)}>
                  <FaCartPlus /> Add
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="menu-section">
        <h2 className="section-title">Our Famous Meals</h2>
        
        <div className="menu-tabs">
          <button className={`tab-btn ${menuFilter === 'all' ? 'active' : ''}`} onClick={() => setMenuFilter('all')}>
            All
          </button>
          <button className={`tab-btn ${menuFilter === 'meals' ? 'active' : ''}`} onClick={() => setMenuFilter('meals')}>
            Meals
          </button>
          <button className={`tab-btn ${menuFilter === 'burgers' ? 'active' : ''}`} onClick={() => setMenuFilter('burgers')}>
            Burgers
          </button>
          <button className={`tab-btn ${menuFilter === 'sides' ? 'active' : ''}`} onClick={() => setMenuFilter('sides')}>
            Sides
          </button>
          <button className={`tab-btn ${menuFilter === 'drinks' ? 'active' : ''}`} onClick={() => setMenuFilter('drinks')}>
            Drinks
          </button>
        </div>

        <div className="menu-grid">
          {getFilteredMenu().map(item => (
            <div key={item.id} className="menu-item" onClick={() => setSelectedMeal(item)}>
              <div className="menu-item-image">
                <img src={item.image} alt={item.name} />
                <div className="menu-item-overlay">
                  <button className="quick-view-btn" onClick={(e) => { e.stopPropagation(); setSelectedMeal(item); }}>
                    <FaEye /> Quick View
                  </button>
                </div>
              </div>
              <div className="menu-item-content">
                <h3 className="menu-item-title">{item.name}</h3>
                <p className="menu-item-description">{item.description}</p>
                <div className="menu-item-footer">
                  <span className="menu-item-price">R{item.price.toFixed(2)}</span>
                  {item.badge && <span className="menu-item-badge">{item.badge}</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Quick View Modal */}
      {selectedMeal && (
        <div className="modal show" onClick={(e) => e.target.classList.contains('modal') && setSelectedMeal(null)}>
          <div className="modal-content">
            <span className="close-modal" onClick={() => setSelectedMeal(null)}>&times;</span>
            <div className="modal-body">
                <div className="modal-image-container">
                  <img src={selectedMeal.image} alt={selectedMeal.name} className="modal-main-image" />
                </div>
                <h2 className="modal-title">{selectedMeal.name}</h2>
                <span className="modal-price">R{selectedMeal.price.toFixed(2)}</span>
                <p className="modal-description">{selectedMeal.description}</p>
                <button 
                  className="modal-order-btn" 
                  onClick={() => { 
                    addToCart(selectedMeal);
                    setSelectedMeal(null); 
                  }}
                >
                  Order!
                </button>
              </div>
            </div>
        </div>
      )}

      {/* Toast Notification */}
      {toast.show && (
        <div className="toast-notification">
          <FaCheckCircle className="toast-icon" />
          <span>{toast.message}</span>
        </div>
      )}

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <img src="https://chickenlicken.co.za/images/CL-small-logo.svg" alt="Chicken Licken" />
            <p>Serving SoulFood since 1981. Our secret recipe brings families together.</p>
          </div>
          
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#home">Home</a></li>
              <li><a href="#menu">Menu</a></li>
              <li><a href="#specials">Specials</a></li>
              <li><a href="#locations">Locations</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Contact Info</h4>
            <ul>
              <li><FaPhone /> 0800 CHICKEN</li>
              <li>📧 info@chickenlicken.co.za</li>
              <li><FaMapMarkerAlt /> Head Office: JHB, SA</li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2026 Chicken Licken. All rights reserved. | Clone for portfolio purposes</p>
        </div>
      </footer>
    </div>
  );
}

export default ChickenLicken;
