// San Diego heading observer
const sanDiegoHeading = document.getElementById("sd-heading");

const sanDiegoObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        sanDiegoHeading.classList.remove("opacity-0");
        sanDiegoHeading.classList.add("opacity-100");
        sanDiegoObserver.unobserve(sanDiegoHeading);
      }
    });
  },
  { threshold: 0.5 }
);

sanDiegoObserver.observe(sanDiegoHeading);

// our work heading observer
const ourWorkHeading = document.getElementById("our-work");

if (ourWorkHeading) {
  const ourWorkObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            ourWorkHeading.classList.remove("opacity-0");
            ourWorkHeading.classList.add("opacity-100");
            ourWorkObserver.unobserve(ourWorkHeading);
          }, 500); // 500ms delay
        }
      });
    },
    { threshold: 0.5 }
  );

  ourWorkObserver.observe(ourWorkHeading);
}

// Work heading observer
const workHeading = document.getElementById("work");

const workObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        workHeading.classList.remove("opacity-0");
        workHeading.classList.add("opacity-100");
        workObserver.unobserve(workHeading);
      }
    });
  },
  { threshold: 0.5 }
);

workObserver.observe(workHeading);

const caseStudyGrid = document.getElementById("case-study-grid");

const gridObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        caseStudyGrid.classList.remove("opacity-0");
        caseStudyGrid.classList.add("opacity-100");
        gridObserver.unobserve(caseStudyGrid);
      }
    });
  },
  { threshold: 0.1 }
);

gridObserver.observe(caseStudyGrid);

const navbar = document.getElementById("main-navbar");
const servicesSection = document.getElementById("services");
const aboutSection = document.getElementById("about");

if (navbar && servicesSection) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // When #work is in viewport
          navbar.classList.add("bg-devonus-black");
        }
      });
    },
    { threshold: 0.1 }
  );

  observer.observe(servicesSection);
}

if (navbar && aboutSection) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // When #about is in viewport
          navbar.classList.remove("bg-devonus-black");
        }
      });
    },
    { threshold: 0.1 }
  );

  observer.observe(aboutSection);
}

console.log(
  "\r\n      _                                 \r\n     | |                                \r\n   __| | _____   _____  _ __  _   _ ___ \r\n  / _` |/ _ \\ \\ / / _ \\| '_ \\| | | / __|\r\n | (_| |  __/\\ V | (_) | | | | |_| \\__ \\\r\n  \\__,_|\\___| \\_/ \\___/|_| |_|\\__,_|___/\r\n              | |                       \r\n __      _____| |__                     \r\n \\ \\ /\\ / / _ | '_ \\                    \r\n  \\ V  V |  __| |_) |                   \r\n   \\_/\\_/ \\___|_.__/                    \r\n   __ _  __ _  ___ _ __   ___ _   _     \r\n  / _` |/ _` |/ _ | '_ \\ / __| | | |    \r\n | (_| | (_| |  __| | | | (__| |_| |    \r\n  \\__,_|\\__, |\\___|_| |_|\\___|\\__, |    \r\n         __/ |                 __/ |    \r\n        |___/                 |___/     \r\n"
);

console.log(
  "%c💻 Looking for a beautiful website? Let's talk: %chello@devonus.com",
  "color:rgb(204, 133, 2); font-size: 14px;",
  "color: #000000; font-size: 14px; font-weight: bold;"
);
