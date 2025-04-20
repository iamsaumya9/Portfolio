// Sparkle Canvas (Background)
const sparkleCanvas = document.getElementById('sparkleCanvas');
const sparkleCtx = sparkleCanvas.getContext('2d');
sparkleCanvas.width = window.innerWidth;
sparkleCanvas.height = window.innerHeight;

const sparkleParticles = [];
class SparkleParticle {
    constructor() {
        this.x = Math.random() * sparkleCanvas.width;
        this.y = Math.random() * sparkleCanvas.height;
        this.size = Math.random() * 5 + 2;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.opacity = Math.random();
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.opacity > 0) this.opacity -= 0.005;
        if (this.opacity <= 0) {
            this.x = Math.random() * sparkleCanvas.width;
            this.y = Math.random() * sparkleCanvas.height;
            this.opacity = Math.random();
        }
    }
    draw() {
        sparkleCtx.fillStyle = `rgba(255, 182, 193, ${this.opacity})`;
        sparkleCtx.beginPath();
        sparkleCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        sparkleCtx.fill();
    }
}

for (let i = 0; i < 50; i++) {
    sparkleParticles.push(new SparkleParticle());
}

function animateSparkleParticles() {
    sparkleCtx.clearRect(0, 0, sparkleCanvas.width, sparkleCanvas.height);
    sparkleParticles.forEach(p => {
        p.update();
        p.draw();
    });
    requestAnimationFrame(animateSparkleParticles);
}
animateSparkleParticles();

// Cursor Trail Canvas
const trailCanvas = document.getElementById('trailCanvas');
const trailCtx = trailCanvas.getContext('2d');
trailCanvas.width = window.innerWidth;
trailCanvas.height = window.innerHeight;

const trailParticles = [];
class TrailParticle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 4 + 2;
        this.opacity = 1;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
        this.isHeart = Math.random() < 0.3;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.opacity -= 0.02;
        this.size *= 0.95;
    }
    draw() {
        trailCtx.fillStyle = this.isHeart ? `rgba(255, 105, 180, ${this.opacity})` : `rgba(255, 182, 193, ${this.opacity})`;
        if (this.isHeart) {
            trailCtx.font = `${this.size * 2}px Arial`;
            trailCtx.fillText('💖', this.x, this.y);
        } else {
            trailCtx.beginPath();
            trailCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            trailCtx.fill();
        }
    }
}

document.addEventListener('mousemove', (e) => {
    for (let i = 0; i < 3; i++) {
        trailParticles.push(new TrailParticle(e.clientX, e.clientY));
    }
});

function animateTrailParticles() {
    trailCtx.clearRect(0, 0, trailCanvas.width, trailCanvas.height);
    trailParticles.forEach((p, i) => {
        p.update();
        p.draw();
        if (p.opacity <= 0 || p.size < 0.1) {
            trailParticles.splice(i, 1);
        }
    });
    requestAnimationFrame(animateTrailParticles);
}
animateTrailParticles();

// Floating Hearts Animation
const heartsContainer = document.getElementById('hearts');
function createHeart() {
    const heart = document.createElement('div');
    heart.innerHTML = '💖';
    heart.className = 'absolute text-2xl';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.top = '100vh';
    heartsContainer.appendChild(heart);

    gsap.to(heart, {
        y: -window.innerHeight - 100,
        x: Math.random() * 100 - 50,
        opacity: 0,
        duration: 3 + Math.random() * 2,
        ease: 'power1.out',
        onComplete: () => heart.remove()
    });
}

setInterval(createHeart, 500);

// Twinkling Stars
function createStar() {
    const star = document.createElement('div');
    star.innerHTML = '✨';
    star.className = 'absolute text-xl';
    star.style.left = Math.random() * 100 + 'vw';
    star.style.top = Math.random() * 100 + 'vh';
    document.body.appendChild(star);

    gsap.to(star, {
        opacity: 0,
        scale: 1.5,
        duration: 1,
        repeat: 1,
        yoyo: true,
        onComplete: () => star.remove()
    });
}

setInterval(createStar, 1000);

// Tab Switching Logic
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        tabButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');

        // Hide all tab contents
        tabContents.forEach(content => content.classList.add('hidden'));
        // Show the selected tab content
        const tabId = button.getAttribute('data-tab');
        document.getElementById(tabId).classList.remove('hidden');
    });
});
