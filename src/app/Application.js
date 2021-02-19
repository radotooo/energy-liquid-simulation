import EventEmitter from 'eventemitter3';
import Wave from './custom/Wave';
import Bubble from './custom/Bubble';
import { getRandomNum } from './utils';

const EVENTS = {
  APP_READY: 'app_ready',
};

/**
 * App entry point.
 * All configurations are described in src/config.js
 */
export default class Application extends EventEmitter {
  /**
   *
   * @param {Object} config Application configuration
   */
  constructor(config) {
    super();
    /**
     * @type {Object}
     * @private
     */
    this._config = config;

    /**
     * @type {Object}
     * @private
     */
    this._wave = null;

    this.init();
  }

  static get events() {
    return EVENTS;
  }

  /**
   * Create bubbles
   * @param {Number} count Number of bubbles to create
   * @param {Number} timeDelayMin Minimum time between each bubble spawn
   * @param {Number} timeDelayMax Maximum time between each bubble spawn
   * @param {Boolean} loopForever Keep bubble on screen forever
   */
  async _addBubbles(count, timeDelayMin, timeDelayMax, loopForever = true) {
    for (let i = 0; i < count; i++) {
      setTimeout(() => {
        const bubble = new Bubble(
          this._config.bubble,
          loopForever,
          this._wave.waveElement.offsetWidth
        );

        bubble.on(Bubble.events.ANIMATION_COMPLETE, (el) =>
          this._removeElement(el)
        );

        bubble.animate();
        this._wave.svg.appendChild(bubble.element);
      }, getRandomNum(timeDelayMin, timeDelayMax) * 1000);
    }
  }

  /**
   * Remove unused bubble element from dom
   * @param {Bubble} el instance of Bubble
   */
  _removeElement(el) {
    this._wave.svg.removeChild(el);
  }

  /**
   * Add eventListener to wave element
   * @private
   */
  _addEventListener() {
    this._wave.waveElement.addEventListener('click', () =>
      this._addBubbles(this._config.app.bubblesAddedOnClick.count, 2, 1, false)
    );
  }

  /**
   * Create wave element
   * @private
   */
  _addWave() {
    this._wave = new Wave(this._config.wave);
    this._wave.animate();
  }

  /**
   * Initializes the app.
   * Called when the DOM has loaded. You can initiate your custom classes here
   * and manipulate the DOM tree. Task data should be assigned to Application.data.
   * The APP_READY event should be emitted at the end of this method.
   */
  async init() {
    // Initiate classes and wait for async operations here.
    this._addWave();
    this._addEventListener();
    this._addBubbles(this._config.app.bubblesAddedInLoop.count, 1, 8);

    this.emit(Application.events.APP_READY);
  }
}
