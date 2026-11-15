// JD Auto — opening screen. Shown once per visit (per browser tab), then the two halves
// slide apart and the page animates in. Add ?loader to any page address to see it again.
(() => {
    const root = document.documentElement;
    const loader = document.querySelector(".loader");
    if (!loader || !root.classList.contains("is-loading")) {
        root.classList.remove("is-loading");
        if (loader) loader.remove();
        return;
    }

    const MIN = 1900;   // shortest time the screen stays up, so the line can finish drawing
    const MAX = 5000;   // never keep anyone waiting longer than this
    const start = performance.now();
    let finished = false;

    const finish = () => {
        if (finished) return;
        finished = true;
        try { sessionStorage.setItem("jd-loaded", "1"); } catch (e) { /* private mode: it just shows again */ }
        loader.classList.add("is-done");
        // the page animations start once the halves are well on their way
        setTimeout(() => root.classList.remove("is-loading"), 450);
        setTimeout(() => loader.remove(), 1800);
    };

    const ready = () => setTimeout(finish, Math.max(0, MIN - (performance.now() - start)));

    if (document.readyState === "complete") ready();
    else window.addEventListener("load", ready, { once: true });
    setTimeout(finish, MAX);
})();
