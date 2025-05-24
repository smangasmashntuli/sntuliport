		// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Feather Icons
    feather.replace();
    
    // Set current year in footer
    document.getElementById('year').textContent = new Date().getFullYear();
    
    // Loader
    const loader = document.querySelector('.loader');
    setTimeout(() => {
        loader.classList.add('hidden');
    }, 1000);
    
    // Sticky header on scroll
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Back to top button
    const backToTopButton = document.querySelector('.back-to-top');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('active');
        } else {
            backToTopButton.classList.remove('active');
        }
    });
    
    // Animate skill bars on scroll
    const skillBars = document.querySelectorAll('.skill-level');
    const skillsSection = document.querySelector('.skills');
    
    function animateSkillBars() {
        skillBars.forEach(bar => {
            const level = bar.getAttribute('data-level');
            bar.style.width = level + '%';
        });
    }
    
    // Intersection Observer for skill bars
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkillBars();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    observer.observe(skillsSection);
    
    // Projects filter
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            const filterValue = button.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
    
    // Form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Here you would typically send the form data to a server
            // For demonstration, we'll just show an alert
            alert(`Thank you, ${name}! Your message has been sent. I'll get back to you soon.`);
            
            // Reset form
            contactForm.reset();
        });
    }
    
    // Scroll animations
    const fadeElements = document.querySelectorAll('.fade-in');
    
    function checkScroll() {
        fadeElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.classList.add('fade-in');
            }
        });
    }
    
    // Initial check
    checkScroll();
    
    // Check on scroll
    window.addEventListener('scroll', checkScroll);
    
    // Typewriter effect for hero title
    if (document.querySelector('.title')) {
        const typed = new Typed('.title', {
            strings: ['Front-End Developer', 'UI/UX Enthusiast', 'Problem Solver', 'Tech Lover'],
            typeSpeed: 50,
            backSpeed: 30,
            loop: true,
            showCursor: false
        });
    }
});

