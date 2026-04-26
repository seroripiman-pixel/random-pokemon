const TOTAL_POKEMON = 1010;

const STAT_COLORS = {
    hp:      '#ff5959',
    attack:  '#f5a623',
    defense: '#4a90e2',
    speed:   '#5cb85c',
};

const STAT_LABELS = {
    hp:      'HP',
    attack:  'こうげき',
    defense: 'ぼうぎょ',
    speed:   'すばやさ',
};

async function fetchRandomPokemon() {
    const id = Math.floor(Math.random() * TOTAL_POKEMON) + 1;
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    if (!res.ok) throw new Error('fetch failed');
    return res.json();
}

function showLoading() {
    document.getElementById('initial-message').classList.add('hidden');
    document.getElementById('pokemon-info').classList.add('hidden');
    document.getElementById('loading').classList.remove('hidden');
}

function showPokemon(data) {
    document.getElementById('loading').classList.add('hidden');

    const number = String(data.id).padStart(3, '0');
    document.getElementById('pokemon-number').textContent = `#${number}`;

    const img = document.getElementById('pokemon-image');
    img.src = data.sprites.other['official-artwork'].front_default
        || data.sprites.front_default;
    img.alt = data.name;

    document.getElementById('pokemon-name').textContent = data.name;

    const typesEl = document.getElementById('pokemon-types');
    typesEl.innerHTML = data.types
        .map(t => `<span class="type-badge type-${t.type.name}">${t.type.name}</span>`)
        .join('');

    const statKeys = ['hp', 'attack', 'defense', 'speed'];
    const statApiNames = { hp: 'hp', attack: 'attack', defense: 'defense', speed: 'speed' };

    statKeys.forEach(key => {
        const stat = data.stats.find(s => s.stat.name === statApiNames[key]);
        const value = stat ? stat.base_stat : 0;
        const pct = Math.min(100, Math.round((value / 255) * 100));

        document.getElementById(`stat-${key}`).innerHTML = `
            <span class="stat-label">${STAT_LABELS[key]}</span>
            <div class="stat-bar-bg">
                <div class="stat-bar" style="width:${pct}%; background:${STAT_COLORS[key]}"></div>
            </div>
            <span class="stat-value">${value}</span>
        `;
    });

    document.getElementById('pokemon-info').classList.remove('hidden');
}

async function loadRandom() {
    showLoading();
    try {
        const data = await fetchRandomPokemon();
        showPokemon(data);
    } catch (e) {
        document.getElementById('loading').classList.add('hidden');
        document.getElementById('initial-message').classList.remove('hidden');
        console.error('ポケモン取得失敗:', e);
    }
}

document.getElementById('card').addEventListener('click', loadRandom);
document.getElementById('catch-btn').addEventListener('click', (e) => {
    e.stopPropagation();
    loadRandom();
});

document.getElementById('card').addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') loadRandom();
});
