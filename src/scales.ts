export enum Scale {
  MINOR = 'minor',
  MAJOR = 'major',
}

export const scales = {
  [Scale.MINOR]: [
    { distance: 0, mood: Scale.MINOR },
    { distance: 2, mood: Scale.MINOR },
    { distance: 3, mood: Scale.MAJOR },
    { distance: 5, mood: Scale.MINOR },
    { distance: 7, mood: Scale.MINOR },
    { distance: 8, mood: Scale.MAJOR },
    { distance: 10, mood: Scale.MAJOR },
  ],
  [Scale.MAJOR]: [
    { distance: 0, mood: Scale.MAJOR },
    { distance: 2, mood: Scale.MINOR },
    { distance: 4, mood: Scale.MINOR },
    { distance: 5, mood: Scale.MAJOR },
    { distance: 7, mood: Scale.MAJOR },
    { distance: 9, mood: Scale.MINOR },
    { distance: 11, mood: Scale.MINOR },
  ],
};
