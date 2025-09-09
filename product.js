document.addEventListener("DOMContentLoaded", () => {
  // ===============================
  // Wishlist
  // ===============================
  const hearts = document.querySelectorAll(".product-icons .icon-circle svg");
  const navbarHeart = document.getElementById("navbar-heart");
  const heartCount = document.getElementById("heart-count");
  let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

  updateWishlistNavbar();

  hearts.forEach((heart, index) => {
    heart.addEventListener("click", () => {
      const path = heart.querySelector("path");
      const productCard = heart.closest(".product-card");

      const product = {
        id: `product-${index}`,
        name: productCard.querySelector(".product-title").textContent,
        price: productCard.querySelector(".product-price").textContent,
        image: productCard.querySelector("img").src
      };

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
      updateWishlistNavbar();
    });
  });

  function updateWishlistNavbar() {
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

  // ===============================
  // Add to Cart
  // ===============================
  const countSpan = document.getElementById("cart-count");

  function updateCartCount() {
    if (!countSpan) return;
    let cart = JSON.parse(localStorage.getItem("cart")) || []; // ← ناخد دايمًا من localStorage
    const count = cart.length;
    countSpan.textContent = count;
    countSpan.style.display = count > 0 ? "inline-block" : "none";
  }

  updateCartCount(); // أول تحميل

  document.querySelectorAll(".btn-cart").forEach(button => {
    button.addEventListener("click", function () {
      const product = {
        name: this.dataset.name,
        price: this.dataset.price,
        img: this.dataset.img
      };

      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      cart.push(product);
      localStorage.setItem("cart", JSON.stringify(cart));

      updateCartCount();

      // أوتوماتيك يروح على صفحة الكارت
      window.location.href = "cart.html";
    });
  });

  // ===============================
  // Scroll Animation
  // ===============================
  const categories = document.querySelectorAll(".categories");
  categories.forEach(el => {
    el.style.opacity = "0";
    el.style.transform = "translateY(40px)";
    el.style.transition = "all 0.6s ease";
  });

  function revealOnScroll() {
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

  window.addEventListener("scroll", revealOnScroll);
  revealOnScroll();
});
