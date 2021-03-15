export class Invaders {

    constructor(map) {
        this.result = document.querySelector('.result');
        this.map = map;
        this.direction = 1;
        this.goingRight = true;
        this.width = 15;
        this.invaderId;
        this.speedInvaders = 100;

        this.invaders = [
            0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
            15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
            30, 31, 32, 33, 34, 35, 36, 37, 38, 39
        ];
    }

    draw() {
        for (let i = 0; i < this.invaders.length; i++) {
            this.map[this.invaders[i]].classList.add('invaders');

        }
    }

    remove() {
        for (let i = 0; i < this.invaders.length; i++) {
            this.map[this.invaders[i]].classList.remove('invaders');

        }
    }

    move(shooterIndex) {
        this.invaderId = setInterval(this.deplace.bind(this, shooterIndex), this.speedInvaders);
    }

    deplace(shooterIndex) {
        let leftEdge = this.invaders[0] % this.width === 0;
        let rightEdge = this.invaders[this.invaders.length - 1] % (this.width) === this.width - 1;

        this.remove();

        if (rightEdge && this.goingRight) {
            for (let i = 0; i < this.invaders.length; i++) {
                this.invaders[i] += this.width + 1
            }
            this.direction = -1
            this.goingRight = false
        }

        if (leftEdge && !this.goingRight) {
            for (let i = 0; i < this.invaders.length; i++) {
                this.invaders[i] += this.width - 1
            }
            this.direction = 1
            this.goingRight = true
        }

        for (let i = 0; i < this.invaders.length; i++) {
            this.invaders[i] += this.direction
        }

        this.draw();

        if (this.map[shooterIndex].classList.contains('invaders', 'shooter')) {
            clearInterval(this.invaderId);
            this.result.innerHTML = 'Game Over !';

        }

        if (this.invaders[this.invaders.length] > 225) {
            clearInterval(this.invaderId);
            this.result.innerHTML = 'Game Over !';

        }
    }

}
