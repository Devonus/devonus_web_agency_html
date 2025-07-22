window.addEventListener("load", () => {
  const loadMap = () => {
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/globe.gl";
    script.type = "text/javascript";
    script.onload = () => {
      const OPACITY = 0.22;
      const about = document.getElementById("about");
      const services = document.getElementById("services");
      const top = document.querySelector("header");
      const work = document.getElementById("work");
      const globeContainer = document.getElementById("globeViz");
      // const newYork = document.getElementById("new-york");
      // const england = document.getElementById("england");

      // Animation control variables
      let mainAnimationId = null;
      let pulseAnimationId = null;
      let isGlobeVisible = true;

      // screen width based adjustments
      const screenWidth = window.innerWidth;
      let baseAltitude = screenWidth < 640 ? 1.7 : 1.0;

      let baseOffset;
      if (screenWidth < 640) {
        baseOffset = [250, 450];
      } else if (screenWidth < 1024) {
        baseOffset = [400, 330];
      } else {
        baseOffset = [500, 250];
      }

      let centerOffset;
      if (screenWidth < 640) {
        centerOffset = [-250, 450];
      } else {
        centerOffset = [-500, 250];
      }

      const myGlobe = Globe()(globeContainer)
        .globeOffset(baseOffset)
        .globeImageUrl("public/black.png")
        .pointOfView({ lat: 39.6, lng: -98.5, altitude: baseAltitude })
        .arcsTransitionDuration(0)
        .pointColor(() => "orange")
        .backgroundColor("rgba(0,0,0,0)")
        .pointAltitude(0)
        .pointRadius(0.02)
        .pointsMerge(true)
        .polygonSideColor(() => "rgba(255, 255, 255, .1)")
        .polygonCapColor(() => "rgba(255, 140, 0, 1)")
        .showAtmosphere(false);

      myGlobe.controls().enableZoom = false;
      myGlobe.controls().enableRotate = false;
      myGlobe.controls().autoRotate = true;
      myGlobe.controls().autoRotateSpeed = 0.5;

      let currentOffset = [...baseOffset];
      let targetOffset = [...baseOffset];
      let lastPOVState = "default";
      let currentSpeed = 0.5;
      let targetSpeed = 0.5;
      let scrollDirection = 1;
      let lastScrollTop = window.scrollY;
      let lastTime = performance.now();
      let scrollTimeout;

      // Function to check if globe is visible on screen
      function isElementVisible(element) {
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const windowWidth = window.innerWidth;

        return (
          rect.bottom >= 0 &&
          rect.right >= 0 &&
          rect.top <= windowHeight &&
          rect.left <= windowWidth
        );
      }

      // Function to transition polygon colors smoothly
      function transitionHexPolygonColor(colorFn) {
        myGlobe.hexPolygonColor(colorFn);
      }

      // scroll event listener to adjust speed and direction
      window.addEventListener("scroll", () => {
        const now = performance.now();
        const currentScrollTop = window.scrollY;
        const deltaScroll = currentScrollTop - lastScrollTop;
        const deltaTime = now - lastTime;

        scrollDirection = deltaScroll >= 0 ? 1 : -1;
        const scrollSpeed = Math.abs(deltaScroll) / deltaTime;
        targetSpeed = Math.min(3, Math.max(0.5, scrollSpeed * 10)) * 5;

        lastScrollTop = currentScrollTop;
        lastTime = now;

        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
          targetSpeed = 0.2;
        }, 10);

        // Check globe visibility and manage animations
        const wasVisible = isGlobeVisible;
        isGlobeVisible = isElementVisible(globeContainer);

        if (wasVisible !== isGlobeVisible) {
          if (isGlobeVisible) {
            // Resume animations
            if (!mainAnimationId) {
              animationLoop();
            }
            if (!pulseAnimationId) {
              pulseAtmosphere();
            }
          } else {
            // Pause animations
            if (mainAnimationId) {
              cancelAnimationFrame(mainAnimationId);
              mainAnimationId = null;
            }
            if (pulseAnimationId) {
              cancelAnimationFrame(pulseAnimationId);
              pulseAnimationId = null;
            }
          }
        }
      });

      // Simplified scroll section detection
      function getScrollSection() {
        const vh = window.innerHeight;
        const sections = [
          { id: "top", el: top },
          { id: "about", el: about },
          { id: "services", el: services },
          { id: "work", el: work },
          // { id: "new-york", el: newYork },
          // { id: "england", el: england },
        ];

        for (let i = sections.length - 1; i >= 0; i--) {
          const rect = sections[i].el.getBoundingClientRect();
          if (rect.top < vh * 0.5) {
            return sections[i].id;
          }
        }
        return "top";
      }

      // Animation loop
      function animationLoop() {
        if (!isGlobeVisible) {
          mainAnimationId = null;
          return;
        }

        const currentSection = getScrollSection();

        // Determine targetOffset directly based on section
        switch (currentSection) {
          case "about": {
            if (screenWidth < 640) {
              targetOffset = [-250, 450];
            } else if (screenWidth < 1024) {
              targetOffset = [-250, 450];
            } else {
              targetOffset = [-550, 250];
            }
            break;
          }
          case "services":
            targetOffset = [-550, 250];
            break;
          case "work":
          case "new-york":
          case "england":
            targetOffset = [0, 0];
            break;
          default:
            targetOffset = [...baseOffset];
            break;
        }

        // Smoothly update globe offset
        currentOffset = currentOffset.map(
          (val, i) => val + (targetOffset[i] - val) * 0.05
        );
        myGlobe.globeOffset(currentOffset);

        // Only update POV if section changed
        if (currentSection !== lastPOVState) {
          switch (currentSection) {
            case "services":
              myGlobe.pointOfView(
                { lat: 32.7157, lng: -57.1611, altitude: 0.8 },
                2000
              );
              myGlobe.labelColor(() => "rgba(184, 247, 62, 1)");
              transitionHexPolygonColor(() => "rgb(21, 21, 21)");
              break;
            case "work":
              myGlobe.pointOfView(
                { lat: 32.7157, lng: -117.1611, altitude: 0.4 },
                2000
              );
              myGlobe.labelColor(() => "rgba(184, 247, 62, 1)");
              myGlobe.polygonCapColor(() => "rgb(21, 21, 21)");
              break;
            case "new-york":
              myGlobe.pointOfView(
                { lat: 40.7128, lng: -74.006, altitude: 0.4 },
                2000
              );
              myGlobe.labelColor(() => "rgba(184, 247, 62, 1)");
              myGlobe.polygonCapColor(() => "rgb(21, 21, 21)");
              break;
            case "england":
              myGlobe.pointOfView(
                { lat: 52.3555, lng: -1.1743, altitude: 0.4 },
                2000
              );
              myGlobe.labelColor(() => "rgba(184, 247, 62, 1)");
              myGlobe.polygonCapColor(() => "rgb(21, 21, 21)");
              break;
            default:
              myGlobe.pointOfView(
                { lat: 39.6, lng: -98.5, altitude: baseAltitude },
                2000
              );
              myGlobe.labelColor(() => "rgba(184, 247, 62, 0)");
              transitionHexPolygonColor(() => "rgba(255, 140, 0, 1)");
              break;
          }
          lastPOVState = currentSection;
        }

        // Smooth scroll speed
        currentSpeed += (targetSpeed - currentSpeed) * 0.05;
        myGlobe.controls().autoRotateSpeed = currentSpeed * scrollDirection;

        mainAnimationId = requestAnimationFrame(animationLoop);
      }

      // load cities
      fetch("public/ne_110m_populated_places_simple.geojson")
        .then((res) => res.json())
        .then((places) => {
          myGlobe
            .labelsData(places.features)
            .labelLat((d) => d.properties.latitude)
            .labelLng((d) => d.properties.longitude)
            .labelText((d) => d.properties.name)
            .labelSize((d) => Math.sqrt(d.properties.pop_max) * 4e-4)
            .labelDotRadius((d) => Math.sqrt(d.properties.pop_max) * 4e-4)
            .labelColor(() => "rgba(184, 247, 62, 0)")
            .labelResolution(2);
          myGlobe.labelAltitude(0.021);
          myGlobe.showAtmosphere(true);
          myGlobe.atmosphereColor("orange");
          myGlobe.atmosphereAltitude(0.1);
        });

      let pulseDirection = 1; // 1 for increasing, -1 for decreasing
      let currentAltitude = 0.1;
      const minAltitude = 0.08;
      const maxAltitude = 0.16;
      const pulseSpeed = 0.0005; // Adjust for faster/slower pulse

      function pulseAtmosphere() {
        if (!isGlobeVisible) {
          pulseAnimationId = null;
          return;
        }

        currentAltitude += pulseSpeed * pulseDirection;

        if (currentAltitude >= maxAltitude) {
          currentAltitude = maxAltitude;
          pulseDirection = -1;
        } else if (currentAltitude <= minAltitude) {
          currentAltitude = minAltitude;
          pulseDirection = 1;
        }

        myGlobe.atmosphereAltitude(currentAltitude);

        pulseAnimationId = requestAnimationFrame(pulseAtmosphere);
      }

      fetch("public/new_continent.geojson")
        .then((res) => res.json())
        .then((countries) => {
          myGlobe
            .hexPolygonsData(
              countries.features.filter((d) => d.properties.ISO_A2 !== "AQ")
            )
            .hexPolygonResolution(3)
            .hexPolygonMargin(0.3)
            .hexPolygonUseDots(true)
            .hexPolygonColor(() => "rgba(255, 140, 0, 1)")
            .hexPolygonLabel(
              ({ properties: d }) => `
              <b>${d.ADMIN} (${d.ISO_A2})</b><br/>
            `
            )
            .polygonAltitude(0.005)
            .polygonSideColor(() => "rgba(255, 255, 255, 0.1)")
            .polygonStrokeColor(() => "#242424")
            .polygonsTransitionDuration(0);
        });

      const contactBtns = document.querySelectorAll(".contact-btn");
      contactBtns.forEach((btn) => {
        let clicked = false;
        let isHovered = false;
        let colorTransitionTimeout = null;
        let currentColorStep = 0;
        let colorTransitionInterval = null;

        // Function to smoothly transition to orange with specific start colors
        const transitionToOrangeWithColors = (startColors) => {
          if (colorTransitionInterval) {
            clearInterval(colorTransitionInterval);
          }

          currentColorStep = 0;
          const totalSteps = 60; // Number of steps for smooth transition
          const stepDuration = 50; // 50ms per step = 3 second total transition

          colorTransitionInterval = setInterval(() => {
            if (isHovered) {
              // Stop transition if user hovers again
              clearInterval(colorTransitionInterval);
              return;
            }

            currentColorStep++;
            const progress = currentColorStep / totalSteps;

            // Target orange color
            const orange = { r: 255, g: 140, b: 0 };

            let colorIndex = 0;
            transitionHexPolygonColor(() => {
              // Use the specific start color for this polygon
              const startColor = startColors[colorIndex % startColors.length];
              colorIndex++;

              // Interpolate from start color to orange
              const r = Math.round(
                startColor.r + (orange.r - startColor.r) * progress
              );
              const g = Math.round(
                startColor.g + (orange.g - startColor.g) * progress
              );
              const b = Math.round(
                startColor.b + (orange.b - startColor.b) * progress
              );

              return `rgb(${r}, ${g}, ${b})`;
            });

            if (currentColorStep >= totalSteps) {
              clearInterval(colorTransitionInterval);
              // Final orange color
              transitionHexPolygonColor(() => "rgba(255, 140, 0, 1)");
            }
          }, stepDuration);
        };

        btn.addEventListener("mouseenter", () => {
          if (clicked) return;

          isHovered = true;

          // Clear any existing timeouts/intervals
          if (colorTransitionTimeout) {
            clearTimeout(colorTransitionTimeout);
            colorTransitionTimeout = null;
          }
          if (colorTransitionInterval) {
            clearInterval(colorTransitionInterval);
            colorTransitionInterval = null;
          }

          myGlobe.pointOfView({ lat: 39.6, lng: -98.5, altitude: 0.4 }, 1500);
          myGlobe.labelColor(() => "rgba(184, 247, 62, 1)");
          transitionHexPolygonColor(() => "rgb(21, 21, 21)");
        });

        btn.addEventListener("mouseleave", () => {
          if (clicked) return;

          isHovered = false;

          myGlobe.pointOfView(
            { lat: 39.6, lng: -98.5, altitude: baseAltitude },
            1500
          );
          myGlobe.labelColor(() => "rgba(184, 247, 62, 0)");

          // Set random colors and immediately start transitioning to orange
          const startColors = [];
          for (let i = 0; i < 100; i++) {
            startColors.push({
              r: Math.round(Math.random() * 255),
              g: Math.round(Math.random() * 255),
              b: Math.round(Math.random() * 255),
            });
          }

          // Set the initial random colors
          let colorIndex = 0;
          transitionHexPolygonColor(() => {
            const color = startColors[colorIndex % startColors.length];
            colorIndex++;
            return `rgb(${color.r}, ${color.g}, ${color.b})`;
          });

          // Start the smooth transition to orange immediately
          colorTransitionTimeout = setTimeout(() => {
            if (!isHovered) {
              transitionToOrangeWithColors(startColors);
            }
          }, 500); // Brief delay to see the random colors
        });
      });

      // Start initial animations
      animationLoop();
      pulseAtmosphere();
    };
    document.body.appendChild(script);
  };

  if ("requestIdleCallback" in window) {
    requestIdleCallback(loadMap);
  } else {
    setTimeout(loadMap, 1000);
  }
});
