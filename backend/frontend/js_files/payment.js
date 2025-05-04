document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");

  form.addEventListener("submit", (e) => {
    const name = document.getElementById("card-name").value.trim();
    const number = document.getElementById("card-number").value.trim();
    const expiry = document.getElementById("expiry").value.trim();
    const cvv = document.getElementById("cvv").value.trim();

    if (!name || number.length < 12 || !/^\d{2}\/\d{2}$/.test(expiry) || cvv.length < 3) {
      alert("Please fill out all payment fields correctly.");
      e.preventDefault();
    } else {
      e.preventDefault(); // stop actual form submission

      // Change button to "Processing..."
      const submitButton = form.querySelector('button[type="submit"]');
      submitButton.disabled = true;
      submitButton.textContent = "Processing...";

      setTimeout(() => {
        window.location.href = "confirm.html";
      }, 1000);
    }
  });

});

const cardTypeSelect = document.getElementById("card-type");
const cardImage = document.getElementById("card-image");

cardTypeSelect.addEventListener("change", () => {
  const selected = cardTypeSelect.value;

  if (selected === "visa") {
    cardImage.src = "images/visa.png";
    cardImage.alt = "Visa";
  } else if (selected === "mastercard") {
    cardImage.src = "images/mastercard.png";
    cardImage.alt = "MasterCard";
  } else if (selected === "amex") {
    cardImage.src = "images/amex.png";
    cardImage.alt = "American Express";
  } else if (selected === "discover") {
    cardImage.src = "images/discover.png";
    cardImage.alt = "Discover";
  } else {
    cardImage.src = "";
    cardImage.alt = "";
    cardImage.style.display = "none";
    return;
  }

  cardImage.style.display = "block";
});

document.addEventListener("DOMContentLoaded", () => {
  const cardTypeSelect = document.getElementById("card-type");
  const cardImage = document.getElementById("card-image");

  // Force reset dropdown on page load
  cardTypeSelect.value = "";
  cardImage.style.display = "none";

  // ... existing code
});
