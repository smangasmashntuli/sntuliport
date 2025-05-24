function toggleMobileMenu() {
    const mobileMenu = document.querySelector('.mobile-menu');
    mobileMenu.classList.toggle('active');
    
    // Toggle body overflow when menu is open
    if (mobileMenu.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
        document.querySelector('.mobile-menu').classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Hero Slider Functionality
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const dotsContainer = document.querySelector('.slider-dots');

// Create dots for each slide
slides.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(index));
    dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll('.slider-dots .dot');

function goToSlide(index) {
    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');
    
    currentSlide = (index + slides.length) % slides.length;
    
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

function nextSlide() {
    goToSlide(currentSlide + 1);
}

function prevSlide() {
    goToSlide(currentSlide - 1);
}

// Auto slide change
let slideInterval = setInterval(nextSlide, 5000);

// Pause on hover
const heroSlider = document.querySelector('.hero-slider');
heroSlider.addEventListener('mouseenter', () => clearInterval(slideInterval));
heroSlider.addEventListener('mouseleave', () => {
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, 5000);
});

// Button events
document.querySelector('.next-slide').addEventListener('click', nextSlide);
document.querySelector('.prev-slide').addEventListener('click', prevSlide);

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') nextSlide();
    if (e.key === 'ArrowLeft') prevSlide();
});


// Shopping Cart Functionality
let cart = [];

// Toggle cart visibility
function toggleCart() {
    const cartSidebar = document.getElementById('cart-sidebar');
    const cartOverlay = document.getElementById('cart-overlay');
    
    cartSidebar.classList.toggle('active');
    cartOverlay.classList.toggle('active');
    
    // Prevent body scroll when cart is open
    if (cartSidebar.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
}

// Add to cart function
function addToCart(product) {
    // Check if product already exists in cart
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({...product, quantity: 1});
    }
    
    updateCart();
    showAddedToCartMessage(product);
}

// Remove item from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

// Update quantity
function updateQuantity(productId, newQuantity) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity = Math.max(1, newQuantity);
        updateCart();
    }
}

// Update cart UI
function updateCart() {
    const cartItemsElement = document.getElementById('cart-items');
    const cartCountElement = document.querySelector('.cart-count');
    const totalAmountElement = document.querySelector('.total-amount');
    
    // Update cart count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCountElement.textContent = totalItems;
    
    // Update cart items
    if (cart.length === 0) {
        cartItemsElement.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <p>Your cart is empty</p>
            </div>
        `;
    } else {
        cartItemsElement.innerHTML = cart.map(item => `
            <div class="cart-item" data-id="${item.id}">
                <div class="cart-item-img">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="cart-item-details">
                    <h4 class="cart-item-title">${item.name}</h4>
                    <p class="cart-item-price">R${item.price.toFixed(2)}</p>
                    <div class="cart-item-quantity">
                        <button class="quantity-btn minus" onclick="updateQuantity('${item.id}', ${item.quantity - 1})">-</button>
                        <input type="number" class="quantity-input" value="${item.quantity}" min="1" onchange="updateQuantity('${item.id}', parseInt(this.value))">
                        <button class="quantity-btn plus" onclick="updateQuantity('${item.id}', ${item.quantity + 1})">+</button>
                    </div>
                </div>
                <button class="remove-item" onclick="removeFromCart('${item.id}')">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `).join('');
    }
    
    // Update total amount
    const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    totalAmountElement.textContent = `R${totalAmount.toFixed(2)}`;
    
    // Save cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Show "Added to cart" message
function showAddedToCartMessage(product) {
    const message = document.createElement('div');
    message.className = 'cart-message';
    message.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>${product.name} added to cart</span>
    `;
    
    document.body.appendChild(message);
    
    setTimeout(() => {
        message.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        message.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(message);
        }, 300);
    }, 3000);
}

// Load cart from localStorage
function loadCart() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCart();
    }
}

