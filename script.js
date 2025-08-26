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

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("paymentForm");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("cardName").value.trim();
    const number = document.getElementById("cardNumber").value.trim();
    const expiration = document.getElementById("expiration").value.trim();
    const cvv = document.getElementById("cvv").value.trim();

    if (!name || !number || !expiration || !cvv) {
      alert("⚠️ Please fill in all fields!");
      return;
    }

    if (number.length < 12 || number.length > 19 || isNaN(number)) {
      alert("⚠️ Invalid card number!");
      return;
    }

    if (cvv.length < 3 || cvv.length > 4 || isNaN(cvv)) {
      alert("⚠️ Invalid CVV code!");
      return;
    }

    alert("✅ Payment confirmed successfully!");
  });
});
