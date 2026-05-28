import song1 from 'barrelcl.js';
import song2 from 'baerrlcl.js';

const crank = document.getElementById('crank');
        const audio = document.getElementById('organ-music');
        const displayTitle = document.getElementById('display-title');
        
        // Modal Elements
        const modal = document.getElementById('library-modal');
        const libraryBtn = document.getElementById('library-btn');
        const closeBtn = document.getElementById('close-modal');
        const songListContainer = document.getElementById('song-list');
const buttonSound1 = document.getElementById("buttonSound1");
const organContainer = document.querySelector('.organ-container');

let lastVibrationRotation = 0;
const VIBRATION_INTERVAL = 30; // Vibrate every 20 degrees
        // --- SONG DATA ---
        // Add your own local file paths here for your Android app (e.g., "file:///android_asset/song1.mp3")
        const songLibrary = [
            { title: "🎵 Cielito Lindo", src: song1,
            lyrics: [
      { time: 0, text: "De la Sierra Morena" },
      { time: 3, text: "cielito lindo, vienen bajando" },
      { time: 8.5, text: "Un par de ojitos negros" },
      { time: 11, text: "Cielito lindo, de contrabando" },
                { time: 16.5, text: "Ay, ay, ay, ay" },
                { time: 20.5, text: "Canta y no llores" },
                { time: 24, text: "Porque cantando se alegran" },
                { time: 27, text: "Cielito lindo, los corazones" },
                
    ]},
            { title: "🎂 Las Mañanitas", src: song2,
            lyrics: [
      { time: 0, text: "Estas son las mañanitas" },
      { time: 4, text: "Que cantaba el rey David" },
      { time: 8, text: "Hoy, por ser día de tu santo" },
      { time: 12, text: "Te las cantamos aquí" },
                { time: 16, text: "Despierta, mi bien, despierta" },
                { time: 20, text: "Mira que ya amaneció" },
                { time: 24, text: "Ya los pajaritos cantan" },
                { time: 28, text: "La luna ya se metió" },
                { time: 35, text: "Qué linda está la mañana" },
      { time: 39, text: "En que vengo a saludarte" },
      { time: 43, text: "Venimos todos con gusto" },
      { time: 47, text: "Y placer a felicitarte" },
                { time: 51, text: "El día en que tú naciste" },
                { time: 55, text: "Nacieron todas las flores" },
                { time: 59, text: "En la pila del bautismo" },
                { time: 63, text: "Cantaron los ruiseñores" },
                { time: 67, text: "Ya viene amaneciendo" },
                { time: 71, text: "Ya la luz del día nos dio" },
                { time: 76, text: "Levántate de mañana" },
                { time: 82, text: "Mira que ya amaneció" },
                
    ]},
            { title: "🎻 El Danubio Azul - Blue Danube", src: "vals.mp3",
            lyrics: [
      { time: 0, text: "Johann Strauss II" },
      
                
    ]},
            { title: "🎅 Noche de Paz - Silent Night", src: "noche.mp3",
            lyrics: [
      { time: 0, text: "Noche de paz, noche de amor" },
      { time: 7, text: "Todo duerme alrededor" },
      { time: 14.5, text: "Entre los astros que esparcen su luz" },
      { time: 22, text: "Bella, anunciando al niño Jesús" },
                { time: 29.5, text: "Brilla la estrella de paz" },
                { time: 37, text: "Brilla la estrella de amor" },
    ]},
            { title: "🕊 Ave Maria", src: "ave.mp3",
            lyrics: [
      { time: 0, text: "Franz Schubert" },
                
    ]},
            { title: "👰 Marcha Nupcial - Wedding March", src: "boda.mp3",
            lyrics: [
      { time: 0, text: "Felix Mendelssohn" },
          
    ]},
            { title: "💀 La Llorona", src: "llorona.mp3",
            lyrics: [
                { time: 0, text: "..." },
      { time: 18, text: "Todos me dicen el Negro llorona" },
      { time: 21.3, text: "negro pero cariñoso" },
      { time: 24.5, text: "todos me dicen el negro llorona" },
      { time: 28, text: "negro pero cariñoso" },
                { time: 31, text: "Yo soy como el chile verde llorona" },
                { time: 34.3, text: "picante pero sabroso" },
                { time: 37.6, text: "Yo soy como el chile verde llorona" },
                { time: 41, text: "picante pero sabroso" },
                { time: 46, text: "Ay de mí llorona llorona" },
      { time: 49, text: "llorona llévame al río" },
      { time: 52.5, text: "Ay de mí llorona llorona" },
      { time: 55.5, text: "llorona llévame al río" },
                { time: 58.7, text: "Tapame con tu rebozo llorona" },
                { time: 62, text: "porque me muero de frío" },
                { time: 65, text: "Tapame con tu rebozo llorona" },
                { time: 68.6, text: "porque me muero de frío" },
    ]},
            { title: "🎸 House of the Rising Sun", src: "house.mp3",
            lyrics: [
      { time: 0, text: "..." },
      { time: 12, text: "There is a house in New Orleans" },
      { time: 18, text: "They call the Rising Sun" },
      { time: 24, text: "It's been the ruin of many a poor boy" },
                { time: 30.5, text: "And, God, I know I'm one" },
                { time: 47, text: "My mother was a tailor" },
                { time: 53, text: "She sewed my new blue jeans" },
                { time: 59, text: "My father was a gamblin' man" },
                { time: 65, text: "Down in New Orleans" },
                { time: 81, text: "Now the only thing a gambler needs" },
                { time: 87, text: "Is a suitcase and a trunk" },
                { time: 93, text: "And the only time he's satisfied" },
                { time: 99, text: "Is when he's all drunk" },
    ]},
            { title: "🌷 Vals de las Flores - Waltz of the Flowers", src: "flores.mp3",
            lyrics: [
      { time: 0, text: " Pyotr Tchaikovsky" },
      
    ]},
        ];
