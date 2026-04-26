class Stopwatch {
    constructor() {
        this.time = 0;
        this.running = false;
        this.laps = [];
        this.animationFrameId = null;
        this.lastUpdateTime = 0;
        this.init();
    }

    init() {
        this.loadState();
        this.setupEventListeners();
        this.render();
    }

    setupEventListeners() {
        document.getElementById('startBtn').addEventListener('click', () => this.start());
        document.getElementById('stopBtn').addEventListener('click', () => this.stop());
        document.getElementById('resetBtn').addEventListener('click', () => this.reset());
        document.getElementById('lapBtn').addEventListener('click', () => this.lap());
    }

    start() {
        if (this.running) return;
        this.running = true;
        this.lastUpdateTime = performance.now();
        document.getElementById('startBtn').disabled = true;
        document.getElementById('stopBtn').disabled = false;
        document.getElementById('lapBtn').disabled = false;
        this.animate();
    }

    stop() {
        this.running = false;
        document.getElementById('startBtn').disabled = false;
        document.getElementById('stopBtn').disabled = true;
        this.saveState();
    }

    reset() {
        this.running = false;
        this.time = 0;
        this.laps = [];
        document.getElementById('startBtn').disabled = false;
        document.getElementById('stopBtn').disabled = true;
        document.getElementById('lapBtn').disabled = true;
        this.render();
        this.saveState();
    }

    lap() {
        if (!this.running) return;
        this.laps.push(this.time);
        this.render();
        this.saveState();
    }

    animate() {
        if (!this.running) return;
        const now = performance.now();
        const deltaTime = now - this.lastUpdateTime;
        this.time += deltaTime;
        this.lastUpdateTime = now;
        this.render();
        this.animationFrameId = requestAnimationFrame(() => this.animate());
    }

    render() {
        this.updateDisplay();
        this.renderLaps();
    }

    updateDisplay() {
        const totalMs = Math.floor(this.time);
        const ms = totalMs % 1000;
        const seconds = Math.floor(totalMs / 1000) % 60;
        const minutes = Math.floor(totalMs / 60000) % 60;
        const hours = Math.floor(totalMs / 3600000);

        const display = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(Math.floor(ms / 10)).padStart(2, '0')}`;
        document.getElementById('time').textContent = display;
    }

    renderLaps() {
        const lapList = document.getElementById('lapList');
        if (this.laps.length === 0) {
            lapList.innerHTML = '';
            return;
        }

        lapList.innerHTML = this.laps
            .map((lap, index) => {
                const totalMs = Math.floor(lap);
                const ms = totalMs % 1000;
                const seconds = Math.floor(totalMs / 1000) % 60;
                const minutes = Math.floor(totalMs / 60000) % 60;
                const hours = Math.floor(totalMs / 3600000);

                const lapTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(Math.floor(ms / 10)).padStart(2, '0')}`;

                return `<li>ラップ ${index + 1}: ${lapTime}</li>`;
            })
            .join('');
    }

    saveState() {
        localStorage.setItem('stopwatch', JSON.stringify({
            time: this.time,
            laps: this.laps,
            running: this.running,
            lastUpdateTime: this.lastUpdateTime
        }));
    }

    loadState() {
        const saved = localStorage.getItem('stopwatch');
        if (saved) {
            const state = JSON.parse(saved);
            this.time = state.time || 0;
            this.laps = state.laps || [];
            this.running = state.running || false;
            this.lastUpdateTime = state.lastUpdateTime || 0;

            if (this.running) {
                const elapsed = performance.now() - this.lastUpdateTime;
                this.time += elapsed;
                this.lastUpdateTime = performance.now();
            }
        }
    }
}

const stopwatch = new Stopwatch();
