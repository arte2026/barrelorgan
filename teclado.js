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


// ========================================
// Play note
// ========================================

function playNote(note, key) {

    const sample = organSamples[note];

    if (!sample) {
        console.error("Sample not found:", note);
        return;
    }

    console.log("Playing:", note);


    // Create audio from Base64 MP3
    const audio = new Audio();

    audio.src = sample;

    audio.preload = "auto";

    audio.volume = 1.0;


    // Store audio object
    activeNotes.set(note, audio);


    // Visual feedback
    key.classList.add("active");


    // Play immediately
    const playPromise = audio.play();

    if (playPromise !== undefined) {

        playPromise
            .then(() => {

                console.log("Playing successfully:", note);

            })
            .catch(error => {

                console.error(
                    "Audio playback error:",
                    error
                );

            });
    }


    // Remove when finished
    audio.addEventListener("ended", () => {

        if (activeNotes.get(note) === audio) {

            activeNotes.delete(note);

        }

    });
}
// ========================================
// Stop note
// ========================================

function stopNote(note, key) {

    const audio = activeNotes.get(note);

    if (!audio) return;


    audio.pause();

    audio.currentTime = 0;


    activeNotes.delete(note);

    key.classList.remove("active");
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