let currentSong = songLibrary[0];
        // --- MODAL & LIBRARY LOGIC ---

        // Populate the library list dynamically
        songLibrary.forEach((song, index) => {
            const li = document.createElement('li');
            li.className = 'song-item';
            li.textContent = song.title;
            
            // When a song is clicked
            li.addEventListener('click', () => {
                currentSong = song;

    audio.src = song.src;

    displayTitle.textContent = `${song.title.toUpperCase()}`;

    lyricsText.innerText = "";

    modal.style.display = "none";

    currentRotation = 0;

    crank.style.transform = `rotate(0deg)`;

    audio.load();
            });
            
            songListContainer.appendChild(li);
        });

        // Open modal
        libraryBtn.addEventListener('click', () => {
            modal.style.display = "block";
        });

        // Close modal via 'X' button
        closeBtn.addEventListener('click', () => {
            modal.style.display = "none";
        });

        // Close modal if user clicks outside the modal content
        window.addEventListener('click', (event) => {
            if (event.target === modal) {
                modal.style.display = "none";
            }
        });
        // --- CRANK MECHANIC LOGIC ---
        let isDragging = false;
        let startAngle = 0;
        let currentRotation = 0;
        let playTimeout;
        // --- SEPARATED SPEED SETTINGS ---
        // The absolute maximum degrees the crank can turn per frame (visual resistance)
        const MAX_CRANK_SPEED = 3; 
        
        // The comfortable turning speed needed for 1.0x normal audio (lower = easier to maintain)
        const NORMAL_PLAYBACK_SPEED = 2 ; 

        function getAngle(x, y) {
            const rect = crank.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            return Math.atan2(y - centerY, x - centerX) * (180 / Math.PI);
        }

        function startInteraction(e) {
            if (modal.style.display === "block") return;

            isDragging = true;
            crank.style.cursor = 'grabbing';
            
            const clientX = e.touches ? e.touches[0].clientX : e.clientX;
            const clientY = e.touches ? e.touches[0].clientY : e.clientY;
            
            startAngle = getAngle(clientX, clientY) - currentRotation;
        }

        function moveInteraction(e) {
            if (!isDragging) return;
            e.preventDefault(); 
            
            const clientX = e.touches ? e.touches[0].clientX : e.clientX;
            const clientY = e.touches ? e.touches[0].clientY : e.clientY;
            
            const targetAngle = getAngle(clientX, clientY);
            let rawNewRotation = targetAngle - startAngle;
            
            let delta = rawNewRotation - currentRotation;
            delta = ((delta + 540) % 360) - 180;
            
            // 1. Apply visual cap (Crank weight)
            if (delta > MAX_CRANK_SPEED) delta = MAX_CRANK_SPEED;
            if (delta < -MAX_CRANK_SPEED) delta = -MAX_CRANK_SPEED;
            
            currentRotation += delta;
            startAngle = targetAngle - currentRotation;
            
            crank.style.transform = `rotate(${currentRotation}deg)`;
// 1. ADD THE CLASS: User is moving the crank!
    organContainer.classList.add('is-cranking');
            // Handle Audio Playback
            if (audio.paused) {
                audio.play().catch(err => console.log("Audio needs user interaction", err));
            }
            
            // 2. NEW AUDIO MATH: Compare current speed against the easier "Normal" speed
            let speedRatio = Math.abs(delta) / NORMAL_PLAYBACK_SPEED;
            
            // Clamp it between 0.5x and 1.5x so the audio doesn't distort too wildly
            audio.playbackRate = Math.min(1, Math.max(0.7, speedRatio));

            clearTimeout(playTimeout);
            playTimeout = setTimeout(() => {
                audio.pause();
                // 2. REMOVE THE CLASS: User stopped moving for 150ms
        organContainer.classList.remove('is-cranking');
            }, 150);
            
            // Calculate how much the crank has rotated since the last vibration
if (Math.abs(currentRotation - lastVibrationRotation) >= VIBRATION_INTERVAL) {
    
    // 1. Try to send a message to Niotron Blocks
    if (window.AppInventor) {
        window.AppInventor.setWebViewString("vibrate_crank");
    } 
    // 2. Fallback for testing in a normal mobile browser outside of Niotron
    else if (navigator.vibrate) {
        navigator.vibrate(10); 
    }
    
    lastVibrationRotation = currentRotation;
}
            
        }
        function endInteraction() {
            isDragging = false;
            crank.style.cursor = 'grab';
            audio.pause();
            clearTimeout(playTimeout);
            // 3. REMOVE THE CLASS: User lifted their finger/mouse
    organContainer.classList.remove('is-cranking');
        }

        // Mouse Events
        crank.addEventListener('mousedown', startInteraction);
        document.addEventListener('mousemove', moveInteraction);
        document.addEventListener('mouseup', endInteraction);

        // Touch Events (Crucial for Android WebView)
        crank.addEventListener('touchstart', startInteraction, { passive: false });
        document.addEventListener('touchmove', moveInteraction, { passive: false });
        document.addEventListener('touchend', endInteraction);
        // ADD THIS LINE: Open the modal immediately when the app starts
        modal.style.display = "block";

