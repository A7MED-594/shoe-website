<script>

   
document.addEventListener('DOMContentLoaded', () => {

  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.like-btn, .unlike-btn');
    if (!btn) return;

    btn.setAttribute("type", "button");

    const actions = btn.closest('.review-actions');
    if (!actions) return;

    const likeBtn  = actions.querySelector('.like-btn');
    const unlikeBtn = actions.querySelector('.unlike-btn');
    const isLike = btn.classList.contains('like-btn');

    let countSpan = btn.querySelector(isLike ? '.like-count' : '.unlike-count');
    if (!countSpan) {
      countSpan = document.createElement('span');
      countSpan.className = isLike ? 'like-count' : 'unlike-count';
      countSpan.textContent = '0';
      btn.appendChild(countSpan);
    }

    let count = parseInt((countSpan.textContent || '').replace(/[^\d]/g, '')) || 0;

    const activate = (el) => {
      el.classList.add('active', 'btn-primary');
      el.classList.remove('btn-outline-secondary');
    };
    const deactivate = (el) => {
      el.classList.remove('active', 'btn-primary');
      el.classList.add('btn-outline-secondary');
    };

    if (btn.classList.contains('active')) {
      deactivate(btn);
      countSpan.textContent = Math.max(0, count - 1);
      return;
    }

    activate(btn);
    countSpan.textContent = count + 1;

    const other = isLike ? unlikeBtn : likeBtn;
    if (other && other.classList.contains('active')) {
      const otherCountSpan = other.querySelector(isLike ? '.unlike-count' : '.like-count');
      let otherCount = 0;
      if (otherCountSpan) {
        otherCount = parseInt((otherCountSpan.textContent || '').replace(/[^\d]/g, '')) || 0;
      }
      deactivate(other);
      if (otherCountSpan) {
        otherCountSpan.textContent = Math.max(0, otherCount - 1);
      }
    }
  });

});


<script>
// ================== "You May Also Like" Section ==================

// Handle "Add to Cart" button clicks inside product cards
const productCards = document.querySelectorAll(".product-card");

productCards.forEach(card => {
  const addToCartBtn = card.querySelector("button");
  const productTitle = card.querySelector(".product-title").textContent;
  const productPrice = card.querySelector(".price").textContent;
  const productStatus = card.querySelector(".status").textContent;

  addToCartBtn.addEventListener("click", () => {
    if (productStatus.toLowerCase().includes("sold")) {
      alert(`⚠️ Sorry, "${productTitle}" is sold out!`);
    } else {
      alert(`✅ "${productTitle}" added to cart.\nPrice: ${productPrice}`);
    }
  });
});


// ================== Reviews Section ==================

// Handle like / unlike buttons
const reviews = document.querySelectorAll(".review");

reviews.forEach(review => {
  const likeBtn = review.querySelector(".like-btn");
  const unlikeBtn = review.querySelector(".unlike-btn");
  const likeCount = review.querySelector(".like-count");
  const unlikeCount = review.querySelector(".unlike-count");

  if (likeBtn && unlikeBtn) {
    likeBtn.addEventListener("click", () => {
      let count = parseInt(likeCount.textContent);
      likeCount.textContent = count + 1;
    });

    unlikeBtn.addEventListener("click", () => {
      let count = parseInt(unlikeCount.textContent);
      unlikeCount.textContent = count + 1;
    });
  }
});

// Optional: Handle "Reply" button clicks (just log for now)
const replyButtons = document.querySelectorAll(".review .btn-outline-primary");

replyButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    alert("💬 Reply feature coming soon!");
  });
});
</script>

</script>
