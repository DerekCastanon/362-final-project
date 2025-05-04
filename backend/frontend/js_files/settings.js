document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".setting-card");
  const grid = document.querySelector(".settings-grid");
  let activeCard = null;
  let originalStyles = {};

  const settingsContent = {
    "personal-info": `
      <h2>Personal Info</h2>
      <p>Update your name, contact information, and birthday here.</p>
      <button class="back-button">← Back</button>
    `,
    "login-security": `
      <h2>Login & Security</h2>
      <p>Change your password, manage login devices, and enable 2FA.</p>
      <button class="back-button">← Back</button>
    `,
    "payments-payouts": `
      <h2>Payments & Payouts</h2>
      <p>Manage your payment methods and payout settings.</p>
      <button class="back-button">← Back</button>
    `,
    "notifications": `
      <h2>Notifications</h2>
      <p>Customize how and when you get notifications.</p>
      <button class="back-button">← Back</button>
    `,
    "privacy-sharing": `
      <h2>Privacy & Sharing</h2>
      <p>Control who sees your activity and profile visibility.</p>
      <button class="back-button">← Back</button>
    `,
    "global-preferences": `
      <h2>Global Preferences</h2>
      <p>Select your default language, currency, and time zone.</p>
      <button class="back-button">← Back</button>
    `
  };

  const defaultDescriptions = {
    "personal-info": "Provide personal details and how we can reach you",
    "login-security": "Update your password and secure your account",
    "payments-payouts": "Review payments, payouts, coupons, and gift cards",
    "notifications": "Choose notification settings and how you receive messages",
    "privacy-sharing": "Manage data shared with others and Airbnb",
    "global-preferences": "Set your default language, currency, and time zone"
  };

  cards.forEach(card => {
    card.addEventListener("click", () => {
      const sectionId = card.dataset.section;
      if (!sectionId) return;

      // Save original content
      if (!card.dataset.original) {
        card.dataset.original = card.innerHTML;
      }

      activeCard = card;

      // Save original position and size
      const cardRect = card.getBoundingClientRect();
      const gridRect = grid.getBoundingClientRect();
      originalStyles = {
        top: card.offsetTop + "px",
        left: card.offsetLeft + "px",
        width: card.offsetWidth + "px",
        height: card.offsetHeight + "px"
      };

      // Fix position and size first to start animation from current position
      card.style.position = "absolute";
      card.style.top = cardRect.top + window.scrollY + "px";
      card.style.left = cardRect.left + "px";
      card.style.width = cardRect.width + "px";
      card.style.height = cardRect.height + "px";

      // Force reflow to allow transition to apply
      void card.offsetWidth;

      // Hide other cards
      grid.classList.add("grid-hidden");

      // Add expanding class
      card.classList.add("expanding");

      // Animate to fill grid area
      card.style.top = gridRect.top + window.scrollY + "px";
      card.style.left = gridRect.left + "px";
      card.style.width = gridRect.width + "px";
      card.style.height = gridRect.height + "px";

      // Swap content after animation
      setTimeout(() => {
        card.innerHTML = settingsContent[sectionId];
      }, 400);
    });
  });

  // Back button logic
  document.addEventListener("click", e => {
    if (e.target.classList.contains("back-button") && activeCard) {
      // Animate back to original position
      activeCard.style.top = originalStyles.top;
      activeCard.style.left = originalStyles.left;
      activeCard.style.width = originalStyles.width;
      activeCard.style.height = originalStyles.height;

      // Delay restore to allow reverse animation
      setTimeout(() => {
        // Restore original innerHTML (removes Back button too)
        activeCard.innerHTML = activeCard.dataset.original;

        // Reset visual state
        activeCard.classList.remove("expanding");
        activeCard.removeAttribute("style");
        document.querySelector(".settings-grid").classList.remove("grid-hidden");
        activeCard = null;
      }, 400); // match the animation duration
    }
  });

});
