export const chords = {
  simple: [0, 2, 4],
  sept: [0, 2, 4, 6],
};

export function getRandomChordType(): number[] {
  const chooser = Math.random();
  if (chooser < 0.5) {
    return chords.simple;
  } else {
    return chords.sept;
  }
}
