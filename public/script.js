// Initialize AOS
AOS.init();

// Carousel functionality
document.addEventListener("DOMContentLoaded", () => {
  let currentSlide = 0;
  const slides = document.querySelectorAll(".carousel-container img");
  const totalSlides = slides.length;

  function showSlide(n) {
    slides.forEach((slide) => (slide.style.display = "none"));
    slides[n].style.display = "block";
  }

  document.querySelector(".next").addEventListener("click", () => {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
  });

  document.querySelector(".prev").addEventListener("click", () => {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    showSlide(currentSlide);
  });

  // Show first slide initially
  showSlide(0);

  // Handle form submission
  const enquiryForm = document.getElementById("enquiryForm");

  enquiryForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      mobile: `${document.getElementById("countryCode").value}${
        document.getElementById("mobile").value
      }`,
      isWhatsapp: document.getElementById("isWhatsapp").checked,
    };

    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        alert("Thank you for your enquiry! We will contact you soon.");
        enquiryForm.reset();
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to submit enquiry. Please try again.");
    }
  });
});
