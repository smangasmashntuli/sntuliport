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
        
        document.getElementById('products').addEventListener('order', async function (e) {
    e.preventDefault();

    const name = document.getElementById('title').value;
    const email = document.getElementById('price').value;
    const feedback = document.getElementById('description').value;
    
    const response = await fetch('http://localhost:3001/order', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({title, price, description})
    });

    const result = await response.text();
    alert(result);
});
