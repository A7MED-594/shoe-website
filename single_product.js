// مسك القلبين
const productHeart = document.querySelector(".product-heart .heart-shape");
const navbarHeart = document.querySelector(".navbar-heart-shape");

// لما تدوسي على قلب المنتج
document.querySelector(".product-heart").addEventListener("click", () => {
  productHeart.classList.toggle("heart-active");
  navbarHeart.classList.toggle("heart-active");
});

// الجزء الخاص بتغيير الصورة في صفحة السينجل برودكت
  function getParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
  }

  document.addEventListener("DOMContentLoaded", function () {
    const imageUrl = getParam("image");

    if (imageUrl) {
      const mainImage = document.getElementById("mainImage");
      if (mainImage) {
        mainImage.src = imageUrl;
      }

      const thumbnailsContainer = document.querySelector(".product-thumbnails");
      if (thumbnailsContainer) {
        thumbnailsContainer.innerHTML = ''; 

        for (let i = 0; i < 4; i++) {
          const thumbnailDiv = document.createElement("div");
          thumbnailDiv.classList.add("thumbnail");
          if (i === 0) thumbnailDiv.classList.add("active");

          thumbnailDiv.setAttribute("onclick", `changeImage(this, '${imageUrl}')`);
          thumbnailDiv.innerHTML = `<img src="${imageUrl}" alt="Thumbnail ${i + 1}">`;

          thumbnailsContainer.appendChild(thumbnailDiv);
        }

        const moreDiv = document.createElement("div");
        moreDiv.classList.add("more-images");
        moreDiv.textContent = `+4 MORE`;
        thumbnailsContainer.appendChild(moreDiv);
      }
    }
  });

  function changeImage(element, imageUrl) {
    const mainImage = document.getElementById("mainImage");
    if (mainImage) {
      mainImage.src = imageUrl;
    }

    document.querySelectorAll(".thumbnail").forEach(thumb => {
      thumb.classList.remove("active");
    });

    element.classList.add("active");
  }
