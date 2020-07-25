import React, { Component } from 'react';
import { Synth, Transport } from 'tone';
import './App.css';

function App(): JSX.Element {
  const synth = new Synth().toDestination();

  function triggerSynth(time: string | number) {
    //the time is the sample-accurate time of the event
    synth.triggerAttackRelease('C2', '8n', time);
  }
  //schedule a few notes
  Transport.schedule(triggerSynth, '0');
  Transport.loopEnd = '1m';
  Transport.loop = true;

  return (
    <div className="App">
      <header className="App-header">
        <p>Enjoy the C</p>
        <button onClick={() => Transport.toggle()}>Toggle the C</button>
      </header>
    </div>
  );
}

export default App;
