import React from 'react';
import {
  useRandomusicDispatch,
  useRandomusicState,
} from './randomusic-context';

export interface Progression {
  label: string;
  notes: number[];
}

export const progressions: Progression[] = [
  { label: '1-5-6-4 progression', notes: [0, 4, 5, 3] },
  { label: '2-5-1 progression', notes: [1, 4, 0, 0] },
  {
    label: 'basic 12-bar blues',
    notes: [0, 0, 0, 0, 3, 3, 0, 0, 4, 3, 0, 0],
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
