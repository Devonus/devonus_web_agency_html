//circle
document.addEventListener("DOMContentLoaded", () => {
  const circle = document.getElementById("circle");
  let mouseX = 0,
    mouseY = 0;
  let currentX = 0,
    currentY = 0;
  const speed = 0.15; // smaller = more delay

  document.addEventListener("mousemove", (e) => {
    mouseX = e.pageX;
    mouseY = e.pageY;
  });

  function animate() {
    currentX += (mouseX - currentX) * speed;
    currentY += (mouseY - currentY) * speed;

    circle.style.left = currentX - circle.offsetWidth / 2 + "px";
    circle.style.top = currentY - circle.offsetHeight / 2 + "px";

    requestAnimationFrame(animate);
  }

  animate();
});

//nav bar toggle
const navToggle = document.getElementById("nav-toggle");
const navLinks = document.getElementById("nav-links");

navToggle.addEventListener("click", () => {
  navLinks.classList.toggle("open");

  if (navLinks.classList.contains("open")) {
    navToggle.textContent = "×";
  } else {
    navToggle.textContent = "☰";
  }
});

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
  if (window.scrollY > 10) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const navItems = document.querySelectorAll(".nav-item");

  navItems.forEach((item) => {
    const link = item.querySelector("a");
    link.addEventListener("click", (e) => {
      // Check if the viewport width is 1020px or less
      if (window.innerWidth <= 1020) {
        // Prevent the default link behavior
        e.preventDefault();
        console.log("Clicked:", link.textContent.trim());

        // Loop through all nav items and close them
        navItems.forEach((otherItem) => {
          // Close the other dropdowns, but not the one that was just clicked
          if (otherItem !== item) {
            otherItem.classList.remove("open");
          }
        });

        // Toggle the 'open' class for the clicked item
        item.classList.toggle("open");
      }
    });
  });
});

//change words
const words = [
  " performance.",
  " precision.",
  " speed.",
  " innovation.",
  " scalability.",
  " reliability.",
  " efficiency.",
  " elegance.",
  " craftsmanship.",
  " resilience.",
];

const el = document.getElementById("hero-span");
let currentWordIndex = 0;
let currentText = "";
let adding = true; // true = adding letters, false = deleting letters

function typeLoop() {
  const fullWord = words[currentWordIndex];

  if (adding) {
    // Add one letter
    currentText = fullWord.slice(0, currentText.length + 1);
    el.textContent = currentText;

    if (currentText === fullWord) {
      // Finished typing the full word, wait then start deleting
      adding = false;
      setTimeout(typeLoop, 3000); // pause 1 second before deleting
    } else {
      setTimeout(typeLoop, 50); // speed of typing letters
    }
  } else {
    // Delete one letter
    currentText = currentText.slice(0, -1);
    el.textContent = currentText;

    if (currentText.length === 0) {
      // Move to next word after deleting
      adding = true;
      currentWordIndex = (currentWordIndex + 1) % words.length;
      setTimeout(typeLoop, 100); // short pause before next word
    } else {
      setTimeout(typeLoop, 100); // speed of deleting letters
    }
  }
}

// Start typing loop
typeLoop();

//button rainbow
const buttons = document.querySelectorAll(".contact-btn");

buttons.forEach((button) => {
  button.addEventListener("mousemove", (e) => {
    const x = event.offsetX;
    const y = event.offsetY;

    button.style.setProperty("--x", `${x}px`);
    button.style.setProperty("--y", `${y}px`);
  });
});

// const sections = document.querySelectorAll("section");

// sections.forEach((section) => {
//   let targetX = 0;
//   let targetY = 0;
//   let currentX = 0;
//   let currentY = 0;
//   let opacity = 0;

//   function updatePosition(x, y) {
//     targetX = x;
//     targetY = y;
//     opacity = 1;
//   }

//   section.addEventListener("mousemove", (e) => {
//     const rect = section.getBoundingClientRect();
//     const x = e.clientX - rect.left;
//     const y = e.clientY - rect.top;
//     updatePosition(x, y);
//   });

