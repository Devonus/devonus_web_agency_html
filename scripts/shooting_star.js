// Work section shooting star functionality
const workStarContainer = document.getElementById(
  "work-shooting-star-container"
);

function createWorkShootingStar() {
  if (!workStarContainer) return;

  const star = document.createElement("div");
  star.classList.add("work-shooting-star");

  // Add random variations to the starting position and trajectory
  const startRightOffset = Math.random() * 30; // 0-30% from right edge
  const startTopOffset = Math.random() * 40; // 0-40% from top
  const endLeftOffset = Math.random() * 30; // 0-30% from left edge
  const endBottomOffset = Math.random() * 40; // 0-40% from bottom

  // Random angle variation (±15 degrees from the diagonal)
  const angleVariation = (Math.random() - 0.5) * 30; // -15 to +15 degrees

  // Random duration for more sporadic feel
  const duration = Math.random() * 1000 + 1500; // 1.5-2.5 seconds

  // Apply random starting position
  star.style.right = `${startRightOffset}%`;
  star.style.top = `${startTopOffset}%`;

  // Apply random trajectory using CSS custom properties
  star.style.setProperty("--end-left", `${endLeftOffset}%`);
  star.style.setProperty("--end-bottom", `${endBottomOffset}%`);
  star.style.setProperty("--angle-variation", `${angleVariation}deg`);
  star.style.setProperty("--duration", `${duration}ms`);

  workStarContainer.appendChild(star);

  // Remove after animation completes (add buffer time)
  setTimeout(() => {
    if (star.parentNode) {
      star.remove();
    }
  }, duration + 500);
}

function workStarLoop() {
  const delay = Math.random() * 5000 + 3000;

  setTimeout(() => {
    createWorkShootingStar();
    workStarLoop();
  }, delay);
}

// Start the work section shooting star loop
workStarLoop();

// Optional: Trigger shooting star when section comes into view
const workSector = document.getElementById("work");
if (workSector) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Create a shooting star when the section is visible
        // Random delay between 500ms-2000ms
        const triggerDelay = Math.random() * 1500 + 500;
        setTimeout(() => createWorkShootingStar(), triggerDelay);
      }
    });
  });

  observer.observe(workSector);
}
