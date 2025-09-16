// مسك القلبين
const productHeart = document.querySelector(".product-heart .heart-shape");
const navbarHeart = document.querySelector(".navbar-heart-shape");

// لما تدوسي على قلب المنتج
document.querySelector(".product-heart").addEventListener("click", () => {
  productHeart.classList.toggle("heart-active");
  navbarHeart.classList.toggle("heart-active");
});
