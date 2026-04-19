// Initialize EmailJS
(function () {
  emailjs.init("DT1ml2aTa--geUWWp"); // Public Key
})();

// DOM References
const form = document.getElementById("bookingForm");
const dateInput = document.getElementById("service_date");
const submitBtn = document.getElementById("submitBtn");
const statusDiv = document.getElementById("formStatus");
const copyrightEl = document.getElementById("copyright");

// 1. Set Dynamic Year in Footer
copyrightEl.textContent = `© ${new Date().getFullYear()} Smartcare Cleaning Company. All Rights Reserved.`;

// 2. Set Min Date to Today (Prevent past booking)
const setMinDate = () => {
  const today = new Date().toISOString().split("T")[0];
  dateInput.setAttribute("min", today);
};
setMinDate();

// 3. Form Submission Logic
form.addEventListener("submit", function (e) {
  e.preventDefault();

  // UI Loading State
  const btnText = submitBtn.querySelector(".btn-text");
  const loader = submitBtn.querySelector(".loader");
  
  btnText.textContent = "Processing...";
  loader.style.display = "inline-block";
  submitBtn.disabled = true;
  
  statusDiv.className = "form-status"; // Reset classes
  statusDiv.style.display = "none";

  emailjs.sendForm(
    "service_g0e33km",   // Service ID
    "template_26o7lf9",  // Template ID
    this
  )
  .then(() => {
    statusDiv.textContent = "Success! Your booking has been received.";
    statusDiv.classList.add("success");
    statusDiv.style.display = "block";
    form.reset();
  })
  .catch((error) => {
    console.error("EmailJS Error:", error);
    statusDiv.textContent = "Error sending booking. Please try again.";
    statusDiv.classList.add("error");
    statusDiv.style.display = "block";
  })
  .finally(() => {
    btnText.textContent = "Confirm Booking";
    loader.style.display = "none";
    submitBtn.disabled = false;
  });
});
