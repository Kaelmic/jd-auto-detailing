
// PrimeX — Navbar Scroll Effect

const header = document.querySelector(".site-header");

if (header) {
    const updateNavbar = () => {
        // Activate the dark navbar after scrolling 60px.
        const isScrolled = window.scrollY > 60;

        header.classList.toggle("is-scrolled", isScrolled);
    };

    // Check whenever the user scrolls.
    window.addEventListener("scroll", updateNavbar, {
        passive: true
    });

    // Check immediately when the page loads.
    updateNavbar();
}
