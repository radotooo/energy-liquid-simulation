import gsap from 'gsap/all';
import config from '../../config';
import { makeCssClassNameSelector } from '../utils';

/**
 * Create new Wave svg
 * @class
 */
export default class Wave {
  constructor() {
    this.element = null;

    this._getParrentContainer();
    this._init();
  }

  /**
   * @private
   */
  _getParrentContainer() {
    const parentElement = document.querySelector(
      makeCssClassNameSelector(config.mainContainer.className)
    );

    this.container = parentElement;
  }

  animate() {
    gsap.to(this.element, {
      duration: config.wave.animation.duration,
      attr: {
        d: config.wave.animation.d,
      },
      ease: 'Power1.easeInOut',
      repeat: config.wave.animation.repeat,
      yoyo: config.wave.animation.yoyo,
    });
  }

  /**
   * Create wave container with wave svg inside
   * @private
   */
  _init() {
    const wave = document.createElement('div');

    wave.setAttribute('class', config.wave.container.className);
    wave.style.position = config.wave.container.position;
    wave.style.bottom = config.wave.container.bottom;
    wave.style.width = config.wave.container.width;

    const svg = document.createElementNS(config.svgns, 'svg');

    svg.setAttribute('class', config.wave.svg.className);
    svg.setAttribute('width', config.wave.svg.width);
    svg.setAttribute('height', config.wave.svg.height);
    svg.setAttribute('viewBox', config.wave.svg.viewBox);

    const path = document.createElementNS(config.svgns, 'path');

    path.setAttribute('fill', `url(#${config.wave.gradient.id})`);
    path.setAttribute('d', config.wave.path.d);
    path.style.cursor = config.wave.path.style.cursor;

    const defs = document.createElementNS(config.svgns, 'defs');

    const gradient = document.createElementNS(config.svgns, 'linearGradient');

    gradient.setAttribute('id', config.wave.gradient.id);
    gradient.setAttribute('x1', config.wave.gradient.x1);
    gradient.setAttribute('y1', config.wave.gradient.y1);
    gradient.setAttribute('x2', config.wave.gradient.x2);
    gradient.setAttribute('y2', config.wave.gradient.y2);
    gradient.setAttribute('gradientUnits', config.wave.gradient.gradientUnits);

    const stop1 = document.createElementNS(config.svgns, 'stop');

    stop1.setAttribute('stop-color', config.wave.stop1.color);

    const stop2 = document.createElementNS(config.svgns, 'stop');

    stop2.setAttribute('offset', config.wave.stop2.offset);
    stop2.setAttribute('stop-color', config.wave.stop2.color);

    gradient.appendChild(stop1);
    gradient.appendChild(stop2);
    defs.appendChild(gradient);
    svg.appendChild(defs);
    svg.appendChild(path);

    this.element = path;

    wave.appendChild(svg);
    this.container.appendChild(wave);
  }
}
