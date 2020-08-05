import React from 'react';
import {
  useRandomusicDispatch,
  useRandomusicState,
} from './randomusic-context';
import { Scale } from './scales';

interface Chord {
  note: number;
  scale: Scale;
  duration: number;
}

export interface Progression {
  label: string;
  chords: Chord[];
}

export const progressions: Progression[] = [
  {
    label: 'I-V-vi-IV progression',
    chords: [
      { note: 0, scale: Scale.MAJOR, duration: 1 },
      { note: 4, scale: Scale.MAJOR, duration: 1 },
      { note: 5, scale: Scale.MINOR, duration: 1 },
      { note: 3, scale: Scale.MAJOR, duration: 1 },
    ],
  },
  {
    label: 'ii-V-I progression',
    chords: [
      { note: 1, scale: Scale.MINOR, duration: 1 },
      { note: 4, scale: Scale.MAJOR, duration: 1 },
      { note: 0, scale: Scale.MAJOR, duration: 2 },
    ],
  },
];

export default function Progressions(): JSX.Element {
  const dispatch = useRandomusicDispatch();
  const state = useRandomusicState();

  return (
    <form>
      {progressions.map((progression, index) => {
        return (
          <div key={index}>
            <label>
              <input
                type={'radio'}
                onChange={() => {
                  dispatch({
                    type: 'setProgression',
                    progression: progression,
                  });
                }}
                checked={progression === state.progression}
              ></input>
              {progression.label}
            </label>
          </div>
        );
      })}
    </form>
  );
}
