import { createContext, useContext, useState, type ReactNode } from "react";
import { CATEGORIES } from "../categories";

type GameContextType = {
  selectedCategory: string;
  wordToGuess: string;
  setUserCategory: (input: string) => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [category, setCategory] = useState('');
  const [word, setWord] = useState('');

  const setUserCategory = (input: string) => {
    if (!input) return;

    setCategory(input);

    setWordToGuess(input);
  };

  const setWordToGuess = (input: string) => {
    const allCategoryWords: string[] = CATEGORIES[input];
    const wordIndex: number = Math.floor(Math.random() * allCategoryWords.length);
    const word: string = allCategoryWords[wordIndex];

    setWord(word);
  };

  const value: GameContextType = { selectedCategory: category, setUserCategory, wordToGuess: word };

  return (<GameContext.Provider value= { value } > { children } </GameContext.Provider>);
};

export const useGameContext = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error ('useGameContext must be used within a GameContextProvider!');
  }

  return context;
};
