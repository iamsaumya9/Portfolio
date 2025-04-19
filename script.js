// 💬 cute popup on load
window.onload = function() {
  alert("Welcome to Saumya’s magical world! ✨ Handle with love 💖");
};

// ✨ sparkly mouse trail
const canvas = document.getElementById("sparkleCanvas");
const ctx = canvas.getContext("2d");

let width = (canvas.width = window.innerWidth);
let height = (canvas.height = window.innerHeight);
let sparkles = [];

window.onresize = () => {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
};

document.addEventListener("mousemove", (e) => {
  for (let i = 0; i < 5; i++) {
    let colorChoice = Math.random() > 0.5 ? 'red' : `hsl(${Math.random() * 360}, 100%, 75%)`; // 50% chance of red hearts
    if (colorChoice === 'red') {
      // Creating different intensities of red hearts
      colorChoice = `hsl(0, 100%, ${Math.random() * 50 + 30}%)`; // Random intensity of red (30% to 80%)
    }

    sparkles.push({
      x: e.clientX,
      y: e.clientY,
      alpha: 1,
      size: Math.random() * 4 + 2,
      dx: (Math.random() - 0.5) * 2,
      dy: (Math.random() - 0.5) * 2,
      color: colorChoice
    });
  }
});



function animate() {
  ctx.clearRect(0, 0, width, height);
  sparkles.forEach((s, i) => {
    ctx.globalAlpha = s.alpha;
    ctx.fillStyle = s.color;
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
    ctx.fill();
    s.x += s.dx;
    s.y += s.dy;
    s.alpha -= 0.02;
    if (s.alpha <= 0) sparkles.splice(i, 1);
  });
  requestAnimationFrame(animate);
}

animate();
