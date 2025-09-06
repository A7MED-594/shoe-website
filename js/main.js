// Initialize AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 100
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Header scroll effect
let lastScrollTop = 0;
const header = document.querySelector('.header-section');

window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop && scrollTop > 100) {
        // Scrolling down
        header.style.transform = 'translateY(-100%)';
    } else {
        // Scrolling up
        header.style.transform = 'translateY(0)';
    }
    
    // Add shadow on scroll
    if (scrollTop > 10) {
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
    }
    
    lastScrollTop = scrollTop;
});

// Search functionality
const searchInput = document.querySelector('.search-input');
const searchIcon = document.querySelector('.search-icon');

searchInput.addEventListener('focus', function() {
    searchIcon.style.color = '#C8860D';
});

searchInput.addEventListener('blur', function() {
    searchIcon.style.color = '#999999';
});

searchInput.addEventListener('input', function() {
    // Add search functionality here
    console.log('Searching for:', this.value);
});

// Category card hover effects
const categoryCards = document.querySelectorAll('.category-card');

categoryCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        // Add hover sound effect (optional)
        // playHoverSound();
        
        // Add subtle animation to other cards
        categoryCards.forEach(otherCard => {
            if (otherCard !== card) {
                otherCard.style.opacity = '0.7';
                otherCard.style.transform = 'scale(0.98)';
            }
        });
    });
    
    card.addEventListener('mouseleave', function() {
        // Reset all cards
        categoryCards.forEach(otherCard => {
            otherCard.style.opacity = '1';
            otherCard.style.transform = 'scale(1)';
        });
    });
    
    // Add click handler
    card.addEventListener('click', function() {
        const categoryTitle = this.querySelector('.category-title').textContent;
        console.log('Clicked category:', categoryTitle);
        // Add navigation logic here
        // window.location.href = `/category/${categoryTitle.toLowerCase().replace(/\s+/g, '-')}`;
    });
});

// Floating shoes animation enhancement
const floatingShoes = document.querySelectorAll('.floating-shoe');

floatingShoes.forEach((shoe, index) => {
    // Add random rotation and movement
    shoe.style.animationDelay = `${index * 0.5}s`;
    
    // Add click interaction
    shoe.addEventListener('click', function() {
        this.style.animation = 'none';
        this.style.transform = 'scale(1.2) rotate(360deg)';
        
        setTimeout(() => {
            this.style.animation = '';
            this.style.transform = '';
        }, 500);
    });
});

// Parallax effect for CTA section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const ctaSection = document.querySelector('.cta-section');
    const ctaOffset = ctaSection.offsetTop;
    const ctaHeight = ctaSection.offsetHeight;
    
    if (scrolled > ctaOffset - window.innerHeight && scrolled < ctaOffset + ctaHeight) {
        const rate = (scrolled - ctaOffset + window.innerHeight) / (ctaHeight + window.innerHeight);
        const yPos = -(rate * 50);
        ctaSection.style.backgroundPosition = `center ${yPos}px`;
    }
});

// Loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Animate elements on load
    const elementsToAnimate = document.querySelectorAll('.loading');
    elementsToAnimate.forEach((element, index) => {
        setTimeout(() => {
            element.classList.add('loaded');
        }, index * 100);
    });
});

// Mobile menu enhancements
const navbarToggler = document.querySelector('.navbar-toggler');
const navbarCollapse = document.querySelector('.navbar-collapse');

if (navbarToggler) {
    navbarToggler.addEventListener('click', function() {
        // Add custom animation class
        navbarCollapse.classList.toggle('show-animated');
    });
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe category cards for staggered animation
categoryCards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.1}s`;
    observer.observe(card);
});

// Add keyboard navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        // Close mobile menu if open
        const navbarCollapse = document.querySelector('.navbar-collapse.show');
        if (navbarCollapse) {
            bootstrap.Collapse.getInstance(navbarCollapse).hide();
        }
    }
});

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll handlers
const debouncedScrollHandler = debounce(function() {
    // Scroll-based animations here
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// Add touch gestures for mobile
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', function(e) {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', function(e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swiped left
            console.log('Swiped left');
        } else {
            // Swiped right
            console.log('Swiped right');
        }
    }
}

// Add custom cursor effect (optional)
const cursor = document.createElement('div');
cursor.className = 'custom-cursor';
document.body.appendChild(cursor);

document.addEventListener('mousemove', function(e) {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

// Add click ripple effect
function createRipple(event) {
    const button = event.currentTarget;
    const circle = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;
    
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
    circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
    circle.classList.add('ripple');
    
    const ripple = button.getElementsByClassName('ripple')[0];
    if (ripple) {
        ripple.remove();
    }
    
    button.appendChild(circle);
}

// Apply ripple effect to buttons
document.querySelectorAll('.btn, .category-btn, .cta-btn').forEach(button => {
    button.addEventListener('click', createRipple);
});

// Console welcome message
console.log(`
🦶 Welcome to ShoeLuxe!
👟 Premium footwear collection
✨ Built with Bootstrap 5 & modern animations
🚀 Optimized for performance and accessibility
`);