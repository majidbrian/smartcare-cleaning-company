// Initialize EmailJS
(function () {
  emailjs.init("DT1ml2aTa--geUWWp"); // PUBLIC KEY
})();

// Booking form submission
document.getElementById("bookingForm").addEventListener("submit", function (e) {
  e.preventDefault();

  emailjs.sendForm(
    "service_g0e33km",   // SERVICE ID
    "template_26o7lf9",  // TEMPLATE ID
    this
  ).then(function () {
      alert("Booking received! We will contact you shortly.");
  }, function (error) {
      alert("Failed to send booking. Check EmailJS setup.");
      console.error(error);
  });

  this.reset();
});
