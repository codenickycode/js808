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
        <div id='kick'>This will be the kick row</div>
        <div id='snr'>This will be the snr row</div>
        <div id='oh'>This will be the oh row</div>
        <div id='ch'>This will be the ch row</div>
      </div>
    </div>
  );
}
