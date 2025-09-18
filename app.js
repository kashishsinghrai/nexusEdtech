// NexusEdTech Holdings Landing Page JavaScript

document.addEventListener("DOMContentLoaded", function () {
  // Theme Toggle Functionality (without localStorage)
  const themeToggle = document.getElementById("themeToggle");
  const themeIcon = themeToggle?.querySelector(".theme-toggle__icon");

  // Default to light mode
  let currentTheme = "light";
  document.documentElement.setAttribute("data-color-scheme", currentTheme);

  if (themeToggle && themeIcon) {
    updateThemeIcon(currentTheme);

    themeToggle.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();

      const newTheme = currentTheme === "dark" ? "light" : "dark";
      currentTheme = newTheme;

      document.documentElement.setAttribute("data-color-scheme", newTheme);
      updateThemeIcon(newTheme);

      // Add visual feedback
      themeToggle.style.transform = "scale(0.9)";
      setTimeout(() => {
        themeToggle.style.transform = "scale(1)";
      }, 150);

      console.log("Theme switched to:", newTheme);
    });
  }

  function updateThemeIcon(theme) {
    if (themeIcon) {
      themeIcon.textContent = theme === "dark" ? "☀️" : "🌙";
    }
  }

  // Mobile Navigation Toggle
  const mobileToggle = document.getElementById("mobileToggle");
  const navMenu = document.querySelector(".nav__menu");

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();

      navMenu.classList.toggle("nav__menu--active");
      mobileToggle.classList.toggle("nav__mobile-toggle--active");
    });

    // Close menu when clicking outside
    document.addEventListener("click", function (e) {
      if (!navMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
        navMenu.classList.remove("nav__menu--active");
        mobileToggle.classList.remove("nav__mobile-toggle--active");
      }
    });
  }

  // Pre-registration Form
  const preregisterForm = document.getElementById("preregisterForm");
  const successMessage = document.getElementById("successMessage");
  const emailInput = document.getElementById("email");

  if (preregisterForm && successMessage && emailInput) {
    preregisterForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const email = emailInput.value.trim();

      if (email && validateEmail(email)) {
        // Show loading state
        showLoadingState();

        // Simulate form submission delay
        setTimeout(() => {
          showSuccessMessage();
          preregisterForm.reset();
        }, 1000);
      } else {
        showErrorMessage("Please enter a valid email address.");
      }
    });

    // Form Validation Enhancement
    emailInput.addEventListener("input", function () {
      const email = this.value.trim();
      const isValid = validateEmail(email);

      if (email.length > 0) {
        if (isValid) {
          this.style.borderColor = "rgba(255, 255, 255, 0.5)";
          this.style.boxShadow = "0 0 0 2px rgba(255, 255, 255, 0.2)";
        } else {
          this.style.borderColor = "rgba(255, 84, 89, 0.8)";
          this.style.boxShadow = "0 0 0 2px rgba(255, 84, 89, 0.2)";
        }
      } else {
        this.style.borderColor = "";
        this.style.boxShadow = "";
      }
    });
  }

  function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function showSuccessMessage() {
    if (preregisterForm && successMessage) {
      // Hide the form
      preregisterForm.style.display = "none";

      // Show success message
      successMessage.classList.remove("hidden");
      successMessage.style.display = "block";
      successMessage.style.opacity = "1";

      // Reset form after 5 seconds
      setTimeout(() => {
        preregisterForm.style.display = "block";
        successMessage.classList.add("hidden");
        successMessage.style.display = "none";
        successMessage.style.opacity = "0";
      }, 5000);
    }
  }

  function showErrorMessage(message) {
    // Remove existing error message
    let existingError = document.querySelector(".preregister__error");
    if (existingError) {
      existingError.remove();
    }

    // Create new error message
    const errorDiv = document.createElement("div");
    errorDiv.className = "preregister__error";
    errorDiv.style.cssText = `
            color: rgba(255, 84, 89, 1);
            background: rgba(255, 255, 255, 0.2);
            border: 1px solid rgba(255, 255, 255, 0.3);
            padding: 12px;
            border-radius: 8px;
            margin-top: 12px;
            font-size: 14px;
            text-align: center;
            opacity: 1;
            transition: opacity 0.3s ease;
        `;
    errorDiv.textContent = message;

    if (preregisterForm) {
      preregisterForm.appendChild(errorDiv);

      // Remove error message after 4 seconds
      setTimeout(() => {
        if (errorDiv && errorDiv.parentNode) {
          errorDiv.style.opacity = "0";
          setTimeout(() => {
            if (errorDiv && errorDiv.parentNode) {
              errorDiv.parentNode.removeChild(errorDiv);
            }
          }, 300);
        }
      }, 4000);
    }
  }

  function showLoadingState() {
    const submitButton = preregisterForm?.querySelector(".btn");

    if (submitButton) {
      const originalText = submitButton.textContent;

      submitButton.textContent = "Submitting...";
      submitButton.disabled = true;
      submitButton.style.opacity = "0.7";

      setTimeout(() => {
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        submitButton.style.opacity = "1";
      }, 1000);
    }
  }

  // Smooth Scrolling for Navigation Links
  function scrollToSection(targetId) {
    const targetSection = document.querySelector(targetId);

    if (targetSection) {
      const header = document.querySelector(".header");
      const headerHeight = header ? header.offsetHeight : 80;
      const targetPosition = targetSection.offsetTop - headerHeight - 20;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });

      // Close mobile menu if open
      if (navMenu) {
        navMenu.classList.remove("nav__menu--active");
      }
      if (mobileToggle) {
        mobileToggle.classList.remove("nav__mobile-toggle--active");
      }

      console.log("Scrolled to section:", targetId);
    } else {
      console.warn("Target section not found:", targetId);
    }
  }

  // Navigation Links Event Handlers
  const navLinks = document.querySelectorAll('a[href^="#"]');

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();

      const targetId = this.getAttribute("href");

      if (targetId === "#" || targetId === "") {
        return;
      }

      scrollToSection(targetId);
    });
  });

  // Header Scroll Effect
  const header = document.querySelector(".header");
  let lastScrollTop = 0;

  window.addEventListener("scroll", function () {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop && scrollTop > 100) {
      // Scrolling down
      if (header) header.style.transform = "translateY(-100%)";
    } else {
      // Scrolling up
      if (header) header.style.transform = "translateY(0)";
    }

    // Add shadow when scrolled
    if (header) {
      if (scrollTop > 10) {
        header.style.boxShadow = "var(--shadow-md)";
      } else {
        header.style.boxShadow = "none";
      }
    }

    lastScrollTop = scrollTop;
  });

  // Intersection Observer for Animation on Scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  // Observe elements for animation
  const animatedElements = document.querySelectorAll(
    ".portfolio__card, .news__card, .blog__card, .timeline__item, .testimonial__card, .impact-stat, .team-member"
  );

  animatedElements.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(el);
  });

  // Portfolio Card Hover Effects
  const portfolioCards = document.querySelectorAll(".portfolio__card");

  portfolioCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-8px) scale(1.02)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)";
    });
  });

  // Team Member Hover Effects
  const teamMembers = document.querySelectorAll(".team-member");

  teamMembers.forEach((member) => {
    member.addEventListener("mouseenter", function () {
      const avatar = this.querySelector(".team-member__avatar");
      if (avatar) {
        avatar.style.transform = "scale(1.1) rotate(5deg)";
      }
    });

    member.addEventListener("mouseleave", function () {
      const avatar = this.querySelector(".team-member__avatar");
      if (avatar) {
        avatar.style.transform = "scale(1) rotate(0deg)";
      }
    });
  });

  // Stats Counter Animation
  const statsElements = document.querySelectorAll(
    ".stat__number, .stat-card h3, .impact-stat h3"
  );

  const statsObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach((entry) => {
        if (
          entry.isIntersecting &&
          !entry.target.hasAttribute("data-animated")
        ) {
          entry.target.setAttribute("data-animated", "true");
          animateCounter(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  statsElements.forEach((el) => {
    statsObserver.observe(el);
  });

  function animateCounter(element) {
    const text = element.textContent;
    const hasPlus = text.includes("+");
    const hasK = text.includes("k");
    const hasComma = text.includes(",");

    // Extract number - handle different formats
    let targetNumber;
    if (hasK) {
      targetNumber = parseInt(text.replace(/[^0-9]/g, ""));
    } else if (hasComma) {
      targetNumber = parseInt(text.replace(/[^0-9]/g, ""));
    } else {
      targetNumber = parseInt(text.replace(/[^0-9]/g, ""));
    }

    if (targetNumber && targetNumber > 0) {
      let currentNumber = 0;
      const duration = 1500; // 1.5 seconds
      const increment = targetNumber / (duration / 16); // 60fps

      const timer = setInterval(() => {
        currentNumber += increment;

        if (currentNumber >= targetNumber) {
          currentNumber = targetNumber;
          clearInterval(timer);
        }

        let displayNumber = Math.floor(currentNumber);
        let displayText;

        if (hasComma && displayNumber >= 1000) {
          displayText = displayNumber.toLocaleString();
        } else {
          displayText = displayNumber.toString();
        }

        if (hasK) displayText = displayText + "k";
        if (hasPlus) displayText = displayText + "+";

        element.textContent = displayText;
      }, 16); // ~60fps
    }
  }

  // Parallax Effect for Hero Section
  const hero = document.querySelector(".hero");

  if (hero) {
    window.addEventListener("scroll", function () {
      const scrolled = window.pageYOffset;
      const heroHeight = hero.offsetHeight;
      const rate = scrolled * -0.3;

      if (scrolled < heroHeight) {
        hero.style.transform = `translateY(${rate}px)`;
      }
    });
  }

  // Dynamic Year in Footer
  const currentYear = new Date().getFullYear();
  const copyrightText = document.querySelector(".footer__bottom p");
  if (copyrightText) {
    copyrightText.textContent = `© ${currentYear} NexusEdTech Holdings. All rights reserved.`;
  }

  // Add click tracking for analytics (placeholder)
  function trackClick(category, action, label) {
    console.log("Analytics Event:", { category, action, label });
  }

  // Track button clicks
  const trackableButtons = document.querySelectorAll(
    ".btn, .nav__link, .news__link, .blog__link"
  );

  trackableButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      const category = this.closest("section")?.className || "navigation";
      const action = "click";
      const label = this.textContent.trim() || this.getAttribute("href");

      trackClick(category, action, label);
    });
  });

  // Keyboard Navigation Enhancement
  document.addEventListener("keydown", function (e) {
    // ESC key closes mobile menu
    if (e.key === "Escape") {
      if (navMenu) {
        navMenu.classList.remove("nav__menu--active");
      }
      if (mobileToggle) {
        mobileToggle.classList.remove("nav__mobile-toggle--active");
      }
    }

    // Enter key on theme toggle
    if (e.key === "Enter" && document.activeElement === themeToggle) {
      themeToggle.click();
    }
  });

  // Enhanced Card Animations
  const cardElements = document.querySelectorAll(
    ".news__card, .blog__card, .testimonial__card"
  );

  cardElements.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-4px)";
      this.style.boxShadow = "var(--shadow-lg)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";
      this.style.boxShadow = "var(--shadow-sm)";
    });
  });

  // B-friends Team Section Animation
  const teamAvatars = document.querySelectorAll(".team-member__avatar");

  teamAvatars.forEach((avatar, index) => {
    const teamObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.style.transform = "scale(1)";
              entry.target.style.opacity = "1";
            }, index * 100);
          }
        });
      },
      { threshold: 0.3 }
    );

    avatar.style.transform = "scale(0.8)";
    avatar.style.opacity = "0";
    avatar.style.transition = "transform 0.8s ease, opacity 0.8s ease";
    teamObserver.observe(avatar);
  });

  // World Map Animation
  const regions = document.querySelectorAll(".region");

  regions.forEach((region, index) => {
    region.style.opacity = "0";
    region.style.transform = "translateY(10px)";
    region.style.transition = `opacity 0.5s ease ${
      index * 0.1
    }s, transform 0.5s ease ${index * 0.1}s`;

    const regionObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.style.opacity = "1";
              entry.target.style.transform = "translateY(0)";
            }, index * 100);
          }
        });
      },
      { threshold: 0.5 }
    );

    regionObserver.observe(region);
  });

  // Timeline Animation Enhancement
  const timelineItems = document.querySelectorAll(".timeline__item");

  timelineItems.forEach((item, index) => {
    const timelineObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateX(0)";
          }
        });
      },
      { threshold: 0.3 }
    );

    item.style.opacity = "0";
    item.style.transform =
      index % 2 === 0 ? "translateX(-50px)" : "translateX(50px)";
    item.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    timelineObserver.observe(item);
  });

  // Enhanced Portfolio Features Animation
  const portfolioFeatures = document.querySelectorAll(
    ".portfolio__features span"
  );

  portfolioFeatures.forEach((feature, index) => {
    feature.addEventListener("mouseenter", function () {
      this.style.transform = "scale(1.05)";
      this.style.background = "var(--color-primary)";
      this.style.color = "var(--color-btn-primary-text)";
    });

    feature.addEventListener("mouseleave", function () {
      this.style.transform = "scale(1)";
      this.style.background = "var(--color-secondary)";
      this.style.color = "var(--color-text)";
    });
  });

  // Handle CTA buttons with proper navigation
  const ctaButtons = document.querySelectorAll(".hero__actions .btn");
  ctaButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault();

      const href = this.getAttribute("href");
      if (href === "#portfolio") {
        scrollToSection("#portfolio");
      } else if (href === "#network") {
        scrollToSection("#network");
      }
    });
  });

  // Team member expertise tags animation
  const expertiseTags = document.querySelectorAll(
    ".team-member__expertise span"
  );

  expertiseTags.forEach((tag, index) => {
    tag.addEventListener("mouseenter", function () {
      this.style.transform = "scale(1.1)";
      this.style.background = "var(--color-primary)";
      this.style.color = "var(--color-btn-primary-text)";
    });

    tag.addEventListener("mouseleave", function () {
      this.style.transform = "scale(1)";
      this.style.background = "var(--color-bg-2)";
      this.style.color = "var(--color-text)";
    });
  });

  // Initialize animations on load
  setTimeout(() => {
    const heroStats = document.querySelectorAll(".hero .stat__number");
    heroStats.forEach((stat) => {
      if (!stat.hasAttribute("data-animated")) {
        stat.setAttribute("data-animated", "true");
        animateCounter(stat);
      }
    });
  }, 1000);

  // Console Welcome Message
  console.log(`
    🌍 Welcome to NexusEdTech Holdings!
    
    Connecting minds, transforming education globally since 2022.
    Led by our passionate B-friends team
    
    Portfolio:
    • AlumniConnect - Alumni Management Platform (400,000+ users, 180+ institutions)
    • NavTara Edutech - Digital Learning Platform (350,000+ users, 120+ institutions)
    
    Global Reach: 300+ institutions across 35+ countries
    Total Users: 750,000+
    Contact: contact@nexusedtech.com
    
    Theme: ${currentTheme} mode (click 🌙/☀️ to toggle)
    
    Our B-friends Team:
    • Sarah Mitchell - CEO & Managing Director
    • Rahul Sharma - Chief Technology Officer  
    • Emily Chen - Head of Product Development
    • Marcus Rodriguez - VP of Global Operations
    • Dr. Priya Patel - Director of Alumni Solutions
    • James Wilson - Director of Learning Solutions
    • Lisa Thompson - Head of Marketing & Partnerships
    • David Kim - VP of Customer Success
    
    "Building bridges between educational institutions worldwide through 
    innovative technology solutions that foster connection, learning, 
    and global collaboration." - B-friends Team Mission
    `);
});

