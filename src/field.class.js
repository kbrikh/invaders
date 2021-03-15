export class Field {
    constructor() {
        this.squares;
        this.grid = document.querySelector('.grid');
    }
    create() {
        for (let i = 0; i < 225; i++) {
            let square = document.createElement('div');
            this.grid.appendChild(square);
        }
        this.squares = Array.from(document.querySelectorAll('.grid div'));
        return this.squares;
    }


}
