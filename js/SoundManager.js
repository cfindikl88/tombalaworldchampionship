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

    async play(soundName) {
        const sound = this.sounds[soundName];
        if (sound) {
            try {
                sound.currentTime = 0;
                await sound.play();
            } catch (e) {
                // Common error: "The user didn't interact with the document first."
                // Only log if it's NOT an interaction error to avoid console noise
                if (e.name !== 'NotAllowedError') {
                    console.warn(`SoundManager: Failed to play '${soundName}'`, e);
                }
            }
        }
    }

    setVolume(volume) {
        Object.values(this.sounds).forEach(sound => {
            sound.volume = volume;
        });
    }
}