//   section.addEventListener(
//     "touchmove",
//     (e) => {
//       if (!e.touches.length) return;
//       const touch = e.touches[0];
//       const rect = section.getBoundingClientRect();
//       const x = touch.clientX - rect.left;
//       const y = touch.clientY - rect.top;
//       updatePosition(x, y);
//     },
//     { passive: true }
//   );

//   section.addEventListener("mouseleave", () => {
//     opacity = 0;
//   });

//   section.addEventListener("touchend", () => {
//     opacity = 0;
//   });

//   section.addEventListener("touchcancel", () => {
//     opacity = 0;
//   });

//   function animate() {
//     // Easing factor: adjust between 0 and 1 (0.1 = smooth lag)
//     const ease = 0.05;

//     // Move current toward target
//     currentX += (targetX - currentX) * ease;
//     currentY += (targetY - currentY) * ease;

//     // Update CSS vars
//     section.style.setProperty("--x", `${currentX}px`);
//     section.style.setProperty("--y", `${currentY}px`);
//     section.style.setProperty("--opacity", opacity);

//     requestAnimationFrame(animate);
//   }

//   animate();
// });

// const navlinks = document.querySelectorAll(".nav-links");

// navlinks.forEach((navlinks) => {
//   navlinks.addEventListener("mousemove", (e) => {
//     const x = event.offsetX;
//     const y = event.offsetY;

//     navlinks.style.setProperty("--x", `${x}px`);
//     navlinks.style.setProperty("--y", `${y}px`);
//   });
// });

const sanDiegoHeadings = document.getElementsByClassName("content-grid");

const sanDiegoObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        sanDiegoObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

Array.from(sanDiegoHeadings).forEach((el) => {
  sanDiegoObserver.observe(el);
});

function scrollToCenter(selector) {
  // 1. Find the target element on the page.
  const element = document.querySelector(selector);
  if (!element) {
    console.warn(`Scroll target not found: ${selector}`);
    return;
  }

  const elementTop = element.getBoundingClientRect().top + window.scrollY;
  const elementHeight = element.offsetHeight;
  const viewportHeight = window.innerHeight;

  const scrollTarget = elementTop - viewportHeight / 2 + elementHeight / 2;

  // 3. Perform the smooth scroll.
  window.scrollTo({
    top: scrollTarget,
    behavior: "smooth",
  });
}

