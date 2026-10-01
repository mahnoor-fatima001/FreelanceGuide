document.addEventListener("DOMContentLoaded", () => {

    /* =========================================
       THEME TOGGLE
       ========================================= */

    const themeToggle = document.getElementById("themeToggle");

    const savedTheme = localStorage.getItem("freelanceGuideTheme");

    if (savedTheme === "light") {
        document.body.classList.add("light-mode");

        if (themeToggle) {
            themeToggle.textContent = "☀";
            themeToggle.setAttribute("aria-label", "Switch to dark mode");
        }
    } else {
        document.body.classList.remove("light-mode");

        if (themeToggle) {
            themeToggle.textContent = "☾";
            themeToggle.setAttribute("aria-label", "Switch to light mode");
        }
    }


    if (themeToggle) {

        themeToggle.addEventListener("click", () => {

            document.body.classList.toggle("light-mode");

            const isLight =
                document.body.classList.contains("light-mode");

            if (isLight) {

                localStorage.setItem(
                    "freelanceGuideTheme",
                    "light"
                );

                themeToggle.textContent = "☀";

                themeToggle.setAttribute(
                    "aria-label",
                    "Switch to dark mode"
                );

            } else {

                localStorage.setItem(
                    "freelanceGuideTheme",
                    "dark"
                );

                themeToggle.textContent = "☾";

                themeToggle.setAttribute(
                    "aria-label",
                    "Switch to light mode"
                );
            }
        });
    }


    /* =========================================
       ACTIVE NAVIGATION LINK
       ========================================= */

    const currentPage =
        window.location.pathname.split("/").pop() || "index.html";

    const navLinks =
        document.querySelectorAll(".navbar nav a");

    navLinks.forEach(link => {

        const linkPage =
            link.getAttribute("href");

        if (linkPage === currentPage) {
            link.classList.add("active");
        }

    });


    /* =========================================
       SCROLL ANIMATIONS
       ========================================= */

    const animatedElements =
        document.querySelectorAll(
            ".info-card, .skill-card, .roadmap-card, .content-block"
        );

    if ("IntersectionObserver" in window) {

        const observer =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (entry.isIntersecting) {

                            entry.target.classList.add("visible");

                            observer.unobserve(entry.target);
                        }

                    });

                },
                {
                    threshold: 0.1
                }
            );

        animatedElements.forEach(element => {
            observer.observe(element);
        });

    } else {

        animatedElements.forEach(element => {
            element.classList.add("visible");
        });

    }


    /* =========================================
       EXTERNAL LINKS
       ========================================= */

    const links =
        document.querySelectorAll("a[href]");

    links.forEach(link => {

        const href =
            link.getAttribute("href");

        if (
            href &&
            (href.startsWith("http://") ||
             href.startsWith("https://"))
        ) {

            link.setAttribute("target", "_blank");

            link.setAttribute(
                "rel",
                "noopener noreferrer"
            );
        }

    });


    /* =========================================
       SMOOTH INTERNAL LINKS
       ========================================= */

    document.querySelectorAll(
        'a[href^="#"]'
    ).forEach(link => {

        link.addEventListener("click", event => {

            const targetId =
                link.getAttribute("href");

            if (targetId === "#") {
                return;
            }

            const target =
                document.querySelector(targetId);

            if (target) {

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        });

    });


    /* =========================================
       CURRENT YEAR
       ========================================= */

    const yearElements =
        document.querySelectorAll(".current-year");

    yearElements.forEach(element => {
        element.textContent =
            new Date().getFullYear();
    });

});
