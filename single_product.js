// Image Gallery Functionality
function changeImage(thumbnail, imageSrc) {
    document.querySelectorAll('.thumbnail').forEach(thumb => {
        thumb.classList.remove('active');
    });
    thumbnail.classList.add('active');
    document.getElementById('mainImage').src = imageSrc;
}

// Color Selection
document.addEventListener('DOMContentLoaded', function() {
    const colorOptions = document.querySelectorAll('.color-option');
    colorOptions.forEach(option => {
        option.addEventListener('click', function() {
            colorOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
        });
    });
});

// Size Selection
document.addEventListener('DOMContentLoaded', function() {
    const sizeButtons = document.querySelectorAll('.size-btn');
    sizeButtons.forEach(button => {
        button.addEventListener('click', function() {
            sizeButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
        });
    });
});

// Add to Cart & Buttons Functionality
document.addEventListener('DOMContentLoaded', function() {
    const addToCartBtn = document.querySelector('.btn-add-cart');
    const wishlistBtn = document.querySelector('.btn-wishlist');
    const buyNowBtn = document.querySelector('.btn-buy-now');
    const cartIconBtns = document.querySelectorAll('.cart-btn'); // ✅ كل أيقونات الكارت

    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => { this.style.transform = 'scale(1)'; }, 150);
            window.location.href = "cart.html";
        });
    }

    if (cartIconBtns.length > 0) {
        cartIconBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                btn.style.transform = 'scale(0.9)';
                setTimeout(() => { btn.style.transform = 'scale(1)'; }, 150);
                window.location.href = "cart.html";
            });
        });
    }
    
    if (wishlistBtn) {
        wishlistBtn.addEventListener('click', function() {
            const icon = this.querySelector('i');
            if (icon.classList.contains('far')) {
                icon.classList.remove('far');
                icon.classList.add('fas');
                this.style.color = '#ff4757';
            } else {
                icon.classList.remove('fas');
                icon.classList.add('far');
                this.style.color = '';
            }
        });
    }
    
    if (buyNowBtn) {
        buyNowBtn.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => { this.style.transform = 'scale(1)'; }, 150);
            alert('Redirecting to checkout...');
        });
    }
});

// Review Like/Comment Functionality
document.addEventListener('DOMContentLoaded', function() {
    const likeButtons = document.querySelectorAll('.like-btn');
    const commentButtons = document.querySelectorAll('.comment-btn');
    
    likeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const countSpan = this.textContent.trim();
            const currentCount = parseInt(countSpan.split(' ')[1]) || 0;
            const newCount = currentCount + 1;
            this.innerHTML = `<i class="far fa-thumbs-up"></i> ${newCount}`;
            this.style.color = '#D4B896';
            setTimeout(() => { this.style.color = ''; }, 1000);
        });
    });
    
    commentButtons.forEach(button => {
        button.addEventListener('click', function() {
            const textarea = document.querySelector('.review-textarea');
            textarea.focus();
            textarea.placeholder = 'Write a reply...';
        });
    });
});

// Search Functionality
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const searchTerm = this.value.trim();
                if (searchTerm) {
                    alert(`Searching for: ${searchTerm}`);
                }
            }
        });
    }
});

// Navigation Menu Functionality
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-list a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });
});

// Smooth Scrolling for Internal Links
document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Product Card Hover Effects
document.addEventListener('DOMContentLoaded', function() {
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 10px 25px rgba(0,0,0,0.1)';
            this.style.transition = 'all 0.3s ease';
        });
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '';
        });
    });
});

// Form Validation for Review Textarea
document.addEventListener('DOMContentLoaded', function() {
    const reviewTextarea = document.querySelector('.review-textarea');
    if (reviewTextarea) {
        reviewTextarea.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' && e.ctrlKey) {
                const reviewText = this.value.trim();
                if (reviewText) {
                    alert('Review submitted!');
                    this.value = '';
                }
            }
        });
    }
});
