import gsap from 'gsap/all';

export default class Wave {
  constructor() {
    this.element = document.querySelector('#wave');

    this.animate();
  }

  animate() {
    gsap.to(this.element, {
      duration: 2,
      attr: {
        d: 'M0 220 Q360 300 720 220 T 1440 220 V440 H0 Z',
      },
      ease: 'Power1.easeInOut',
      repeat: -1,
      yoyo: true,
    });
  }
}
