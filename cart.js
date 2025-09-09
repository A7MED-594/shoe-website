document.addEventListener("DOMContentLoaded", function () {
  let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  const container = document.getElementById("cart-items");
  const countSpan = document.getElementById("cart-count");

  // ========================
  // تحديث عداد الكارت
  function updateCartCount() {
    if (countSpan) {
      const count = cartItems.length;
      countSpan.textContent = count;
      countSpan.style.display = count > 0 ? "inline-block" : "none";
    }
  }

  // ========================
  // عرض محتوى الكارت
  function renderCart() {
    container.innerHTML = "";

    if (cartItems.length === 0) {
      container.innerHTML = "<p class='text-center w-100'>Your cart is empty.</p>";
      updateCartCount();
      return;
    }

    // تحديد ارتفاع الصور بناءً على عدد المنتجات
    let imgHeight = 550;
    if (cartItems.length === 2) {
      imgHeight = 300;
    } else if (cartItems.length >= 3) {
      imgHeight = 200;
    }

    cartItems.forEach((item, index) => {
      const col = document.createElement("div");
      col.className = (cartItems.length === 1) ? "col-12 mb-3" : "col-12 col-md-6 mb-3";

      col.innerHTML = `
        <div class="card h-100 text-center shadow-sm">
          <div class="card-img-container" 
               style="height:${imgHeight}px; display:flex; align-items:center; justify-content:center; background:#f9f9f9;">
            <img src="${item.img}" alt="${item.name}" 
                 style="max-height:100%; max-width:100%; object-fit:contain;" />
          </div>
          <div class="card-body d-flex flex-column">
            <h6 class="mb-2">${item.name}</h6>
            <p class="text-muted mb-3">$${item.price}</p>
            <button class="btn btn-sm btn-danger mt-auto remove-btn" data-index="${index}">
              Remove
            </button>
          </div>
        </div>
      `;
      container.appendChild(col);
    });

    updateCartCount();
  }

  // ========================
  // حدث الحذف من الكارت
  container.addEventListener("click", function (e) {
    if (e.target.classList.contains("remove-btn")) {
      const index = parseInt(e.target.dataset.index);
      cartItems.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(cartItems));
      renderCart();
    }
  });

  // ========================
  // أول تحميل
  renderCart();
});
