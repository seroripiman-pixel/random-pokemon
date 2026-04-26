class SimpleAlarm {
    constructor() {
        this.alarms = [];
        this.currentAlarm = null;
        this.isPlaying = false;
        this.init();
    }

    init() {
        this.loadAlarms();
        this.updateClock();
        this.setupEventListeners();
        setInterval(() => this.updateClock(), 1000);
        setInterval(() => this.checkAlarms(), 1000);
    }

    setupEventListeners() {
        document.getElementById('setBtn').addEventListener('click', () => this.addAlarm());
        document.getElementById('stopBtn').addEventListener('click', () => this.stopAlarm());
        document.getElementById('snoozeBtn').addEventListener('click', () => this.snoozeAlarm());
        document.getElementById('alarmTime').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.addAlarm();
        });
    }

    updateClock() {
        const now = new Date();
        const timeStr = this.formatTime(now);
        document.getElementById('currentTime').textContent = timeStr;
    }

    formatTime(date) {
        return `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}`;
    }

    addAlarm() {
        const timeInput = document.getElementById('alarmTime').value;
        const labelInput = document.getElementById('alarmLabel').value;

        if (!timeInput) {
            alert('時刻を設定してください');
            return;
        }

        const alarm = {
            id: Date.now(),
            time: timeInput,
            label: labelInput || 'アラーム',
            active: true,
            snoozed: false,
            originalTime: timeInput
        };

        this.alarms.push(alarm);
        this.saveAlarms();
        this.renderAlarms();

        document.getElementById('alarmTime').value = '';
        document.getElementById('alarmLabel').value = '';
    }

    checkAlarms() {
        const now = new Date();
        const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

        this.alarms.forEach(alarm => {
            if (alarm.active && alarm.time === currentTime && !this.isPlaying) {
                this.triggerAlarm(alarm);
            }
        });
    }

    triggerAlarm(alarm) {
        this.currentAlarm = alarm;
        this.isPlaying = true;
        this.playAlarmSound();
        this.showAlarmModal(alarm);
    }

    showAlarmModal(alarm) {
        const modal = document.getElementById('alarmModal');
        const now = new Date();

        document.getElementById('modalLabel').textContent = alarm.label;
        document.getElementById('modalTime').textContent = this.formatTime(now);

        modal.classList.remove('hidden');
    }

    stopAlarm() {
        this.stopAlarmSound();
        this.isPlaying = false;

        if (this.currentAlarm) {
            const index = this.alarms.findIndex(a => a.id === this.currentAlarm.id);
            if (index > -1) {
                this.alarms.splice(index, 1);
                this.saveAlarms();
                this.renderAlarms();
            }
        }

        this.hideAlarmModal();
    }

    snoozeAlarm() {
        this.stopAlarmSound();
        this.isPlaying = false;

        if (this.currentAlarm) {
            const [hours, minutes] = this.currentAlarm.time.split(':');
            let newMinutes = parseInt(minutes) + 5;
            let newHours = parseInt(hours);

            if (newMinutes >= 60) {
                newMinutes = newMinutes % 60;
                newHours = (newHours + 1) % 24;
            }

            this.currentAlarm.time = `${String(newHours).padStart(2, '0')}:${String(newMinutes).padStart(2, '0')}`;
            this.currentAlarm.snoozed = true;
            this.saveAlarms();
            this.renderAlarms();
        }

        this.hideAlarmModal();
    }

    hideAlarmModal() {
        document.getElementById('alarmModal').classList.add('hidden');
    }

    playAlarmSound() {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gain = audioContext.createGain();

        oscillator.connect(gain);
        gain.connect(audioContext.destination);

        const now = audioContext.currentTime;

        // ビープ音パターン
        for (let i = 0; i < 10; i++) {
            const startTime = now + i * 0.3;
            const endTime = startTime + 0.2;

            oscillator.frequency.setValueAtTime(1000, startTime);
            oscillator.frequency.setValueAtTime(1200, endTime);

            gain.gain.setValueAtTime(0.3, startTime);
            gain.gain.setValueAtTime(0, endTime);
        }

        oscillator.start(now);
        oscillator.stop(now + 3);
    }

    stopAlarmSound() {
        // オシレーターの停止
    }

    toggleAlarm(id) {
        const alarm = this.alarms.find(a => a.id === id);
        if (alarm) {
            alarm.active = !alarm.active;
            this.saveAlarms();
            this.renderAlarms();
        }
    }

    deleteAlarm(id) {
        this.alarms = this.alarms.filter(a => a.id !== id);
        this.saveAlarms();
        this.renderAlarms();
    }

    renderAlarms() {
        const list = document.getElementById('alarmsList');

        if (this.alarms.length === 0) {
            list.innerHTML = '<p style="color: #999; text-align: center;">アラームがありません</p>';
            return;
        }

        list.innerHTML = this.alarms
            .sort((a, b) => a.time.localeCompare(b.time))
            .map(alarm => `
                <div class="alarm-item ${!alarm.active ? 'inactive' : ''}">
                    <div class="alarm-info">
                        <div class="alarm-time">${alarm.time}</div>
                        <div class="alarm-label">${alarm.label}${alarm.snoozed ? ' (スヌーズ中)' : ''}</div>
                    </div>
                    <div>
                        <button class="btn btn-toggle ${!alarm.active ? 'off' : ''}" onclick="alarm.toggleAlarm(${alarm.id})">
                            ${alarm.active ? 'ON' : 'OFF'}
                        </button>
                        <button class="btn btn-delete" onclick="alarm.deleteAlarm(${alarm.id})">削除</button>
                    </div>
                </div>
            `)
            .join('');
    }

    saveAlarms() {
        localStorage.setItem('alarms', JSON.stringify(this.alarms));
    }

    loadAlarms() {
        const saved = localStorage.getItem('alarms');
        this.alarms = saved ? JSON.parse(saved) : [];
        this.renderAlarms();
    }
}

const alarm = new SimpleAlarm();
