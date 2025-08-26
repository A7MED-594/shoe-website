document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("paymentForm");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("cardName").value.trim();
    const number = document.getElementById("cardNumber").value.trim();
    const expiration = document.getElementById("expiration").value.trim();
    const cvv = document.getElementById("cvv").value.trim();

    if (!name || !number || !expiration || !cvv) {
      alert("⚠️ Please fill in all fields!");
      return;
    }

    if (number.length < 12 || number.length > 19 || isNaN(number)) {
      alert("⚠️ Invalid card number!");
      return;
    }

    if (cvv.length < 3 || cvv.length > 4 || isNaN(cvv)) {
      alert("⚠️ Invalid CVV code!");
      return;
    }

    alert("✅ Payment confirmed successfully!");
  });
});
