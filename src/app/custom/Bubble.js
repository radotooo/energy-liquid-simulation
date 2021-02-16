import gsap from 'gsap/all';

const svgns = 'http://www.w3.org/2000/svg';

export default class Bubble {
  constructor() {
    this.element = document.createElementNS(svgns, 'circle');
    this.parrentContainer = document.querySelector('.container');

    this.init();
    this.animate();
  }

  init() {
    this.element.setAttribute('fill', '#5cceee');
    const svg = document.querySelector('svg');
    svg.appendChild(this.element);
  }

  async animate() {
    const tl = new gsap.timeline({ repeat: -1, repeatRefresh: true });

    await tl
      .fromTo(
        this.element,
        {
          duration: 0.01,
          attr: {
            cx: `random(1,${this.parrentContainer.offsetWidth})`,
            r: `random(1,10)`,
            cy: 500,
          },
          opacity: 1,
        },
        {
          duration: 7,
          ease: 'Power1.in',
          attr: {
            cy: 100,
          },
        }
      )
      .to(
        this.element,
        {
          duration: 2,
          attr: {
            r: 0,
          },
          opacity: 0,
          ease: 'Power2.out',
        },
        '-=2.5'
      );
  }
}
