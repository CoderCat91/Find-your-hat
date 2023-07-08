const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
    constructor(field = [[]]) {
      this.field = field;
      this.locationX = 0;
      this.locationY = 0;
      this.field[0][0] = pathCharacter;
    }
    
    askQuestion() {
        const answer = prompt('Which way? ').toUpperCase();
        switch (answer) {
          case 'U':
            this.locationY -= 1;
            break;
          case 'D':
            this.locationY += 1;
            break;
          case 'L':
            this.locationX -= 1;
            break;
          case 'R':
            this.locationX += 1;
            break;
          default:
            console.log('Enter U, D, L or R.');
            this.askQuestion();
            break;
        }
      }
    
 
playGame() {
    let running = true;
    while (running) {
      this.print();
      this.askQuestion();
      if (!this.isInBounds()) {
        console.log('Out of bounds instruction!');
        running = false;
        break;
      } else if (this.isHole()) {
        console.log('Oh no, you fell down a hole!');
        running = false;
        break;
      } else if (this.isHat()) {
        console.log('Woop, you found your hat!');
        running = false;
        break;
      }
      this.field[this.locationY][this.locationX] = pathCharacter;
    }
  }
  isInBounds() {
    return (
      this.locationY >= 0 &&
      this.locationX >= 0 &&
      this.locationY < this.field.length &&
      this.locationX < this.field[0].length
    );
  }

  isHat() {
    return this.field[this.locationY][this.locationX] === hat;
  }

  isHole() {
    return this.field[this.locationY][this.locationX] === hole;
  }

print() {
    const printField = this.field.map(row => {
        return row.join(' ');
    }).join('\n');
    console.log(printField);
}
static generateField(height, width, percentage = 0.1) {
    const field = new Array(height).fill(0).map(el => new Array(width));
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const prob = Math.random();
        field[y][x] = prob > percentage ? fieldCharacter : hole;
      }
    }
    const wheresHat = {
        y: Math.floor(Math.random() * height),
        x: Math.floor(Math.random() * width)
    };
    while (wheresHat.x === 0 && wheresHat.y === 0) {
        wheresHat.y = Math.floor(Math.random() * height);
        wheresHat.x = Math.floor(Math.random() * width);
    }
    field[wheresHat.y][wheresHat.x] = hat;
    return field;
}
}
const myfield = new Field(Field.generateField(10, 10, 0.2));
myfield.playGame();
