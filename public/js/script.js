// --- Dynamic Background: Ribbons & Hearts ---
window.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('bg-canvas');
    const ctx = canvas.getContext('2d');
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
    }
    window.addEventListener('resize', resize);

    // Heart and Ribbon objects
    const hearts = [];
    const ribbons = [];
    const heartColor = '#8B0000'; // wine red
    const ribbonColor = '#fff'; // white
    const heartCount = 18;
    const ribbonCount = 12;
    const repelRadius = 120;
    let mouse = { x: width/2, y: height/2 };

    function randomBetween(a, b) {
        return a + Math.random() * (b - a);
    }

    // Heart shape drawing
    function drawHeart(x, y, size, color) {
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(x, y + size/4);
        ctx.bezierCurveTo(x, y, x - size/2, y, x - size/2, y + size/4);
        ctx.bezierCurveTo(x - size/2, y + size/2, x, y + size*0.8, x, y + size);
        ctx.bezierCurveTo(x, y + size*0.8, x + size/2, y + size/2, x + size/2, y + size/4);
        ctx.bezierCurveTo(x + size/2, y, x, y, x, y + size/4);
        ctx.closePath();
        ctx.fillStyle = color;
        ctx.globalAlpha = 0.85;
        ctx.fill();
        ctx.globalAlpha = 1;
        ctx.restore();
    }

    // Ribbon drawing (curved line)
    function drawRibbon(x, y, len, angle, color) {
        ctx.save();
        ctx.strokeStyle = color;
        ctx.globalAlpha = 0.7;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.quadraticCurveTo(x + len/2 * Math.cos(angle + 0.5), y + len/2 * Math.sin(angle + 0.5), x + len * Math.cos(angle), y + len * Math.sin(angle));
        ctx.stroke();
        ctx.globalAlpha = 1;
        ctx.restore();
    }

    // Initialize hearts
    for (let i = 0; i < heartCount; i++) {
        hearts.push({
            x: randomBetween(40, width-40),
            y: randomBetween(40, height-40),
            size: randomBetween(18, 32),
            vx: randomBetween(-0.5, 0.5),
            vy: randomBetween(-0.5, 0.5)
        });
    }
    // Initialize ribbons
    for (let i = 0; i < ribbonCount; i++) {
        ribbons.push({
            x: randomBetween(0, width),
            y: randomBetween(0, height),
            len: randomBetween(60, 120),
            angle: randomBetween(0, Math.PI*2),
            vx: randomBetween(-0.3, 0.3),
            vy: randomBetween(-0.3, 0.3),
            va: randomBetween(-0.01, 0.01)
        });
    }

    // Mouse movement
    // Mouse move
    window.addEventListener('mousemove', e => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });
    // Touch support
    window.addEventListener('touchstart', e => {
        if (e.touches.length > 0) {
            mouse.x = e.touches[0].clientX;
            mouse.y = e.touches[0].clientY;
        }
    });
    window.addEventListener('touchmove', e => {
        if (e.touches.length > 0) {
            mouse.x = e.touches[0].clientX;
            mouse.y = e.touches[0].clientY;
        }
    });
    window.addEventListener('touchend', e => {
        // On touch end, move mouse off screen so objects return
        mouse.x = -1000;
        mouse.y = -1000;
    });

    function animate() {
        ctx.clearRect(0, 0, width, height);
        // Hearts
        for (let h of hearts) {
            // Repel from mouse
            let dx = h.x - mouse.x;
            let dy = h.y - mouse.y;
            let dist = Math.sqrt(dx*dx + dy*dy);
            if (dist < repelRadius) {
                let angle = Math.atan2(dy, dx);
                let force = (repelRadius - dist) / repelRadius;
                h.vx += Math.cos(angle) * force * 1.2;
                h.vy += Math.sin(angle) * force * 1.2;
            }
            // Move
            h.x += h.vx;
            h.y += h.vy;
            // Friction
            h.vx *= 0.92;
            h.vy *= 0.92;
            // Return to center if far
            if (h.x < 0 || h.x > width || h.y < 0 || h.y > height) {
                h.x = randomBetween(40, width-40);
                h.y = randomBetween(40, height-40);
                h.vx = randomBetween(-0.5, 0.5);
                h.vy = randomBetween(-0.5, 0.5);
            }
            drawHeart(h.x, h.y, h.size, heartColor);
        }
        // Ribbons
        for (let r of ribbons) {
            // Repel from mouse
            let dx = r.x - mouse.x;
            let dy = r.y - mouse.y;
            let dist = Math.sqrt(dx*dx + dy*dy);
            if (dist < repelRadius) {
                let angle = Math.atan2(dy, dx);
                let force = (repelRadius - dist) / repelRadius;
                r.vx += Math.cos(angle) * force * 0.8;
                r.vy += Math.sin(angle) * force * 0.8;
            }
            // Move
            r.x += r.vx;
            r.y += r.vy;
            r.angle += r.va;
            // Friction
            r.vx *= 0.93;
            r.vy *= 0.93;
            r.va *= 0.98;
            // Return to center if far
            if (r.x < 0 || r.x > width || r.y < 0 || r.y > height) {
                r.x = randomBetween(0, width);
                r.y = randomBetween(0, height);
                r.vx = randomBetween(-0.3, 0.3);
                r.vy = randomBetween(-0.3, 0.3);
                r.angle = randomBetween(0, Math.PI*2);
            }
            drawRibbon(r.x, r.y, r.len, r.angle, ribbonColor);
        }
        requestAnimationFrame(animate);
    }
    animate();
});


