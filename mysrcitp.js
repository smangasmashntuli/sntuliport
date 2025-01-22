const spans = document.querySelectorAll('.formula h1');
let delay = 0;


spans.forEach((span, index) => {
    setTimeout(() => {
        span.computedStyleMap.animation = `color-shift${index %2 === 0?'' : '-right'} 5s infinite`;
    }, delay);
    delay += 500;
}
);
function sent() {
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const feedback = document.getElementById("feedback").value.trim();

    if (name && email && feedback) {
        const subject = "Feedback from " + name;
        const body = "Name: " + name + "\nEmail: " + email + "\nFeedback: " + feedback;
        const mailto = "mailto:smangasmashntuli@gmail.com?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
        window.location.href = mailto;
    } else {
        alert("Please fill in all fields.");
    }
}
function userComment(){
    const Name = document.getElementById("c-name").value.trim();
    const Comment = document.getElementById("comment").value.trim();
    const pp = document.getElementById("profile").files[0];
    const placeholder = document.getElementById("placeholder");

    if(Name && Comment){
        const commentDiv = document.createElement("div");
        commentDiv.className = "single-comment";
        const nmElement = `<h3 style=display:flex;>${Name}</h3>`;
        const cmElement = `<p style=display:flex;>${Comment}</p>`;

        let imgElement = "";
        if(pp){
            const reader = new FileReader();
            reader.onload = function(e) {
                imgElement = `<img src="${e.target.result}" alt="profile-picture" style="width: 30px; border-radius: 50%; display:flex;">`;
                commentDiv.innerHTML = `${imgElement}${nmElement}${cmElement}`;
                placeholder.appendChild(commentDiv);
        };
        reader.readAsDataURL(pp);
        } else{
            commentDiv.innerHTML = `${nmElement}${cmElement}`;
            placeholder.appendChild(commentDiv);
        }
    }else{
        alert("Please fill in all fields.");
    }
}
/*function userComment() {
    const name = document.getElementById("c-name").value.trim();
    const comment = document.getElementById("comment").value.trim();

    if (!name || !comment) {
        alert("Please fill in all fields.");
        return;
    }

    fetch("http://localhost:5500/submit-comment", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, comment }), 
    })
        .then((response) => {
            if (response.ok) {
                alert("Comment submitted successfully.");
                document.getElementById("c-name").value = "";
                document.getElementById("comment").value = "";
            } else {
                return response.json().then((data) => {
                    alert(`Error: ${data.error}`);
                });
            }
        })
        .catch((error) => {
            console.error("Error:", error);
            alert("An error occurred while submitting the comment.");
        });
}*/


