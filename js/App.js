import { GameEngine } from './GameEngine.js';
import { TournamentEngine } from './TournamentEngine.js';
import { COUNTRIES, getRandomCountries } from './countries.js';
import { EffectsManager } from './Effects.js';
import { SoundManager } from './SoundManager.js';
import { showAlert, showSuccess, showError, showConfirm } from './Modal.js';
import { debounce } from './utils.js';

// Game Configuration Constants
// Kıta isimlerinin Türkçe karşılıkları
const CONTINENT_NAMES = {
    'Americas': 'Amerika',
    'Europe': 'Avrupa',
    'Asia': 'Asya',
    'Africa': 'Afrika',
    'Oceania': 'Okyanusya'
};

const GAME_CONFIG = {
    AUTO_PLAY_INTERVAL: 2000,        // ms between auto-drawn numbers
    BALL_ANIMATION_DELAY: 500,       // ms for ball shake animation
    COUNTDOWN_STEP_DURATION: 1000,   // ms per countdown number
    MATCH_RESULT_DELAY: 2000,        // ms before showing bracket after match
    BRACKET_TRANSITION_DELAY: 500,   // ms before next action in bracket
    MUSIC_VOLUME: 0.5,               // Default music volume (0-1)
    SNOWFLAKE_COUNT: 60,             // Number of snowflakes
    LAST_BALLS_DISPLAY_COUNT: 5,     // Number of recent balls to show
    TOURNAMENT_SIZE: 32,             // Number of countries in tournament
    CARD_NUMBERS_PER_ROW: 5,         // Tombala card configuration
    CARD_TOTAL_NUMBERS: 15,
    AUTO_START_GAME: false,          // Auto-start game on page load
    BOT_DIFFICULTY: 'medium'         // Bot difficulty: 'easy', 'medium', 'hard'
};

// Bot difficulty settings
const BOT_DIFFICULTY_SETTINGS = {
    easy: {
        label: 'Kolay 😊',
        mineCount: 4,
        cardStrategy: 'late-game',
        description: 'Bot daha fazla mayın alır ve geç çıkacak sayılarla oynar'
    },
    medium: {
        label: 'Normal 😐',
        mineCount: 3,
        cardStrategy: 'balanced',
        description: 'Dengeli bir oyun deneyimi'
    },
    hard: {
        label: 'Zor 😈',
        mineCount: 2,
        cardStrategy: 'early-game',
        description: 'Bot daha az mayın alır ve erken çıkacak sayılarla oynar'
    }
};

// Audio tracks configuration
const AUDIO_TRACKS = [
    {
        src: 'assets/audio/david-tavare.mp3',
        title: 'I Wish You A Merry Xmas',
        artist: 'David Tavare'
    },
    {
        src: 'assets/audio/Mariah Carey - All I Want for Christmas Is You (Make My Wish Come True Edition).mp3',
        title: 'All I Want for Christmas Is You',
        artist: 'Mariah Carey'
    },
    {
        src: 'assets/audio/Jingle Bells Christmas Song - LatinHype.mp3',
        title: 'Jingle Bells',
        artist: 'LatinHype'
    }
];

