/* =========================================================
   ANANYA DAS — PERSONAL PORTFOLIO
   Front-End Developer
   ========================================================= */


/* =========================================================
   1. BASIC PORTFOLIO DATA
   ========================================================= */

const portfolioData = {
    name: "Ananya Das",

    role: "Front-End Developer",

    email: "2007.ananyadas@gmail.com",

    linkedin:
        "https://www.linkedin.com/in/ananya-das-6570392a0",

    // Keep blank until you have an actual project repository.
    github: "",

    projects: 2,

    technologies: [
        "HTML",
        "CSS",
        "JavaScript",
        "Python",
        "PHP",
        "MySQL",
        "SQL"
    ]
};


/* =========================================================
   2. YEAR
   ========================================================= */

const yearElement = document.getElementById("year");

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}


/* =========================================================
   3. THEME TOGGLE
   ========================================================= */

const body = document.body;
const themeToggle = document.querySelector(".theme-toggle");
const themeIcon = document.querySelector(".theme-icon");

function setTheme(theme) {

    const isLight = theme === "light";

    body.classList.toggle("light-theme", isLight);

    if (themeIcon) {
        themeIcon.textContent = isLight ? "☼" : "◐";
    }

    localStorage.setItem("portfolio-theme", theme);
}


// Load saved theme
const savedTheme = localStorage.getItem("portfolio-theme");

if (savedTheme) {
    setTheme(savedTheme);
}


// Toggle theme
if (themeToggle) {

    themeToggle.addEventListener("click", () => {

        const newTheme =
            body.classList.contains("light-theme")
                ? "dark"
                : "light";

        setTheme(newTheme);
    });
}


/* =========================================================
   4. MOBILE NAVIGATION
   ========================================================= */

const menuToggle =
    document.querySelector(".menu-toggle");

const siteNav =
    document.querySelector(".site-nav");

const navLinks =
    document.querySelectorAll(".nav-link");


if (menuToggle && siteNav) {

    menuToggle.addEventListener("click", () => {

        const isOpen =
            siteNav.classList.toggle("open");

        menuToggle.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

        menuToggle.setAttribute(
            "aria-label",
            isOpen
                ? "Close navigation"
                : "Open navigation"
        );
    });
}


// Close menu after selecting a link
navLinks.forEach((link) => {

    link.addEventListener("click", () => {

        if (siteNav) {
            siteNav.classList.remove("open");
        }

        if (menuToggle) {

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

            menuToggle.setAttribute(
                "aria-label",
                "Open navigation"
            );
        }
    });
});


/* =========================================================
   5. SCROLL REVEAL ANIMATION
   ========================================================= */

const revealItems =
    document.querySelectorAll(".reveal");


if ("IntersectionObserver" in window) {

    const revealObserver =
        new IntersectionObserver(
            (entries, observer) => {

                entries.forEach((entry) => {

                    if (!entry.isIntersecting) {
                        return;
                    }

                    entry.target.classList.add("visible");

                    observer.unobserve(entry.target);
                });
            },
            {
                threshold: 0.12
            }
        );


    revealItems.forEach((element) => {
        revealObserver.observe(element);
    });

} else {

    // Fallback for older browsers

    revealItems.forEach((element) => {
        element.classList.add("visible");
    });
}


/* =========================================================
   6. ACTIVE NAVIGATION WHILE SCROLLING
   ========================================================= */

const sections =
    document.querySelectorAll("main section[id]");


if ("IntersectionObserver" in window) {

    const sectionObserver =
        new IntersectionObserver(
            (entries) => {

                const visibleSections =
                    entries
                        .filter(
                            (entry) =>
                                entry.isIntersecting
                        )
                        .sort(
                            (a, b) =>
                                b.intersectionRatio -
                                a.intersectionRatio
                        );


                if (!visibleSections.length) {
                    return;
                }


                const currentId =
                    visibleSections[0].target.id;


                navLinks.forEach((link) => {

                    const isActive =
                        link.getAttribute("href") ===
                        `#${currentId}`;


                    link.classList.toggle(
                        "active",
                        isActive
                    );
                });
            },
            {
                rootMargin:
                    "-35% 0px -50% 0px",

                threshold: [
                    0.1,
                    0.25,
                    0.5
                ]
            }
        );


    sections.forEach((section) => {
        sectionObserver.observe(section);
    });
}


/* =========================================================
   7. UPDATE BASIC PORTFOLIO INFORMATION
   ========================================================= */

// Update email links
const emailLinks =
    document.querySelectorAll(
        'a[href^="mailto:"]'
    );


emailLinks.forEach((link) => {

    link.href =
        `mailto:${portfolioData.email}`;
});


// Update LinkedIn links
const linkedinLinks =
    document.querySelectorAll(
        'a[href*="linkedin.com"]'
    );


linkedinLinks.forEach((link) => {

    link.href =
        portfolioData.linkedin;

    link.target = "_blank";

    link.rel = "noopener noreferrer";
});


/* =========================================================
   8. UPDATE PROJECT COUNT
   ========================================================= */

const stats =
    document.querySelectorAll(".quick-stats strong");

if (stats.length > 0) {

    stats[0].textContent =
        `${String(portfolioData.projects).padStart(2, "0")}+`;
}


/* =========================================================
   9. HANDLE PROJECT LINKS PROFESSIONALLY
   =========================================================

   IMPORTANT:

   Your current projects do NOT have GitHub repositories.

   Therefore, this script NEVER creates fake GitHub URLs.

   Any placeholder href="#" for a GitHub or Live Demo link
   will be replaced with a professional "Available on request"
   action.
   ========================================================= */

