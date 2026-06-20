console.log("Hello, World!");
alert("欢迎来到丁龟龟的网站！");
let time = new Date().getHours();
if (time < 12) {
    alert("上午好！");
} else if (time < 18) {
    alert("下午好！");
} else {
    alert("晚上好！");
}

function add() {
    var input = document.querySelector(".go-input");
    var text = input.value;
    if (text === "") {
        alert("请输入内容！");
        return;
    }
    var newItem = document.createElement("div");
    newItem.className = "item";
    newItem.innerHTML = '<span class="item-text" onclick="this.classList.toggle(\'item-done\')">' + text + '</span><span class="item-del" onclick="this.parentElement.remove(); saveItems();">✕</span>';
    document.getElementById("todoList").appendChild(newItem);
    input.value = "";
    saveItems();
}

document.querySelector(".go-input").addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        add();
    }
});

function saveItems() {
    var items = document.querySelectorAll("#todoList .item span:first-child");
    var texts = [];
    items.forEach(function (item) {
        texts.push(item.textContent);
    });
    localStorage.setItem("myTodos", JSON.stringify(texts));
}

function loadItems() {
    var saved = localStorage.getItem("myTodos");
    if (!saved) return;
    var texts = JSON.parse(saved);
    texts.forEach(function (t) {
        var newItem = document.createElement("div");
        newItem.className = "item";
        newItem.innerHTML = '<span class="item-text" onclick="this.classList.toggle(\'item-done\')">' + t + '</span><span class="item-del" onclick="this.parentElement.remove(); saveItems();">✕</span>';
        document.getElementById("todoList").appendChild(newItem);
    });
}

loadItems();

// ========== 光粒子背景 ==========

var canvas = document.getElementById("bgCanvas");
var ctx = canvas.getContext("2d");

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

var mouse = { x: -1000, y: -1000 };
document.addEventListener("mousemove", function (e) {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

var particles = [];
var PARTICLE_COUNT = 120;

function createParticle() {
    return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.5 + 0.3
    };
}

for (var i = 0; i < PARTICLE_COUNT; i++) {
    particles.push(createParticle());
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (var i = 0; i < particles.length; i++) {
        var p = particles[i];

        var dx = mouse.x - p.x;
        var dy = mouse.y - p.y;
        var dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 150) {
            var force = (1 - dist / 150) * 0.03;
            p.speedX += dx * force;
            p.speedY += dy * force;
        }

        p.x += p.speedX;
        p.y += p.speedY;

        p.speedX *= 0.98;
        p.speedY *= 0.98;

        if (p.x < 0 || p.x > canvas.width)  p.speedX *= -1;
        if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;
        p.x = Math.max(0, Math.min(canvas.width, p.x));
        p.y = Math.max(0, Math.min(canvas.height, p.y));

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(120, 200, 255, " + p.opacity + ")";
        ctx.fill();

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 4, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(120, 200, 255, " + (p.opacity * 0.1) + ")";
        ctx.fill();
    }

    for (var i = 0; i < particles.length; i++) {
        for (var j = i + 1; j < particles.length; j++) {
            var dx = particles[i].x - particles[j].x;
            var dy = particles[i].y - particles[j].y;
            var dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 100) {
                var lineOpacity = (1 - dist / 100) * 0.15;
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.strokeStyle = "rgba(120, 200, 255, " + lineOpacity + ")";
                ctx.lineWidth = 0.5;
                ctx.stroke();
            }
        }
    }

    requestAnimationFrame(animate);
}

animate();