// New Modal Elements
const historyModal = document.getElementById('history-modal');
const historyBtn = document.getElementById('history-btn');
const closeHistory = document.getElementById('close-history');

// Open History Modal
historyBtn.addEventListener('click', () => {
    historyModal.style.display = "block";
});

// Close History Modal
closeHistory.addEventListener('click', () => {
    historyModal.style.display = "none";
});

// Close Modal popup
const cerrarModal = document.getElementById('cerrar-modal');
const cerrarBtn = document.getElementById('cerrar-btn');
const closeCerrar = document.getElementById('close-cerrar');

// Open History Modal
cerrarBtn.addEventListener('click', () => {
    cerrarModal.style.display = "block";
});

// Close History Modal
closeCerrar.addEventListener('click', () => {
    cerrarModal.style.display = "none";
});

// Update the existing "click outside to close" logic to include this modal
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = "none";
    }
    if (event.target === cerrarModal) {
        cerrarModal.style.display = "none";
    }
});
      

function playButtonSound1() {
  if (!buttonSound1) return;
  buttonSound1.currentTime = 0; // Reset to start for rapid clicks
  buttonSound1.play().catch(() => {
    // Standard catch for browsers that block sound without interaction
  });
}

//traduccion
const translations = {
  es: {
    title: "= Organillo Virtual =",
    song_title: 'CANCIÓN: "CIELITO LINDO"',
    songs_btn: "Melodias",
    about_btn: "Acerca",
    about_title: "Acerca del Organillo",
    select_song: "📜 Selecciona Canción",
    donate: "Dona Aqui: bodisatva5@outlook.com",
      bienvenido: "Bienvenido",
      entra: "ENTRA",
      cerrar: "Dona",
      cerrart: "Por Favor Contribuye",
      close_text:"Prueba mi otra App en la Play Store:",
      
    history_text:
      "<strong>Historia: </strong> El Organillo, u Organo de Barril, es un instrumento musical mecánico y portátil inventado en Italia en el siglo XVIII. Fue mejorado en Alemania durante el siglo XIX por migrantes Italianos. Al empezar el siglo XX, era ya popular en sus diferentes modelos en Francia, Países Bajos, España e Inglaterra. Se convirtió en la máquina de discos de la época victoriana. Permitía escuchar música compleja sin necesidad de una orquesta en vivo.",

    how_it_works:
      "<strong>Cómo funciona: </strong> Al girar la manivela, los fuelles bombean aire a un cofre. Simultáneamente, un cilindro con pasadores o un rollo de cartón perforado gira, activando válvulas que liberan aire en tubos específicos para reproducir las notas.",

    legacy_text:
      "<strong>El legado de Frati & Co.: </strong> Fundada por los italianos Giovanni Bacigalupo y Chiario Fratia en 1873 en la ciudad de Berlín, Frati & Co. fue una empresa de maestros constructores conocida por sus instrumentos mecánicos de alta calidad.",
  },

  en: {
    title: "= Barrel Organ =",
    song_title: 'SONG: "CIELITO LINDO"',
    songs_btn: "Songs",
    about_btn: "About",
    about_title: "About the Barrel Organ",
    select_song: "📜 Select Song",
    donate: "Donate: bodisatva5@outlook.com",
    bienvenido:"Welcome",
      entra:"ENTER",
      cerrar: "Tip",
      cerrart: "Please Support",
      close_text:"Check out my other App in the Play Store:",
    history_text:
      "<strong>History:</strong> Emerging in Italy in the 18th century, the Barrel Organ (or Street Organ) is a mechanical and portable musical instrument that became popular in central and western Europe in the XIX century, it was the jukebox of the Victorian era. It allowed people to hear complex music without needing a live orchestra.",

    how_it_works:
      "<strong>How it works:</strong> As you turn the crank, bellows pump air into a windchest. Simultaneously, a pinned cylinder or perforated cardboard roll rotates, triggering valves that release air into specific pipes to play notes.",

    legacy_text:
      "<strong>The Frati & Co. Legacy:</strong> Created by Italians Giovanni Bacigalupo y Chiario Fratia in 1873 in the city of Berlin, Frati & Co. was a company of master builders known for their high quality mechanical instruments.",
  }
};