// Initialize products
const products = [
    {
        id: 'p1',
        name: 'G.Skill Ripjaws V 32GB DDR4-3200MHz',
        price: 2649.00,
        image: 'https://www.wootware.co.za/media/catalog/product/cache/1/image/512x512/9df78eab33525d08d6e5fb8d27136e95/r/i/ripjaws-v-dual-01.jpg',
        category: 'components',
        rating: 4.5,
        reviews: 24
    },
    {
        id: 'p2',
        name: 'Phantek NV7 D-RGB Black Tempered Glass',
        price: 1899.99,
        image: 'https://www.wootware.co.za/media/catalog/product/cache/1/small_image/200x/9df78eab33525d08d6e5fb8d27136e95/0/1/01-gf3eg5hs.jpg',
        category: 'components',
        rating: 4.8,
        reviews: 18
    },
    {
        id: 'p3',
        name: 'XFX Radeon RX 7900 XT 20GB GDDR6',
        price: 3499.99,
        image: 'https://www.wootware.co.za/media/catalog/product/cache/1/small_image/200x/9df78eab33525d08d6e5fb8d27136e95/x/f/xfx-radeon-rx-6800-speedster-swft319-core-rx-68xlaqfd9-16gb-gddr6-graphics-card-1.jpg',
        category: 'components',
        rating: 4.7,
        reviews: 32
    },
    {
        id: 'p4',
        name: 'Palit GeForce RTX 4060 Ti JetStream',
        price: 1259.95,
        image: 'https://www.wootware.co.za/media/catalog/product/cache/1/small_image/200x/9df78eab33525d08d6e5fb8d27136e95/r/t/rtx4060ti_jetstream_b-pa366.jpg',
        category: 'components',
        rating: 4.3,
        reviews: 15
    },
    {
        id: 'p5',
        name: 'G.Skill Trident Z RGB 32GB DDR4 3600MHz',
        price: 599.90,
        image: 'https://www.wootware.co.za/media/catalog/product/cache/1/small_image/200x/9df78eab33525d08d6e5fb8d27136e95/2/0/20-232-748-01.jpg',
        category: 'components',
        rating: 4.6,
        reviews: 28
    },
    {
        id: 'p6',
        name: 'Alienware AW3225QF 32inch 4K UHD 240Hz',
        price: 23499.00,
        image: 'https://www.wootware.co.za/media/catalog/product/cache/1/small_image/200x/9df78eab33525d08d6e5fb8d27136e95/a/l/alienware-aw3225qf-2.jpg',
        category: 'monitors',
        rating: 4.9,
        reviews: 42
    },
    {
        id: 'p7',
        name: 'ASUS TUF GAMING B550-PLUS WIFI II',
        price: 2499.00,
        image: 'https://www.wootware.co.za/media/catalog/product/cache/1/small_image/200x/9df78eab33525d08d6e5fb8d27136e95/a/s/asus_tuf_gaming_b550_plus_wifi_ii_01-6nei2chs.jpg',
        category: 'components',
        rating: 4.4,
        reviews: 21
    },
    {
        id: 'p8',
        name: 'AMD Ryzen 7 7700X 5.40GHz 8-Core',
        price: 7599.00,
        image: 'https://www.wootware.co.za/media/catalog/product/cache/1/small_image/200x/9df78eab33525d08d6e5fb8d27136e95/a/m/amd-r7-7000-3dpibwof-01.jpg',
        category: 'components',
        rating: 4.8,
        reviews: 37
    },
    {
        id: 'p9',
        name: 'ASUS Vivobook 15 Intel Core i5-1235U',
        price: 8999.99,
        image: 'https://www.wootware.co.za/media/catalog/product/cache/1/small_image/200x/9df78eab33525d08d6e5fb8d27136e95/a/s/asus-x1504za-2.jpg',
        category: 'laptops',
        rating: 4.2,
        reviews: 19
    },
    {
        id: 'p10',
        name: 'HP Probook 455 G10 AMD Ryzen 7 7730U',
        price: 15999.99,
        image: 'https://www.wootware.co.za/media/catalog/product/cache/1/small_image/200x/9df78eab33525d08d6e5fb8d27136e95/p/r/probook_455_1__1_1.jpg',
        category: 'laptops',
        rating: 4.5,
        reviews: 26
    },
    {
        id: 'p11',
        name: 'WootBook Y15 AMD Ryzen 7 8845HS',
        price: 14799.00,
        image: 'https://www.wootware.co.za/media/catalog/product/cache/1/small_image/200x/9df78eab33525d08d6e5fb8d27136e95/w/o/wootbook-y16-wqxga-01.jpg',
        category: 'laptops',
        rating: 4.7,
        reviews: 31
    },
    {
        id: 'p12',
        name: 'Western Digital Blue SN580 1TB NVMe SSD',
        price: 1299.00,
        image: 'https://www.wootware.co.za/media/catalog/product/cache/1/small_image/200x/9df78eab33525d08d6e5fb8d27136e95/w/d/wds100t3b0e_1_.jpg',
        category: 'storage',
        rating: 4.6,
        reviews: 29
    }
];

// Display products
function displayProducts(productsToDisplay) {
    const productGrid = document.getElementById('product-grid');
    
    productGrid.innerHTML = productsToDisplay.map(product => `
        <div class="product-card">
            <div class="product-img">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <div class="product-rating">
                    ${getStarRating(product.rating)} (${product.reviews})
                </div>
                <div class="product-price">R${product.price.toFixed(2)}</div>
                <button class="add-to-cart" onclick="addToCart(${JSON.stringify(product).replace(/"/g, '&quot;')})">
                    Add to Cart
                </button>
            </div>
        </div>
    `).join('');
}

// Get star rating HTML
function getStarRating(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    let stars = '';
    
    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star"></i>';
    }
    
    if (hasHalfStar) {
        stars += '<i class="fas fa-star-half-alt"></i>';
    }
    
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="far fa-star"></i>';
    }
    
    return stars;
}

