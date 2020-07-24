import React from 'react';
import { Synth, Transport } from 'tone';
import './App.css';

function App() {
  var synth = new Synth().toMaster();
  
  function triggerSynth(time: string | number){
    //the time is the sample-accurate time of the event
    synth.triggerAttackRelease('C4', '8n', time)
  }
  
  //schedule a few notes
  Transport.schedule(triggerSynth, "0")
  Transport.loopEnd = "1m";
  Transport.loop = true;
  Transport.toggle();

  return (
    <div className="App">
      <header className="App-header">
        Enjoy the C
      </header>
    </div>
  );
}

export default App;
