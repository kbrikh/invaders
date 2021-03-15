import { Invaders } from './invaders.class.js';
import { Shooter } from './shooter.class.js';
import { Field } from './field.class.js';


const field = new Field();
const squares = field.create();
const invaders = new Invaders(squares);

const shooter = new Shooter(squares, invaders);
shooter.move();
shooter.fire();
invaders.draw();
invaders.move(shooter.shooterIndex);
