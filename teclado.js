const keys = document.querySelectorAll(
    ".white-key, .black-key"
);

document.body.addEventListener("click", () => {
  const ctx = new (window.AudioContext || window.webkitAudioContext)();
  ctx.resume();
}, { once: true });
// ========================================
// Currently playing notes
// ========================================

const activeNotes = new Map();
const audioPool = new Map();

// ========================================
// PRELOAD ORGAN SAMPLES
// ========================================

Object.keys(organSamples).forEach(note => {

    const audio = new Audio();

    audio.src = organSamples[note];

    audio.preload = "auto";

    audio.load();

    audioPool.set(note, audio);

});

// ========================================
// Play note
// ========================================

function playNote(note) {

    const sample = organSamples[note];

    if (!sample) {
        console.warn("Sample not found:", note);
        return;
    }

    // Get preloaded audio
    const audio = audioPool.get(note);

    if (!audio) {
        console.warn("Audio not preloaded:", note);
        return;
    }

    // Make sure the sample starts from the beginning
    audio.currentTime = 0;

    audio.volume = 1.0;

    // Store currently playing note
    activeNotes.set(note, audio);

    // Play immediately
    audio.play().catch(error => {

        console.log(
            "Audio playback error:",
            error
        );

    });
}
// ========================================
// Stop note
// ========================================

function stopNote(note) {

    const audio = activeNotes.get(note);

    if (!audio) return;

    audio.pause();

    audio.currentTime = 0;

    activeNotes.delete(note);
}
// ========================================
// KEY PRESS / RELEASE
// ========================================

keys.forEach(key => {

    // ----------------------------------------
    // POINTER DOWN
    // ----------------------------------------

    key.addEventListener("pointerdown", function(event) {

        event.preventDefault();

        const note = key.dataset.note;

        if (!note) return;

        // Don't start the same note twice
        if (activeNotes.has(note)) return;

        // Keep receiving pointer events even if
        // the finger moves away from the key
        key.setPointerCapture(event.pointerId);

        playNote(note, key);
    });


    // ----------------------------------------
    // POINTER UP
    // ----------------------------------------

    key.addEventListener("pointerup", function(event) {

        event.preventDefault();

        const note = key.dataset.note;

        if (!note) return;

        // STOP THE AUDIO
        stopNote(note, key);

        // Remove active appearance
        key.classList.remove("active");

        // Release pointer capture
        try {
            key.releasePointerCapture(event.pointerId);
        } catch (error) {
            // Ignore if capture was already released
        }
    });


    // ----------------------------------------
    // POINTER CANCEL
    // ----------------------------------------

    key.addEventListener("pointercancel", function(event) {

        const note = key.dataset.note;

        if (!note) return;

        stopNote(note, key);

        key.classList.remove("active");
    });

});

function goBack() {
  window.location.href = "index.html";
}