const projectLinks =
    document.querySelectorAll(
        ".project-links a"
    );


projectLinks.forEach((link) => {

    const href =
        link.getAttribute("href");


    // Only process placeholder links
    if (href !== "#") {
        return;
    }


    const text =
        link.textContent
            .trim()
            .toLowerCase();


    // GitHub placeholder
    if (text.includes("github")) {

        link.textContent =
            "Repository not published yet";


        link.removeAttribute("href");

        link.style.cursor =
            "default";

        link.style.opacity =
            "0.65";


        link.addEventListener(
            "click",
            (event) => {
                event.preventDefault();
            }
        );
    }


    // Live Demo placeholder
    else if (text.includes("live")) {

        link.textContent =
            "Demo available on request";


        link.href =
            `mailto:${portfolioData.email}` +
            `?subject=${encodeURIComponent(
                "Project Demo Request"
            )}` +
            `&body=${encodeURIComponent(
                "Hello Ananya,\n\n" +
                "I would like to know more " +
                "about your project."
            )}`;
    }

});


/* =========================================================
   10. CONTACT FORM
   ========================================================= */

const form =
    document.getElementById(
        "contact-form"
    );


const formStatus =
    document.getElementById(
        "form-status"
    );


const fields = {

    name:
        document.getElementById("name"),

    email:
        document.getElementById("email"),

    subject:
        document.getElementById("subject"),

    message:
        document.getElementById("message")
};


const errors = {

    name:
        document.getElementById(
            "name-error"
        ),

    email:
        document.getElementById(
            "email-error"
        ),

    subject:
        document.getElementById(
            "subject-error"
        ),

    message:
        document.getElementById(
            "message-error"
        )
};


/* ---------- Error Functions ---------- */

function setFieldError(
    fieldName,
    message
) {

    if (fields[fieldName]) {

        fields[fieldName]
            .classList
            .add("invalid");
    }


    if (errors[fieldName]) {

        errors[fieldName]
            .textContent =
            message;
    }
}


function clearFieldError(
    fieldName
) {

    if (fields[fieldName]) {

        fields[fieldName]
            .classList
            .remove("invalid");
    }


    if (errors[fieldName]) {

        errors[fieldName]
            .textContent =
            "";
    }
}


/* ---------- Remove error while typing ---------- */

Object.keys(fields).forEach(
    (fieldName) => {

        if (!fields[fieldName]) {
            return;
        }


        fields[fieldName]
            .addEventListener(
                "input",
                () => {

                    clearFieldError(
                        fieldName
                    );


                    if (formStatus) {
                        formStatus.textContent = "";
                    }
                }
            );
    }
);


/* ---------- Form Submit ---------- */

if (form) {

    form.addEventListener(
        "submit",
        (event) => {

            event.preventDefault();


            // Clear previous errors
            Object.keys(fields).forEach(
                clearFieldError
            );


            if (formStatus) {
                formStatus.textContent = "";
            }


            const name =
                fields.name
                    ? fields.name.value.trim()
                    : "";


            const email =
                fields.email
                    ? fields.email.value.trim()
                    : "";


            const subject =
                fields.subject
                    ? fields.subject.value.trim()
                    : "";


            const message =
                fields.message
                    ? fields.message.value.trim()
                    : "";


            let valid = true;


            /* Name */

            if (name.length < 2) {

                setFieldError(
                    "name",
                    "Please enter your name."
                );

                valid = false;
            }


            /* Email */

            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


            if (
                !emailPattern.test(email)
            ) {

                setFieldError(
                    "email",
                    "Please enter a valid email."
                );

                valid = false;
            }


            /* Subject */

            if (subject.length < 3) {

                setFieldError(
                    "subject",
                    "Please add a short subject."
                );

                valid = false;
            }


            /* Message */

            if (message.length < 10) {

                setFieldError(
                    "message",
                    "Message should be at least 10 characters."
                );

                valid = false;
            }


            if (!valid) {

                if (formStatus) {

                    formStatus.textContent =
                        "Please fix the highlighted fields.";
                }

                return;
            }


            /* ---------- Email Client ---------- */

            const recipient =
                portfolioData.email;


            const mailto =
                `mailto:${recipient}` +
                `?subject=${encodeURIComponent(
                    subject
                )}` +
                `&body=${encodeURIComponent(
                    `Name: ${name}\n` +
                    `Email: ${email}\n\n` +
                    `${message}`
                )}`;


            window.location.href =
                mailto;


            if (formStatus) {

                formStatus.textContent =
                    "Opening your email client...";
            }
        }
    );
}


/* =========================================================
   11. SAFETY: NO FAKE GITHUB PROJECT LINKS
   ========================================================= */

if (!portfolioData.github) {

    const profileGithubLinks =
        document.querySelectorAll(
            'a[href*="github.com"]'
        );


    profileGithubLinks.forEach((link) => {

        // Hide generic / placeholder GitHub profile URLs
        if (
            link.href.includes(
                "github.com/"
            )
            &&
            !link.href.match(
                /github\.com\/[^/]+\/[^/]+/
            )
        ) {

            link.removeAttribute("href");

            link.textContent =
                "GitHub Projects Coming Soon";

            link.style.cursor =
                "default";

            link.style.opacity =
                "0.65";
        }
    });
}


/* =========================================================
   12. CONSOLE CHECK
   ========================================================= */

console.log(
    `Portfolio loaded successfully — ${portfolioData.name}`
);