export class EffectsManager {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
    }

    startSnow() {
        if (!this.container) return;

        this.container.innerHTML = ''; // Clear existing
        for (let i = 0; i < 60; i++) {
            const flake = document.createElement('div');
            flake.classList.add('snowflake');
            flake.innerHTML = '❄';
            flake.style.left = Math.random() * 100 + 'vw';
            flake.style.animationDuration = (Math.random() * 5 + 5) + 's, ' + (Math.random() * 2 + 1) + 's';
            flake.style.animationDelay = Math.random() * 5 + 's, ' + Math.random() + 's';
            flake.style.opacity = Math.random();
            flake.style.fontSize = (Math.random() * 10 + 10) + 'px';
            this.container.appendChild(flake);
        }
    }
}
