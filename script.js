// FitZone Gym — script.js
// Handles plan selection and basic client-side form validation.
// This demo does not send or store form data.

document.addEventListener("DOMContentLoaded", () => {
  const planSelect = document.getElementById("plan");
  const form = document.getElementById("membership-form");
  const message = document.getElementById("form-message");

  // Fill the membership plan field when a visitor clicks a plan button.
  document.querySelectorAll(".choose-plan").forEach((button) => {
    button.addEventListener("click", () => {
      planSelect.value = button.dataset.plan;
      document.getElementById("contact").scrollIntoView({ behavior: "smooth" });
      planSelect.focus({ preventScroll: true });
      message.textContent = `${button.dataset.plan} plan selected. Please complete the form.`;
      message.className = "form-message";
      clearErrors();
    });
  });

  function clearErrors() {
    ["name-error", "phone-error", "plan-error"].forEach((id) => {
      document.getElementById(id).textContent = "";
    });
    ["full-name", "phone", "plan"].forEach((id) => {
      document.getElementById(id).removeAttribute("aria-invalid");
    });
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    clearErrors();
    message.textContent = "";
    message.className = "form-message";

    const nameInput = document.getElementById("full-name");
    const phoneInput = document.getElementById("phone");
    const name = nameInput.value.trim();
    const phone = phoneInput.value.trim();
    const plan = planSelect.value;
    let valid = true;

    if (name.length < 2) {
      document.getElementById("name-error").textContent = "Please enter your name (at least 2 characters).";
      nameInput.setAttribute("aria-invalid", "true");
      valid = false;
    }

    // Accepts common phone formats with 7–15 digits, allowing spaces, +, - and parentheses.
    const digits = phone.replace(/\D/g, "");
    if (digits.length < 7 || digits.length > 15) {
      document.getElementById("phone-error").textContent = "Please enter a valid phone number.";
      phoneInput.setAttribute("aria-invalid", "true");
      valid = false;
    }

    if (!plan) {
      document.getElementById("plan-error").textContent = "Please select a membership plan.";
      planSelect.setAttribute("aria-invalid", "true");
      valid = false;
    }

    if (!valid) {
      message.textContent = "Please correct the highlighted fields.";
      message.classList.add("error");
      return;
    }

    message.textContent = `Thank you, ${name}! Your ${plan} plan request was checked successfully (demo only).`;
    message.classList.add("success");
    form.reset();
  });
});
