document.addEventListener("DOMContentLoaded", () => {
  const hearts = document.querySelectorAll(".product-icons .icon-circle svg");
  const navbarHeart = document.getElementById("navbar-heart");
  const heartCount = document.getElementById("heart-count");
  let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

  updateNavbar();

  hearts.forEach((heart, index) => {
    heart.addEventListener("click", () => {
      const path = heart.querySelector("path");

      // نجيب بيانات المنتج من الكارت نفسه
      const productCard = heart.closest(".product-card");
      const product = {
        id: `product-${index}`,
        name: productCard.querySelector(".product-title").textContent,
        price: productCard.querySelector(".product-price").textContent,
        image: productCard.querySelector("img").src
      };

      // toggle
      if (path.getAttribute("fill") === "#B9985D") {
        path.setAttribute("fill", "none");
        path.setAttribute("stroke", "black");
        wishlist = wishlist.filter(item => item.id !== product.id);
      } else {
        path.setAttribute("fill", "#B9985D");
        path.setAttribute("stroke", "#B9985D");
        if (!wishlist.some(item => item.id === product.id)) {
          wishlist.push(product);
        }
      }

      localStorage.setItem("wishlist", JSON.stringify(wishlist));
      updateNavbar();
    });
  });

  function updateNavbar() {
    const count = wishlist.length;
    if (count > 0) {
      navbarHeart.classList.remove("bi-heart");
      navbarHeart.classList.add("bi-heart-fill");
      navbarHeart.style.color = "#B9985D";
      heartCount.style.display = "inline-block";
      heartCount.textContent = count;
    } else {
      navbarHeart.classList.remove("bi-heart-fill");
      navbarHeart.classList.add("bi-heart");
      navbarHeart.style.color = "black";
      heartCount.style.display = "none";
    }
  }
});




const menuBtn = document.getElementById('menuBtn');
  const dropdown = document.getElementById('dropdownMenu');

  menuBtn.addEventListener('click', () => {
    if (dropdown.style.display === 'block') {
      dropdown.style.display = 'none';
      dropdown.setAttribute('aria-hidden', 'true');
    } else {
      dropdown.style.display = 'block';
      dropdown.setAttribute('aria-hidden', 'false');
    }
  });

  // إخفاء القائمة لو ضغطت في أي مكان خارجها
  document.addEventListener('click', (event) => {
    if (!menuBtn.contains(event.target) && !dropdown.contains(event.target)) {
      dropdown.style.display = 'none';
      dropdown.setAttribute('aria-hidden', 'true');
    }
  });



  // Listen to all Add to Cart buttons
document.querySelectorAll('.btn-cart').forEach(button => {
  button.addEventListener('click', function () {
    const name = this.getAttribute('data-name');
    const price = this.getAttribute('data-price');
    const img = this.getAttribute('data-img');

    const product = { name, price, img };

    // Get existing cart or create new
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Add product to cart
    cart.push(product);

    // Save back to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Redirect to cart page
    window.location.href = 'cart.html';
  });
});


   document.addEventListener("DOMContentLoaded", function () {
  let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  const countSpan = document.getElementById("cart-count");

  function updateCartCount() {
    if (!countSpan) return;
    const count = cartItems.length;
    countSpan.textContent = count;
    countSpan.style.display = count > 0 ? "inline-block" : "none";
  }

  // أول تحميل: تحديث الرقم
  updateCartCount();

  // لما المستخدم يضغط على زرار "Add to cart"
  document.querySelectorAll(".btn-cart").forEach(button => {
    button.addEventListener("click", function () {
      const name = this.dataset.name;
      const price = this.dataset.price;
      const img = this.dataset.img;

      const product = { name, price, img };
      cartItems.push(product);

      // تحديث localStorage
      localStorage.setItem("cart", JSON.stringify(cartItems));

      // تحديث الرقم فوق الأيقونة
      updateCartCount();
    });
  });
});





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
  const countSpan = document.getElementById("cart-count");

  function updateCartCount() {
    cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    const count = cartItems.length;
    countSpan.textContent = count;
    countSpan.style.display = count > 0 ? "inline-block" : "none";
  }

  // أول تحميل
  updateCartCount();

  // 🔴 لما يجي حدث cartUpdated نعمل تحديث
  window.addEventListener("cartUpdated", updateCartCount);
});
