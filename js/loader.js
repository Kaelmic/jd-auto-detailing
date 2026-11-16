(() => {
    const root = document.documentElement;
    const loader = document.querySelector(".loader");
    if (!loader || !root.classList.contains("is-loading")) {
        root.classList.remove("is-loading");
        if (loader) loader.remove();
        return;
    }

    const MIN = 1900;
    const MAX = 5000;
    const start = performance.now();
    let finished = false;

    const finish = () => {
        if (finished) return;
        finished = true;
        try { sessionStorage.setItem("jd-loaded", "1"); } catch (e) {}
        loader.classList.add("is-done");
        
        setTimeout(() => root.classList.remove("is-loading"), 450);
        setTimeout(() => loader.remove(), 1800);
    };

    const ready = () => setTimeout(finish, Math.max(0, MIN - (performance.now() - start)));

    if (document.readyState === "complete") ready();
    else window.addEventListener("load", ready, { once: true });
    setTimeout(finish, MAX);
})();
