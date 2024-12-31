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
  const players = Plyr.setup(".plyr__video-embed", {
    controls: ["play", "progress", "current-time", "mute", "volume"],
    hideControls: false,
    resetOnEnd: true,
    fullscreen: { enabled: false },
    youtube: {
      noCookie: true,
      rel: 0,
      showinfo: 0,
      iv_load_policy: 3,
      modestbranding: 1,
      playsinline: 1,
    },
  });

  // Refresh AOS when all content is loaded
  window.addEventListener("load", () => {
    AOS.refresh();
    openPromoDialog();
  });

  // Initialize carousel only if elements exist
  const nextButton = document.querySelector(".next");
  const prevButton = document.querySelector(".prev");
  const slides = document.querySelectorAll(".carousel-container img");

  if (nextButton && prevButton && slides.length > 0) {
    let currentSlide = 0;
    const totalSlides = slides.length;

    function showSlide(n) {
      slides.forEach((slide) => (slide.style.display = "none"));
      slides[n].style.display = "block";
    }

    nextButton.addEventListener("click", () => {
      currentSlide = (currentSlide + 1) % totalSlides;
      showSlide(currentSlide);
    });

    prevButton.addEventListener("click", () => {
      currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
      showSlide(currentSlide);
    });

    // Show first slide initially
    showSlide(0);
  }

  // Handle form submission
  const enquiryForm = document.getElementById("enquiryForm");

  if (enquiryForm) {
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
  }

  setTimeout(() => {
    const promoDialog = document.getElementById("promoDialog");
    console.log("Found dialog:", promoDialog);
    if (promoDialog) {
      promoDialog.showModal();
      console.log("Dialog shown");
    }
  }, 1000);
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

// Dialog control functions
function openPromoDialog() {
  const dialog = document.getElementById("promoDialog");
  dialog.showModal();
}

function closePromoDialog() {
  const dialog = document.getElementById("promoDialog");
  dialog.close();
  dialog.style.display = "none";
}
