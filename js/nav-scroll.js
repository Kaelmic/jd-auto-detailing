(() => {
    const header = document.querySelector(".site-header");
    if (!header) return;

    const updateNavbar = () => {
        header.classList.toggle("is-scrolled", window.scrollY > 60);
    };

    window.addEventListener("scroll", updateNavbar, { passive: true });

    updateNavbar();
})();
