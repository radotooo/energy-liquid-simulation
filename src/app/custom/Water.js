import Hearth from './backup/Hearth';

export default class Water {
  constructor() {
    this.container = document.createElement('div');
    this.canvas = document.createElement('canvas');

    this.canvas.height = window.innerHeight;
    this.canvas.width = window.innerWidth;

    this.container.appendChild(this.canvas);

    this.context = this.canvas.getContext('2d');
    this.increment = 0;

    this.hearths = [];
    this.makeHearths();

    this.draw();
    this.addEventListeners();
  }

  makeHearths() {
    for (let i = 0; i < 10; i++) {
      const hearth = new Hearth(this.context);
      this.hearths.push(hearth);
    }
  }

  draw() {
    this.context.clearRect(0, 0, innerWidth, innerHeight);

    this.context.beginPath();

    this.context.fillStyle = '#2449A3';
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.moveTo(0, this.canvas.height / 2);

    for (let i = 0; i < this.canvas.width; i++) {
      this.context.lineTo(
        i,
        this.canvas.height / 2 + Math.sin(i * 0.01 + this.increment) * 20
      );
    }

    this.context.lineTo(this.canvas.width, this.canvas.height);
    this.context.lineTo(0, this.canvas.width);

    this.increment += 0.02;
    const gradient = this.context.createLinearGradient(
      this.canvas.width / 2,
      this.canvas.height,
      this.canvas.width / 2,
      this.canvas.height / 2
    );
    gradient.addColorStop(1, '#4389F3');
    gradient.addColorStop(0.3, '#264CA7');

    this.context.fillStyle = gradient;

    this.context.fill();

    requestAnimationFrame(() => this.draw());
  }

  resize() {
    this.canvas.height = window.innerHeight;
    this.canvas.width = window.innerWidth;
  }
  addEventListeners() {
    window.addEventListener('resize', () => this.resize());
    window.addEventListener('mousemove', (e) => {
      // console.log(e);
    });
  }
}
