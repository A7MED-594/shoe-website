document.addEventListener("DOMContentLoaded", function () {
  let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  const container = document.getElementById("cart-items");

  function renderCart() {
    container.innerHTML = "";

    if (cartItems.length === 0) {
      container.innerHTML = "<p class='text-center w-100'>Your cart is empty.</p>";
      return;
    }

    // تحديد ارتفاع الصورة
    let imgHeight = 550; 
    if (cartItems.length === 2) {
      imgHeight = 300;
    } else if (cartItems.length >= 3) {
      imgHeight = 200;
    }

    cartItems.forEach((item, index) => {
      const col = document.createElement("div");

      // توزيع الأعمدة
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
  }

  // أول تحميل
  renderCart();

  // حذف عنصر من الكارت
  container.addEventListener("click", function (e) {
    if (e.target.classList.contains("remove-btn")) {
      const index = parseInt(e.target.dataset.index);
      cartItems.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(cartItems));
      renderCart();
    }
  });
});


document.addEventListener("DOMContentLoaded", function () {
  let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  const container = document.getElementById("cart-items");
  const countSpan = document.getElementById("cart-count");

  function updateCartCount() {
    if (!countSpan) return;
    const count = cartItems.length;
    countSpan.textContent = count;
    countSpan.style.display = count > 0 ? "inline-block" : "none";
  }

  function renderCart() {
    container.innerHTML = "";

    if (cartItems.length === 0) {
      container.innerHTML = "<p class='text-center w-100'>Your cart is empty.</p>";
      return;
    }

    // تحديد ارتفاع الصورة
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
  }

  // أول تحميل
  renderCart();
  updateCartCount();

  // حذف عنصر من الكارت
  container.addEventListener("click", function (e) {
    if (e.target.classList.contains("remove-btn")) {
      const index = parseInt(e.target.dataset.index);
      cartItems.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(cartItems));
      renderCart();
      updateCartCount();
    }
  });
});


function detectZoom() {
  return Math.round(window.devicePixelRatio * 100);
}

function adjustContainer() {
  const zoomPercent = detectZoom(); // مثلاً 80 أو 100
  const container = document.querySelector('.container');

  if (!container) return; // تأكد إن العنصر موجود

  if (zoomPercent <= 80) {
    const scaleFactor = zoomPercent / 100;
    container.style.transform = `scale(${scaleFactor})`;
    container.style.transformOrigin = 'top left';
  } else {
    container.style.transform = 'scale(1)';
  }
}

// تنفيذ أول مرة
adjustContainer();

// إعادة التعديل عند تغيير الحجم (zoom غالبًا بيغير الـ window size)
window.addEventListener('resize', adjustContainer);
