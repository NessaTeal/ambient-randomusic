import React from 'react';
import { Transport, PolySynth, context } from 'tone';
import './App.css';
import { Mood, scales } from './scales';
import { getRandomChordType } from './chords';
import { convertMidNoteToFrequency } from './util';

function App(): JSX.Element {
  const synth = new PolySynth().toDestination();

  const play = async () => {
    await context.resume();

    const rootNote = 40 + Math.floor(Math.random() * 12);
    const mood = Math.random() > 0.5 ? Mood.MAJOR : Mood.MINOR;
    const secondNote =
      rootNote + scales[mood][1 + Math.floor(Math.random() * 6)].distance;

    const firstChord = getRandomChordType().map((num) =>
      convertMidNoteToFrequency(rootNote + scales[mood][num].distance),
    );
    const secondChord = getRandomChordType().map((num) =>
      convertMidNoteToFrequency(secondNote + scales[mood][num].distance),
    );

    Transport.scheduleOnce(() => {
      synth.triggerAttackRelease(firstChord, '2n');
      synth.triggerAttackRelease(secondChord, '2n', '+2n');
    }, '0');

    Transport.start();
    Transport.stop('+1m');
  };

  return (
    <div className="App">
      <header className="App-header">
        <p>RIP headphone users</p>
        <button onClick={play}>Play two random chords</button>
      </header>
    </div>
  );
}

export default App;
