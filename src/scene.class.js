export class Field {
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



}
