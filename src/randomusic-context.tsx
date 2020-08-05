import React from 'react';
import { Progression, progressions } from './progressions';

interface State {
  progression: Progression;
}
const RandomusicStateContext = React.createContext<State | undefined>(
  undefined,
);

type Dispatch = (action: Action) => void;
interface Action {
  type: 'setProgression';
  progression: Progression;
}
const RandomusicDispatchContext = React.createContext<Dispatch | undefined>(
  undefined,
);

function randomusicReducer(state: State, action: Action) {
  switch (action.type) {
    case 'setProgression': {
      return { progression: action.progression };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

export function RandomusicProvider({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const [state, dispatch] = React.useReducer(randomusicReducer, {
    progression: progressions[0],
  });

  return (
    <RandomusicStateContext.Provider value={state}>
      <RandomusicDispatchContext.Provider value={dispatch}>
        {children}
      </RandomusicDispatchContext.Provider>
    </RandomusicStateContext.Provider>
  );
}

export function useRandomusicState(): State {
  const context = React.useContext(RandomusicStateContext);
  if (context === undefined) {
    throw new Error('useRandomusicState must be used within a CountProvider');
  }
  return context;
}
export function useRandomusicDispatch(): Dispatch {
  const context = React.useContext(RandomusicDispatchContext);
  if (context === undefined) {
    throw new Error(
      'useRandomusicDispatch must be used within a CountProvider',
    );
  }
  return context;
}