// --- End Dynamic Background ---

const answers_no = {
    english: [
        "No",
        "Are you sure?",
        "Are you really sure??",
        "Are you really realy sure???",
        "Think again?",
        "Don't believe in second chances?",
        "Why are you being so cold?",
        "Maybe we can talk about it?",
        "I am not going to ask again!",
        "Ok now this is hurting my feelings!",
        "You are now just being mean!",
        "Why are you doing this to me?",
        "Please give me a chance!",
        "I am begging you to stop!",
        "Ok, Let's just start over.."
    ],
    french: [
        "Non",
        "Tu es sûr ?",
        "Tu es vraiment sûr ??",
        "Tu es vraiment vraiment sûr ???",
        "Réfléchis encore?",
        "Tu ne crois pas aux deuxièmes chances ?",
        "Pourquoi tu es si froid?",
        "Peut-être, on peut en parler ?",
        "Je ne vais pas demander encore une fois!",
        "D'accord, maintenant ca me fait mal!",
        "Tu es juste méchant!",
        "Pourquoi tu me fais ça?",
        "Donnez-moi une chance plz!",
        "Je te supplie d'arrêter!",
        "D'accord, recommençons.."
    ],
    thai: [
        "ไม่อ่ะ",
        "แน่ใจจริงๆหรอคะ?",
        "แน่ใจจริงๆ จริงๆนะคะ?",
        "อย่าบอกนะว่านี่แน่ใจสุดๆแล้วจริงๆ ?",
        "ลองคิดดูอีกทีหน่อยสิคะ..",
        "ขอโอกาศที่สองทีค่ะ..",
        "อย่าเย็นชาสิคะ กระซิกๆ",
        "ขอร้องนะคะ",
        "น้าาาๆๆๆๆๆ",
        "เราจะร้องไห้เอานะ กระซิกๆ",
        "จะเอางี้ๆจริงหรอคะ",
        "ฮือออออ",
        "ขอโอกาศครั้งที่สองที่ค่ะ!",
        "ขอร้องละค่าาา",
        "โอเคค่ะ.. งั้นเริ่มใหม่ !"
    ]
};

answers_yes = {
    "english": "Yes",
    "french": "Oui",
    "Thailand": "เย่ คืนดีกันแล้วน้า"
}

let language = "english"; // Default language is English
const no_button = document.getElementById('no-button');
const yes_button = document.getElementById('yes-button');
let i = 1;
let size = 50;
let clicks = 0;

no_button.addEventListener('click', () => {
    // Change banner source
    let banner = document.getElementById('banner');
    if (clicks === 0) {
        banner.src = "public/images/no.gif";
        refreshBanner();
    }
    clicks++;
    // increase button height and width gradually to 250px
    const sizes = [40, 50, 30, 35, 45]
    const random = Math.floor(Math.random() * sizes.length);
    size += sizes[random]
    yes_button.style.height = `${size}px`;
    yes_button.style.width = `${size}px`;
    let total = answers_no[language].length;
    // change button text
    if (i < total - 1) {
        no_button.innerHTML = answers_no[language][i];
        i++;
    } else if (i === total - 1) {
        alert(answers_no[language][i]);
        i = 1;
        no_button.innerHTML = answers_no[language][0];
        yes_button.innerHTML = answers_yes[language];
        yes_button.style.height = "50px";
        yes_button.style.width = "50px";
        size = 50;
    }
});

yes_button.addEventListener('click', () => {
    // change banner gif path
    let banner = document.getElementById('banner');
    banner.src = "public/images/yes.gif";
    refreshBanner();
    // hide buttons div
    let buttons = document.getElementsByClassName('buttons')[0];
    buttons.style.display = "none";
    // show message div
    let message = document.getElementsByClassName('message')[0];
    message.style.display = "block";
});

function refreshBanner() {
    // Reload banner gif to force load  
    let banner = document.getElementById('banner');
    let src = banner.src;
    banner.src = '';
    banner.src = src;
}

function changeLanguage() {
    const selectElement = document.getElementById("language-select");
    const selectedLanguage = selectElement.value;
    language = selectedLanguage;

    // Update question heading
    const questionHeading = document.getElementById("question-heading");
    if (language === "french") {
        questionHeading.textContent = "Tu veux être mon valentin?";
    } else if (language === "thai") {
        questionHeading.textContent = "คืนดีกับเราได้อ่ะป่าว?";
    } else {
        questionHeading.textContent = "Will you be my valentine?";
    }

    // Reset yes button text
    yes_button.innerHTML = answers_yes[language];

    // Reset button text to first in the new language
    if (clicks === 0) {
        no_button.innerHTML = answers_no[language][0];
    } else {
        no_button.innerHTML = answers_no[language][clicks];
    }

    // Update success message
    const successMessage = document.getElementById("success-message");
    if (language === "french") {
        successMessage.textContent = "Yepppie, à bientôt :3";
    } else if (language === "thai") {
        successMessage.textContent = "ฮูเร่ คืนดีกันแล้วน้า :3";
    } else {
        successMessage.textContent = "Yepppie, see you sooonnn :3";
    }
}