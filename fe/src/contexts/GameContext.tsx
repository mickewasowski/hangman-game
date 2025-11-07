import { createContext, useContext, useState, type ReactNode } from "react";
import { CATEGORIES } from "../categories";
import type { InGameModal } from "../types/Types";

type Modal = {
  type: InGameModal | null;
  open: boolean;
};

type GameContextType = {
  modal: Modal;
  selectedCategory: string;
  wordToGuess: string;
  setUserCategory: (input: string) => void;
  toggleModal: (modalType: InGameModal | null) => void;
};

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [category, setCategory] = useState("");
  const [word, setWord] = useState("");
  const [modal, setModal] = useState<Modal>({ type: null, open: false });

  const setUserCategory = (input: string) => {
    if (!input) return;

    setCategory(input);

    setWordToGuess(input);
  };

  const setWordToGuess = (input: string) => {
    const allCategoryWords: string[] = CATEGORIES[input];
    const wordIndex: number = Math.floor(
      Math.random() * allCategoryWords.length,
    );
    const word: string = allCategoryWords[wordIndex];

    setWord(word);
  };

  const resetModal = () => setModal({ type: null, open: false });

  const handleSetModal = (input: InGameModal | null) => {
    if (!input) {
      resetModal();
    }

    setModal({ type: input, open: true });
  };

  const value: GameContextType = {
    modal: modal,
    selectedCategory: category,
    setUserCategory,
    wordToGuess: word,
    toggleModal: handleSetModal,
  };

  return (
    <GameContext.Provider value={value}> {children} </GameContext.Provider>
  );
};

export const useGameContext = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error(
      "useGameContext must be used within a GameContextProvider!",
    );
  }

  return context;
};
