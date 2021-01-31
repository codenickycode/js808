import React from 'react';

export default function JS808() {
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
        <Instrument inst={'kick'} />
        <Instrument inst={'snr'} />
        <Instrument inst={'oh'} />
        <Instrument inst={'ch'} />
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

function Instrument({ inst }) {
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
        return <div key={id} id={id} className={styles}></div>;
      })}
    </div>
  );
}
