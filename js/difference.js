(() => {
    const comparison = document.getElementById("primex-comparison");
    const comparisonRange = document.getElementById("comparison-range");
    const afterImage = document.getElementById("comparison-after");
    const beforeImage = document.getElementById("comparison-before");
    const caption = document.getElementById("comparison-caption");
    const filterGroup = document.querySelector(".difference-filters");
    const filters = document.querySelectorAll(".difference-filter");

    if (!comparison || !comparisonRange || !afterImage || !beforeImage) return;

    
    const examples = {
        exterior: {
            label: "Exterior detailing",
            before: "images/home/exterior-before.png",
            after: "images/home/exterior-after.png"
        },
        interior: {
            label: "Interior detailing",
            before: "images/home/interior-before.png",
            after: "images/home/interior-after.png"
        },
        coating: {
            label: "Ceramic coating",
            before: "images/home/coating-before.png",
            after: "images/home/coating-after.png"
        }
    };

    const setSplit = (value) => {
        comparison.style.setProperty("--split", value + "%");
    };

    
    comparisonRange.addEventListener("input", () => setSplit(comparisonRange.value));


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

    filters.forEach((button) => {
        button.addEventListener("click", () => {
            const selected = examples[button.dataset.example];
            if (!selected) return;

            
            beforeImage.src = selected.before;
            afterImage.src = selected.after;
            afterImage.alt = selected.label + " — AI-generated after view";

            
            if (caption) {
                const strong = document.createElement("strong");
                strong.textContent = selected.label;
                caption.replaceChildren(strong, " - AI-generated illustrative comparison");
            }

            
            comparisonRange.value = 50;
            setSplit(50);

            
            filters.forEach((b) => {
                const active = b === button;
                b.classList.toggle("is-selected", active);
                b.setAttribute("aria-pressed", String(active));
            });
        });
    });
})();
