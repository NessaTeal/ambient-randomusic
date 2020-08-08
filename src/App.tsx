import React from 'react';
import { Transport, context } from 'tone';
import './App.css';
import { scales } from './scales';
import { getRandomChordType } from './chords';
import { convertMidiNoteToFrequency, convertMidiNoteToRealNote } from './util';
import { useRandomusicState } from './randomusic-context';
import Progressions from './progressions';
import Synth from './synth';

function App(): JSX.Element {
  const [playing, setPlaying] = React.useState(false);
  const [baseNote, setBaseNote] = React.useState(48);
  const { progression, synth } = useRandomusicState();

  React.useEffect(() => {
    Transport.bpm.value = 180;
  }, []);

  React.useEffect(() => {
    let durationPassed = 0;
    const totalDuration = progression.chords.reduce((acc, cur) => {
      return acc + cur.duration;
    }, 0);
    const eventIds = progression.chords.map((chord) => {
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
  }, [synth, progression, baseNote]);

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
        <p>Synth variables added. Modulation index is the most fun one.</p>
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
        <p>Synth variables</p>
        <Synth />
        {playing && <p>Already playing, no disabling button for you!</p>}
      </header>
    </div>
  );
}

export default App;
