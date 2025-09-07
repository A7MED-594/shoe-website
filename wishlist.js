document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("wishlist-container");
  let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

  renderWishlist();

  function renderWishlist() {
    if (wishlist.length === 0) {
      container.innerHTML = "<p>No products in your wishlist yet.</p>";
    } else {
      container.innerHTML = wishlist.map(item => `
        <div class="wishlist-item">
          <img src="${item.image}" alt="${item.name}" class="wishlist-img">
          <div>
            <h5>${item.name}</h5>
            <p class="text-muted">${item.price}</p>
          </div>
          <button class="remove-btn" data-id="${item.id}">Remove</button>
        </div>
      `).join("");

      document.querySelectorAll(".remove-btn").forEach(btn => {
        btn.addEventListener("click", () => {
          const id = btn.getAttribute("data-id");
          wishlist = wishlist.filter(item => item.id !== id);
          localStorage.setItem("wishlist", JSON.stringify(wishlist));
          renderWishlist();

          // 🔴 نبعث حدث لتحديث القلب في النافبار
          window.dispatchEvent(new Event("wishlistUpdated"));
        });
      });
    }
  }
});

// ==============================
// Zoom adjustment
function detectZoom() {
  return Math.round(window.devicePixelRatio * 100);
}

function adjustContainer() {
  const zoomPercent = detectZoom();
  const container = document.querySelector('.container');

  if (!container) return;

  if (zoomPercent <= 80) {
    const scaleFactor = zoomPercent / 100;
    container.style.transform = `scale(${scaleFactor})`;
    container.style.transformOrigin = 'top left';
  } else {
    container.style.transform = 'scale(1)';
  }
}

adjustContainer();
window.addEventListener('resize', adjustContainer);
