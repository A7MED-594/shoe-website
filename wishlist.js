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
          <h3>${item.name}</h3>
          <p>${item.price}</p>
          <button class="remove-btn" data-id="${item.id}">Remove</button>
        </div>
      `).join("");

      document.querySelectorAll(".remove-btn").forEach(btn => {
        btn.addEventListener("click", () => {
          const id = btn.getAttribute("data-id");
          wishlist = wishlist.filter(item => item.id !== id);
          localStorage.setItem("wishlist", JSON.stringify(wishlist));
          renderWishlist();
        });
      });
    }
  }
});

