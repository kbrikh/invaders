export class Shooter {
    constructor(map, invaders) {
        this.scoreValue = 0;
        this.shooterIndex = 202;
        this.width = 15;
        this.map = map;
        this.invaders = invaders;
        this.map[this.shooterIndex].classList.add('shooter');
    }

    move() {
        document.addEventListener('keydown', this.moveHandler.bind(this));
    }

    moveHandler(e) {
        this.map[this.shooterIndex].classList.remove('shooter');

        switch (e.key) {
            case 'ArrowLeft':
                if (this.shooterIndex % this.width !== 0) {
                    this.shooterIndex -= 1;
                }
                break;
            case 'ArrowRight':
                if (this.shooterIndex % this.width < this.width - 1) {
                    this.shooterIndex += 1;
                }
                break;
        }

        this.map[this.shooterIndex].classList.add('shooter');
    }

    fire() {
        document.addEventListener('keyup', this.shoot.bind(this));
    }

    shoot(e) {
        let scoreEvent = new CustomEvent('score', { detail: this.scoreValue + 1 });

        if (e.key === 'ArrowUp') {
            let fireIndex = this.shooterIndex;

            let fireInterval = setInterval(() => {
                this.map[fireIndex].classList.remove('fire');
                fireIndex -= 15;

                if (fireIndex < 0) {
                    clearInterval(fireInterval);
                    return;
                }

                this.map[fireIndex].classList.add('fire');

                if (this.map[fireIndex].classList.contains('invaders', 'fire')) {
                    this.map[fireIndex].classList.remove('fire');
                    this.map[fireIndex].classList.remove('invaders');

                    this.invaders.invaders.splice(this.invaders.invaders.indexOf(fireIndex), 1);

                    clearInterval(fireInterval);

                    this.scoreValue += 1;

                    document.dispatchEvent(scoreEvent);
                }
            }, 100);
        }
    }

    removeHandler() {
        document.removeEventListener('keydown', this.moveHandler);
        document.removeEventListener('keyup', this.shoot);
    }
}
