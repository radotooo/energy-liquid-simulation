import EventEmitter from 'eventemitter3';

import Wave from './custom/Wave';
import Bubble from './custom/Bubble';
import config from '../config';

import { getRandomNum, makeCssClassNameSelector } from './utils';

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
  async _addBubbles(count, timeDelayMin, timeDelayMax, loopForever = true) {
    for (let i = 0; i < count; i++) {
      setTimeout(() => {
        const bubble = new Bubble(loopForever);

        bubble.on(Bubble.events.ANIMATION_COMPLETE, (el) =>
          this._removeElement(el)
        );
        bubble.animate();
      }, getRandomNum(timeDelayMin, timeDelayMax) * 1000);
    }
  }

  /**
   * Remove unused bubble element from dom
   * @param {Bubble} el instance of Bubble
   */
  _removeElement(el) {
    const svg = document.querySelector(
      makeCssClassNameSelector(config.wave.svg.className)
    );

    svg.removeChild(el);
  }

  /**
   * Add eventListener to wave element
   * @private
   */
  _addEventListener() {
    this.wave.element.addEventListener('click', () =>
      this._addBubbles(
        config.app.onClick.bubblecCount,
        config.app.onClick.timeDelayMin,
        config.app.onClick.timeDelayMax,
        false
      )
    );
  }

  /**
   * Create wave element
   * @private
   */
  _addWave() {
    this.wave = new Wave();
    this.wave.animate();
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
    this._addBubbles(
      config.app.infinityLoop.bubblesCount,
      config.app.infinityLoop.timeDelayMin,
      config.app.infinityLoop.timeDelayMax
    );

    this.emit(Application.events.APP_READY);
  }
}
