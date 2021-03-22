export class Scene {
    constructor(width, height) {
        this.grid = document.querySelector('.grid');
        this.result = document.querySelector('.result');
        this.score = document.querySelector('.score');
        this.width = width;
        this.height = height;
        this.squares = null;
        this.actors = [];
        this.images = [];
    }

    create() {
        for (let i = 0; i < 225; i++) {
            let square = document.createElement('div');
            this.grid.appendChild(square);
        }

        this.squares = Array.from(document.querySelectorAll('.grid div'));

        if (this.actors.length) {
            this.actors.forEach(actor => {
                actor.draw();
            });
        }
    }

    register(actor) {
        this.actors.push(actor);
    }

    unregister(actor) {
        let idx = this.actors.indexOf(actor);

        if (idx !== -1) {
            this.actors.splice(idx, 1);
        }
    }

}
