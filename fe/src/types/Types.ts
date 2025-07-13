export type AlphabetLetter =
  | "a" | "b" | "c" | "d" | "e" | "f" | "g" | "h"
  | "i" | "j" | "k" | "l" | "m" | "n" | "o" | "p"
  | "q" | "r" | "s" | "t" | "u" | "v" | "w" | "x"
  | "y" | "z";

export type GridOfLetters = AlphabetLetter[][];

export enum InGameModal {
  Pause,
  Win,
  Loose,
};

export type InGameModalTypes = InGameModal.Pause | InGameModal.Win | InGameModal.Loose;

