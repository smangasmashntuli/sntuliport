const images = document.querySelectorAll('.gallery img');
		let currentImageIndex = 0;

		function showImage(index) {
			images.forEach((image, i) => {
			if (i === index) {
				image.style.display = 'block';
			} else {
				image.style.display = 'none';
			}
		});
	}

	function nextImage() {
		currentImageIndex++;
		if (currentImageIndex >= images.length) {
			currentImageIndex = 0;
		}
		showImage(currentImageIndex);
	}

	function prevImage() {
		currentImageIndex--;
		if (currentImageIndex < 0) {
			currentImageIndex = images.length - 1;
		}
		showImage(currentImageIndex);
	}

	showImage(currentImageIndex);

	setInterval(nextImage, 4000);
	
	
	
	let cart = [];
	
	function addCart(itemName, itemPrice) {
            const item = {
                name: itemName,
                price: itemPrice,
                quantity: 1,
            };
            cart.push(item);
            updateCartCount();
            reloadCart();
        }
	function updateCartCount() {
            const cartCountElement = document.querySelector(".quantity");
            cartCountElement.textContent = cart.length;
        }

    function popUp() {
        const cartPopup = document.querySelector(".card");
        cartPopup.classList.toggle("active");
    }
	function reloadCart() {
            const listCard = document.querySelector(".listCard");
            listCard.innerHTML = '';
            let total = 0;

            cart.forEach((item, index) => {
                const cardItem = document.createElement("li");
                const productName = document.createElement("div");
                const productPrice = document.createElement("div");
                const quantitySelect = document.createElement("select");
                const removeIcon = document.createElement("i");

                removeIcon.classList.add("remove-icon");

                cardItem.appendChild(removeIcon);

                removeIcon.setAttribute('data-item-index', index);

                removeIcon.addEventListener('click', removeCartItem);

                for (let i = 1; i <= 10; i++) {
                    const option = document.createElement("option");
                    option.value = i;
                    option.text = i;
                    quantitySelect.appendChild(option);
                }

                productName.textContent = item.name;
                productPrice.textContent = 'Price: R' + item.price.toFixed(2);

                quantitySelect.value = item.quantity;

                quantitySelect.onchange = function () {
                    changeQuantity(index, parseInt(quantitySelect.value, 10));
                };

                cardItem.appendChild(productName);
                cardItem.appendChild(productPrice);
                cardItem.appendChild(quantitySelect); 
				cardItem.appendChild(removeIcon);

                listCard.appendChild(cardItem);

                total += item.price * item.quantity;
            });

            const totalPrice = document.querySelector('.total');
            totalPrice.textContent = 'Checkout: R' + total.toFixed(2);
        }
		function changeQuantity(index, newQuantity) {
            if (newQuantity >= 0) {
                cart[index].quantity = newQuantity;

                reloadCart();
            }
        }
		function removeCartItem(event) {
            const itemIndex = event.target.getAttribute('data-item-index');
            if (itemIndex !== null) {
                cart.splice(itemIndex, 1);
                updateCartCount();
                reloadCart();
            }
        }
		function checkED() {
            const total = calculateTotal();
            alert("Your order of R" + total.toFixed(2) + " has been received.");
            clearCart();
        }
		/*function clearCart(){
			cart = [];
			const lisca = document.querySelector('.listCard');
			lisca.innerHTML = '';
			cosnt totalPrice = document.querySelector('.total');
			totalPrice.textContent = 'Checkout: R0.00';
			
		}*/
		function calculateTotal() {
            return cart.reduce((total, item) => total + item.price * item.quantity, 0);
        }

        function updateCartCount() {
            const cartCountElement = document.querySelector(".quantity");
            cartCountElement.textContent = cart.length;
        }
