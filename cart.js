function detectZoom() {
  return Math.round(window.devicePixelRatio * 100);
}

function adjustSections() {
  const zoomPercent = detectZoom(); 
  const shoping = document.querySelector('.shoping');
  const shopNow = document.querySelector('.Shop-Now');

  if (zoomPercent <= 80) {
    const scaleFactor = zoomPercent / 100;
    shoping.style.transform = `scale(${scaleFactor})`;
    shoping.style.transformOrigin = 'top left';

    shopNow.style.transform = `scale(${scaleFactor})`;
    shopNow.style.transformOrigin = 'top left';

  } else {
    shoping.style.transform = 'scale(1)';
    shopNow.style.transform = 'scale(1)';
  }
}

window.onload = adjustSections;

window.onresize = adjustSections;



 const categories = document.querySelectorAll('.categories');

    categories.forEach(el => {
      el.style.opacity = "0";
      el.style.transform = "translateY(40px)";
      el.style.transition = "all 0.6s ease";
    });

    function revealOnScroll() {
      const rect = document.body.getBoundingClientRect();

      categories.forEach((el, i) => {
        const rect = el.getBoundingClientRect();

        if (rect.top < window.innerHeight - 100) {

          setTimeout(() => {
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
          }, i * 1); 
        }
      });
    }

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();


document.addEventListener("DOMContentLoaded", function () {
  let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  const container = document.getElementById("cart-items");
  const countSpan = document.getElementById("cart-count");

  // تحديث عداد الكارت في النافبار
  function updateCartCount() {
    if (!countSpan) return;
    const count = cartItems.length;
    countSpan.textContent = count;
    countSpan.style.display = count > 0 ? "inline-block" : "none";
  }

  // عرض عناصر الكارت
  function renderCart() {
    container.innerHTML = "";

    if (cartItems.length === 0) {
      container.innerHTML = "<p class='text-center w-100'>Your cart is empty.</p>";
      updateCartCount();
      return;
    }

    // تحديد ارتفاع الصورة حسب عدد المنتجات
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

  // أول تحميل
  renderCart();

  // حذف عنصر من الكارت
  container.addEventListener("click", function (e) {
    if (e.target.classList.contains("remove-btn")) {
      const index = parseInt(e.target.dataset.index);
      cartItems.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(cartItems));
      renderCart(); // بيحدث مع العدد
    }
  });

  // ==============================
  // كود الزووم
  function detectZoom() {
    return Math.round(window.devicePixelRatio * 100);
  }

  function adjustContainer() {
    const zoomPercent = detectZoom();
    const mainContainer = document.querySelector('.container');

    if (!mainContainer) return;

    if (zoomPercent <= 80) {
      const scaleFactor = zoomPercent / 100;
      mainContainer.style.transform = `scale(${scaleFactor})`;
      mainContainer.style.transformOrigin = 'top left';
    } else {
      mainContainer.style.transform = 'scale(1)';
    }
  }

  // تنفيذ أول مرة
  adjustContainer();

  // تحديث عند تغيير الحجم أو الزووم
  window.addEventListener('resize', adjustContainer);
});


