import config from '../config';

/**
 * App entry point.
 * All configurations are described in src/config.js
 */
export default class Application {
  constructor() {
    this.config = config;

    this.init();
  }

  /**
   * Initializes the app.
   * Called when the DOM has loaded. You can initiate your custom classes here
   * and manipulate the DOM tree.
   */
  async init() {

  }
}

