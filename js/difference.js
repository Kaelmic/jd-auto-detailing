
// PrimeX — Interactive Before & After Comparison

const comparison = document.getElementById("primex-comparison");
const comparisonRange = document.getElementById("comparison-range");

const afterImage = document.getElementById("comparison-after");
const beforeImage = document.getElementById("comparison-before");

const caption = document.getElementById("comparison-caption");
const disclaimer = document.getElementById("comparison-disclaimer");

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

if (comparison && comparisonRange && afterImage && beforeImage) {

    // Move the comparison divider.
    comparisonRange.addEventListener("input", () => {
        comparison.style.setProperty(
            "--split",
            comparisonRange.value + "%"
        );
    });

    // Switch between Exterior, Interior and Coating.
    document.querySelectorAll(".difference-filter").forEach(button => {

        button.addEventListener("click", () => {

            const selected = examples[button.dataset.example];

            if (!selected) return;

            // Load the corresponding BEFORE and AFTER images.
            beforeImage.src = selected.before;
            afterImage.src = selected.after;

            afterImage.alt =
                selected.label + " — AI-generated after view";

            // All categories now use actual image pairs.
            comparison.classList.remove("is-simulated");

            // Update the caption.
            if (caption) {
                caption.innerHTML =
                    "<strong>" + selected.label +
                    "</strong> — illustrative before-and-after comparison";
            }

            // Update the disclaimer.
            if (disclaimer) {
                disclaimer.textContent =
                    "AI-generated illustrative before-and-after comparison. " +
                    "Not an actual customer result.";
            }

            // Reset the slider to the middle.
            comparisonRange.value = 50;
            comparison.style.setProperty("--split", "50%");

            // Highlight the selected category button.
            document.querySelectorAll(".difference-filter")
                .forEach(b => {

                    const active = b === button;

                    b.classList.toggle("is-selected", active);

                    b.setAttribute(
                        "aria-pressed",
                        String(active)
                    );
                });
        });
    });
}
