import React, { useState, useEffect } from 'react';

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

  useEffect(() => {
    console.log(pattern);
  }, [pattern]);

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
          <button id='stop'>stop</button>
          <button id='play'>play</button>
          <input id='bpm' />
          <label htmlFor='bpm' id='bpm-label'>
            bpm
          </label>
        </div>
        <select id='sequence-select'></select>
      </div>
      <div id='sequencer'>
        <div id='timeline'>This will be the timeline row</div>
        <Instrument inst={'kick'} toggleCell={toggleCell} />
        <Instrument inst={'snr'} toggleCell={toggleCell} />
        <Instrument inst={'oh'} toggleCell={toggleCell} />
        <Instrument inst={'ch'} toggleCell={toggleCell} />
      </div>
    </div>
  );
}

function initCells() {
  const cells = [];
  for (let i = 0; i < 16; i++) {
    cells[i] = 0;
  }
  return cells;
}

function Instrument({ inst, toggleCell }) {
  const cells = initCells();
  const styles = `cell cell-${inst}`;
  const label = `${inst}-label`;
  return (
    <div id={inst} className='inst'>
      <div className='inst-label'>
        <h2 id={label}>{inst}</h2>
      </div>
      {cells.map((cell, i) => {
        const id = inst + i;
        return (
          <div
            key={id}
            id={id}
            className={styles}
            onClick={() => toggleCell(inst, i)}
          ></div>
        );
      })}
    </div>
  );
}
