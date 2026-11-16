(() => {
    const pins = [...document.querySelectorAll(".ab-pin")];
    const notes = [...document.querySelectorAll(".ab-note")];
    if (!pins.length || pins.length !== notes.length) return;

    const show = (index) => {
        pins.forEach((pin, i) => pin.classList.toggle("is-active", i === index));
        notes.forEach((note, i) => note.classList.toggle("is-active", i === index));
    };

    pins.forEach((pin, i) => {
        ["mouseenter", "focus", "click"].forEach((type) => pin.addEventListener(type, () => show(i)));
    });
    notes.forEach((note, i) => note.addEventListener("mouseenter", () => show(i)));

    show(0);
})();