document.addEventListener('DOMContentLoaded', function() {
    const vote = document.getElementById("voteapp");
    if(vote){
        vote.addEventListener("click", function(){
            const anotherPageContent =`
            <html lang="en">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=Edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="mystyle.css">
        <title>VoteApp</title>
    </head>
    <body>
        <header>
            <h1>Cars Voting</h1>
        </header>
        <div class="introduction">
            <img src="https://www.carmag.co.za/wp-content/uploads/2023/05/Model-1-1024x614.webp" alt="">
            <img src="https://businesstech.co.za/news/wp-content/uploads/2022/12/Suzuki-Swift-2021-160-_-Resized-1.webp" alt="">
            <img src="https://businesstech.co.za/news/wp-content/uploads/2023/04/toyota-starlet.jpg" alt="">
            <img src="https://topauto.co.za/wp-content/uploads/2021/02/KIA-Picanto-X-Line-header.jpg" alt="">
            <img src="https://img-ik.cars.co.za/ik-seo/carsimages/tr:n-stock_large/9850185_3/2023-Suzuki-Baleno-15-GLX-Auto.jpg?v=2776432509" alt="">
            <img src="https://topauto.co.za/wp-content/uploads/2021/09/2021-Renault-Kiger-Header-2.jpg" alt="">
            <img src="https://topauto.co.za/wp-content/uploads/2021/10/2020-Hyundai-Atos.jpg" alt="">
            <img src="https://businesstech.co.za/news/wp-content/uploads/2023/06/2022-Toyota-Hilux-GR-Sport-Header.jpg" alt="">
            <img src="https://topauto.co.za/wp-content/uploads/2022/05/2022-Ford-EcoSport-Active-Header-2.jpg" alt="">
            <img src="https://topauto.co.za/wp-content/uploads/2021/02/Renault-Kwid-Expression-header-1024x625.jpg" alt="">
            <img src="https://topauto.co.za/wp-content/uploads/2021/11/2020-Suzuki-S-Presso-Header-1-1024x625.jpg" alt="">
        </div>
        <div class = "intro2">
            <div class="intro-text">
            
            <p>Welcome to the <b>Cars Voting</b> web application! Created by an aspiring full-stack developer, this
               platform allows users to vote for their favorite cars and view the trends in popular models. Through
               this app, you’ll gain insight into the most popular cars across the country for 2024, including valuable
               information on affordability and user preferences. By exploring the results, prospective car buyers can 
               identify models that align with their budget and safety standards. Additionally, this app highlights which 
               brands are most preferred, offering a helpful guide for anyone considering their next car purchase.
            </p>
            </div>
            <img src="images/OIP.jpeg" alt="iconpng">
        </div>
        <div class = "featured-cars">
            <h2>Most Outgoing Cars</h2>
            <ul>
                <li>
                    <h4>VW Polo</h4>
                    <img src="https://th.bing.com/th/id/OIP.CJVeaCysOdhf3YtKKGVPZwAAAA?rs=1&pid=ImgDetMain" alt="vw-polo">
                </li>
                <li>
                    <h4>Hyundai Grand i10</h4>
                    <img src="https://th.bing.com/th/id/R.a1e0c72bc540f6be0b6aed35506b0a8d?rik=LMO%2bGVytxJJknA&pid=ImgRaw&r=0" alt="hyndai-grand-i10">
                </li>
                <li>
                    <h4>SUZUKI Baleno</h4>
                    <img src="https://cdni.autocarindia.com/ExtraImages/20220228061914_Maruti_Baleno_2022_front.jpg" alt="suzuki-baleno">
                </li>
            </ul>
            <p>This information was outsourced from various sources.</p>
        </div>
        <div class = "GUI">
            <div class = "for-head"><h1>Vote for best CAR Brand</h1></div>
            <label for="">Enter Car Brand you want to vote for:
                <input type="text" id="textident" class = "inputname">
            </label>
            <button id="vote-button" onclick="submitVote()">Vote</button>
            <h2>Here's the trend of cars!</h2>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.4/Chart.js"></script>
            <canvas class="canvas" id="myChart"></canvas>
            
        </div>
        <script src="scripttwo.js"></script>
    </body>
</html>
            `;
            const newTab = window.open();
            newTab.document.write(anotherPageContent);
            newTab.document.close();
        });
    }
});
document.addEventListener("DOMContentLoaded", function(){
    const boxchat = document.getElementById("chatbotA");
    if(boxchat){
        boxchat.addEventListener("click", function(){
            const secNewPage = `
            <html>
            <head>
                <link rel="stylesheet" href="chatbot.css">
                <script src="chatbot.js"></script>
                <title>ChatBot</title>
            </head>
            <body>
                <div class="chat" id="chatContainer">
                    <header>Rapid
                    </header>
                    <div class="robot" id="chatwithRob">
			        </div>
                    <div class="inputContan">
                        <input type="text" id="user-input" placeholder="Type a message...">
                        <button class="buttton" onclick="sendMessage()">Send</button>
                    </div>
                </div>
            </body>
            </html>
            `;
            
            const newTab = window.open();
            newTab.document.write(secNewPage);
            newTab.document.close();
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
