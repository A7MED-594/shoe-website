let currentSlide = 0;
const track = document.getElementById('carouselTrack');
const cards = document.querySelectorAll('.product-card-carousel');
const totalCards = cards.length;
const cardsPerView = 4; 
const maxSlide = Math.max(0, totalCards - cardsPerView);

function updateCarousel() {
    const translateX = -currentSlide * (280 + 30); 
    track.style.transform = `translateX(${translateX}px)`;
}

function nextSlide() {
    if (currentSlide < maxSlide) {
        currentSlide++;
        updateCarousel();
    }
}

function prevSlide() {
    if (currentSlide > 0) {
        currentSlide--;
        updateCarousel();
    }
}

updateCarousel();