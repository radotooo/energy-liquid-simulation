export default {
  app: {
    infinityLoop: {
      bubblesCount: '20',
      timeDelayMax: '8',
      timeDelayMin: '1',
    },
    onClick: {
      bubblecCount: '10',
      timeDelayMax: '2',
      timeDelayMin: '1',
    },
  },
  mainContainer: {
    className: 'container',
  },
  svgns: 'http://www.w3.org/2000/svg',
  wave: {
    animation: {
      duration: '2',
      repeat: '-1',
      d: 'M0 220 Q360 300 720 220 T 1440 220 V440 H0 Z',
      yoyo: 'true',
    },
    container: {
      className: 'wave-container',
      position: 'absolute',
      bottom: '0px',
      width: '100%',
    },
    svg: {
      className: 'waveSvg',
      width: '100%',
      height: '100%',
      viewBox: '0 0 1440 440',
    },
    path: {
      d: 'M0 220 Q360 120 720 220 T 1440 220 V440 H0 Z',
      style: {
        cursor: 'pointer',
      },
    },
    gradient: {
      id: 'paint0_linear',
      x1: '0',
      y1: '0',
      x2: '0',
      y2: '100%',
      gradientUnits: 'userSpaceOnUse',
    },
    stop1: {
      color: '#4287F1',
    },
    stop2: {
      offset: '1',
      color: '#274EA9',
    },
  },
  bubble: {
    color: '#5cceee',
    type: {
      circle: 'circle',
    },
    animation: {
      cxMin: '1',
      radiusMin: '1',
      radiusMax: '10',
    },
  },
};
