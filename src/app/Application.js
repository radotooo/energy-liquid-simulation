import config from '../config';
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

    this.config = config;
    this.data = {};

    this.init();
  }

  static get events() {
    return EVENTS;
  }

  _addBubbles(count) {
    for (let i = 0; i < count; i++) {
      setTimeout(() => {
        new Bubble();
      }, getRandomNum(1, 8) * 1000);
    }
  }

  _addWave() {
    const wave = new Wave();
    wave.animate();
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
    this._addBubbles(20);

    this.emit(Application.events.APP_READY);
  }
}
