import kick from './audio/kick.mp3';
import snr from './audio/snr.mp3';
import ch from './audio/ch.mp3';
import oh from './audio/oh.mp3';

const sounds = {
  kick: new Audio(kick),
  snr: new Audio(snr),
  ch: new Audio(ch),
  oh: new Audio(oh),
};

export function playPattern(pattern, clock) {
  for (let [key, val] of Object.entries(pattern[clock])) {
    if (val) play(key, val);
  }
}

function play(sound, volume) {
  const clone = sounds[sound].cloneNode();
  clone.volume = volume;
  clone.addEventListener('ended', () => clone.remove());
  clone.play();
}

export function animateCells(clock) {
  const cells = document.querySelectorAll(`.cell-${clock}`);
  cells.forEach((cell) => {
    if (cell.classList.contains('full') || cell.classList.contains('half')) {
      cell.classList.remove('on');
      void cell.offsetWidth; // rm>offset>add to reset css animation
      cell.classList.add('on');
    } else if (cell.classList.contains('tl')) {
      cell.classList.remove('tl-on');
      void cell.offsetWidth;
      cell.classList.add('tl-on');
    }
  });
}
