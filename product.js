document.addEventListener("DOMContentLoaded", () => {
  // ===============================
  // Wishlist (القلب)
  // ===============================
  const hearts = document.querySelectorAll(".product-icons .icon-circle svg");
  const navbarHeart = document.getElementById("navbar-heart");
  const heartCount = document.getElementById("heart-count");
  let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

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

  // ===============================
  // Dropdown Menu
  // ===============================
  const menuBtn = document.getElementById("menuBtn");
  const dropdown = document.getElementById("dropdownMenu");

  menuBtn.addEventListener("click", () => {
    const isOpen = dropdown.style.display === "block";
    dropdown.style.display = isOpen ? "none" : "block";
    dropdown.setAttribute("aria-hidden", isOpen ? "true" : "false");
  });

  document.addEventListener("click", (event) => {
    if (!menuBtn.contains(event.target) && !dropdown.contains(event.target)) {
      dropdown.style.display = "none";
      dropdown.setAttribute("aria-hidden", "true");
    }
  });

  // ===============================
  // Cart (Add to Cart + Count)
  // ===============================
  let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  const countSpan = document.getElementById("cart-count");

  function updateCartCount() {
    cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    const count = cartItems.length;
    countSpan.textContent = count;
    countSpan.style.display = count > 0 ? "inline-block" : "none";
  }

  updateCartCount();

  document.querySelectorAll(".btn-cart").forEach(button => {
    button.addEventListener("click", function () {
      const product = {
        name: this.dataset.name,
        price: this.dataset.price,
        img: this.dataset.img
      };

      cartItems.push(product);
      localStorage.setItem("cart", JSON.stringify(cartItems));

      updateCartCount();
      window.dispatchEvent(new Event("cartUpdated"));

      // لو عايزة تحويل للصفحة
      // window.location.href = "cart.html";
    });
  });

  window.addEventListener("cartUpdated", updateCartCount);

  // ===============================
  // Zoom Adjust
  // ===============================
  function detectZoom() {
    return Math.round(window.devicePixelRatio * 100);
  }

  function adjustSections() {
    const zoomPercent = detectZoom();
    const shoping = document.querySelector(".shoping");
    const shopNow = document.querySelector(".Shop-Now");

    if (zoomPercent <= 80) {
      const scaleFactor = zoomPercent / 100;
      [shoping, shopNow].forEach(el => {
        if (el) {
          el.style.transform = `scale(${scaleFactor})`;
          el.style.transformOrigin = "top left";
        }
      });
    } else {
      [shoping, shopNow].forEach(el => {
        if (el) el.style.transform = "scale(1)";
      });
    }
  }

  adjustSections();
  window.addEventListener("resize", adjustSections);

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
        }, i * 100);
      }
    });
  }

  window.addEventListener("scroll", revealOnScroll);
  revealOnScroll();
});
