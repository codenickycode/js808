import React, { useState, useEffect, useRef } from 'react';

function initCells() {
  const cells = [];
  for (let i = 0; i < 16; i++) {
    cells[i] = 0;
  }
  return cells;
}

const INIT_EMPTY = () => {
  const empty = [];
  for (let i = 0; i < 16; i++) {
    empty[i] = 0;
  }
  const pattern = { kick: null, snr: null, oh: null, ch: null };
  Object.keys(pattern).forEach((key) => {
    pattern[key] = empty;
  });
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
      setClock(0);
    }
    return () => clearInterval(interval.current);
  }, [interval, playing]);

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
    setPattern((prev) => ({
      ...prev,
      [inst]: newInst,
    }));
  }

  return (
    <div id='js808'>
      <div id='top'>
        <h1 it='title'>JS-808</h1>
        <div id='transport'>
          <button id='stop' onClick={() => setPlaying(false)}>
            stop
          </button>
          <button id='play' onClick={() => setPlaying(true)}>
            play
          </button>
          <input id='bpm' />
          <label htmlFor='bpm' id='bpm-label'>
            bpm
          </label>
        </div>
        <select id='sequence-select'></select>
      </div>
      <div id='sequencer-container'>
        <div id='sequencer'>
          <div id='timeline' className='inst'>
            <div className='inst-label'></div>
            <div id='timeline-grid' className='inst-grid'>
              {initCells().map((cell, i) => {
                return (
                  <p key={`timeline-${i}`} className={`cell cell-${i} full tl`}>
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
              id={id}
              className={
                pattern[i] === 0
                  ? styles + ` cell-${i}`
                  : pattern[i] === 1
                  ? styles + ` cell-${i} full`
                  : styles + ` cell-${i} half`
              }
              onClick={() => toggleCell(inst, i)}
            ></div>
          );
        })}
      </div>
    </div>
  );
}
