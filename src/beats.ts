export interface Beat {
  start: number; // in quarter notes since loop start: 0, 1, 2, 3
  duration: number; // in quarter notes... 0.25 = 16th, 0.5 = 8th, 1 = quarter, ,
}

export const beatColors = ["orange", "green", "blue", "yellow", "red"];
export const beat1: Beat[] = [
  {
    start: 0,
    duration: 0.25,
  },
  {
    start: 1,
    duration: 0.25,
  },
  {
    start: 2,
    duration: 0.5,
  },
  {
    start: 4,
    duration: 0.25,
  },
  {
    start: 5,
    duration: 0.25,
  },
  {
    start: 6,
    duration: 0.5,
  },
  {
    start: 8,
    duration: 0.25,
  },
  {
    start: 9,
    duration: 0.25,
  },
  {
    start: 10,
    duration: 0.5,
  },
  {
    start: 12,
    duration: 0.25,
  },
  {
    start: 13,
    duration: 0.25,
  },
  {
    start: 14,
    duration: 0.5,
  },
].map((x) => {
  return { start: x.start, duration: x.duration * 2 };
});

export const beat2: Beat[] = [];
for (let i = 0; i < 16; i++) {
  beat2.push({ start: i, duration: 0.25 });
}
