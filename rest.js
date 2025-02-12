const carousel = document.querySelector('.carousel');
        let scrollAmount = 0;

        function scrollCarousel(direction) {
            const cardWidth = 320; // Width of a card + gap
            const maxScroll = carousel.scrollWidth - carousel.clientWidth;
            
            scrollAmount += direction * cardWidth;

            if (scrollAmount < 0) scrollAmount = 0;
            if (scrollAmount > maxScroll) scrollAmount = maxScroll;

            carousel.style.transform = `translateX(-${scrollAmount}px)`;
        }

        function showPopup(image, title, price, description) {
            document.getElementById('image').setAttribute('src', image);
            document.getElementById('title').textContent = title;
            document.getElementById('price').textContent = price;
            document.getElementById('description').innerHTML = description;
            document.getElementById('family').style.display = 'flex';
        }
        
        function closeModal() {
            document.getElementById('family').style.display = 'none';
        }
        
        window.onclick = function(event) {
            const modal = document.getElementById('family');
            if (event.target === modal) {
                closeModal();
            }
        };
        