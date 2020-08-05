import React from 'react';
import { Transport, FMSynth, PolySynth, context } from 'tone';
import './App.css';
import { scales } from './scales';
import { getRandomChordType } from './chords';
import { convertMidiNoteToFrequency, convertMidiNoteToRealNote } from './util';
import { useRandomusicState } from './randomusic-context';
import Progressions from './progressions';

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
  const [baseNote, setBaseNote] = React.useState(48);
  const state = useRandomusicState();

  React.useEffect(() => {
    Transport.bpm.value = 180;
  }, []);

  React.useEffect(() => {
    let durationPassed = 0;
    const totalDuration = state.progression.chords.reduce((acc, cur) => {
      return acc + cur.duration;
    }, 0);
    const eventIds = state.progression.chords.map((chord) => {
      const { note, scale, duration } = chord;
      const eventId = Transport.scheduleRepeat(
        () => {
          synth.triggerAttackRelease(
            getRandomChordType().map((num) =>
              convertMidiNoteToFrequency(
                baseNote + note + scales[scale][num].distance,
              ),
            ),
            `${duration}m`,
          );
        },
        `${totalDuration}m`,
        `${durationPassed}m`,
      );
      durationPassed += duration;

      return eventId;
    });

    return () => {
      eventIds.forEach((id) => Transport.clear(id));
    };
  }, [state.progression, baseNote]);

  const play = async () => {
    if (playing) {
      return;
    } else {
      setPlaying(true);
    }
    await context.resume();

    Transport.start();
  };

  return (
    <div className="App">
      <header className="App-header">
        <p>Dynamic change of sequence. Such feature, much wow.</p>
        <button onClick={play}>Start playing selected progression</button>
        <Progressions />
        <div className="note-selector-container">
          <p>Playing in the key {convertMidiNoteToRealNote(baseNote)}</p>
          <input
            type="number"
            value={baseNote}
            onChange={(event) => setBaseNote(+event.target.value)}
            className="note-selector"
          />
        </div>
        {playing && <p>Already playing, no disabling button for you!</p>}
      </header>
    </div>
  );
}

export default App;
