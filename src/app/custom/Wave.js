import gsap from 'gsap/all';

/**
 *  Class representing a Wave
 * @class
 */
export default class Wave {
  /**
   * Creates an instance of Wave
   * @param {Object} config Wave configuration
   */
  constructor(config) {
    /**
     * @type {Object}
     * @private
     */
    this._config = config;

    /**
     * @type {HTMLElement}
     * @private
     */
    this._container = document.querySelector('.container');

    /**
     * @type {HTMLElement}
     * @public
     */
    this.waveElement = document.createElement('div');

    /**
     * @type {SVGElement}
     * @private
     */
    this._path = null;

    /**
     * @type {SVGElement}
     * @public
     */
    this.svg = null;

    /**
     * @type {SVGElement}
     * @private
     */
    this._gradient = null;

    this._init();
  }

  /**
   * Animate wave element
   * @public
   */
  animate() {
    gsap.to(this._path, {
      duration: this._config.animation.duration,
      attr: {
        d: 'M0 220 Q360 300 720 220 T 1440 220 V440 H0 Z',
      },
      ease: 'Power1.easeInOut',
      repeat: -1,
      yoyo: true,
    });
  }

  /**
   * Create wave container with wave svg inside
   * @private
   */
  _init() {
    this.waveElement.setAttribute('class', 'wave-container');

    this._addGradient();
    this._addPath();
    this._addSvg();

    this.svg.appendChild(this._gradient);
    this.svg.appendChild(this._path);
    this.waveElement.appendChild(this.svg);

    this._container.appendChild(this.waveElement);
  }

  /**
   * Add SVG
   * @private
   */
  _addSvg() {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

    svg.setAttribute('class', 'waveSvg');
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    svg.setAttribute('viewBox', '0 0 1440 440');
    this.svg = svg;
  }

  /**
   * Add SVG path
   * @private
   */
  _addPath() {
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');

    path.setAttribute('fill', `url(#paint0_linear)`);
    path.setAttribute('d', 'M0 220 Q360 120 720 220 T 1440 220 V440 H0 Z');
    path.style.cursor = 'pointer';
    this._path = path;
  }

  /**
   * Add SVG gradient
   * @private
   */
  _addGradient() {
    const gradient = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'linearGradient'
    );

    gradient.setAttribute('id', 'paint0_linear');
    gradient.setAttribute('y1', '0');
    gradient.setAttribute('x2', '0');
    gradient.setAttribute('y2', '100%');
    gradient.setAttribute('gradientUnits', 'userSpaceOnUse');

    const stop1 = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'stop'
    );

    stop1.setAttribute('stop-color', this._config.gradient.topColor);

    const stop2 = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'stop'
    );

    stop2.setAttribute('offset', '1');
    stop2.setAttribute('stop-color', this._config.gradient.bottomColor);

    gradient.appendChild(stop1);
    gradient.appendChild(stop2);
    this._gradient = gradient;
  }
}