// Filter products by category
function filterProducts(category) {
    if (category === 'all') {
        displayProducts(products);
    } else {
        const filteredProducts = products.filter(product => product.category === category);
        displayProducts(filteredProducts);
    }
}

// Initialize the page
function init() {
    loadCart();
    displayProducts(products);
    
    // Add event listener for checkout button
    document.querySelector('.checkout-btn').addEventListener('click', () => {
        if (cart.length > 0) {
            const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            alert(`Thank you for your order! Total: R${total.toFixed(2)}`);
            cart = [];
            updateCart();
            toggleCart();
        }
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', init);

// Style for "Added to cart" message
const style = document.createElement('style');
style.textContent = `
    .cart-message {
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%) translateY(100px);
        background-color: var(--success-color);
        color: white;
        padding: 15px 25px;
        border-radius: 5px;
        display: flex;
        align-items: center;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        z-index: 1100;
        transition: transform 0.3s ease;
    }
    
    .cart-message.show {
        transform: translateX(-50%) translateY(0);
    }
    
    .cart-message i {
        margin-right: 10px;
        font-size: 1.2rem;
    }
`;
document.head.appendChild(style);


// Auth System
let currentUser = null;

// DOM Elements
const loginModal = document.getElementById('login-modal');
const registerModal = document.getElementById('register-modal');
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const userProfile = document.getElementById('user-profile');
const profileToggle = document.getElementById('profile-toggle');
const profileName = document.getElementById('profile-name');
const logoutBtn = document.getElementById('logout-btn');
const loginBtn = document.querySelector('.login-btn');

// Check if user is logged in on page load
document.addEventListener('DOMContentLoaded', () => {
  const user = localStorage.getItem('currentUser');
  if (user) {
    currentUser = JSON.parse(user);
    updateAuthUI();
  }
});

// Show login modal
function showLogin() {
  registerModal.classList.remove('active');
  loginModal.classList.add('active');
}

// Show register modal
function showRegister() {
  loginModal.classList.remove('active');
  registerModal.classList.add('active');
}

// Close auth modals
function closeAuthModal() {
  loginModal.classList.remove('active');
  registerModal.classList.remove('active');
}

// Login form submission
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;
  
  // In a real app, you would validate and send to server
  // This is a simplified version for demo
  
  // Check if user exists in localStorage
  const users = JSON.parse(localStorage.getItem('users')) || [];
  const user = users.find(u => u.email === email && u.password === password);
  
  if (user) {
    currentUser = user;
    localStorage.setItem('currentUser', JSON.stringify(user));
    updateAuthUI();
    closeAuthModal();
    showToast('Login successful!');
  } else {
    showToast('Invalid email or password', 'error');
  }
});

// Register form submission
registerForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const name = document.getElementById('register-name').value;
  const email = document.getElementById('register-email').value;
  const password = document.getElementById('register-password').value;
  const confirm = document.getElementById('register-confirm').value;
  
  // Basic validation
  if (password !== confirm) {
    showToast('Passwords do not match', 'error');
    return;
  }
  
  // Check if user already exists
  const users = JSON.parse(localStorage.getItem('users')) || [];
  if (users.some(u => u.email === email)) {
    showToast('Email already registered', 'error');
    return;
  }
  
  // Create new user
  const newUser = {
    id: Date.now().toString(),
    name,
    email,
    password, // In real app, password should be hashed
    createdAt: new Date().toISOString()
  };
  
  users.push(newUser);
  localStorage.setItem('users', JSON.stringify(users));
  
  // Auto-login
  currentUser = newUser;
  localStorage.setItem('currentUser', JSON.stringify(newUser));
  updateAuthUI();
  closeAuthModal();
  showToast('Registration successful!');
});

// Logout function
logoutBtn.addEventListener('click', (e) => {
  e.preventDefault();
  currentUser = null;
  localStorage.removeItem('currentUser');
  updateAuthUI();
  showToast('Logged out successfully');
});

// Toggle profile dropdown
profileToggle.addEventListener('click', () => {
  userProfile.classList.toggle('active');
});

// Close dropdown when clicking outside
document.addEventListener('click', (e) => {
  if (!userProfile.contains(e.target) && !e.target.classList.contains('login-btn')) {
    userProfile.classList.remove('active');
  }
});

// Update UI based on auth state
function updateAuthUI() {
  if (currentUser) {
    // User is logged in
    loginBtn.style.display = 'none';
    userProfile.style.display = 'flex';
    profileName.textContent = currentUser.name.split(' ')[0]; // Show first name
  } else {
    // User is logged out
    loginBtn.style.display = 'block';
    userProfile.style.display = 'none';
  }
}

// Show toast messages
function showToast(message, type = 'success') {
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;
  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.classList.add('show');
  }, 10);
  
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => {
      document.body.removeChild(toast);
    }, 300);
  }, 3000);
}

// Add click event to login button
loginBtn.addEventListener('click', (e) => {
  e.preventDefault();
  showLogin();
});