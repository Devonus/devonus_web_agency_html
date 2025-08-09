// //circle
// document.addEventListener("DOMContentLoaded", () => {
//   const circle = document.getElementById("circle");
//   let mouseX = 0,
//     mouseY = 0;
//   let currentX = 0,
//     currentY = 0;
//   const speed = 0.15; // smaller = more delay

//   document.addEventListener("mousemove", (e) => {
//     mouseX = e.pageX;
//     mouseY = e.pageY;
//   });

//   function animate() {
//     currentX += (mouseX - currentX) * speed;
//     currentY += (mouseY - currentY) * speed;

//     circle.style.left = currentX - circle.offsetWidth / 2 + "px";
//     circle.style.top = currentY - circle.offsetHeight / 2 + "px";

//     requestAnimationFrame(animate);
//   }

//   animate();
// });

// //nav bar toggle
// const navToggle = document.getElementById("nav-toggle");
// const navLinks = document.getElementById("nav-links");

// navToggle.addEventListener("click", () => {
//   navLinks.classList.toggle("open");

//   if (navLinks.classList.contains("open")) {
//     navToggle.textContent = "×";
//   } else {
//     navToggle.textContent = "☰";
//   }
// });

// const navbar = document.querySelector(".navbar");

// window.addEventListener("scroll", () => {
//   if (window.scrollY > 10) {
//     navbar.classList.add("scrolled");
//   } else {
//     navbar.classList.remove("scrolled");
//   }
// });

// //change words
// const words = [
//   " performance.",
//   " precision.",
//   " speed.",
//   " innovation.",
//   " scalability.",
//   " reliability.",
//   " efficiency.",
//   " elegance.",
//   " craftsmanship.",
//   " resilience.",
// ];

// const el = document.getElementById("hero-span");
// let currentWordIndex = 0;
// let currentText = "";
// let adding = true; // true = adding letters, false = deleting letters

// function typeLoop() {
//   const fullWord = words[currentWordIndex];

//   if (adding) {
//     // Add one letter
//     currentText = fullWord.slice(0, currentText.length + 1);
//     el.textContent = currentText;

//     if (currentText === fullWord) {
//       // Finished typing the full word, wait then start deleting
//       adding = false;
//       setTimeout(typeLoop, 3000); // pause 1 second before deleting
//     } else {
//       setTimeout(typeLoop, 50); // speed of typing letters
//     }
//   } else {
//     // Delete one letter
//     currentText = currentText.slice(0, -1);
//     el.textContent = currentText;

//     if (currentText.length === 0) {
//       // Move to next word after deleting
//       adding = true;
//       currentWordIndex = (currentWordIndex + 1) % words.length;
//       setTimeout(typeLoop, 100); // short pause before next word
//     } else {
//       setTimeout(typeLoop, 100); // speed of deleting letters
//     }
//   }
// }

// // Start typing loop
// typeLoop();

// //button rainbow
// const buttons = document.querySelectorAll(".contact-btn");

// buttons.forEach((button) => {
//   button.addEventListener("mousemove", (e) => {
//     const x = event.offsetX;
//     const y = event.offsetY;

//     button.style.setProperty("--x", `${x}px`);
//     button.style.setProperty("--y", `${y}px`);
//   });
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

// const sanDiegoHeadings = document.getElementsByClassName("content-grid");

// const sanDiegoObserver = new IntersectionObserver(
//   (entries) => {
//     entries.forEach((entry) => {
//       if (entry.isIntersecting) {
//         entry.target.classList.add("visible");
//         sanDiegoObserver.unobserve(entry.target);
//       }
//     });
//   },
//   { threshold: 0.5 }
// );

// Array.from(sanDiegoHeadings).forEach((el) => {
//   sanDiegoObserver.observe(el);
// });

// // carousel
// const carousel = document.getElementById("carousel");
// const nextBtn = document.querySelector(".carousel-btn.next");
// const prevBtn = document.querySelector(".carousel-btn.prev");
// const items = carousel.querySelectorAll(".carousel-item");

// // Get the gap value from the CSS
// const style = getComputedStyle(carousel);
// const gap = parseFloat(style.gap); // This will be 32 if 1rem is 16px

// let itemWidth;
// function updateItemWidth() {
//   // itemWidth is the item's offsetWidth plus the gap
//   itemWidth = items[0].offsetWidth + gap;
// }

// let index = 1;

// function goToIndex(i, instant = false) {
//   // Ensure we're using the latest itemWidth when scrolling
//   updateItemWidth();
//   carousel.scrollTo({
//     left: itemWidth * i,
//     behavior: instant ? "auto" : "smooth",
//   });
// }

// function nextSlide() {
//   index++;
//   goToIndex(index);
// }

// function prevSlide() {
//   index--;
//   goToIndex(index);
// }

// // Event listener for scroll end to handle infinite loop logic
// carousel.addEventListener("scrollend", () => {
//   if (index === items.length - 1) {
//     index = 1;
//     goToIndex(index, true);
//   } else if (index === 0) {
//     index = items.length - 2;
//     goToIndex(index, true);
//   }
// });

// // Event listeners for buttons
// nextBtn.addEventListener("click", () => {
//   stopAutoplay();
//   nextSlide();
//   startAutoplay();
// });

// prevBtn.addEventListener("click", () => {
//   stopAutoplay();
//   prevSlide();
//   startAutoplay();
// });

// let autoplay;

