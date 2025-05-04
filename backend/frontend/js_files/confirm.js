function confirmPayment() {
  const selected = document.getElementById("payment-method").value;

  if (!selected) {
    alert("Please select a payment method before proceeding.");
    return;
  }

  if (selected === "new") return;

  document.getElementById("billing-info").style.display = "none";
  document.getElementById("confirmation-message").style.display = "block";
}

function handlePaymentMethod() {
  const selected = document.getElementById("payment-method").value;
  if (selected === "new") {
    window.location.href = "payment.html";
  }
}

window.onload = () => {
  document.getElementById("payment-method").selectedIndex = 0;

  const params = new URLSearchParams(window.location.search);
  const user = params.get("user") || "Guest";
  const listing = params.get("listing") || "Your Listing";
  const nights = parseInt(params.get("nights") || "1");
  const price = parseFloat(params.get("price") || "0");
  const email = params.get("email") || "youremail@gmail.com";

  const subtotal = nights * price;
  const taxes = subtotal * 0.1;
  const total = subtotal + taxes;

  document.querySelector("#listing-name").textContent = listing;

  const confirmationHTML = `
    <h2 style="color: green">✅ Payment Confirmed</h2>
    <p><strong>Thank you for your payment, ${user}.</strong> Your rental of <strong>${listing}</strong> has been confirmed.</p>
    <p>A receipt has been emailed to: <strong>${email}</strong></p>
    <div style="border: 1px solid #ccc; padding: 20px; margin: 30px auto; width: 350px; background: #f3f3f3; text-align: left;">
      <h3 style="margin-top: 0">Booking Summary</h3>
      <p><strong>Rental Stay:</strong> ${nights} nights</p>
      <p><strong>Rental Price:</strong> $${price}/night</p>
      <p><strong>Subtotal:</strong> $${subtotal.toFixed(2)}</p>
      <p><strong>Taxes:</strong> $${taxes.toFixed(2)}</p>
      <p><strong>Total:</strong> $${total.toFixed(2)}</p>
    </div>
    <a href="home.html"><button class="return-home-btn">Return to Home</button></a>
  `;
  document.getElementById("confirmation-message").innerHTML = confirmationHTML;

  const billing = document.getElementById("billing-info");
  billing.querySelector(".rental-section").innerHTML = `
    <p><strong>Rental Stay:</strong> ${nights} nights</p>
    <p><strong>Rental Price:</strong> $${price}/night</p>
  `;
  billing.querySelector(".money-section").innerHTML = `
    <p><strong>Subtotal:</strong> $${subtotal.toFixed(2)}</p>
    <p><strong>Taxes:</strong> $${taxes.toFixed(2)}</p>
    <p><strong>Total:</strong> $${total.toFixed(2)}</p>
  `;
};