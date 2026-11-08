// JD Auto — navbar scroll effect
(() => {
    const header = document.querySelector(".site-header");
    if (!header) return;

    // Activate the dark navbar after scrolling 60px.
    const updateNavbar = () => {
        header.classList.toggle("is-scrolled", window.scrollY > 60);
    };

    window.addEventListener("scroll", updateNavbar, { passive: true });

    // Check immediately when the page loads.
    updateNavbar();
})();
