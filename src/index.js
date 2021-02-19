import Application from './app/Application';
import gsap from 'gsap/all';
import config from './config';

if (process.env.NODE_ENV === 'development') {
  // required for pixi dev tools to work
  window.GSAP = gsap;
}

document.addEventListener('DOMContentLoaded', () => {
  const app = new Application(config);

  // Used for automated testing only
  if (process.env.NODE_ENV === 'development') {
    window.__GSAP_APP = app;
  }
});
