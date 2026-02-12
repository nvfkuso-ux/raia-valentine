/* ========== VARIABLES ========== */
const lockScreen = document.getElementById("lock-screen");
const mainContent = document.getElementById("main-content");
const passwordInput = document.getElementById("password-input");
const errorMsg = document.getElementById("error-msg");

const validPasswords = ["0317", "317", "03171991", "17031991"];
let attempts = 0;

const yesBtn = document.getElementById("yes-btn");
const noBtn = document.getElementById("no-btn");
const gif = document.getElementById("cat-gif");
const toast = document.getElementById("tease-toast");
const finalNote = document.getElementById("final-note");
const heartsContainer = document.getElementById("hearts-container");
const timer = document.getElementById("timer");
const raiaName = document.querySelector(".raia-name");
const secretMessage = document.getElementById("secret-message");

let noScale = 1;
let noClickCount = 0;
let nameTapCount = 0;

/* ========== PASSWORD LOGIC ========== */
function checkPassword() {
    const input = passwordInput.value.trim();

    if (validPasswords.includes(input)) {
        unlockSite();
    } else {
        attempts++;
        vibratePhone();
        passwordInput.value = "";

        if (attempts === 1) errorMsg.textContent = "That’s not quite right 🥺";
        else if (attempts === 2) errorMsg.textContent = "Hint: March 17 💕";
        else if (attempts >= 3) {
            errorMsg.textContent = "Hmm… do you even know your own birthday? 🤨💗";
            lockScreen.classList.add("shake");
            setTimeout(() => lockScreen.classList.remove("shake"), 500);
        }
    }
}

function unlockSite() {
    lockScreen.style.opacity = "0";
    lockScreen.style.transition = "opacity 0.8s ease";
    setTimeout(() => {
        lockScreen.style.display = "none";
        mainContent.style.display = "block";
        explodeHearts();
    }, 800);
}

passwordInput.addEventListener("keypress", function(e) {
    if (e.key === "Enter") checkPassword();
});

/* ========== COUNTDOWN ========== */
function updateCountdown() {
    const now = new Date();
    let year = now.getFullYear();
    let valentines = new Date(year, 1, 14); // Feb 14

    if (now > valentines) valentines = new Date(year + 1, 1, 14);

    const diff = valentines - now;

    const days = Math.floor(diff / (1000*60*60*24));
    const hours = Math.floor((diff / (1000*60*60)) % 24);
    const minutes = Math.floor((diff / (1000*60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    timer.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
}
setInterval(updateCountdown, 1000);
updateCountdown();

/* ========== BUTTON LOGIC ========== */
function handleYesClick() {
    document.querySelector(".buttons").style.display = "none";
    document.querySelector("h1").textContent = "She said YES 🥹💕";
    gif.src = "https://media.tenor.com/4L7Dk9z0GgYAAAAi/love-cute.gif";
    explodeHearts();
    typeLoveMessage();
    vibratePhone();
}

function handleNoClick() {
    const messages = [
        "Are you sure? 🥺",
        "Raiaaa 🥹",
        "But I adore you",
        "Please?",
        "Okay fine I'll wait forever 💕"
    ];

    toast.textContent = messages[Math.min(noClickCount, messages.length-1)];
    noClickCount++;
    noScale -= 0.1;
    if (noScale > 0.3) noBtn.style.transform = `scale(${noScale})`;
}

/* ========== HEARTS ========== */
function explodeHearts() {
    for (let i=0; i<40; i++) {
        const heart = document.createElement("div");
        heart.classList.add("heart");
        heart.innerHTML = "💖";
        heart.style.left = Math.random() * 100 + "vw";
        heart.style.top = "60vh";
        heart.style.fontSize = Math.random()*20+20 + "px";
        heartsContainer.appendChild(heart);
        setTimeout(() => heart.remove(), 3000);
    }
}

/* ========== LOVE NOTE TYPING ========== */
function typeLoveMessage() {
    const message = `I love you more than words can explain.
You make my world softer, warmer, and brighter every day.

Iloveyoufucker 💕`;

    let i=0;
    finalNote.classList.add("show-note");

    function type() {
        if (i < message.length) {
            finalNote.innerHTML += message.charAt(i)==="\n" ? "<br>" : message.charAt(i);
            i++;
            setTimeout(type, 40);
        }
    }
    type();
}

/* ========== SECRET MESSAGE ========== */
raiaName.addEventListener("click", () => {
    nameTapCount++;
    vibratePhone();
    if (nameTapCount === 5) {
        secretMessage.classList.add("secret-show");
        explodeHearts();
    }
});

/* ========== PHONE VIBRATION ========== */
function vibratePhone() {
    if (navigator.vibrate) navigator.vibrate([200,100,200]);
}