function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem("lang", lang);

  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.dataset.i18n;
    el.innerHTML = translations[lang][key] || "";
  });
}

function detectLanguage() {
  const lang = navigator.language || navigator.userLanguage;

  if (!lang) return "en";

  // normalize (es-MX → es)
  const shortLang = lang.toLowerCase().split("-")[0];

  // supported languages
  if (shortLang === "es") return "es";
  if (shortLang === "en") return "en";

  // fallback
  return "en";
}

let currentLang;

function initLanguage() {
  const saved = localStorage.getItem("lang");

  if (saved) {
    currentLang = saved;
  } else {
    currentLang = detectLanguage();
  }

  setLanguage(currentLang);
}

initLanguage();

//Letras
const lyricsText = document.getElementById("lyrics-text");
const music = document.getElementById("organ-music");



function updateLyrics() {

  if (!currentSong.lyrics) return;

  const current = music.currentTime;

  const lyrics = currentSong.lyrics;

  for (let i = lyrics.length - 1; i >= 0; i--) {

    if (current >= lyrics[i].time) {

      lyricsText.innerText = lyrics[i].text;
      break;
    }
  }
}

// update continuously
setInterval(updateLyrics, 200);

//WELCOME
const welcomeScreen = document.getElementById("welcomeScreen");
const enterBtn = document.getElementById("enterBtn");

enterBtn.addEventListener("click", () => {
  welcomeScreen.classList.add("fade-out");

  setTimeout(() => {
    welcomeScreen.style.display = "none";
  }, 900);

});
welcomeScreen.addEventListener("click", () => {
  enterBtn.click();
});
