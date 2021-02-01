import React, { useState, useEffect, useRef } from 'react';
import { ReactComponent as StopIcon } from './icons/stop.svg';
import { ReactComponent as PlayIcon } from './icons/play.svg';
import { ReactComponent as ArrowDownIcon } from './icons/chevron-down.svg';

const sounds = {
  kick: new Audio('./audio/kick.mp3'),
  snr: new Audio('./audio/snr.mp3'),
  ch: new Audio('./audio/ch.mp3'),
  oh: new Audio('./audio/oh.mp3'),
};

function initCells() {
  const cells = [];
  for (let i = 0; i < 16; i++) {
    cells[i] = 0;
  }
  return cells;
}

const INIT_EMPTY = () => {
  const pattern = { kick: null, snr: null, oh: null, ch: null };
  const cells = initCells();
  Object.keys(pattern).forEach((key) => {
    pattern[key] = cells;
  });
  pattern.grid = {};
  for (let i = 0, len = cells.length; i < len; i++) {
    pattern.grid[i] = { kick: 0, snr: 0, ch: 0, oh: 0 };
  }
  return pattern;
};

export default function JS808() {
  const [pattern, setPattern] = useState(INIT_EMPTY());
  const [playing, setPlaying] = useState(false);
  const [clock, setClock] = useState(-1);
  const [bpm, setBpm] = useState(128);

  useEffect(() => {
    console.log(pattern);
  }, [pattern]);

  useEffect(() => {
    console.log(`playing: ${playing}`);
  }, [playing]);

  useEffect(() => {
    console.log(clock);
  }, [clock]);

  // timeline clock
  const interval = useRef(null);
  useEffect(() => {
    if (playing) {
      interval.current = setInterval(
        () => setClock((prev) => (prev === 15 ? 0 : prev + 1)),
        15000 / bpm
      );
    } else {
      clearInterval(interval.current);
      setClock(-1);
    }
    return () => clearInterval(interval.current);
  }, [interval, playing, bpm]);

  // cell animation
  useEffect(() => {
    if (playing) {
      const cells = document.querySelectorAll(`.cell-${clock}`);
      cells.forEach((cell) => {
        if (
          cell.classList.contains('full') ||
          cell.classList.contains('half')
        ) {
          cell.classList.remove('on');
          void cell.offsetWidth; // rm>offset>add to reset css animation
          cell.classList.add('on');
        } else if (cell.classList.contains('tl')) {
          cell.classList.remove('tl-on');
          void cell.offsetWidth; // rm>offset>add to reset css animation
          cell.classList.add('tl-on');
        }
      });
    }
  }, [playing, clock]);

  function toggleCell(inst, i) {
    const newInst = [...pattern[inst]];
    newInst.splice(
      i,
      1,
      pattern[inst][i] === 0 ? 1 : pattern[inst][i] === 1 ? 0.5 : 0
    );
    const newGrid = {
      ...pattern.grid,
      [i]: { ...pattern.grid[i], [inst]: newInst[i] },
    };
    setPattern((prev) => ({
      ...prev,
      [inst]: newInst,
      grid: newGrid,
    }));
  }

  return (
    <div id='js808'>
      <div id='top'>
        <h1 it='title'>JS-808</h1>
        <Transport setPlaying={setPlaying} bpm={bpm} setBpm={setBpm} />
        <select id='sequence-select'></select>
      </div>
      <div id='sequencer-container'>
        <div id='sequencer'>
          <div id='timeline' className='inst'>
            <div className='inst-label'></div>
            <div id='timeline-grid' className='inst-grid'>
              {initCells().map((cell, i) => {
                return (
                  <p key={`timeline-${i}`} className={`cell cell-${i} tl`}>
                    {i + 1}
                  </p>
                );
              })}
            </div>
          </div>
          <Instrument
            inst={'kick'}
            pattern={pattern.kick}
            toggleCell={toggleCell}
          />
          <Instrument
            inst={'snr'}
            pattern={pattern.snr}
            toggleCell={toggleCell}
          />
          <Instrument
            inst={'oh'}
            pattern={pattern.oh}
            toggleCell={toggleCell}
          />
          <Instrument
            inst={'ch'}
            pattern={pattern.ch}
            toggleCell={toggleCell}
          />
        </div>
      </div>
    </div>
  );
}

function Transport({ setPlaying, bpm, setBpm }) {
  const handleChange = ({ target: { value } }) => {
    if (value && !value[value.length - 1].match(/\d/)) return;
    setBpm(value > 300 ? 300 : value < 1 ? 1 : value);
  };

  return (
    <div id='transport'>
      <button id='stop' onClick={() => setPlaying(false)}>
        <StopIcon className='icon' />
      </button>
      <button id='play' onClick={() => setPlaying(true)}>
        <PlayIcon className='icon' />
      </button>
      <input id='bpm' value={bpm} onChange={handleChange} />
      <label htmlFor='bpm' id='bpm-label'>
        bpm
      </label>
    </div>
  );
}

function Instrument({ inst, toggleCell, pattern }) {
  const cells = initCells();
  const styles = `cell cell-${inst}`;
  const label = `${inst}-label`;
  return (
    <div id={inst} className='inst'>
      <div className='inst-label'>
        <h2 id={label}>{inst}</h2>
      </div>
      <div className='inst-grid'>
        {cells.map((cell, i) => {
          const id = inst + i;
          return (
            <div
              key={id}
              className='cell-container'
              onClick={() => toggleCell(inst, i)}
            >
              <div
                id={id}
                className={
                  pattern[i] === 0
                    ? styles + ` cell-${i}`
                    : pattern[i] === 1
                    ? styles + ` cell-${i} full`
                    : styles + ` cell-${i} half`
                }
              ></div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
