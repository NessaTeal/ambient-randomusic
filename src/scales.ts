export enum Mood {
  MINOR = 'minor',
  MAJOR = 'major',
}

export const scales = {
  [Mood.MINOR]: [
    { distance: 0, mood: Mood.MINOR },
    { distance: 2, mood: Mood.MINOR },
    { distance: 3, mood: Mood.MAJOR },
    { distance: 5, mood: Mood.MINOR },
    { distance: 7, mood: Mood.MINOR },
    { distance: 8, mood: Mood.MAJOR },
    { distance: 10, mood: Mood.MAJOR },
  ],
  [Mood.MAJOR]: [
    { distance: 0, mood: Mood.MAJOR },
    { distance: 2, mood: Mood.MINOR },
    { distance: 4, mood: Mood.MINOR },
    { distance: 5, mood: Mood.MAJOR },
    { distance: 7, mood: Mood.MAJOR },
    { distance: 9, mood: Mood.MINOR },
    { distance: 11, mood: Mood.MINOR },
  ],
};
