// JD Auto — parallax on load and on scroll.
// Images drift inside their frames; hero text and panels lift away at a different speed.
// Does nothing for people who prefer reduced motion.
(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // frame: image moves inside its (overflow hidden) frame, relative to the viewport centre
    // text:  element drifts with the scroll position, so it leaves the top at a different speed
    const targets = [
        { sel: ".hero-minimal .hero-image img", speed: 0.07, frame: true },
        { sel: ".services-editorial-image img", speed: 0.07, frame: true },
        { sel: ".craftsmanship-image img", speed: 0.07, frame: true },
        { sel: ".svc-img img", speed: 0.07, frame: true },
        { sel: ".hero-minimal .hero-content", speed: -0.08 },
        { sel: ".page-hero h1", speed: -0.08 },
        { sel: ".page-hero p", speed: -0.03 },
        { sel: ".ab-hero-text", speed: -0.06 },
        { sel: ".ab-mark", speed: 0.05 }
    ];

    const layers = [];
    targets.forEach(({ sel, speed, frame }) => {
        document.querySelectorAll(sel).forEach((el) => {
            if (frame) el.classList.add("px-img");
            layers.push({ el, speed, frame: !!frame, host: frame ? el.parentElement : null });
        });
    });
    const HEADROOM = 0.075; // matches scale(1.15): 7.5% spare on each side
    let vh = window.innerHeight;
    let queued = false;

    const update = () => {
        queued = false;
        const y = Math.min(window.scrollY, vh * 1.2);
        layers.forEach(({ el, speed, frame, host }) => {
            if (frame) {
                const r = host.getBoundingClientRect();
                if (r.bottom < -150 || r.top > vh + 150) return;
                const max = r.height * HEADROOM;
                const d = r.top + r.height / 2 - vh / 2;
                const v = Math.max(-max, Math.min(max, -d * speed));
                el.style.translate = "0 " + v.toFixed(1) + "px";
            } else {
                el.style.translate = "0 " + (y * speed).toFixed(1) + "px";
            }
        });
    };

    const queue = () => {
        if (queued) return;
        queued = true;
        requestAnimationFrame(update);
    };

    if (layers.length) {
        window.addEventListener("scroll", queue, { passive: true });
        window.addEventListener("resize", () => { vh = window.innerHeight; queue(); });
        window.addEventListener("load", queue);
        update();
    }

    // ---- Scroll reveal --------------------------------------------------------
    // Each piece rises into place as it enters the screen. Text, rows and frames travel
    // different distances, and pieces that arrive together are staggered, so the page
    // builds up in layers instead of appearing all at once.
    if (!("IntersectionObserver" in window)) return;

    const reveals = [
        // home
        { sel: ".services-editorial-content h2, .services-editorial-intro, .editorial-service", y: 36 },
        { sel: ".services-editorial-image, .craftsmanship-image, .comparison", frame: true },
        { sel: ".difference-heading, .difference-bottom, .difference-disclaimer", y: 36 },
        { sel: ".craftsmanship-content > *", y: 36 },
        { sel: ".cta-section > :not(.eyebrow)", y: 36 },
        // about
        { sel: ".ab-order-intro > *, .ab-flow li, .ab-pair-note, .ab-wont h2, .ab-wont-list li", y: 40 },
        { sel: ".ab-fig img", frame: true },
        // services
        { sel: ".svc-tag, .svc h2, .svc-lead, .svc dl, .svc .hero-book-link", y: 36 },
        { sel: ".svc-img", frame: true },
        { sel: ".page-split-intro > *, .choose li, .faq-list details", y: 36 },
        // gallery
        { sel: ".gallery-toolbar, .gallery-disclaimer", y: 28 },
        { sel: ".gallery-item", y: 60 },
        // contact
        { sel: ".contact-panel > h2, .contact-panel > .form-notice, .contact-form .field-row, .contact-form > label, .contact-form > button", y: 34 },
        { sel: ".contact-aside > h2, .contact-aside > h3, .contact-aside > p, .contact-steps > li, .map-wrap", y: 34 },
        // shared closing line
        { sel: ".page-close h2, .page-close-links", y: 36 }
    ];

    const seen = new Set();
    const watched = [];
    reveals.forEach(({ sel, y, frame }) => {
        document.querySelectorAll(sel).forEach((el) => {
            if (seen.has(el)) return;
            seen.add(el);
            el.classList.add(frame ? "rv-frame" : "rv");
            if (y) el.style.setProperty("--rv-y", y + "px");
            watched.push(el);
        });
    });

    const io = new IntersectionObserver((entries) => {
        let n = 0;
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const el = entry.target;
            io.unobserve(el);
            el.style.setProperty("--rv-d", Math.min(n, 5) * 90 + "ms");
            n++;
            el.classList.add("is-in");
            // hand the element back to its normal styles once it has arrived
            el.addEventListener("animationend", () => {
                el.classList.remove("rv", "rv-frame", "is-in");
                el.style.removeProperty("--rv-y");
                el.style.removeProperty("--rv-d");
            }, { once: true });
        });
    }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });

    watched.forEach((el) => io.observe(el));
})();
