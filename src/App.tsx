import React from 'react';
import { Transport, FMSynth, PolySynth, context } from 'tone';
import './App.css';
import { Mood, scales } from './scales';
import { getRandomChordType } from './chords';
import { convertMidNoteToFrequency } from './util';

function App(): JSX.Element {
  const synth = new PolySynth(FMSynth).toDestination();
  synth.set({
    envelope: {
      attack: '8n',
      decay: '16n',
      sustain: 0.5,
      release: '16n',
    },
    modulationIndex: 2,
  });

  const [playing, setPlaying] = React.useState(false);

  const play = async () => {
    if (playing) {
      return;
    } else {
      setPlaying(true);
    }
    await context.resume();

    let note = 40 + Math.floor(Math.random() * 12);
    let mood = Math.random() > 0.5 ? Mood.MAJOR : Mood.MINOR;

    Transport.schedule(() => {
      const chord = getRandomChordType().map((num) =>
        convertMidNoteToFrequency(note + scales[mood][num].distance),
      );
      const newChordData = scales[mood][1 + Math.floor(Math.random() * 6)];
      note += newChordData.distance;
      mood = newChordData.mood;
      if (note >= 60) {
        note -= Math.random() > 0.5 ? 24 : 12;
      }

      synth.triggerAttackRelease(chord, '1m');
    }, '0');

    Transport.loop = true;
    Transport.loopEnd = '1m';

    Transport.start();
  };

  return (
    <div className="App">
      <header className="App-header">
        <p>RIP headphone users</p>
        <button onClick={play}>Start playing random sequence</button>
        {playing && <p>Already playing, no disabling button for you!</p>}
      </header>
    </div>
  );
}

export default App;
