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
