// Carousel functionality
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

// Add click functionality to carousel product cards
function addProductCardClickHandlers() {
    const productCards = document.querySelectorAll('.product-card-carousel');
    productCards.forEach(card => {
        card.style.cursor = 'pointer';
        card.addEventListener('click', function(e) {
            // Prevent click during carousel navigation
            if (e.target.closest('.carousel-btn')) {
                return;
            }
            window.location.href = 'product.html';
        });
    });
}

// Initialize click handlers when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    addProductCardClickHandlers();
});

// Advanced Scroll-Triggered Animation System
class ScrollAnimationController {
    constructor() {
        this.animatedElements = new Set();
        this.init();
    }

    init() {
        this.setupIntersectionObserver();
        this.addAnimationClasses();
        this.setupScrollEffects();
    }

    setupIntersectionObserver() {
        const options = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.animatedElements.has(entry.target)) {
                    console.log('Animating element:', entry.target);
                    this.triggerAnimation(entry.target);
                    this.animatedElements.add(entry.target);
                }
            });
        }, options);

        // Wait for DOM to be fully loaded before observing
        setTimeout(() => {
            const animatedElements = document.querySelectorAll('[class*="animate-"]');
            console.log('Found animated elements:', animatedElements.length);
            
            animatedElements.forEach(el => {
                console.log('Observing element:', el.className);
                this.observer.observe(el);
            });
        }, 100);
    }

    addAnimationClasses() {
        // Hero section animations
        const heroTitle = document.querySelector('.hero-title');
        const heroDescription = document.querySelector('.hero-description');
        const shopBtn = document.querySelector('.shop-now-btn');
        const heroImage = document.querySelector('.hero-image');

        if (heroTitle) {
            heroTitle.classList.add('animate-slide-left', 'stagger-1');
        }
        if (heroDescription) {
            heroDescription.classList.add('animate-slide-left', 'stagger-2');
        }
        if (shopBtn) {
            shopBtn.classList.add('animate-bounce-up', 'stagger-3', 'hover-pulse');
        }
        if (heroImage) {
            heroImage.classList.add('animate-slide-right', 'stagger-2');
        }

        // Product cards with different animations
        const productCards = document.querySelectorAll('.product-card-carousel');
        const animations = [
            'animate-flip-x',
            'animate-flip-y', 
            'animate-zoom-rotate',
            'animate-bounce-up',
            'animate-elastic',
            'animate-roll'
        ];

        productCards.forEach((card, index) => {
            const animationClass = animations[index % animations.length];
            const staggerClass = `stagger-${(index % 6) + 1}`;
            card.classList.add(animationClass, staggerClass, 'hover-tada');
            // Remove any existing transitions for instant snap-back
            card.style.transition = 'none';
        });

        // Section titles with creative animations
        const sectionTitles = document.querySelectorAll('.section-title, .most-selling-title, .reviews-title');
        sectionTitles.forEach((title, index) => {
            const titleAnimations = ['animate-jack-in-box', 'animate-light-speed', 'animate-rotate-down-left'];
            title.classList.add(titleAnimations[index % titleAnimations.length]);
        });

        // Store section
        const storeContent = document.querySelector('.store-content');
        const storeImage = document.querySelector('.store-image-container');
        if (storeContent) storeContent.classList.add('animate-slide-left', 'hover-swing');
        if (storeImage) storeImage.classList.add('animate-rotate-up-right');

        // Most selling products
        const sellingCards = document.querySelectorAll('.selling-product-card');
        sellingCards.forEach((card, index) => {
            const sellingAnimations = ['animate-elastic', 'animate-zoom-rotate', 'animate-jack-in-box'];
            card.classList.add(sellingAnimations[index % sellingAnimations.length], `stagger-${index + 1}`, 'hover-rubber');
            card.style.transition = 'none';
        });

        // Features with staggered animations
        const featureItems = document.querySelectorAll('.feature-item');
        featureItems.forEach((item, index) => {
            item.classList.add('animate-slide-up', `stagger-${index + 1}`, 'hover-wobble');
            item.style.transition = 'none';
        });

        // Why choose section
        const whyChooseImages = document.querySelector('.why-choose-images');
        const whyChooseContent = document.querySelector('.why-choose-content');
        if (whyChooseImages) {
            whyChooseImages.classList.add('animate-roll');
            whyChooseImages.style.transition = 'none';
        }
        if (whyChooseContent) {
            whyChooseContent.classList.add('animate-light-speed');
            whyChooseContent.style.transition = 'none';
        }

        // Customer avatars
        const customerAvatars = document.querySelectorAll('.customer-avatar');
        customerAvatars.forEach((avatar, index) => {
            avatar.classList.add('animate-bounce-up', `stagger-${index + 1}`, 'hover-heartbeat');
            avatar.style.transition = 'none';
        });

        // Review content
        const reviewContent = document.querySelector('.review-content');
        if (reviewContent) reviewContent.classList.add('animate-flip-y', 'stagger-5');

        // Footer sections
        const footerSections = document.querySelectorAll('.footer-section');
        footerSections.forEach((section, index) => {
            section.classList.add('animate-slide-up', `stagger-${index + 1}`);
        });
    }

    triggerAnimation(element) {
        // Add the 'animate' class to trigger the animation
        element.classList.add('animate');
        console.log('Added animate class to:', element.className);
        
        // Add special effects for certain elements
        if (element.classList.contains('animate-zoom-rotate')) {
            setTimeout(() => this.addSparkleEffect(element), 300);
        }
        
        if (element.classList.contains('animate-jack-in-box')) {
            setTimeout(() => this.addBounceEffect(element), 200);
        }
    }

    addSparkleEffect(element) {
        const sparkles = document.createElement('div');
        sparkles.className = 'sparkle-effect';
        sparkles.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            width: 100px;
            height: 100px;
            pointer-events: none;
            background: radial-gradient(circle, rgba(185,152,93,0.8) 0%, transparent 70%);
            border-radius: 50%;
            transform: translate(-50%, -50%) scale(0);
            animation: sparkle 1s ease-out forwards;
            z-index: 1000;
        `;
        
        element.style.position = 'relative';
        element.appendChild(sparkles);
        
        setTimeout(() => sparkles.remove(), 1000);
    }

    addBounceEffect(element) {
        element.style.transform += ' scale(1.1)';
        setTimeout(() => {
            element.style.transform = element.style.transform.replace(' scale(1.1)', '');
        }, 200);
    }

    setupScrollEffects() {
        // Scroll effects can be added here if needed
    }
}

// Add sparkle animation keyframe
const sparkleStyle = document.createElement('style');
sparkleStyle.textContent = `
    @keyframes sparkle {
        0% {
            transform: translate(-50%, -50%) scale(0) rotate(0deg);
            opacity: 1;
        }
        50% {
            transform: translate(-50%, -50%) scale(1) rotate(180deg);
            opacity: 0.8;
        }
        100% {
            transform: translate(-50%, -50%) scale(0) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(sparkleStyle);

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM loaded, initializing animations...");
  
  // Initialize the scroll animation system with a delay to ensure all elements are loaded
  setTimeout(() => {
    const animationController = new ScrollAnimationController();
    console.log("Animation controller initialized");
  }, 500);
  
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
