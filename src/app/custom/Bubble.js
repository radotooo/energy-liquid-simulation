import gsap from 'gsap/all';

export default class Bubble {
  constructor(loopForever) {
    this.loopForever = loopForever;

    this.element = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'circle'
    );
    this.parrentContainer = document.querySelector('.container');
    this.svg = document.querySelector('svg');

    this._addTimeLine();
    this._init();
    this.animate();
  }

  /**
   * Add gsap TimeLIne
   * @private
   */
  _addTimeLine() {
    this.tl = new gsap.timeline({
      repeat: this.loopForever ? -1 : 0,
      repeatRefresh: true,
      onComplete: this.loopForever || this._clear.bind(this),
    });
  }

  /**
   * @private
   */
  _init() {
    this.element.setAttribute('fill', '#5cceee');
    this.svg.appendChild(this.element);
  }

  /**
   * Clear DOM from unused elements
   * @private
   */
  _clear() {
    this.svg.removeChild(this.element);
  }

  async animate() {
    await this.tl
      .fromTo(
        this.element,
        {
          duration: 0.01,
          attr: {
            cx: `random(1,${this.parrentContainer.offsetWidth})`,
            r: `random(1,10)`,
            cy: 450,
          },
          opacity: 1,
        },
        {
          duration: 5,
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
