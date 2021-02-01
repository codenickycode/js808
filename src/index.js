import React from 'react';
import ReactDOM from 'react-dom';
import * as Tone from 'tone';
import './index.css';
import JS808 from './JS808';
import { downtempo } from './patterns';

ReactDOM.render(
  <React.StrictMode>
    <JS808 />
  </React.StrictMode>,
  document.getElementById('root')
);

const samplers = {
  kick: new Tone.Sampler({ C2: './audio/kick.mp3' }).toDestination(),
  snr: new Tone.Sampler({ C2: './audio/snr.mp3' }).toDestination(),
  ch: new Tone.Sampler({ C2: './audio/ch.mp3' }).toDestination(),
  oh: new Tone.Sampler({ C2: './audio/oh.mp3' }).toDestination(),
};

document.addEventListener('click', async () => {
  await Tone.start();
  console.log('audio ready');
});

document.addEventListener('keypress', ({ code }) => {
  if (code === 'Space') {
    if (Tone.Transport.state === 'stopped') {
      play();
    } else {
      stop();
    }
  }
});

const pattern = downtempo.pattern;
const bpm = downtempo.bpm;

let step = 0;

function play() {
  Tone.Transport.bpm.value = bpm;
  Tone.Transport.scheduleRepeat(playCell, '16n');
  Tone.Transport.start();
}

function stop() {
  Tone.Transport.stop();
  Tone.Transport.cancel(0);
  step = 0;
}

function playCell(time) {
  for (const [inst, vol] of Object.entries(pattern[step])) {
    if (pattern[step][inst]) {
      samplers[inst].triggerAttack('C2', time, vol / 2);
    }
  }
  step = step === 15 ? 0 : step + 1;
}