// Add enhanced mobile menu styles dynamically
const mobileStyles = document.createElement("style");
mobileStyles.textContent = `
    .nav__mobile-toggle {
        transition: all var(--duration-normal) var(--ease-standard);
    }
    
    .theme-toggle {
        transition: all var(--duration-fast) var(--ease-standard);
    }
    
    @media (max-width: 768px) {
        .nav__menu {
            position: fixed;
            top: 70px;
            left: 0;
            right: 0;
            background: var(--color-surface);
            border-bottom: 1px solid var(--color-border);
            box-shadow: var(--shadow-lg);
            flex-direction: column;
            padding: var(--space-20);
            transform: translateY(-100%);
            opacity: 0;
            visibility: hidden;
            transition: all var(--duration-normal) var(--ease-standard);
            z-index: 999;
        }
        
        .nav__menu--active {
            transform: translateY(0);
            opacity: 1;
            visibility: visible;
        }
        
        .nav__menu .nav__item {
            margin-bottom: var(--space-16);
        }
        
        .nav__menu .nav__link {
            font-size: var(--font-size-lg);
            padding: var(--space-8) 0;
            display: block;
        }
        
        .nav__mobile-toggle--active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .nav__mobile-toggle--active span:nth-child(2) {
            opacity: 0;
        }
        
        .nav__mobile-toggle--active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
        }
        
        .nav__mobile-toggle {
            display: flex !important;
        }
    }
    
    /* Enhanced animations */
    .portfolio__features span {
        transition: all 0.3s ease;
    }
    
    .region {
        transition: all 0.3s ease;
    }
    
    .region:hover {
        transform: scale(1.05);
        background: var(--color-primary-hover);
    }
    
    .team-member {
        position: relative;
        overflow: hidden;
    }
    
    .team-member::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
        transition: left 0.5s;
    }
    
    .team-member:hover::before {
        left: 100%;
    }
    
    .team-member__avatar {
        transition: all 0.3s ease;
    }
    
    .team-member__expertise span {
        transition: all 0.3s ease;
    }
    
    .preregister__success.hidden {
        display: none !important;
        opacity: 0 !important;
    }
    
    .preregister__success {
        opacity: 1;
        transition: opacity 0.3s ease;
    }
`;
document.head.appendChild(mobileStyles);
