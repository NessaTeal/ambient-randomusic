export const chords = {
  simple: [0, 2, 4],
  sept: [0, 2, 4, 6],
};

export function getRandomChordType(): number[] {
  return chords.simple;
}
