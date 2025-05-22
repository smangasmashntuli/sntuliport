const carCards = document.querySelectorAll('.car-card');
        const voteButtons = document.querySelectorAll('.vote-btn');
        const voteCounts = document.querySelectorAll('.vote-count');
        const totalVotesElement = document.getElementById('total-votes-count');
        const resetButton = document.getElementById('reset-votes');
        const leaderboardList = document.getElementById('leaderboard-list');
        const toggleChartButton = document.getElementById('toggle-chart');
        const carOfDayContent = document.getElementById('car-of-day-content');
        const toastNotification = document.getElementById('toast-notification');

        // Carousel Elements
        const carouselSlide = document.querySelector('.carousel-slide');
        const carouselImages = document.querySelectorAll('.carousel-slide img');
        const carouselCaption = document.querySelector('.carousel-caption');
        const prevButton = document.querySelector('.carousel-prev');
        const nextButton = document.querySelector('.carousel-next');
        const dotsContainer = document.querySelector('.carousel-dots');
        const playPauseButton = document.querySelector('.carousel-play-pause');

        // Car Data
        const cars = [
            {
                brand: "VW Polo",
                image: "https://th.bing.com/th/id/OIP.CJVeaCysOdhf3YtKKGVPZwAAAA?rs=1&pid=ImgDetMain",
                price: "R 270,000",
                description: "The Volkswagen Polo is a supermini car produced by the German manufacturer Volkswagen since 1975. Known for its German engineering, quality interior, and excellent safety features.",
                features: ["1.0L TSI Engine", "5-Star Safety Rating", "Apple CarPlay/Android Auto", "Fuel Efficiency: 5.5L/100km", "LED Headlights", "Climate Control"]
            },
            {
                brand: "Hyundai Grand i10",
                image: "https://th.bing.com/th/id/R.a1e0c72bc540f6be0b6aed35506b0a8d?rik=LMO%2bGVytxJJknA&pid=ImgRaw&r=0",
                price: "R 210,000",
                description: "The Hyundai Grand i10 is a city car produced by the South Korean manufacturer Hyundai. It's popular for its spacious interior, value for money, and comprehensive features list.",
                features: ["1.2L Kappa Engine", "Spacious Interior", "Touchscreen Infotainment", "Fuel Efficiency: 5.8L/100km", "Reverse Camera", "Keyless Entry"]
            },
            {
                brand: "Suzuki Baleno",
                image: "https://cdni.autocarindia.com/ExtraImages/20220228061914_Maruti_Baleno_2022_front.jpg",
                price: "R 235,000",
                description: "The Suzuki Baleno is a subcompact car produced by the Japanese manufacturer Suzuki. Renowned for its reliability, generous equipment levels, and class-leading cargo space.",
                features: ["1.2L DualJet Engine", "Hybrid Option Available", "Heads-Up Display", "Fuel Efficiency: 5.1L/100km", "360° View Camera", "Smart Connectivity"]
            }
        ];

        // Chart Variables
        let voteChart;
        let chartType = 'bar';
        const chartColors = ['#ff4444', '#00C4B4', '#FFD700', '#1ecbe1', '#702dd2', '#fe0d01', '#e1dc1e', '#7d827f', '#1ce333', '#25da9f', '#00ff8a', '#c83789', '#6e47b8', '#e1bd89', '#ff00ab', '#4bb46c', '#75e4ff'];

        // Car Votes Data
        let carVotes = {};
        let totalVotes = 0;

        // Initialize the application
        function initApp() {
            loadVotesFromStorage();
            updateVoteCounts();
            updateTotalVotes();
            updateLeaderboard();
            initChart();
            initCarousel();
            showCarOfDay();
            setupEventListeners();
        }

        // Load votes from localStorage
        function loadVotesFromStorage() {
            const storedVotes = localStorage.getItem('carVotes');
            if (storedVotes) {
                carVotes = JSON.parse(storedVotes);
                // Calculate total votes
                totalVotes = Object.values(carVotes).reduce((sum, count) => sum + count, 0);
            } else {
                // Initialize with zero votes if no stored data
                carCards.forEach(card => {
                    const brand = card.dataset.brand;
                    carVotes[brand] = 0;
                });
            }
        }

        // Update vote counts on UI
        function updateVoteCounts() {
            carCards.forEach((card, index) => {
                const brand = card.dataset.brand;
                const count = carVotes[brand] || 0;
                voteCounts[index].textContent = count;
            });
        }

        // Update total votes
        function updateTotalVotes() {
            totalVotesElement.textContent = totalVotes;
        }
		
		function updateLeaderboard() {
    // Clear existing content
    leaderboardList.innerHTML = '';
    const chartLegend = document.getElementById('chart-legend');
    chartLegend.innerHTML = '';

    // Sort cars by votes (descending)
    const sortedCars = Object.entries(carVotes)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5); // Limit to top 5

    const highestVoteCount = sortedCars.length > 0 ? sortedCars[0][1] : 1;

    // Loop over top 5 cars
    sortedCars.forEach((car, index) => {
        const brand = car[0];
        const votes = car[1];
        const percentage = totalVotes > 0 ? Math.round((votes / totalVotes) * 100) : 0;
        const progressWidth = highestVoteCount > 0 ? (votes / highestVoteCount) * 100 : 0;
        const color = chartColors[index % chartColors.length];

        // Create leaderboard item
        const leaderboardItem = document.createElement('div');
        leaderboardItem.className = 'leaderboard-item';
        leaderboardItem.innerHTML = `
            <div class="leaderboard-position">#${index + 1}</div>
            <div class="leaderboard-car">${brand}</div>
            <div class="leaderboard-votes">
                <span>${votes} votes (${percentage}%)</span>
                <div class="leaderboard-bar">
                    <div class="leaderboard-progress" style="width: ${progressWidth}%; background: ${color};"></div>
                </div>
            </div>
        `;
        leaderboardList.appendChild(leaderboardItem);

        // Create legend item
        const legendItem = document.createElement('div');
        legendItem.className = 'legend-item';
        legendItem.innerHTML = `
            <div class="legend-color" style="background: ${color};"></div>
            <span>${brand}</span>
        `;
        chartLegend.appendChild(legendItem);
    });

    // Update chart if initialized
    if (voteChart) {
        updateChart();
    }
}

        // Initialize chart
        function initChart() {
            const ctx = document.getElementById('vote-chart').getContext('2d');
            
            const labels = Object.keys(carVotes);
            const data = Object.values(carVotes);
            
            voteChart = new Chart(ctx, {
                type: chartType,
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Votes',
                        data: data,
                        backgroundColor: chartColors,
                        borderColor: 'rgba(255, 255, 255, 0.6)',
                        borderWidth: 2
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: chartType === 'pie',
                            position: 'bottom'
                        },
                        title: {
                            display: true,
                            text: 'Car Voting Results',
                            font: {
                                size: 18
                            }
                        }
                    },
                    scales: {
                        y: {
                            display: chartType !== 'pie',
                            beginAtZero: true,
                            ticks: {
                                precision: 0
                            }
                        }
                    },
                    animation: {
                        duration: 1000,
                        easing: 'easeInOutQuart'
                    }
                }
            });
        }

        // Update chart with current data
        function updateChart() {
            const labels = Object.keys(carVotes);
            const data = Object.values(carVotes);
            
            voteChart.data.labels = labels;
            voteChart.data.datasets[0].data = data;
            voteChart.update();
        }

        // Switch chart type
        function toggleChartType() {
            chartType = chartType === 'bar' ? 'pie' : 'bar';
            toggleChartButton.textContent = chartType === 'bar' ? 'Switch to Pie Chart' : 'Switch to Bar Chart';
            
            // Destroy current chart and recreate with new type
            voteChart.destroy();
            initChart();
        }

        // Initialize carousel
        function initCarousel() {
            let currentIndex = 0;
            let slideInterval;
            let isPlaying = true;
            
            // Set first image as active
            carouselImages[currentIndex].classList.add('active');
            carouselCaption.textContent = carouselImages[currentIndex].dataset.caption;
            
            // Create dots
            carouselImages.forEach((_, index) => {
                const dot = document.createElement('span');
                dot.className = 'carousel-dot' + (index === 0 ? ' active' : '');
                dot.dataset.index = index;
                dotsContainer.appendChild(dot);
                
                // Add click event to dots
                dot.addEventListener('click', () => {
                    goToSlide(index);
                });
            });
            
            // Function to change slide
            function goToSlide(index) {
                carouselImages[currentIndex].classList.remove('active');
                document.querySelectorAll('.carousel-dot')[currentIndex].classList.remove('active');
                
                currentIndex = index;
                
                carouselImages[currentIndex].classList.add('active');
                document.querySelectorAll('.carousel-dot')[currentIndex].classList.add('active');
                carouselCaption.textContent = carouselImages[currentIndex].dataset.caption;
            }
            
            // Next slide
            function nextSlide() {
                const nextIndex = (currentIndex + 1) % carouselImages.length;
                goToSlide(nextIndex);
            }
            
            // Previous slide
            function prevSlide() {
                const prevIndex = (currentIndex - 1 + carouselImages.length) % carouselImages.length;
                goToSlide(prevIndex);
            }
            
            // Start slideshow
            function startSlideshow() {
                stopSlideshow();
                slideInterval = setInterval(nextSlide, 5000);
                isPlaying = true;
                playPauseButton.textContent = 'Pause';
            }
            
            // Stop slideshow
            function stopSlideshow() {
                clearInterval(slideInterval);
                isPlaying = false;
                playPauseButton.textContent = 'Play';
            }
            
            // Toggle slideshow
            function toggleSlideshow() {
                if (isPlaying) {
                    stopSlideshow();
                } else {
                    startSlideshow();
                }
            }
            
            // Event listeners for carousel controls
            nextButton.addEventListener('click', () => {
                nextSlide();
                if (isPlaying) {
                    startSlideshow(); // Reset timer
                }
            });
            
            prevButton.addEventListener('click', () => {
                prevSlide();
                if (isPlaying) {
                    startSlideshow(); // Reset timer
                }
            });
            
            playPauseButton.addEventListener('click', toggleSlideshow);
            
            // Start slideshow
            startSlideshow();
        }

        // Show car of the day
        function showCarOfDay() {
            // Get a "random" car for car of the day (based on day of month)
            const day = new Date().getDate();
            const carIndex = day % cars.length;
            const car = cars[carIndex];
            
            carOfDayContent.innerHTML = `
                <img src="${car.image}" alt="${car.brand}">
                <div class="car-of-day-info">
                    <h3>${car.brand}</h3>
                    <p class="car-of-day-price">${car.price}</p>
                    <p>${car.description}</p>
                    <div class="car-of-day-features">
                        ${car.features.map(feature => `<span>${feature}</span>`).join('')}
                    </div>
                    <button class="vote-btn">Vote for ${car.brand}</button>
                </div>
            `;
            
            // Add event listener to the car of the day vote button
            carOfDayContent.querySelector('.vote-btn').addEventListener('click', () => {
                addVote(car.brand);
            });
        }

        // Add vote for a car
        function addVote(brand) {
            // Check if brand exists in votes object
            if (carVotes.hasOwnProperty(brand)) {
                carVotes[brand]++;
                totalVotes++;
                
                // Save to localStorage
                localStorage.setItem('carVotes', JSON.stringify(carVotes));
                
                // Update UI
                updateVoteCounts();
                updateTotalVotes();
                updateLeaderboard();
                
                // Show success toast
                showToast(`Thank you for voting for ${brand}!`);
            } else {
                showToast('Error: Car brand not found', true);
            }
        }

        // Reset all votes
        function resetVotes() {
            // Reset votes
            Object.keys(carVotes).forEach(brand => {
                carVotes[brand] = 0;
            });
            totalVotes = 0;
            
            // Save to localStorage
            localStorage.setItem('carVotes', JSON.stringify(carVotes));
            
            // Update UI
            updateVoteCounts();
            updateTotalVotes();
            updateLeaderboard();
            
            // Show toast
            showToast('All votes have been reset');
        }

        // Show toast notification
        function showToast(message, isError = false) {
            const toast = document.getElementById('toast-notification');
            toast.textContent = message;
            toast.className = isError ? 'toast error' : 'toast';
            toast.style.display = 'block';
            
            // Hide after 3 seconds
            setTimeout(() => {
                toast.style.display = 'none';
            }, 3000);
        }

        // Setup event listeners
        function setupEventListeners() {
            // Vote button click events
            voteButtons.forEach(button => {
                button.addEventListener('click', function() {
                    const card = this.closest('.car-card');
                    const brand = card.dataset.brand;
                    
                    addVote(brand);
                    
                    // Add voted class for animation
                    this.classList.add('voted');
                    setTimeout(() => {
                        this.classList.remove('voted');
                    }, 500);
                });
            });
            
            // Reset button click event
            resetButton.addEventListener('click', resetVotes);
            
            // Toggle chart type button
            toggleChartButton.addEventListener('click', toggleChartType);
            
            // Newsletter form submission
            const newsletterForm = document.querySelector('.newsletter-form');
            if (newsletterForm) {
                newsletterForm.addEventListener('submit', function(e) {
                    e.preventDefault();
                    const email = this.querySelector('input[type="email"]').value;
                    showToast(`Thank you for subscribing with ${email}!`);
                    this.reset();
                });
            }
            
            // Smooth scrolling for navigation links
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    const targetId = this.getAttribute('href');
                    if (targetId === '#') return;
                    
                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        window.scrollTo({
                            top: targetElement.offsetTop - 70,
                            behavior: 'smooth'
                        });
                    }
                });
            });
        }

        // Initialize app when DOM is loaded
        document.addEventListener('DOMContentLoaded', initApp);