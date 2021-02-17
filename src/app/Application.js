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
  constructor() {
    super();
    this.data = {};

    this.init();
  }

  static get events() {
    return EVENTS;
  }

  /**
   * Create bubbles
   * @param {Number} count Number of bubbles to create
   * @param {Number} timeDelay Time between each bubble spawn
   * @param {Boolean} loopForever Keep bubble on screen forever
   */
  async _addBubbles(count, timeDelay, loopForever = true) {
    for (let i = 0; i < count; i++) {
      setTimeout(() => {
        new Bubble(loopForever);
      }, getRandomNum(1, timeDelay) * 1000);
    }
  }

  /**
   * Add eventListener to wave element
   * @private
   */
  _addEventListener() {
    this.data.wave.element.addEventListener('click', () =>
      this._addBubbles(10, 2, false)
    );
  }

  /**
   * Create wave element
   * @private
   */
  _addWave() {
    const wave = new Wave();

    this.data.wave = wave;
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
    this._addBubbles(20, 8);

    this._addEventListener();
    this.emit(Application.events.APP_READY);
  }
}
