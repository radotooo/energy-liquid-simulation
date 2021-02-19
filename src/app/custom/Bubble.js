import EventEmitter from 'eventemitter3';
import gsap from 'gsap/all';

const EVENTS = {
  ANIMATION_COMPLETE: 'animation_complete',
};

/**
 * Create new Bubble svg
 * @class
 */
export default class Bubble extends EventEmitter {
  /**
   * @param {Object} config Bubble configuration
   * @param {Boolean} loopInfinitly Repeat the animation infinitly
   * @param {Number} parentWidth Width size of parrent dom element
   */
  constructor(config, loopInfinitly, parentWidth) {
    super();
    /**
     * @type {Object}
     * @private
     */
    this._config = config;

    /**
     * @type {Boolean}
     * @private
     */
    this._loopInfinitly = loopInfinitly;

    /**
     * @type {Number}
     * @private
     */
    this._parentWidth = parentWidth;

    /**
     * @type {gsap.timeline}
     * @private
     */
    this._tl = null;

    this._init();
  }

  static get events() {
    return EVENTS;
  }

  /**
   * Animate bubble element
   * @public
   */
  async animate() {
    await this._tl
      .fromTo(
        this.element,
        {
          duration: 0.01,
          attr: {
            cx: `random(1,${this._parentWidth})`,
            r: `random(${this._config.radiusMin},${this._config.radiusMax})`,
            cy: 450,
          },
          opacity: 1,
        },
        {
          duration: this._config.animation.duration,
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

  /**
   * Initializes bubble element
   * @private
   */
  _init() {
    this._addBubble();
    this._addTimeLine();
  }

  /**
   * Add gsap TimeLIne
   * @private
   */
  _addTimeLine() {
    this._tl = new gsap.timeline({
      repeat: this._loopInfinitly ? -1 : 0,
      repeatRefresh: true,
      onComplete: () => {
        this.emit(Bubble.events.ANIMATION_COMPLETE, this.element);
      },
    });
  }

  /**
   * Create svg elemenet
   * @private
   */
  _addBubble() {
    this.element = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'circle'
    );
    this.element.setAttribute('fill', this._config.color);
  }
}