document.addEventListener("DOMContentLoaded", () => {
  // Find the button that triggers the scroll
  const scrollButton = document.getElementById("home-nav");

  if (scrollButton) {
    scrollButton.addEventListener("click", (e) => {
      // Prevent the link from jumping instantly (its default behavior)
      e.preventDefault();

      // Call our new function to perform the centered scroll
      scrollToCenter("#top");
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  // Find the button that triggers the scroll
  const scrollButton = document.getElementById("about-nav");

  if (scrollButton) {
    scrollButton.addEventListener("click", (e) => {
      // Prevent the link from jumping instantly (its default behavior)
      e.preventDefault();

      // Call our new function to perform the centered scroll
      scrollToCenter("#about");
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  // Find the button that triggers the scroll
  const scrollButton = document.getElementById("solutions-nav");

  if (scrollButton) {
    scrollButton.addEventListener("click", (e) => {
      // Prevent the link from jumping instantly (its default behavior)
      e.preventDefault();

      // Call our new function to perform the centered scroll
      scrollToCenter("#solutions");
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  // Find the button that triggers the scroll
  const scrollButton = document.getElementById("blog-nav");

  if (scrollButton) {
    scrollButton.addEventListener("click", (e) => {
      // Prevent the link from jumping instantly (its default behavior)
      e.preventDefault();

      // Call our new function to perform the centered scroll
      scrollToCenter("#blog");
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  // Find the button that triggers the scroll
  const scrollButton = document.getElementById("case-studies-nav");

  if (scrollButton) {
    scrollButton.addEventListener("click", (e) => {
      // Prevent the link from jumping instantly (its default behavior)
      e.preventDefault();

      // Call our new function to perform the centered scroll
      scrollToCenter("#case-studies");
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  // Find the button that triggers the scroll
  const scrollButton = document.getElementById("pricing-nav");

  if (scrollButton) {
    scrollButton.addEventListener("click", (e) => {
      // Prevent the link from jumping instantly (its default behavior)
      e.preventDefault();

      // Call our new function to perform the centered scroll
      scrollToCenter("#pricing");
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  // Get all elements with that class
  const scrollButtons = document.querySelectorAll(".contact-btn");

  scrollButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault();
      scrollToCenter("#contact");
    });
  });
});

//fun console
console.log(
  "\r\n      _                                 \r\n     | |                                \r\n   __| | _____   _____  _ __  _   _ ___ \r\n  / _` |/ _ \\ \\ / / _ \\| '_ \\| | | / __|\r\n | (_| |  __/\\ V | (_) | | | | |_| \\__ \\\r\n  \\__,_|\\___| \\_/ \\___/|_| |_|\\__,_|___/\r\n              | |                       \r\n __      _____| |__                     \r\n \\ \\ /\\ / / _ | '_ \\                    \r\n  \\ V  V |  __| |_) |                   \r\n   \\_/\\_/ \\___|_.__/                    \r\n   __ _  __ _  ___ _ __   ___ _   _     \r\n  / _` |/ _` |/ _ | '_ \\ / __| | | |    \r\n | (_| | (_| |  __| | | | (__| |_| |    \r\n  \\__,_|\\__, |\\___|_| |_|\\___|\\__, |    \r\n         __/ |                 __/ |    \r\n        |___/                 |___/     \r\n"
);

console.log(
  "%c💻 Looking for a beautiful website? Let's talk: %chello@devonus.com",
  "color:rgb(204, 133, 2); font-size: 14px;",
  "color: #000000; font-size: 14px; font-weight: bold;"
);

document.querySelectorAll(".blog-post").forEach((post) => {
  post.addEventListener("mouseenter", () => {
    const bg = post.getAttribute("data-bg");
    post.style.backgroundImage = `url(${bg})`;
  });
  post.addEventListener("mouseleave", () => {
    post.style.backgroundImage = "";
  });
});

document.querySelectorAll(".blog-post").forEach((post) => {
  const bg = post.getAttribute("data-bg") || "";
  post.style.setProperty("--hover-bg", `url(${bg})`);
});

//service box accordian
document.querySelectorAll(".service-box").forEach((box) => {
  box.addEventListener("click", () => {
    const info = box.nextElementSibling;

    // Close all others
    document.querySelectorAll(".service-box").forEach((otherBox) => {
      if (otherBox !== box) {
        otherBox.classList.remove("open");
        otherBox.nextElementSibling.classList.remove("open");
      }
    });

    // Toggle the clicked one
    box.classList.toggle("open");
    info.classList.toggle("open");
  });
});

const toggleButton = document.getElementById("darkModeToggle");
const rootElement = document.documentElement; // <html>

// Update button icon based on mode
function updateButtonIcon(isDark) {
  toggleButton.innerHTML = `<img 
    src="${
      isDark ? "/public/lightbulb_dark.png" : "/public/lightbulb_light.png"
    }" 
    alt="${isDark ? "Light Mode" : "Dark Mode"}" 
    style="width: 24px; height: 24px;"
  >`;
}

// Function to set light mode instead of dark mode
function setDarkMode(enabled) {
  if (enabled) {
    rootElement.classList.remove("light-mode"); // dark mode
    localStorage.setItem("dark-mode", "true");
  } else {
    rootElement.classList.add("light-mode"); // light mode
    localStorage.setItem("dark-mode", "false");
  }
  updateButtonIcon(enabled);
}

// Toggle light-mode class instead of dark-mode
toggleButton.addEventListener("click", () => {
  const isDark = rootElement.classList.toggle("light-mode") === false;
  localStorage.setItem("dark-mode", isDark ? "true" : "false");
  updateButtonIcon(isDark);
});

// On load, apply preference and update icon
window.addEventListener("DOMContentLoaded", () => {
  const saved = localStorage.getItem("dark-mode");
  if (saved === "true") {
    setDarkMode(true);
  } else if (saved === "false") {
    setDarkMode(false);
  } else {
    const prefersDark =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    setDarkMode(prefersDark);
  }
});

// Optional: system preference listener if no saved preference
window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", (e) => {
    if (localStorage.getItem("dark-mode") === null) {
      setDarkMode(e.matches);
    }
  });
