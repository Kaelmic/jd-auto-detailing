// JD Auto — interactive before & after comparison
(() => {
    const comparison = document.getElementById("primex-comparison");
    const comparisonRange = document.getElementById("comparison-range");
    const afterImage = document.getElementById("comparison-after");
    const beforeImage = document.getElementById("comparison-before");
    const caption = document.getElementById("comparison-caption");
    const filterGroup = document.querySelector(".difference-filters");
    const filters = document.querySelectorAll(".difference-filter");

    if (!comparison || !comparisonRange || !afterImage || !beforeImage) return;

    // Each category uses two separate AI-generated images.
    const examples = {
        exterior: {
            label: "Exterior detailing",
            before: "images/exterior-before.png",
            after: "images/exterior-after.png"
        },
        interior: {
            label: "Interior detailing",
            before: "images/interior-before.png",
            after: "images/interior-after.png"
        },
        coating: {
            label: "Ceramic coating",
            before: "images/coating-before.png",
            after: "images/coating-after.png"
        }
    };

    const setSplit = (value) => {
        comparison.style.setProperty("--split", value + "%");
    };

    // Move the comparison divider.
    comparisonRange.addEventListener("input", () => setSplit(comparisonRange.value));

    // Load the other image pairs the first time someone reaches for the filters,
    // so switching category doesn't flash an empty frame.
    // (Doing it on first hover/focus keeps the page light for people who never click.)
    let preloaded = false;
    const preload = () => {
        if (preloaded) return;
        preloaded = true;
        Object.values(examples).forEach(({ before, after }) => {
            [before, after].forEach((src) => {
                const img = new Image();
                img.src = src;
            });
        });
    };
    if (filterGroup) {
        filterGroup.addEventListener("pointerenter", preload, { once: true });
        filterGroup.addEventListener("focusin", preload, { once: true });
    }

    // Switch between Exterior, Interior and Coating.
    filters.forEach((button) => {
        button.addEventListener("click", () => {
            const selected = examples[button.dataset.example];
            if (!selected) return;

            // Load the matching BEFORE and AFTER images.
            beforeImage.src = selected.before;
            afterImage.src = selected.after;
            afterImage.alt = selected.label + " — AI-generated after view";

            // Update the caption (the disclaimer underneath stays the same).
            if (caption) {
                const strong = document.createElement("strong");
                strong.textContent = selected.label;
                caption.replaceChildren(strong, " — AI-generated illustrative comparison");
            }

            // Reset the slider to the middle.
            comparisonRange.value = 50;
            setSplit(50);

            // Highlight the selected category button.
            filters.forEach((b) => {
                const active = b === button;
                b.classList.toggle("is-selected", active);
                b.setAttribute("aria-pressed", String(active));
            });
        });
    });
})();