function formatTime(seconds) {
    if (!Number.isFinite(seconds) || seconds < 0) return '--:--';
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = Math.floor(seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
}

const CONTINENT_QUOTAS = {
    'Europe': 8,
    'Asia': 8,
    'Africa': 8,
    'Americas': 5,
    'Oceania': 3
};

import { GAME_CONFIG } from './config.js';

class TombalaApp {
    constructor() {
        this.engine = new GameEngine();
        this.tournament = null;
        this.effects = new EffectsManager('christmas-snow');
        this.soundManager = new SoundManager();

        this.ui = {
            // Screens
            selectionScreen: document.getElementById('country-selection-screen'),
            continentBreakdownScreen: document.getElementById('continent-breakdown-screen'),
            bracketScreen: document.getElementById('bracket-screen'),
            gameContainer: document.getElementById('game-container'),
            resultScreen: document.getElementById('result-screen'),
            podiumScreen: document.getElementById('podium-screen'),

            // Continent Breakdown Elements
            countryGrid: document.getElementById('country-grid'),
            continentGrid: document.getElementById('continent-grid'),
            btnContinueToDraw: document.getElementById('btn-continue-to-draw'),
            btnRandom32: document.getElementById('btn-random-32'),
            btnStartTournament: document.getElementById('btn-start-tournament'),

            // Bracket Elements
            bracketContainer: document.getElementById('bracket-container'),
            btnCloseBracket: document.getElementById('btn-close-bracket'),

            // Game UI
            snowContainer: document.getElementById('christmas-snow'),
            countdown: document.getElementById('countdown-value'),
            gameTime: document.getElementById('game-time'),
            playerCardContainer: document.getElementById('player-cards'),
            botCardContainer: document.getElementById('bot-cards'),
            drawnBallsGrid: document.getElementById('drawn-balls-grid'),
            currentBall: document.getElementById('current-ball'),
            drawBtn: document.getElementById('btn-draw'),
            autoBtn: document.getElementById('btn-auto'),
            muteBtn: document.getElementById('btn-mute'),
            restartBtn: document.getElementById('btn-restart'),
            playerProgress: document.getElementById('player-progress'),
            botProgress: document.getElementById('bot-progress'),
            bgMusic: document.getElementById('bg-music'),
            playerFlag: document.getElementById('player-flag'),
            playerName: document.getElementById('player-name'),
            botFlag: document.getElementById('bot-flag'),
            botName: document.getElementById('bot-name'),
            scoreboardCountdown: document.getElementById('scoreboard-countdown'),
            scoreboardGameTime: document.getElementById('scoreboard-game-time'),
            playerRemaining: document.getElementById('player-remaining'),
            botRemaining: document.getElementById('bot-remaining'),
            playerMineLives: document.getElementById('player-mine-lives'),
            botMineLives: document.getElementById('bot-mine-lives'),
            scoreboardDiff: document.getElementById('scoreboard-diff'),
            bracketPlayerInfo: document.getElementById('bracket-player-info'),
            playerDiff: document.getElementById('player-diff'),
            botDiff: document.getElementById('bot-diff'),
            playerFacts: document.getElementById('player-facts'),
            botFacts: document.getElementById('bot-facts'),
            playerProgressCircle: document.getElementById('player-progress-circle'),
            botProgressCircle: document.getElementById('bot-progress-circle'),
            playerProgressText: document.getElementById('player-progress-text'),
            botProgressText: document.getElementById('bot-progress-text'),
            bagCount: document.getElementById('bag-count'),

            // Countdown Overlay
            countdownOverlay: document.getElementById('game-countdown-overlay'),
            countdownNumber: document.querySelector('#game-countdown-overlay .countdown-number'),

            // Search Input
            searchInput: document.getElementById('country-search'),

            // Difficulty Selector
            difficultySelector: document.getElementById('bot-difficulty-select'),
            difficultyDescription: document.getElementById('difficulty-description'),

            playerContinent: document.getElementById('player-continent'),
            botContinent: document.getElementById('bot-continent'),

            // Music Info
            songTitle: document.querySelector('.song-title'),
            artistName: document.querySelector('.artist-name'),
            songElapsed: document.querySelector('.song-elapsed'),
            songRemaining: document.querySelector('.song-remaining')
        };

        this.state = {
            gameStartTime: null,
            timerInterval: null,
            autoPlayInterval: null,
            isMuted: false,
            playerCard: null,
            botCard: null,
            selectedCountries: [],
            currentPlayerCountry: null,
            currentOpponentCountry: null,

            currentTrackIndex: 0,
            shuffledTracks: [],
            drawAnimationActive: false,
            skipDraw: false,
            playerMines: new Set(),
            botMines: new Set()
        };

        this.init();
    }

    init() {
        this.effects.startSnow();
        this.startCountdown();
        this.initBoard();
        this.initAudio();
        this.setupEventListeners();
        this.setupKeyboardListeners();

        // Setup difficulty selector
        if (this.ui.difficultySelector) {
            this.ui.difficultySelector.addEventListener('change', (e) => {
                const newDifficulty = e.target.value;
                GAME_CONFIG.BOT_DIFFICULTY = newDifficulty;
                const settings = BOT_DIFFICULTY_SETTINGS[newDifficulty];

                // Update description
                if (this.ui.difficultyDescription) {
                    this.ui.difficultyDescription.textContent = settings.description;
                }

                console.log(`🎮 Difficulty changed to: ${settings.label}`);
            });
        }

        // Auto-start if enabled
        if (GAME_CONFIG.AUTO_START_GAME) {
            this.autoStartGame();
        } else {
            // Show country selection screen
            this.showCountrySelection();
        }
    }

    initAudio() {
        // Shuffle tracks array
        this.state.shuffledTracks = [...AUDIO_TRACKS].sort(() => Math.random() - 0.5);
        this.state.currentTrackIndex = 0;

        // Load and play first track
        this.loadTrack(0);

        // Set up event listener for track end
        this.ui.bgMusic.addEventListener('ended', () => {
            this.playNextTrack();
        });

        this.ui.bgMusic.addEventListener('timeupdate', () => {
            this.updateSongTime();
        });

        this.ui.bgMusic.addEventListener('loadedmetadata', () => {
            this.updateSongTime(true);
        });
    }

    loadTrack(index) {
        const track = this.state.shuffledTracks[index];
        if (!track) return;

        this.ui.bgMusic.src = track.src;
        this.ui.bgMusic.volume = GAME_CONFIG.MUSIC_VOLUME;
        this.ui.bgMusic.load();

        // Update music info display
        if (this.ui.songTitle) {
            this.ui.songTitle.textContent = track.title;
        }
        if (this.ui.artistName) {
            this.ui.artistName.textContent = track.artist;
        }
        this.updateSongTime(true);
    }

    playNextTrack() {
        // Move to next track
        this.state.currentTrackIndex = (this.state.currentTrackIndex + 1) % this.state.shuffledTracks.length;

        // If we've played all tracks, reshuffle
        if (this.state.currentTrackIndex === 0) {
            this.state.shuffledTracks = [...AUDIO_TRACKS].sort(() => Math.random() - 0.5);
        }

        // Load and play next track
        this.loadTrack(this.state.currentTrackIndex);

        if (!this.state.isMuted) {
            this.ui.bgMusic.play().catch(() => { });
        }
    }

    setTrackForCurrentRound() {
        if (!this.tournament) return;
        const roundIndex = this.tournament.currentRound || 0;
        const trackIndex = roundIndex % AUDIO_TRACKS.length;

        // Deterministic per round selection
        this.state.shuffledTracks = [...AUDIO_TRACKS];
        this.state.currentTrackIndex = trackIndex;
        this.loadTrack(trackIndex);

        if (!this.state.isMuted) {
            this.ui.bgMusic.play().catch(() => { });
        }
    }

    updateSongTime(reset = false) {
        if (!this.ui.songElapsed || !this.ui.songRemaining) return;
        if (reset) {
            this.ui.songElapsed.textContent = '--:--';
            this.ui.songRemaining.textContent = '--:--';
        }

        const audio = this.ui.bgMusic;
        const elapsed = formatTime(audio.currentTime);
        const remaining = formatTime((audio.duration || 0) - audio.currentTime);

        this.ui.songElapsed.textContent = elapsed;
        this.ui.songRemaining.textContent = remaining;
    }

    // ===== TOURNAMENT MODE =====

    showCountrySelection() {
        this.ui.selectionScreen.classList.add('active');
        this.renderCountries();
    }

    autoStartGame() {
        console.log('🎮 Auto-starting game...');

        // Show country selection screen briefly (for visual context)
        this.showCountrySelection();

        // Auto-select 32 random countries
        this.selectRandom32();

        // Small delay then start tournament
        setTimeout(() => {
            this.startTournament();

            // Skip continent breakdown, go directly to tournament
            setTimeout(() => {
                this.initializeTournament();

                // Auto-start first match after bracket is shown
                setTimeout(() => {
                    console.log('🎮 Auto-starting first match...');
                    this.proceedToMatch();
                }, 1000);
            }, 100);
        }, 500);
    }

    renderCountries() {
        this.ui.bracketScreen.classList.remove('active');
        this.ui.gameContainer.classList.remove('active');

        // Render all 128 countries
        this.renderCountryGrid();
    }

    renderCountryGrid() {
        this.ui.countryGrid.innerHTML = '';

        COUNTRIES.forEach(country => {
            const card = document.createElement('div');
            card.classList.add('country-card');
            card.dataset.countryId = country.id;
            card.setAttribute('role', 'listitem');
            card.setAttribute('tabindex', '0');
            card.setAttribute('aria-label', `${country.name}, ${country.continent}`);

            // Fallback flag
            const flag = country.flag || '🏳️';

            card.innerHTML = `
            <div class="country-flag">${flag}</div>
            <div class="country-name">${country.name}</div>
        `;

            // Check if this country is already selected
            const isSelected = this.state.selectedCountries.some(c => c.id === country.id);
            if (isSelected) {
                card.classList.add('selected');
                // Check if it's the first selected (player's country)
                if (this.state.selectedCountries.length > 0 && this.state.selectedCountries[0].id === country.id) {
                    card.classList.add('player-country');
                }
            }

            const toggleSelection = () => this.toggleCountrySelection(country, card);

            card.addEventListener('click', toggleSelection);
            card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggleSelection();
                }
            });

            this.ui.countryGrid.appendChild(card);
        });
    }

    toggleCountrySelection(country, cardElement) {
        const index = this.state.selectedCountries.findIndex(c => c.id === country.id);

        if (index > -1) {
            // Deselect
            const wasFirstCountry = index === 0;
            this.state.selectedCountries.splice(index, 1);
            cardElement.classList.remove('selected', 'player-country');
            cardElement.setAttribute('aria-pressed', 'false');

            // If we removed the first country (player's country), update all cards
            // The new first country (if any) will become the player country
            if (wasFirstCountry) {
                this.updatePlayerCountryIndicator();
            }
        } else {
            // Select only if under 32
            if (this.state.selectedCountries.length < 32) {
                // If this is the first selection, add it at the beginning
                if (this.state.selectedCountries.length === 0) {
                    this.state.selectedCountries.unshift(country);
                    cardElement.classList.add('selected', 'player-country');
                } else {
                    // Otherwise, add it normally
                    this.state.selectedCountries.push(country);
                    cardElement.classList.add('selected');
                }
                cardElement.setAttribute('aria-pressed', 'true');
            }
        }

        // Enable start button if exactly 32 selected
        const isTournamentReady = this.state.selectedCountries.length === 32;
        this.ui.btnStartTournament.disabled = !isTournamentReady;
        this.ui.btnStartTournament.setAttribute('aria-disabled', !isTournamentReady);

        // Update button text based on selection count
        if (this.state.selectedCountries.length === 1) {
            this.ui.btnRandom32.textContent = '✨ Akıllı Tamamla';
        } else {
            this.ui.btnRandom32.textContent = '🎲 Rastgele 32 Ülke';
        }
    }

    updatePlayerCountryIndicator() {
        // Remove player-country class from all cards
        document.querySelectorAll('.country-card').forEach(card => {
            card.classList.remove('player-country');
        });

        // Add player-country class to the first selected country (if any)
        if (this.state.selectedCountries.length > 0) {
            const firstCountry = this.state.selectedCountries[0];
            const firstCard = document.querySelector(`.country-card[data-country-id="${firstCountry.id}"]`);
            if (firstCard) {
                firstCard.classList.add('player-country');
            }
        }
    }

    selectRandom32() {
        const firstSelection = this.state.selectedCountries.length === 1 ? this.state.selectedCountries[0] : null;

        // Clear previous selections (but keep first if exists for smart fill)
        this.state.selectedCountries = [];
        document.querySelectorAll('.country-card').forEach(card => card.classList.remove('selected', 'player-country'));

        // Get random 32 (passing first selection if present - it will be at index 0)
        this.state.selectedCountries = getRandomCountries(32, firstSelection);

        // Highlight selected cards and mark first as player country
        this.state.selectedCountries.forEach((country, index) => {
            const card = document.querySelector(`.country-card[data-country-id="${country.id}"]`);
            if (card) {
                card.classList.add('selected');
                // First country is always the player's country
                if (index === 0) {
                    card.classList.add('player-country');
                }
            }
        });

        this.ui.btnStartTournament.disabled = false;
        this.ui.btnRandom32.textContent = '🎲 Rastgele 32 Ülke'; // Reset text
    }

    startTournament() {
        try {
            if (this.state.selectedCountries.length !== GAME_CONFIG.TOURNAMENT_SIZE) {
                showAlert(`Lütfen turnuva için tam olarak ${GAME_CONFIG.TOURNAMENT_SIZE} ülke seçin!`, 'Uyarı');
                return;
            }

            // Show continent breakdown first
            this.showContinentBreakdown();
        } catch (error) {
            console.error('Error starting tournament:', error);
            showError('Turnuva başlatılırken bir hata oluştu.');
        }
    }

    showContinentBreakdown() {
        // Continent name translations
        const continentNames = {
            'Europe': 'Avrupa',
            'Asia': 'Asya',
            'Africa': 'Afrika',
            'Americas': 'Amerika',
            'Oceania': 'Okyanusya'
        };

        // Get player country (first selected)
        const playerCountry = this.state.selectedCountries[0];

        // Group countries by continent
        const continentGroups = {};
        this.state.selectedCountries.forEach(country => {
            if (!continentGroups[country.continent]) {
                continentGroups[country.continent] = [];
            }
            continentGroups[country.continent].push(country);
        });

        // Hide selection screen, show breakdown
        this.ui.selectionScreen.classList.remove('active');
        this.ui.continentBreakdownScreen.classList.add('active');

        // Show player info
        const playerInfo = document.createElement('div');
        playerInfo.classList.add('player-country-indicator');
        playerInfo.innerHTML = `
            <div class="indicator-label">Oynanacak Ülke:</div>
            <div class="indicator-country">
                <span class="indicator-flag">${playerCountry.flag}</span>
                <span class="indicator-name">${playerCountry.name}</span>
            </div>
        `;

        // Render continent cards
        this.ui.continentGrid.innerHTML = '';
        this.ui.continentGrid.appendChild(playerInfo);

        Object.entries(continentGroups).forEach(([continent, countries]) => {
            const continentCard = document.createElement('div');
            continentCard.classList.add('continent-card');
            continentCard.innerHTML = `
                <h3 class="continent-name">${continentNames[continent] || continent}</h3>
                <div class="continent-count">${countries.length} ülke</div>
                <div class="continent-countries">
                    ${countries.map(c => `
                        <span class="country-flag-small ${c.id === playerCountry.id ? 'player-highlight' : ''}" 
                              title="${c.name}">
                            ${c.flag}
                        </span>
                    `).join('')}
                </div>
            `;
            this.ui.continentGrid.appendChild(continentCard);
        });
    }

    initializeTournament(countriesForBracket) {
        // Use provided countries or fall back to selected countries
        const countries = countriesForBracket || this.state.selectedCountries;

        // First selected country is always the player's country
        const playerCountry = this.state.selectedCountries[0];

        // Create tournament with player country already set
        this.tournament = new TournamentEngine(countries);
        this.tournament.setPlayerCountry(playerCountry);

        // Regenerate bracket with player in first position
        this.tournament.bracket = this.tournament.generateBracket(countries);

        // Show bracket
        this.showBracket();
    }

    showBracket() {
        this.ui.selectionScreen.classList.remove('active');
        this.ui.continentBreakdownScreen.classList.remove('active');
        // Draw ceremony removed
        this.ui.bracketScreen.classList.add('active');
        this.ui.gameContainer.classList.remove('active');

        // Show player country in header
        if (this.tournament && this.tournament.playerCountry) {
            this.ui.bracketPlayerInfo.innerHTML = `
                Oynadığınız Ülke: <span style="font-size: 1.5em; margin: 0 5px;">${this.tournament.playerCountry.flag}</span> ${this.tournament.playerCountry.name}
            `;
        }

        this.renderBracket();
    }

    renderBracket() {
        const bracket = this.tournament.getBracket();
        this.ui.bracketContainer.innerHTML = '';

        const bracketEl = document.createElement('div');
        bracketEl.classList.add('bracket');

        // Get medalists if tournament is complete
        const medalists = this.tournament.getMedalists();
        const getMedal = (teamId) => {
            if (!medalists) return '';
            if (medalists.gold?.id === teamId) return ' 🥇';
            if (medalists.silver?.id === teamId) return ' 🥈';
            if (medalists.bronze?.some(b => b?.id === teamId)) return ' 🥉';
            return '';
        };

        bracket.rounds.forEach((round, rIndex) => {
            const roundEl = document.createElement('div');
            roundEl.classList.add('bracket-round');

            const titleEl = document.createElement('div');
            titleEl.classList.add('bracket-round-title');
            titleEl.textContent = round.name;
            roundEl.appendChild(titleEl);

            round.matches.forEach((match, mIndex) => {
                const matchEl = document.createElement('div');
                matchEl.classList.add('bracket-match');

                // Highlight current match
                if (rIndex === this.tournament.currentRound && mIndex === this.tournament.currentMatch) {
                    matchEl.classList.add('current');
                }

                // Mark completed matches
                if (match.winner) {
                    matchEl.classList.add('completed');
                }

                // Team 1
                if (match.team1) {
                    const team1El = document.createElement('div');
                    team1El.classList.add('bracket-team');
                    if (match.winner?.id === match.team1.id) team1El.classList.add('winner');
                    if (match.winner && match.winner.id !== match.team1.id) team1El.classList.add('loser');

                    // Highlight Player Team
                    if (this.tournament.playerCountry && match.team1.id === this.tournament.playerCountry.id) {
                        team1El.classList.add('player-team');
                    }

                    const medal = getMedal(match.team1.id);
                    // Fallback to empty string if flag is missing, or a default emoji
                    const flag = match.team1.flag || '🏳️';
                    team1El.innerHTML = `
                        <span class="bracket-team-flag">${flag}</span>
                        <span class="bracket-team-name">${match.team1.name}${medal}</span>
                    `;
                    matchEl.appendChild(team1El);
                }

                // Team 2
                if (match.team2) {
                    const team2El = document.createElement('div');
                    team2El.classList.add('bracket-team');
                    if (match.winner?.id === match.team2.id) team2El.classList.add('winner');
                    if (match.winner && match.winner.id !== match.team2.id) team2El.classList.add('loser');

                    // Highlight Player Team
                    if (this.tournament.playerCountry && match.team2.id === this.tournament.playerCountry.id) {
                        team2El.classList.add('player-team');
                    }

                    const medal = getMedal(match.team2.id);
                    const flag = match.team2.flag || '🏳️';
                    team2El.innerHTML = `
                    <span class="bracket-team-flag">${flag}</span>
                    <span class="bracket-team-name">${match.team2.name}${medal}</span>
                `;
                    matchEl.appendChild(team2El);
                }

                roundEl.appendChild(matchEl);
            });

            bracketEl.appendChild(roundEl);
        });

        // Add medal podium if tournament is complete
        if (medalists) {
            const podiumEl = document.createElement('div');
            podiumEl.classList.add('medal-podium');
            podiumEl.innerHTML = `
                <div class="podium-title">🏆 Madalya Sıralaması</div>
                <div class="podium-medals">
                    <div class="medal-item gold">
                        <span class="medal-icon">🥇</span>
                        <span class="medal-flag">${medalists.gold?.flag || ''}</span>
                        <span class="medal-name">${medalists.gold?.name || ''}</span>
                    </div>
                    <div class="medal-item silver">
                        <span class="medal-icon">🥈</span>
                        <span class="medal-flag">${medalists.silver?.flag || ''}</span>
                        <span class="medal-name">${medalists.silver?.name || ''}</span>
                    </div>
                    ${medalists.bronze.map(b => `
                        <div class="medal-item bronze">
                            <span class="medal-icon">🥉</span>
                            <span class="medal-flag">${b?.flag || ''}</span>
                            <span class="medal-name">${b?.name || ''}</span>
                        </div>
                    `).join('')}
                </div>
            `;
            bracketEl.appendChild(podiumEl);
        }

        this.ui.bracketContainer.appendChild(bracketEl);
    }

    proceedToMatch() {
        // Check if tournament is complete
        if (this.tournament.isTournamentComplete()) {
            this.showChampion();
            return;
        }

        const matchInfo = this.tournament.getCurrentMatch();

        // If player is not in this match, auto-simulate
        if (!matchInfo.isPlayerMatch) {
            this.autoSimulateMatches();
            return;
        }

        // Show game screen for player's match
        this.state.currentPlayerCountry = matchInfo.team1.id === this.tournament.playerCountry.id ? matchInfo.team1 : matchInfo.team2;
        this.state.currentOpponentCountry = matchInfo.team1.id === this.tournament.playerCountry.id ? matchInfo.team2 : matchInfo.team1;

        this.showGameScreen(); // Apply theme and UI setup
        this.resetGame(); // Reset game state and render new cards
        this.startGameCountdown();
    }

    autoSimulateMatches() {
        // Simulate all matches until we reach a player match or tournament ends
        while (!this.tournament.isTournamentComplete()) {
            const matchInfo = this.tournament.getCurrentMatch();

            if (matchInfo.isPlayerMatch) {
                // Reached player match, stop auto-sim
                this.renderBracket(); // Update bracket with results
                setTimeout(() => this.proceedToMatch(), 1000);
                return;
            }

            // Auto-simulate
            this.tournament.autoSimulateMatch();
        }

        // If we get here, tournament is complete
        this.renderBracket();
        this.showChampion();
    }

    showChampion() {
        const champion = this.tournament.getChampion();
        if (champion) {
            const isPlayerChampion = champion.id === this.tournament.playerCountry.id;
            showSuccess(
                `<div style="font-size: 3rem; margin-bottom: 1rem;">${champion.flag}</div>
                <div style="font-size: 1.5rem; margin-bottom: 1rem;">${champion.name}</div>
                <div>${isPlayerChampion ? 'TEBRİKLER! TURNUVAYI KAZANDINIZ!' : 'Bir dahaki sefere bol şans!'}</div>`,
                '🏆 TURNUVA ŞAMPİYONU'
            );
        }

        // Automatically start new tournament
        setTimeout(() => {
            location.reload();
        }, GAME_CONFIG.MATCH_RESULT_DELAY);
    }

    showGameScreen() {
        this.ui.selectionScreen.classList.remove('active');
        this.ui.bracketScreen.classList.remove('active');
        this.ui.gameContainer.classList.add('active');

        // Update player names/flags with null safety
        if (this.ui.playerFlag) this.ui.playerFlag.textContent = this.state.currentPlayerCountry.flag;
        if (this.ui.playerName) this.ui.playerName.textContent = this.state.currentPlayerCountry.name;
        if (this.ui.playerContinent) {
            const turkishName = CONTINENT_NAMES[this.state.currentPlayerCountry.continent] || this.state.currentPlayerCountry.continent;
            this.ui.playerContinent.textContent = turkishName;
        }

        if (this.ui.botFlag) this.ui.botFlag.textContent = this.state.currentOpponentCountry.flag;
        if (this.ui.botName) this.ui.botName.textContent = this.state.currentOpponentCountry.name;
        if (this.ui.botContinent) {
            const turkishName = CONTINENT_NAMES[this.state.currentOpponentCountry.continent] || this.state.currentOpponentCountry.continent;
            this.ui.botContinent.textContent = turkishName;
        }

        // Set music for this round
        this.setTrackForCurrentRound();

        // Apply country theming
        this.applyCountryTheme();
    }

    startGameCountdown() {
        // Show overlay
        this.ui.countdownOverlay.classList.remove('hidden');

        const countdownSequence = ['3', '2', '1', 'BAŞLA!'];
        let index = 0;

        const displayNext = () => {
            if (index < countdownSequence.length) {
                const value = countdownSequence[index];
                this.ui.countdownNumber.textContent = value;

                // Add special class for "BAŞLA!"
                if (value === 'BAŞLA!') {
                    this.ui.countdownNumber.classList.add('start');
                } else {
                    this.ui.countdownNumber.classList.remove('start');
                }

                // Remove and re-add animation class to trigger animation
                this.ui.countdownNumber.style.animation = 'none';
                setTimeout(() => {
                    this.ui.countdownNumber.style.animation = '';
                }, 10);

                index++;

                // Ensure music is playing (Autoplay fix)
                if (value === '3' && !this.state.isMuted && this.ui.bgMusic.paused) {
                    this.ui.bgMusic.volume = GAME_CONFIG.MUSIC_VOLUME;
                    this.ui.bgMusic.play().catch(() => { });
                }

                if (index < countdownSequence.length) {
                    setTimeout(displayNext, GAME_CONFIG.COUNTDOWN_STEP_DURATION);
                } else {
                    // Hide overlay and start game after "BAŞLA!"
                    setTimeout(() => {
                        this.ui.countdownOverlay.classList.add('hidden');
                        // Don't call resetGame here - game is already set up
                        // Just start auto-play
                        this.toggleAutoPlay();
                    }, 1000);
                }
            }
        };

        displayNext();
    }

    applyCountryTheme() {
        const playerColors = this.state.currentPlayerCountry.colors;
        const botColors = this.state.currentOpponentCountry.colors;

        // Set player colors
        document.documentElement.style.setProperty('--player-primary', playerColors.primary);
        document.documentElement.style.setProperty('--card-player-primary', playerColors.primary);
        document.documentElement.style.setProperty('--card-player-secondary', playerColors.secondary);

        // Set bot colors
        document.documentElement.style.setProperty('--bot-primary', botColors.primary);
        document.documentElement.style.setProperty('--card-bot-primary', botColors.primary);
        document.documentElement.style.setProperty('--card-bot-secondary', botColors.secondary);

        document.getElementById('player-section').setAttribute('data-country-theme', 'true');
        document.getElementById('opponent-section').setAttribute('data-country-theme', 'true');

        // Render facts
        this.renderFacts();
    }

    renderFacts() {
        this.ui.playerFacts.innerHTML = '';
        this.ui.botFacts.innerHTML = '';

        const renderList = (facts, container) => {
            const list = facts || [
                "Bu ülke harika!",
                "Kültürü ve tarihi ile tanınır.",
                "İnsanları çok misafirperverdir."
            ];
            list.forEach(fact => {
                const li = document.createElement('li');
                li.textContent = fact;
                container.appendChild(li);
            });
        };

        renderList(this.state.currentPlayerCountry.facts, this.ui.playerFacts);
        renderList(this.state.currentOpponentCountry.facts, this.ui.botFacts);
    }

    // ===== GAME LOGIC (Same as before, with tournament integration) =====


    startCountdown() {
        const targetDate = new Date('January 1, 2026 00:00:00').getTime();

        setInterval(() => {
            const now = new Date().getTime();
            const distance = targetDate - now;

            if (distance < 0) {
                // this.ui.countdown removed
                if (this.ui.scoreboardCountdown) {
                    this.ui.scoreboardCountdown.innerText = "MUTLU YILLAR!";
                }
                return;
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            const countdownText = `${days}g ${hours}s ${minutes}d ${seconds}sn`;
            // this.ui.countdown removed
            if (this.ui.scoreboardCountdown) {
                this.ui.scoreboardCountdown.textContent = countdownText;
            }
        }, 1000);
    }

    initBoard() {
        // Initialize drawn balls grid
        if (this.ui.drawnBallsGrid) {
            this.ui.drawnBallsGrid.innerHTML = '';
        }
    }

    resetGame() {
        clearInterval(this.state.timerInterval);
        clearInterval(this.state.autoPlayInterval);

        this.engine = new GameEngine();
        this.state.gameStartTime = Date.now();
        this.ui.drawBtn.disabled = false;
        this.ui.autoBtn.textContent = 'Otomatik Çek';

        this.initBoard();

        this.resetCinkoProgress();
        this.updateStats();

        this.state.timerInterval = setInterval(() => this.updateGameTime(), 1000);

        // Clear drawn balls grid
        if (this.ui.drawnBallsGrid) {
            this.ui.drawnBallsGrid.innerHTML = '';
        }

        // Reset Bag Count
        if (this.ui.bagCount) this.ui.bagCount.textContent = 90;
    }

    renderCards() {
        this.renderSingleCard(this.state.playerCard, this.ui.playerCardContainer, 'player');
        this.renderSingleCard(this.state.botCard, this.ui.botCardContainer, 'bot');
    }

    renderSingleCard(cardData, container, owner) {
        container.innerHTML = '';
        const cardEl = document.createElement('div');
        cardEl.classList.add('bingo-card');

        // Add country flag background
        if (owner === 'player' && this.state.currentPlayerCountry) {
            cardEl.setAttribute('data-flag', this.state.currentPlayerCountry.flag);
        } else if (owner === 'bot' && this.state.currentOpponentCountry) {
            cardEl.setAttribute('data-flag', this.state.currentOpponentCountry.flag);
        }

        cardData.forEach((row, rIndex) => {
            const rowEl = document.createElement('div');
            rowEl.classList.add('card-row');

            row.forEach((num, cIndex) => {
                const cell = document.createElement('div');
                cell.classList.add('card-cell');
                if (num === 0) {
                    cell.classList.add('empty');
                } else {
                    cell.textContent = num;
                    cell.dataset.number = num;
                    cell.id = `${owner}-card-${rIndex}-${cIndex}`;
                    if (this.engine.drawnNumbers.includes(num)) {
                        cell.classList.add('filled', 'marked');
                    }
                }
                rowEl.appendChild(cell);
            });
            cardEl.appendChild(rowEl);
        });

        container.appendChild(cardEl);
    }

    drawNumber() {
        try {
            // Prevent double click during auto play
            if (this.ui.drawBtn.disabled && !this.state.autoPlayInterval) return;

            this.ui.drawBtn.disabled = true; // Temporary disable

            const num = this.engine.drawNumber();
            if (!num) {
                this.endGame();
                return;
            }

            this.displayMiniBall(num);
            this.checkMatches(num);
            this.updateStats();
            this.checkWinCondition();

            if (!this.state.autoPlayInterval) {
                this.ui.drawBtn.disabled = false; // Re-enable
            }

            // Update Bag Count
            if (this.ui.bagCount) {
                this.ui.bagCount.textContent = this.engine.numbers.length;
            }

        } catch (error) {
            console.error('Error drawing number:', error);
            this.ui.drawBtn.disabled = false;
            showError('Sayı çekme sırasında bir hata oluştu.');
        }
    }

    displayMiniBall(num) {
        // Play flip sound
        this.soundManager.play('flip');

        // Get HSL color for the number
        const hue = ((num - 1) / 89) * 360;
        const colorVar = `hsl(${hue}, 70%, 60%)`;

        // Update current ball display
        if (this.ui.currentBall) {
            this.ui.currentBall.textContent = num;
            this.ui.currentBall.style.background = `linear-gradient(135deg, ${colorVar}, hsl(${hue}, 70%, 50%))`;

            // Add pop animation
            this.ui.currentBall.classList.remove('pop');
            setTimeout(() => {
                this.ui.currentBall.classList.add('pop');
            }, 10);
        }

        // Clear and re-render all drawn numbers in sorted order
        if (this.ui.drawnBallsGrid) {
            this.ui.drawnBallsGrid.innerHTML = '';

            // Sort drawn numbers from smallest to largest
            const sortedNumbers = [...this.engine.drawnNumbers].sort((a, b) => a - b);

            // Render all balls in sorted order
            sortedNumbers.forEach(number => {
                const mini = document.createElement('div');
                mini.classList.add('mini-ball');

                // Highlight the most recent draw
                if (number === num) {
                    mini.classList.add('pop-in');
                }

                mini.textContent = number;
                const ballHue = ((number - 1) / 89) * 360;
                mini.style.background = `hsl(${ballHue}, 70%, 60%)`;
                this.ui.drawnBallsGrid.appendChild(mini);
            });
        }
    }



    checkMatches(num) {
        [this.ui.playerCardContainer, this.ui.botCardContainer].forEach(container => {
            const cells = container.querySelectorAll(`[data-number="${num}"]`);
            cells.forEach(cell => {
                cell.classList.add('filled', 'marked');

                // Mine check logic
                const isPlayer = container.id === 'player-cards';
                const mineSet = isPlayer ? this.state.playerMines : this.state.botMines;

                if (mineSet.has(num)) {
                    cell.classList.add('mine-hit');
                    this.soundManager.play('mine');
                    // Optional: Shake the board or show explosion
                } else {
                    cell.classList.add('safe-hit');
                }
            });
        });
    }

    initBoard() {
        // Get current difficulty settings
        const difficulty = GAME_CONFIG.BOT_DIFFICULTY;
        const settings = BOT_DIFFICULTY_SETTINGS[difficulty];

        // Create cards - Player gets normal, Bot gets strategic
        this.state.playerCard = this.engine.createCard();
        this.state.botCard = this.engine.createCardWithStrategy(settings.cardStrategy);

        // Assign mines - Player gets 3, Bot gets based on difficulty
        this.state.playerMines = this.engine.assignMines(this.state.playerCard, 3);
        this.state.botMines = this.engine.assignMines(this.state.botCard, settings.mineCount);

        // Render cards
        this.renderCards();
    }

    updateStats() {
        const pTotal = GAME_CONFIG.NUMBERS_PER_CARD;
        const bTotal = GAME_CONFIG.NUMBERS_PER_CARD;

        // Count marked cells (safe hits + mine hits)
        const pMarked = this.state.playerCard.flat().filter((num, idx) => {
            return num !== 0 && this.engine.drawnNumbers.includes(num);
        }).length;

        const bMarked = this.state.botCard.flat().filter((num, idx) => {
            return num !== 0 && this.engine.drawnNumbers.includes(num);
        }).length;

        // Count mine hits
        const pMineHits = this.state.playerCard.flat().filter((num, idx) => {
            return num !== 0 && this.engine.drawnNumbers.includes(num) && this.state.playerMines.has(num);
        }).length;

        const bMineHits = this.state.botCard.flat().filter((num, idx) => {
            return num !== 0 && this.engine.drawnNumbers.includes(num) && this.state.botMines.has(num);
        }).length;

        // Calculate SAFE remaining (Total Numbers - Total Mines - (Marked - MineHits))
        // Player always has 3 mines -> 12 Safe Cells total
        const pSafeTotal = pTotal - GAME_CONFIG.MINE_COUNT;
        const pSafeObtained = pMarked - pMineHits;
        const pRemaining = pSafeTotal - pSafeObtained;

        // Bot mines variable
        const bSafeTotal = bTotal - this.state.botMines.size;
        const bSafeObtained = bMarked - bMineHits;
        const bRemaining = bSafeTotal - bSafeObtained;

        // Update UI
        const maxLives = GAME_CONFIG.MAX_MINE_LIVES;
        const pMineLives = maxLives - pMineHits;
        const bMineLives = maxLives - bMineHits;

        if (this.ui.playerRemaining) this.ui.playerRemaining.textContent = pRemaining;
        if (this.ui.botRemaining) this.ui.botRemaining.textContent = bRemaining;

        // Update mine lives
        if (this.ui.playerMineLives) {
            this.ui.playerMineLives.textContent = pMineLives;
            // Add critical class if only 1 life left
            if (pMineLives <= 1) {
                this.ui.playerMineLives.classList.add('critical');
            } else {
                this.ui.playerMineLives.classList.remove('critical');
            }
        }

        if (this.ui.botMineLives) {
            this.ui.botMineLives.textContent = bMineLives;
            if (bMineLives <= 1) {
                this.ui.botMineLives.classList.add('critical');
            } else {
                this.ui.botMineLives.classList.remove('critical');
            }
        }

        // Update progress circles (Based on SAFE progress)
        const pProgress = ((pSafeObtained / pSafeTotal) * 100).toFixed(0);
        const bProgress = ((bSafeObtained / bSafeTotal) * 100).toFixed(0);

        if (this.ui.playerProgressCircle) {
            this.ui.playerProgressCircle.style.background = `conic-gradient(var(--secondary-green) ${pProgress}%, rgba(255,255,255,0.1) ${pProgress}%)`;
        }
        if (this.ui.playerProgressText) {
            this.ui.playerProgressText.textContent = `${pProgress}%`;
        }

        if (this.ui.botProgressCircle) {
            this.ui.botProgressCircle.style.background = `conic-gradient(var(--secondary-green) ${bProgress}%, rgba(255,255,255,0.1) ${bProgress}%)`;
        }
        if (this.ui.botProgressText) {
            this.ui.botProgressText.textContent = `${bProgress}%`;
        }

        // Update diff badges
        const diff = pMarked - bMarked;
        if (this.ui.playerDiff) {
            this.ui.playerDiff.textContent = diff >= 0 ? `+${diff}` : diff;
            this.ui.playerDiff.className = 'diff-badge';
            if (diff > 0) this.ui.playerDiff.classList.add('positive');
            else if (diff < 0) this.ui.playerDiff.classList.add('negative');
        }

        if (this.ui.botDiff) {
            // Bot diff analysis
            const diff = pRemaining - bRemaining;
            const diffText = diff > 0 ? `+${diff}` : diff;
            this.ui.botDiff.textContent = diffText;
            this.ui.botDiff.className = `diff-badge ${diff > 0 ? 'positive' : (diff < 0 ? 'negative' : '')}`;
        }

        // Update Çinko Progress Bars
        this.updateCinkoProgress('player', this.state.playerCard);
        this.updateCinkoProgress('bot', this.state.botCard);
    }

    updateCinkoProgress(owner, card) {
        const drawnNumbersSet = new Set(this.engine.drawnNumbers);
        const cinko1Bar = document.getElementById(`${owner}-cinko-1`);
        const cinko2Bar = document.getElementById(`${owner}-cinko-2`);
        const tombalaBar = document.getElementById(`${owner}-tombala`);

        if (!card || card.length === 0) return;

        // Calculate row completion (true/false for %100 completed rows)
        const rowCompleted = card.map(row => {
            const numbersInRow = row.filter(n => n !== 0);
            const markedCount = numbersInRow.filter(n => drawnNumbersSet.has(n)).length;
            return markedCount === 5;
        });

        // 1. Çinko: ilk satır TAM dolmalı (yoksa progress = işaretli sayılar/5)
        if (cinko1Bar) {
            const numbersInRow = card[0].filter(n => n !== 0);
            const markedCount = numbersInRow.filter(n => drawnNumbersSet.has(n)).length;
            let percent = (markedCount / 5) * 100;
            if (rowCompleted[0]) percent = 100;
            cinko1Bar.style.width = `${percent}%`;
            cinko1Bar.setAttribute('data-progress', Math.round(percent));
            if (percent >= 100) {
                cinko1Bar.setAttribute('data-progress', '100');
            }
        }

        // 2. Çinko: ilk iki satır tamamen dolmalı (progres = toplam işaretli/10, ikisi de TAM ise 100)
        if (cinko2Bar) {
            const numbersInRow1 = card[0].filter(n => n !== 0);
            const numbersInRow2 = card[1].filter(n => n !== 0);
            const marked1 = numbersInRow1.filter(n => drawnNumbersSet.has(n)).length;
            const marked2 = numbersInRow2.filter(n => drawnNumbersSet.has(n)).length;
            let percent = ((marked1 + marked2) / 10) * 100;
            if (rowCompleted[0] && rowCompleted[1]) percent = 100;
            cinko2Bar.style.width = `${percent}%`;
            cinko2Bar.setAttribute('data-progress', Math.round(percent));
            if (percent >= 100) {
                cinko2Bar.setAttribute('data-progress', '100');
            }
        }

        // Tombala: üç satır TAM dolmalı; progres: toplam işaretli/15, üçü de tamam ise 100
        if (tombalaBar) {
            const totals = card.flat().filter(n => n !== 0);
            const marked = totals.filter(n => drawnNumbersSet.has(n)).length;
            let percent = (marked / 15) * 100;
            if (rowCompleted[0] && rowCompleted[1] && rowCompleted[2]) percent = 100;
            tombalaBar.style.width = `${percent}%`;
            tombalaBar.setAttribute('data-progress', Math.round(percent));
            if (percent >= 100) {
                tombalaBar.setAttribute('data-progress', '100');
            }
        }
    }

    resetCinkoProgress() {
        ['player', 'bot'].forEach(owner => {
            const cinko1Bar = document.getElementById(`${owner}-cinko-1`);
            const cinko2Bar = document.getElementById(`${owner}-cinko-2`);
            const tombalaBar = document.getElementById(`${owner}-tombala`);

            if (cinko1Bar) {
                cinko1Bar.style.width = '0%';
                cinko1Bar.setAttribute('data-progress', '0');
            }
            if (cinko2Bar) {
                cinko2Bar.style.width = '0%';
                cinko2Bar.setAttribute('data-progress', '0');
            }
            if (tombalaBar) {
                tombalaBar.style.width = '0%';
                tombalaBar.setAttribute('data-progress', '0');
            }
        });
    }

    checkWinCondition() {
        const pStatus = this.engine.checkGameState(this.state.playerCard, this.state.playerMines, this.engine.drawnNumbers);
        const bStatus = this.engine.checkGameState(this.state.botCard, this.state.botMines, this.engine.drawnNumbers);

        // Priority to Knockouts (Instant Loss)
        if (pStatus === 'KNOCKOUT') {
            // Player hit 3 mines -> Opponent Wins
            this.handleMatchWin(this.state.currentOpponentCountry, 'mine-knockout');
        } else if (bStatus === 'KNOCKOUT') {
            // Bot hit 3 mines -> Player Wins
            this.handleMatchWin(this.state.currentPlayerCountry, 'mine-knockout');
        } else if (pStatus === 'WIN') {
            // Player got 12 safe -> Player Wins
            this.handleMatchWin(this.state.currentPlayerCountry, 'safe-win');
        } else if (bStatus === 'WIN') {
            // Bot got 12 safe -> Bot Wins
            this.handleMatchWin(this.state.currentOpponentCountry, 'safe-win');
        }
    }

    handleMatchWin(winner) {
        this.stopAutoPlay(); // Ensure autoplay is stopped
        clearInterval(this.state.timerInterval); // Stop game timer
        this.ui.drawBtn.disabled = true;

        const isPlayerWin = winner.id === this.state.currentPlayerCountry.id;

        let title = isPlayerWin ? '🎉 Maç Kazanıldı!' : 'Maç Kaybedildi';
        let message = '';

        if (arguments[1] === 'mine-knockout') {
            if (isPlayerWin) {
                title = '💥 RAKİP ELENDİ!';
                message = `Rakip 3 mayına bastı ve nakavt oldu!`;
            } else {
                title = '💥 BOOOOM! ELENDİNİZ!';
                message = `3 mayına bastınız ve elendiniz.`;
            }
        } else {
            message = isPlayerWin ? '12 güvenli sayıyı topladınız!' : 'Rakip 12 güvenli sayıyı topladı.';
        }

        showSuccess(
            `<div style="font-size: 2.5rem; margin-bottom: 0.5rem;">${winner.flag}</div>
            <div style="font-size: 1.3rem; margin-bottom: 0.5rem;">${winner.name}</div>
            <div style="margin-bottom: 0.5rem; font-weight: bold; color: ${isPlayerWin ? '#4CAF50' : '#FF5252'}">${message}</div>
            <div>${isPlayerWin ? 'Bir sonraki tura yükseldiniz!' : 'Elendiniz.'}</div>`,
            title
        );

        // Record result in tournament
        if (this.tournament) {
            this.tournament.recordMatchResult(winner);

            // Check if player was eliminated
            if (!isPlayerWin) {
                // Player eliminated, auto-sim rest of tournament
                setTimeout(() => {
                    this.showBracket();
                    setTimeout(() => this.autoSimulateMatches(), 500);
                }, 2000);
            } else {
                // Player won, show bracket then continue
                setTimeout(() => {
                    this.showBracket();
                    setTimeout(() => this.proceedToMatch(), 500);
                }, 2000);
            }
        }
    }

    updateGameTime() {
        if (!this.state.gameStartTime) return;

        const now = Date.now();
        const diff = Math.floor((now - this.state.gameStartTime) / 1000);
        const m = Math.floor(diff / 60).toString().padStart(2, '0');
        const s = (diff % 60).toString().padStart(2, '0');
        const timeText = `${m}:${s}`;

        // Update main timer if it exists
        if (this.ui.gameTime) {
            this.ui.gameTime.textContent = timeText;
        }

        // Update scoreboard timer if it exists
        if (this.ui.scoreboardGameTime) {
            this.ui.scoreboardGameTime.textContent = timeText;
        }
    }

    toggleAutoPlay() {
        if (this.state.autoPlayInterval) {
            this.stopAutoPlay();
        } else {
            this.state.autoPlayInterval = setInterval(() => this.drawNumber(), GAME_CONFIG.AUTO_PLAY_INTERVAL);
            this.ui.autoBtn.textContent = 'Durdur';
            this.ui.autoBtn.classList.add('primary-btn');
        }
    }

    stopAutoPlay() {
        clearInterval(this.state.autoPlayInterval);
        this.state.autoPlayInterval = null;
        this.ui.autoBtn.textContent = 'Otomatik Çek';
        this.ui.autoBtn.classList.remove('primary-btn');
    }

    setupEventListeners() {
        // Tournament
        this.ui.btnRandom32.addEventListener('click', () => this.selectRandom32());
        this.ui.btnStartTournament.addEventListener('click', () => this.startTournament());
        this.ui.btnCloseBracket.addEventListener('click', () => this.proceedToMatch());

        // Continent Breakdown & Draw Ceremony
        this.ui.btnContinueToDraw.textContent = "Turnuvaya Git";
        this.ui.btnContinueToDraw.addEventListener('click', () => this.initializeTournament());

        // Removed skip draw button listener as ceremony is removed

        // Search Filter with debounce for performance
        const performSearch = debounce((searchTerm) => {
            document.querySelectorAll('.country-card').forEach(card => {
                const name = card.querySelector('.country-name')?.textContent.toLowerCase() || '';
                // Show all if search is empty, otherwise filter
                if (searchTerm === '' || name.includes(searchTerm)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        }, 300);

        this.ui.searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase().trim();
            performSearch(searchTerm);
        });

        // Music Animation Sync
        this.ui.bgMusic.addEventListener('play', () => {
            const vinyl = document.getElementById('vinyl-record');
            if (vinyl) vinyl.classList.add('playing');
        });

        this.ui.bgMusic.addEventListener('pause', () => {
            const vinyl = document.getElementById('vinyl-record');
            if (vinyl) vinyl.classList.remove('playing');
        });

        // Game
        this.ui.drawBtn.addEventListener('click', () => this.drawNumber());
        this.ui.autoBtn.addEventListener('click', () => this.toggleAutoPlay());
        this.ui.restartBtn.addEventListener('click', async () => {
            const shouldReturn = await showConfirm('Braket ekranına dönmek ister misiniz?', 'Braket Ekranı');
            if (shouldReturn) {
                this.showBracket();
            }
        });

        this.ui.muteBtn.addEventListener('click', () => {
            this.state.isMuted = !this.state.isMuted;
            this.ui.muteBtn.textContent = this.state.isMuted ? '🔇' : '🔊';

            if (this.state.isMuted) {
                this.ui.bgMusic.pause();
            } else {
                this.ui.bgMusic.volume = GAME_CONFIG.MUSIC_VOLUME;
                this.ui.bgMusic.play().catch(() => { });
            }
        });

        document.body.addEventListener('click', () => {
            if (!this.state.isMuted && this.ui.bgMusic.paused) {
                this.ui.bgMusic.volume = GAME_CONFIG.MUSIC_VOLUME;
                this.ui.bgMusic.play().catch(() => { });
            }
        }, { once: true });
    }

    setupKeyboardListeners() {
        document.addEventListener('keydown', (e) => {
            // Prevent shortcuts when typing in input fields
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
                return;
            }

            // 'Q' key for quick start: select random 32 countries and start tournament
            if (e.key.toLowerCase() === 'q') {
                if (this.ui.selectionScreen.classList.contains('active')) {
                    e.preventDefault();
                    this.selectRandom32();
                    this.startTournament();
                }
            }

            // 'S' key for continue on tournament bracket screen
            if (e.key.toLowerCase() === 's') {
                if (this.ui.bracketScreen.classList.contains('active')) {
                    e.preventDefault();
                    this.proceedToMatch();
                }
            }

            // 'M' key for mute/unmute
            if (e.key.toLowerCase() === 'm') {
                this.ui.muteBtn.click();
            }

            // 'A' key for Auto Play (on game screen)
            if (e.key.toLowerCase() === 'a') {
                if (!this.ui.autoBtn.disabled && this.ui.gameContainer.classList.contains('active')) {
                    this.ui.autoBtn.click();
                }
            }
        });
    }

    endGame() {
        this.stopAutoPlay(); // Ensure autoplay is stopped
        this.ui.drawBtn.disabled = true;

        // In tournament mode, determine winner by who has fewer remaining numbers
        if (this.tournament) {
            const pRemaining = this.state.playerCard.flat().filter(n => n !== 0 && !this.engine.drawnNumbers.includes(n)).length;
            const bRemaining = this.state.botCard.flat().filter(n => n !== 0 && !this.engine.drawnNumbers.includes(n)).length;

            const winner = pRemaining < bRemaining ? this.state.currentPlayerCountry : this.state.currentOpponentCountry;
            this.handleMatchWin(winner);
        } else {
            showAlert("Oyun bitti - numaralar tükendi!");
        }
    }
}

// Start
document.addEventListener('DOMContentLoaded', () => {
    try {
        console.log("App initializing...");
        window.gameApp = new TombalaApp();
        console.log("App initialized successfully");
    } catch (e) {
        console.error("Initialization Error:", e);
        // Create a visible error element since console might be hidden
        const errDiv = document.createElement('div');
        errDiv.style.position = 'fixed';
        errDiv.style.top = '0';
        errDiv.style.left = '0';
        errDiv.style.width = '100%';
        errDiv.style.background = 'red';
        errDiv.style.color = 'white';
        errDiv.style.zIndex = '99999';
        errDiv.style.padding = '20px';
        errDiv.textContent = 'Init Error: ' + e.message + '\n' + e.stack;
        document.body.appendChild(errDiv);
    }
});