document.addEventListener("DOMContentLoaded", function() {
    const openMatrixBu = document.getElementById("openMatrix");
    if (openMatrixBu) {
        openMatrixBu.addEventListener("click", function() {
        const newPageContent = `
        <html>
        <head>
	        <script src="https://unpkg.com/feather-icons"></script>
	        <title>MPHEMBA MATRIX</title>
            <link rel="stylesheet" href="shopping.css">
            <script src="anotherMa.js"></script>
        <body>
	        <header>
                <h1>MPHEMBA MATRIX</h1>
            <div class="menu">
            <ul>
                <li><a href="">Home</a></li>
                <li><a href="">About</a></li>
				<div class="shopingCart"><li><i data-feather="shopping-cart" onclick="popUp()" style="color:black;"></i>
				<span class="quantity">0</span></div>
				<script>feather.replace()</script>
            </ul>
            </div>
		
            </header>
	        <div class="card" >
		        <h1>Cart</h1>
		<ul class="listCard"></ul>
		<div class="checkout">
			<div class="total" id="check" onclick="checkED()">Checkout: R0.00</div>
			<div class="closeShopping" onclick="popUp()">Close</div>
			<!--<div onclick="thankyou()" style="border:1px solid pink; width:200%;text-align:center;margin-top:50px;">Checkout</div>-->
		</div>
		
	</div>
	
	<div class="gallery">
			<img src="https://www.wootware.co.za/media/easyslide/asus-b850-b840-mobos-woot.jpg">
    </div>
	<div class="about">
		<li><i data-feather="truck"></i>
		<span><b>Free delivery</b><br>Only on orders over R1000**</span></li>
		<li><i data-feather="package"></i>
		<span><b>Free collection</b><br>We only have one collection point in CPT</span></li>
		<li><i data-feather="credit-card"></i>
		<span><b>Shop any computer</b> components you want<br></span></li>
		<script>feather.replace()</script>
	</div>
	<div class="catalogue">
		<h3>New Year, New Gear!</h3>
			<ul>
				<li><img src="https://www.wootware.co.za/media/catalog/product/cache/1/small_image/200x/9df78eab33525d08d6e5fb8d27136e95/9/8/9804909_2.png">
					<span>G.Skill F4-3200C16D-32GVK <br> Ripjaws V 32GB(2x16GB) <br> DDR4-3200MHZ<br>R2649.00<br><br>
					<button type="button" onclick="addCart('G.Skill F4-3200C16D-32GVK Ripjaws V 32GB(2x16GB) DDR4-3200MHZ', 2649.00,)" style="width:240px;height:30px;color:white;background-color:black;cursor: pointer;">Add to cart</button></span>
				</li>
				<li><img src="https://www.wootware.co.za/media/catalog/product/cache/1/small_image/200x/9df78eab33525d08d6e5fb8d27136e95/0/1/01-gf3eg5hs.jpg">
					<span>Phantek PH-NV723TG_DBK01 <br>NV7 D-RGB Black Tempered <br>Glass <br>R1899.99<br><br>
					<button type="button" onclick="addCart('Phantek PH-NV723TG_DBK01 NV7 D-RGB Black Tempered Glass', 1899,99)" style="width:240px;height:30px;color:white;background-color:black;cursor: pointer;" >Add to cart</button></span>
				</li>
				<li><img src="https://www.wootware.co.za/media/catalog/product/cache/1/small_image/200x/9df78eab33525d08d6e5fb8d27136e95/x/f/xfx-radeon-rx-6800-speedster-swft319-core-rx-68xlaqfd9-16gb-gddr6-graphics-card-1.jpg">
					<span>XFX Radeon RX 7900 XT <br> Speed MERC 310 RX-79TMERCU9 <br>20GB GDDR6 <br>R3499.99<br><br>
					<button type="button" onclick="addCart('XFX Radeon RX 7900 XT Speed MERC 310 RX-79TMERCU9 20GB GDDR6', 3499.99)" style="width:240px;height:30px;color:white;background-color:black;cursor: pointer;">Add to cart</button></span>
				</li>
				<li><img src="https://www.wootware.co.za/media/catalog/product/cache/1/small_image/200x/9df78eab33525d08d6e5fb8d27136e95/r/t/rtx4060ti_jetstream_b-pa366.jpg">
					<span>Palit GeForce RTX<br>4060 Ti JetStream<br>NE6406T019T1 <br>R1259.95<br><br>
					<button type="button" onclick="addCart('Palit GeForce RTX 4060 Ti JetStream NE6406T019T1', 1259.95)" style="width:240px;height:30px;color:white;background-color:black;cursor: pointer;">Add to cart</button></span>
				</li><br>
				<li><img src="https://www.wootware.co.za/media/catalog/product/cache/1/small_image/200x/9df78eab33525d08d6e5fb8d27136e95/2/0/20-232-748-01.jpg">
					<span>G.Skill F4-3200C16D-32TZRC <br>Trident Z RGB 32GB DDR4 <br>3600Mhz Memory <br>R599.90<br><br>
					<button type="button" onclick="addCart('G.Skill F4-3600C16D-32GTZRC Trident Z RGB 32GB DDR4 3600MHz Memory', 599.00)" style="width:240px;height:30px;color:white;background-color:black;cursor: pointer;">Add to cart</button></span>
				</li>
				<li><img src="https://www.wootware.co.za/media/catalog/product/cache/1/small_image/200x/9df78eab33525d08d6e5fb8d27136e95/a/l/alienware-aw3225qf-2.jpg">
					<span>Alienware AW3225QF 32inch 4k <br> UHD(3840x2160) 240Hz <br>NVIDIA CURVED 1700R<br>Gaming Desktop Monitor<br>R23499.00<br><br>
					<button type="button" onclick="addCart('Alienware AW3225QF 32inch 4K UHD(3840x2160) 240Hz 0.03ms QD OLED NVIDIA G-SYNC Compatible Curved 1700R Gaming Desktop Monitor', 23499.00)" style="width:240px;height:30px;color:white;background-color:black;cursor: pointer;">Add to cart</button></span>
				</li>
				<li><img src="https://www.wootware.co.za/media/catalog/product/cache/1/small_image/200x/9df78eab33525d08d6e5fb8d27136e95/a/s/asus_tuf_gaming_b550_plus_wifi_ii_01-6nei2chs.jpg">
					<span>ASUS TUF GAMING B550-PLUS <br>WIFI II AMD B550 RYZEN <br> Socket AM4 ATX <br> R2499.00<br><br><br>
					<button type="button" onclick="addCart('ASUS TUF GAMING B550-PLUS WIFI II AMD B550 Ryzen Socket AM4 ATX', 2499.00)" style="width:240px;height:30px;color:white;background-color:black;cursor: pointer;">Add to cart</button></span>
				</li>
				<li><img src="https://www.wootware.co.za/media/catalog/product/cache/1/small_image/200x/9df78eab33525d08d6e5fb8d27136e95/a/m/amd-r7-7000-3dpibwof-01.jpg">
					<span>AMD 100-1000000591WOF <br> Ryzen 7 7700X 5.40GHz 8-Core <br>Zen 4 Socket AM5 <br>R7599.00<br><br><br>
					<button type="button" onclick="addCart('AMD 100-100000591WOF Ryzen 7 7700X 5.40GHz 8-Core Zen 4 Socket AM5', 7599.00)" style="width:240px;height:30px;color:white;background-color:black;cursor: pointer;">Add to cart</button></span>
				</li><br>
			</ul>
			</div>
			
			
			<hr>
			<div class="catalogue">
				<h3>Most Popular Laptops</h3>
					<ul>
						<li><img src="https://www.wootware.co.za/media/catalog/product/cache/1/small_image/200x/9df78eab33525d08d6e5fb8d27136e95/a/s/asus-x1504za-2.jpg">
							<span>ASUS X1502ZA-I58512BL0W Vivobook <br>15 Intel Core i5-1235U <br>8GB (On-Board) DDR4<br>R8999.00<br><br><br>
							<button type="button" onclick="addCart('ASUS X1504ZA-I58512BL0W Vivobook 15 Intel Core i5-1235U 8GB (On-Board) DDR4-3200 512GB M.2 NVMe SSD', 8999.99)" style="width:240px;height:30px;color:white;background-color:black;cursor: pointer;">Add to cart</button></span>
						</li>
						<li><img src="https://www.wootware.co.za/media/catalog/product/cache/1/small_image/200x/9df78eab33525d08d6e5fb8d27136e95/p/r/probook_455_1__1_1.jpg">
							<span>HP 968K4ET Probook 455 G10 <br>AMD Ryzen 7 7730U 4.50GHz <br>8-Core 15.6inch 16GB<br>R15999.99<br><br>
							<button type="button" onclick="addCart('HP 968K4ET Probook 455 G10 AMD Ryzen 7 7730U 4.50Ghz 8-Core 15.6inch 16GB (1x16GB) DDR4-3200 1TB M.2 NVMe SSD', 15999,99)" style="width:240px;height:30px;color:white;background-color:black;cursor: pointer;">Add to cart</button></span>
						</li>
						<li><img src="https://www.wootware.co.za/media/catalog/product/cache/1/small_image/200x/9df78eab33525d08d6e5fb8d27136e95/w/o/wootbook-y16-wqxga-01.jpg">
							<span>WootBook Y15 AMD Ryzen 7 <br>8845HS 5.10GHz Boost <br>8-Core 15.3 WQXGA<br>R14799.00<br><br>
							<button type="button" onclick="addCart('WootBook Y15 AMD Ryzen 7 8845HS 5.10GHz Boost 8-Core 15.3 WQXGA (2560x1600) 120Hz Grey Laptop', 14799.00)" style="width:240px;height:30px;color:white;background-color:black;cursor: pointer;">Add to cart</button></span>
						</li>
						<li><img src="https://www.wootware.co.za/media/catalog/product/cache/1/small_image/200x/9df78eab33525d08d6e5fb8d27136e95/x/1/x1502za-i38512bl0w-0_1.jpg">
							<span>ASUS X1502ZA-I38512BL0W Vivobook <br>15 Intel Core i3-1220P 4.40GHz <br> 10-Core 15.6 Full HD<br>R7999.00<br><br><br>
							<button type="button" onclick="addCart('ASUS X1502ZA-I38512BL0W Vivobook 15 Intel Core i3-1220P 4.40Ghz 10-Core 15.6 Full HD (1920x1080) TN 8GB (On-Board) DDR4-3200 512GB M.2 NVMe SSD', 7999.00)" style="width:240px;height:30px;color:white;background-color:black;cursor: pointer;">Add to cart</button></span>
						</li>
			</div>
			<div class="catalogue">
				<h3>All In One PCs</h3>
					<ul>
						<li><img src="https://www.wootware.co.za/media/catalog/product/cache/1/small_image/200x/9df78eab33525d08d6e5fb8d27136e95/e/5/e5202wha-i582b0x_8__1_1.jpg">
							<span>ASUS E5402WHAT-I516512B0X ExpertCenter E5 AiO 24 Intel Core i5-11500B 4.60Ghz 6-Core 23.8"...<br>R174990.99<br><br><br>
							<button type="button" onclick="addCart('ASUS E5402WHAT-I516512B0X ExpertCenter E5 AiO 24 Intel Core i5-11500B 4.60Ghz 6-Core 23.8 Full HD (1920x1080) IPS Touch Anti-Glare 16GB (1x16GB) DDR4-3200 512GB M.2 NVMe SSD Windows 11 Pro Black All-In-One Desktop PC', 17499.99)" style="width:240px;height:30px;color:white;background-color:black;cursor: pointer;">Add to cart</button></span>
						</li>
						<li><img src="https://www.wootware.co.za/media/catalog/product/cache/1/small_image/200x/9df78eab33525d08d6e5fb8d27136e95/e/5/e5402what-i58512b0x_13__1_1.jpg">
							<span>Dell Optiplex 3280 All-In-One Intel Core i5-10500T 3.80GHz 6-Core 21.5"...<br>R32999.99<br><br>
							<button type="button" onclick="addCart('Dell Optiplex 3280 All-In-One Intel Core i5-10500T 3.80GHz 6-Core 21.5 Full HD (1920x1080) IPS Touch Anti-Glare 8GB (1x8GB) DDR4-2666MT/s 256GB M.2 NVMe SSD DVD+RW Windows 11 Pro Black Desktop PC', 32999,99)" style="width:240px;height:30px;color:white;background-color:black;cursor: pointer;">Add to cart</button></span>
						</li>
						<li><img src="https://www.wootware.co.za/media/catalog/product/cache/1/small_image/200x/9df78eab33525d08d6e5fb8d27136e95/a/s/asus-m3402wfa-11.jpg">
							<span>ASUS M3402WFAK-516512W0W M3 AMD Ryzen 5 7520U 4.30GHz 4-Core 23.8"...<br>R15299.00<br><br>
							<button type="button" onclick="addCart('ASUS M3402WFAK-516512W0W M3 AMD Ryzen 5 7520U 4.30GHz 4-Core 23.8 Full HD (1920x1080) 75Hz WVA Anti-Glare 16GB (On-Board) LPDDR5 512GB M.2 NVMe SSD Windows 11 Home White All-In-One Desktop PC', 15299.00)" style="width:240px;height:30px;color:white;background-color:black;cursor: pointer;">Add to cart</button></span>
						</li>
						<li><img src="https://www.wootware.co.za/media/catalog/product/cache/1/small_image/200x/9df78eab33525d08d6e5fb8d27136e95/a/i/aio-advanced-m3400-ryzen-7000-white-0.jpg">
							<span>ASUS M3400WFAK-58512W0W AIO Advanced M3400 AMD Ryzen 5 7520U 4.30GHz 4-Core 23.8"...<br>R16440.00<br><br><br>
							<button type="button" onclick="addCart('ASUS M3400WFAK-58512W0W AIO Advanced M3400 AMD Ryzen 5 7520U 4.30GHz 4-Core 23.8 Full HD (1920x1080) Anti-glare 8GB(On-Board) LPDDR5 512GB M.2 NVMe SSD Windows 11 Home White All-In-One Desktop PC', 16440)" style="width:240px;height:30px;color:white;background-color:black;cursor: pointer;">Add to cart</button></span>
						</li>
			</div>
			<div class="catalogue">
				<h3>Hardware</h3>
					<ul>
						<li><img src="https://www.wootware.co.za/media/catalog/product/cache/1/small_image/200x/9df78eab33525d08d6e5fb8d27136e95/a/s/asus-va27ehf-01_v1.jpg">
							<span>ASUS VA27EHF 27inch 100Hz 1ms IPS FreeSync Black Desktop<br>R2699.99<br><br><br>
							<button type="button" onclick="addCart('ASUS VA27EHF 27inch 100Hz 1ms IPS FreeSync Black Desktop', 270.99)" style="width:240px;height:30px;color:white;background-color:black;cursor: pointer;">Add to cart</button></span>
						</li>
						<li><img src="https://www.wootware.co.za/media/catalog/product/cache/1/small_image/200x/9df78eab33525d08d6e5fb8d27136e95/s/f/sf_850w_se_1_.jpg">
							<span>Super FLower SF-850F14MP Leadex SE Platinum 850W 80 Plus Platinum Fully Modular Black Desktop<br>R2499.99<br><br>
							<button type="button" onclick="addCart('Super FLower SF-850F14MP Leadex SE Platinum 850W 80 Plus Platinum Fully Modular Black Desktop', 2499.99)" style="width:240px;height:30px;color:white;background-color:black;cursor: pointer;">Add to cart</button></span>
						</li>
						<li><img src="https://www.wootware.co.za/media/catalog/product/cache/1/small_image/200x/9df78eab33525d08d6e5fb8d27136e95/w/d/wds100t3b0e_1_.jpg">
							<span>Western Digital WDS100T3B0E Blue SN580 1TB M.2 2280 PCIe 4.0 x4 NVMe Solid State Drive<br>R1299.00<br><br>
							<button type="button" onclick="addCart('Western Digital WDS100T3B0E Blue SN580 1TB M.2 2280 PCIe 4.0 x4 NVMe Solid State Drive', 1299.00)" style="width:240px;height:30px;color:white;background-color:black;cursor: pointer;">Add to cart</button></span>
						</li>
						<li><img src="https://www.wootware.co.za/media/catalog/product/cache/1/small_image/200x/9df78eab33525d08d6e5fb8d27136e95/v/x/vxe_r1_black_7_.jpg">
							<span>VXE R1 BLACK 26000 DPI Wireless Gaming Mouse<br>R679.00<br><br><br>
							<button type="button" onclick="addCart('VXE R1 BLACK 26000 DPI Wireless Gaming Mouse', 679.00)" style="width:240px;height:30px;color:white;background-color:black;cursor: pointer;">Add to cart</button></span>
						</li>
						<li><img src="https://www.wootware.co.za/media/catalog/product/cache/1/small_image/200x/9df78eab33525d08d6e5fb8d27136e95/w/d/wd-blue-sa510-sata-2-5-ssd-1tb.jpg">
							<span>Western Digital WDS100T3B0A WD Blue SA510 1TB 2.5" SATA 3.0 Solid State Drive <br>R1249.00<br><br>
							<button type="button" onclick="addCart('Western Digital WDS100T3B0A WD Blue SA510 1TB 2.5 SATA 3.0 Solid State Drive', 1249.00)" style="width:240px;height:30px;color:white;background-color:black;cursor: pointer;">Add to cart</button></span>
						</li>
						<li><img src="https://www.wootware.co.za/media/catalog/product/cache/1/small_image/200x/9df78eab33525d08d6e5fb8d27136e95/a/6/a620_pro_se_0_.jpg">
							<span>ID-Cooling FROZN A620 PRO SE BLACK 120mm Dual-Tower Black PWM CPU Cooler<br>R699.00<br><br>
							<button type="button" onclick="addCart('ID-Cooling FROZN A620 PRO SE BLACK 120mm Dual-Tower Black PWM CPU Cooler', 699.00)" style="width:240px;height:30px;color:white;background-color:black;cursor: pointer;">Add to cart</button></span>
						</li>
						<li><img src="https://www.wootware.co.za/media/catalog/product/cache/1/small_image/200x/9df78eab33525d08d6e5fb8d27136e95/m/o/montech_x3_mesh_black_0_.jpg">
							<span>Montech X3 MESH RGB Tempered Glass Black ATX Mid Tower Desktop Chassis<br>R919.95<br><br>
							<button type="button" onclick="addCart('Montech X3 MESH RGB Tempered Glass Black ATX Mid Tower Desktop Chassis', 919.95)" style="width:240px;height:30px;color:white;background-color:black;cursor: pointer;">Add to cart</button></span>
						</li>
						<li><img src="https://www.wootware.co.za/media/catalog/product/cache/1/small_image/200x/9df78eab33525d08d6e5fb8d27136e95/a/m/amd-r79800x3d-01.jpg">
							<span>AMD 100-100001084WOF Ryzen 7 9800X3D 5.2GHz 8-Core Zen 5 Socket AM5 Desktop CPU - Cooler Not Included<br>R229.00<br><br><br>
							<button type="button" onclick="addCart('AMD 100-100001084WOF Ryzen 7 9800X3D 5.2GHz 8-Core Zen 5 Socket AM5 Desktop CPU - Cooler Not Included', 229.00)" style="width:240px;height:30px;color:white;background-color:black;cursor: pointer;">Add to cart</button></span>
						</li>
					</ul>
	</div>
	<hr>
<div class="mortar">
    <h4 style="font-size: 30px; font-weight: bold; text-align: justify; margin: 30px;">MPHEMBA <br> MATRIX</h4>
</div>
<div class="brick">
    <p style="text-align: right;">&copy; Copyright Bash Group (Pty) Ltd.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br>
    All Rights Reserved. Mphemba Matrix unlicensed provider.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br>
    Cape Town 6 Browning Rd, Salt River, Cape Town, 7925&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br>
    www.mphembamatrix.co.za&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br>
    <b style="text-align: right;">Access to information | Privacy | Mphemba Matrix Limited&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b></p>
</div>
        </body>
        </html>
        `;
    const newTab = window.open();
    newTab.document.write(newPageContent);
    newTab.document.close();
        });
    }
});