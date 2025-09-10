let currentSlide = 0;
const track = document.getElementById('carouselTrack');
const cards = document.querySelectorAll('.product-card-carousel');
const totalCards = cards.length;
const cardsPerView = 4; 
const maxSlide = Math.max(0, totalCards - cardsPerView);

function updateCarousel() {
    const translateX = -currentSlide * (280 + 30); 
    track.style.transform = `translateX(${translateX}px)`;
    updateButtonStates();
}

function updateButtonStates() {
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    // Reset button classes
    prevBtn.classList.remove('active', 'inactive');
    nextBtn.classList.remove('active', 'inactive');
    
    if (currentSlide === 0) {
        // At the beginning - next button is active, prev is inactive
        nextBtn.classList.add('active');
        prevBtn.classList.add('inactive');
    } else if (currentSlide >= maxSlide) {
        // At the end - prev button is active, next is inactive
        prevBtn.classList.add('active');
        nextBtn.classList.add('inactive');
    } else {
        // In the middle - both buttons are active
        prevBtn.classList.add('active');
        nextBtn.classList.add('active');
    }
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

// Scroll Animation System
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('[class*="animate-"]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}


// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initScrollAnimations();
    
    // Payment form handling (existing code)
    const form = document.getElementById("paymentForm");
    if (form) {
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
    }
});
