document.addEventListener("DOMContentLoaded", function () {
    let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    const container = document.getElementById("cart-items");

    function renderCart() {
      container.innerHTML = "";

      if (cartItems.length === 0) {
        container.innerHTML = "<p class='text-center'>Your cart is empty.</p>";
        return;
      }

      cartItems.forEach((item, index) => {
        const div = document.createElement("div");
        div.className = "d-flex align-items-center justify-content-between mb-3 border p-3 rounded bg-white";

        div.innerHTML = `
          <div class="d-flex align-items-center">
            <img src="${item.img}" alt="${item.name}" style="width: 60px; height: 60px; object-fit: contain; margin-right: 15px;" />
            <div>
              <h6 class="mb-1">${item.name}</h6>
              <p class="mb-0 text-muted">$${item.price}</p>
            </div>
          </div>
          <button class="btn btn-sm btn-danger remove-btn" data-index="${index}">Remove</button>
        `;

        container.appendChild(div);
      });
    }

    // Initial render
    renderCart();

    // Remove handler
    container.addEventListener("click", function (e) {
      if (e.target.classList.contains("remove-btn")) {
        const index = parseInt(e.target.dataset.index);
        cartItems.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cartItems));
        renderCart();
      }
    });
  });