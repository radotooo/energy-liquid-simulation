import EventEmitter from 'eventemitter3';
import gsap from 'gsap/all';
import config from '../../config';
import { makeCssClassNameSelector } from '../utils';

const EVENTS = {
  ANIMATION_COMPLETE: 'animation_complete',
};

/**
 * Create new Bubble svg
 * @class
 * @param {Boolean} loopInfinitly repeat the animation infinitly
 */
export default class Bubble extends EventEmitter {
  constructor(loopInfinitly) {
    super();
    this.loopInfinitly = loopInfinitly;

    /**
     * @type {gsap.timeline}
     * @private
     */
    this.tl = null;

    this._addTimeLine();
    this._getParrentContainerSize();
    this._init();
  }

  static get events() {
    return EVENTS;
  }

  /**
   * Get parent container width
   * @private
   */
  _getParrentContainerSize() {
    const parentElement = document.querySelector(
      makeCssClassNameSelector(config.wave.container.className)
    );

    this.parentWidth = parentElement.offsetWidth;
  }

  /**
   * Add gsap TimeLIne
   * @private
   */
  _addTimeLine() {
    this.tl = new gsap.timeline({
      repeat: this.loopInfinitly ? -1 : 0,
      repeatRefresh: true,
      onComplete: () => {
        this.emit(Bubble.events.ANIMATION_COMPLETE, this.element);
      },
    });
  }

  /**
   * @private
   */
  _init() {
    this.element = document.createElementNS(
      config.svgns,
      config.bubble.type.circle
    );
    this.element.setAttribute('fill', config.bubble.color);

    // append to current svg dom element
    this.svg = document.querySelector(
      makeCssClassNameSelector(config.wave.svg.className)
    );
    this.svg.appendChild(this.element);
  }

  async animate() {
    await this.tl
      .fromTo(
        this.element,
        {
          duration: 0.01,
          attr: {
            cx: `random(${config.bubble.animation.cxMin},${this.parentWidth})`,
            r: `random(${config.bubble.animation.radiusMin},${config.bubble.animation.radiusMax})`,
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
