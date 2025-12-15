export class SoundManager {
    constructor() {
        this.sounds = {
            mine: new Audio('assets/audio/mine.mp3'),
            flip: new Audio('assets/audio/flip.mp3')
        };

        // Preload sounds
        Object.values(this.sounds).forEach(sound => {
            sound.load();
            sound.volume = 0.5;
        });
    }

    play(soundName) {
        const sound = this.sounds[soundName];
        if (sound) {
            sound.currentTime = 0;
            sound.play().catch(e => {
                // Ignore errors (e.g. if user hasn't interacted with document yet or file missing)
                console.warn(`Could not play sound: ${soundName}`, e);
            });
        }
    }

    setVolume(volume) {
        Object.values(this.sounds).forEach(sound => {
            sound.volume = volume;
        });
    }
}
