// Initialize AOS with optimized settings
AOS.init({
  offset: 100, // Reduced offset to trigger earlier
  delay: 0,
  duration: 800,
  easing: "ease-in-out",
  once: true,
  mirror: false,
  anchorPlacement: "top-center", // Changed to trigger when element reaches viewport center
  startEvent: "load", // Trigger animations on page load
  disable: "mobile", // Optionally disable on mobile for performance
});

document.addEventListener("DOMContentLoaded", () => {
  // Refresh AOS when all content is loaded
  window.addEventListener("load", () => {
    AOS.refresh();
    openPromoDialog();
  });
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

  document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM Content Loaded");

    setTimeout(() => {
      const promoDialog = document.getElementById("promoDialog");
      console.log("Found dialog:", promoDialog);
      if (promoDialog) {
        promoDialog.showModal();
        console.log("Dialog shown");
      }
    }, 1000);
  });
});

function openEnquiryDialog() {
  const dialog = document.getElementById("enquiryDialog");
  dialog.showModal();
}

function closeEnquiryDialog() {
  const dialog = document.getElementById("enquiryDialog");
  dialog.close();
}

// Initialize Intersection Observer for sections
const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        if (!entry.target.classList.contains("aos-animate")) {
          entry.target.classList.add("aos-animate");
        }
        sectionObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.1,
  }
);

// Observe all sections
document.querySelectorAll("section").forEach((section) => {
  sectionObserver.observe(section);
});

// Theme switching functionality
const themeToggle = document.getElementById("themeToggle");
const icon = themeToggle.querySelector("i");

// Check for saved theme preference
const savedTheme = localStorage.getItem("theme") || "light";
document.documentElement.setAttribute("data-theme", savedTheme);
updateIcon(savedTheme);

themeToggle.addEventListener("click", () => {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  const newTheme = currentTheme === "light" ? "dark" : "light";

  document.documentElement.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
  updateIcon(newTheme);
});

function updateIcon(theme) {
  icon.className = theme === "light" ? "fas fa-moon" : "fas fa-sun";
}

// Add prefers-color-scheme media query support
if (window.matchMedia) {
  const colorSchemeQuery = window.matchMedia("(prefers-color-scheme: dark)");
  colorSchemeQuery.addEventListener("change", (e) => {
    const newTheme = e.matches ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    updateIcon(newTheme);
  });
}

// Dialog control functions
function openPromoDialog() {
  const dialog = document.getElementById("promoDialog");
  dialog.showModal();
}

function closePromoDialog() {
  const dialog = document.getElementById("promoDialog");
  dialog.close();
}