// function startAutoplay() {
//   autoplay = setInterval(nextSlide, 5000);
// }

// function stopAutoplay() {
//   clearInterval(autoplay);
// }

// // INIT
// window.addEventListener("load", () => {
//   updateItemWidth(); // Calculate initial width
//   goToIndex(index, true);
//   startAutoplay();
// });

// // New event listener to handle resizing
// window.addEventListener("resize", () => {
//   updateItemWidth();
//   goToIndex(index, true);
// });
// /**
//  * Smoothly scrolls the viewport to center the given element.
//  * @param {string} selector - The CSS selector for the element to scroll to (e.g., '#contact').
//  */
// function scrollToCenter(selector) {
//   // 1. Find the target element on the page.
//   const element = document.querySelector(selector);
//   if (!element) {
//     console.warn(`Scroll target not found: ${selector}`);
//     return;
//   }

//   // 2. Calculate the exact top position to center the element.
//   //    - Get element's top position relative to the document.
//   //    - Subtract half the viewport's height to move it up.
//   //    - Add half the element's height to move it down.
//   const elementTop = element.getBoundingClientRect().top + window.scrollY;
//   const elementHeight = element.offsetHeight;
//   const viewportHeight = window.innerHeight;

//   const scrollTarget = elementTop - viewportHeight / 2 + elementHeight / 2;

//   // 3. Perform the smooth scroll.
//   window.scrollTo({
//     top: scrollTarget,
//     behavior: "smooth",
//   });
// }

// document.addEventListener("DOMContentLoaded", () => {
//   // Find the button that triggers the scroll
//   const scrollButton = document.getElementById("home-nav");

//   if (scrollButton) {
//     scrollButton.addEventListener("click", (e) => {
//       // Prevent the link from jumping instantly (its default behavior)
//       e.preventDefault();

//       // Call our new function to perform the centered scroll
//       scrollToCenter("#top");
//     });
//   }
// });

// document.addEventListener("DOMContentLoaded", () => {
//   // Find the button that triggers the scroll
//   const scrollButton = document.getElementById("about-nav");

//   if (scrollButton) {
//     scrollButton.addEventListener("click", (e) => {
//       // Prevent the link from jumping instantly (its default behavior)
//       e.preventDefault();

//       // Call our new function to perform the centered scroll
//       scrollToCenter("#about");
//     });
//   }
// });

// document.addEventListener("DOMContentLoaded", () => {
//   // Find the button that triggers the scroll
//   const scrollButton = document.getElementById("solutions-nav");

//   if (scrollButton) {
//     scrollButton.addEventListener("click", (e) => {
//       // Prevent the link from jumping instantly (its default behavior)
//       e.preventDefault();

//       // Call our new function to perform the centered scroll
//       scrollToCenter("#solutions");
//     });
//   }
// });

// document.addEventListener("DOMContentLoaded", () => {
//   // Find the button that triggers the scroll
//   const scrollButton = document.getElementById("blog-nav");

//   if (scrollButton) {
//     scrollButton.addEventListener("click", (e) => {
//       // Prevent the link from jumping instantly (its default behavior)
//       e.preventDefault();

//       // Call our new function to perform the centered scroll
//       scrollToCenter("#blog");
//     });
//   }
// });

// document.addEventListener("DOMContentLoaded", () => {
//   // Find the button that triggers the scroll
//   const scrollButton = document.getElementById("case-studies-nav");

//   if (scrollButton) {
//     scrollButton.addEventListener("click", (e) => {
//       // Prevent the link from jumping instantly (its default behavior)
//       e.preventDefault();

//       // Call our new function to perform the centered scroll
//       scrollToCenter("#case-studies");
//     });
//   }
// });

// // Wait for the page to be fully loaded before running script
// document.addEventListener("DOMContentLoaded", () => {
//   // Find the button that triggers the scroll
//   const scrollButton = document.getElementById("contact-nav");

//   if (scrollButton) {
//     scrollButton.addEventListener("click", (e) => {
//       // Prevent the link from jumping instantly (its default behavior)
//       e.preventDefault();

//       // Call our new function to perform the centered scroll
//       scrollToCenter("#contact");
//     });
//   }
// });

// //fun console
// console.log(
//   "\r\n      _                                 \r\n     | |                                \r\n   __| | _____   _____  _ __  _   _ ___ \r\n  / _` |/ _ \\ \\ / / _ \\| '_ \\| | | / __|\r\n | (_| |  __/\\ V | (_) | | | | |_| \\__ \\\r\n  \\__,_|\\___| \\_/ \\___/|_| |_|\\__,_|___/\r\n              | |                       \r\n __      _____| |__                     \r\n \\ \\ /\\ / / _ | '_ \\                    \r\n  \\ V  V |  __| |_) |                   \r\n   \\_/\\_/ \\___|_.__/                    \r\n   __ _  __ _  ___ _ __   ___ _   _     \r\n  / _` |/ _` |/ _ | '_ \\ / __| | | |    \r\n | (_| | (_| |  __| | | | (__| |_| |    \r\n  \\__,_|\\__, |\\___|_| |_|\\___|\\__, |    \r\n         __/ |                 __/ |    \r\n        |___/                 |___/     \r\n"
// );

// console.log(
//   "%c💻 Looking for a beautiful website? Let's talk: %chello@devonus.com",
//   "color:rgb(204, 133, 2); font-size: 14px;",
//   "color: #000000; font-size: 14px; font-weight: bold;"
// );
