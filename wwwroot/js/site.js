
document.addEventListener("DOMContentLoaded", () => {
    // Respect reduced-motion preferences.
    const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    // Reveal sections as they enter the viewport.
    const revealElements = document.querySelectorAll(
        ".about-copy, .about-art, .discipline, .project, " +
        ".journey-column, .contact-intro, .contact-link"
    );

    if ("IntersectionObserver" in window && !reduceMotion) {
        revealElements.forEach((element, index) => {
            element.classList.add("reveal-ready");
            element.style.setProperty(
                "--reveal-delay",
                `${(index % 3) * 100}ms`
            );
        });

        const revealObserver = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-visible");
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -35px 0px"
            }
        );

        revealElements.forEach(element => {
            revealObserver.observe(element);
        });
    }

    // Gentle movement in the hero artwork.
    const heroArt = document.querySelector(".hero-art");
    const heroImage = document.querySelector(".hero-image");

    if (heroArt && heroImage && !reduceMotion) {
        heroArt.addEventListener("pointermove", event => {
            if (event.pointerType === "touch") return;

            const bounds = heroArt.getBoundingClientRect();
            const x = (event.clientX - bounds.left) / bounds.width - 0.5;
            const y = (event.clientY - bounds.top) / bounds.height - 0.5;

            heroImage.style.transform =
                `translate(${x * 8}px, ${y * 8}px) scale(1.04)`;
        });

        heroArt.addEventListener("pointerleave", () => {
            heroImage.style.transform = "";
        });
    }

    // Add a subtle tilt to the project artwork on desktop.
    const projectVisuals = document.querySelectorAll(".project-visual");

    if (!reduceMotion) {
        projectVisuals.forEach(visual => {
            visual.addEventListener("pointermove", event => {
                if (event.pointerType === "touch") return;

                const bounds = visual.getBoundingClientRect();
                const x = (event.clientX - bounds.left) / bounds.width;
                const y = (event.clientY - bounds.top) / bounds.height;

                const rotateY = (x - 0.5) * 4;
                const rotateX = (0.5 - y) * 4;

                visual.style.setProperty("--tilt-x", `${rotateX}deg`);
                visual.style.setProperty("--tilt-y", `${rotateY}deg`);
            });

            visual.addEventListener("pointerleave", () => {
                visual.style.setProperty("--tilt-x", "0deg");
                visual.style.setProperty("--tilt-y", "0deg");
            });
        });
    }

    // Smooth scrolling for links that point to page sections.
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener("click", event => {
            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") return;

            const target = document.querySelector(targetId);

            if (!target) return;

            event.preventDefault();

            target.scrollIntoView({
                behavior: reduceMotion ? "auto" : "smooth",
                block: "start"
            });
        });
    });

    // Update the browser tab title.
    document.title = "Maris Wanjiru | Data, Technology & Psychology";
});
