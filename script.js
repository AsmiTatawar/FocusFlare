let timer;
let timeLeft = 0;
let paused = false;
let timerDisplay = document.getElementById('timer');
let videoPlayer = document.getElementById('videoPlayer');

function setTimer(minutes) {
    timeLeft = minutes * 60;
    updateTimerDisplay();
}

function startTimer() {
    if (timeLeft <= 0) {
        const h = parseInt(document.getElementById('hours').value) || 0;
        const m = parseInt(document.getElementById('minutes').value) || 0;
        const s = parseInt(document.getElementById('seconds').value) || 0;
        timeLeft = h * 3600 + m * 60 + s;
    }

    if (timeLeft > 0) {
        clearInterval(timer);
        timer = setInterval(() => {
            timeLeft--;
            updateTimerDisplay();
            if (timeLeft <= 0) {
                clearInterval(timer);
                showTimesUpPopup();
                videoPlayer.src = '';
            }
        }, 1000);
    }
}

function stopTimer() {
    clearInterval(timer);
    paused = true;
}

function resetTimer() {
    clearInterval(timer);
    timeLeft = 0;
    updateTimerDisplay();
    paused = false;
}

function updateTimerDisplay() {
    const h = Math.floor(timeLeft / 3600);
    const m = Math.floor((timeLeft % 3600) / 60);
    const s = timeLeft % 60;
    timerDisplay.innerText = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

function selectVideo(videoId) {
    videoPlayer.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
}

function showTimesUpPopup() {
    const popup = document.getElementById('timesUpPopup');
    const canvas = document.getElementById('confettiCanvas');
    popup.classList.remove('hidden');
    startConfetti(canvas);

    setTimeout(() => {
        popup.classList.add('hidden');
        stopConfetti(canvas);
    }, 5000);
}

function startConfetti(canvas) {
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    let confetti = Array.from({ length: 100 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        r: Math.random() * 6 + 4,
        d: Math.random() * 10 + 5,
        color: `hsl(${Math.random() * 360}, 100%, 70%)`,
        tilt: Math.random() * 10 - 10
    }));

    let animation = setInterval(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        confetti.forEach(p => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.fill();
        });

        confetti.forEach(p => {
            p.y += p.d;
            if (p.y > canvas.height) p.y = -10;
        });
    }, 30);

    setTimeout(() => {
        clearInterval(animation);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }, 3000);
}

function stopConfetti(canvas) {
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}
