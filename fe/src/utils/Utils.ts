import type { AlphabetLetter, GridOfLetters } from "../types/Types";

export const getCharGrid = (input: string): GridOfLetters => {
  const words = input.split(" ");
  const charsGrid: GridOfLetters = [];

  words.forEach((word) => {
    const chars = getStringChars(word);
    charsGrid.push(chars);
  });

  return charsGrid;
};

export const getStringChars = (input: string): AlphabetLetter[] => {
  return input.toLowerCase().split("") as AlphabetLetter[];
};

export const alphabetLetters: AlphabetLetter[] = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];
