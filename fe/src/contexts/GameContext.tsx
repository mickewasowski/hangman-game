import { createContext, useContext, useState, type ReactNode } from "react";
import { CATEGORIES } from "../categories";
import type {
  AlphabetLetter,
  GridOfLetters,
  InGameModal,
} from "../types/Types";
import {
  getCharGrid,
  isLetterGuessed,
  isLetterClicked,
  isLetterInAllLetters,
} from "../utils/Utils";

type Modal = {
  type: InGameModal | null;
  open: boolean;
};

type GameContextType = {
  modal: Modal;
  selectedCategory: string;
  wordToGuess: string;
  health: number;
  guessedLetters: AlphabetLetter[];
  allLetters: GridOfLetters;
  allClickedLetters: AlphabetLetter[];
  letterClick: (input: AlphabetLetter) => void;
  letterKeyPress: (input: AlphabetLetter) => void;
  checkIsLetterClicked: (input: AlphabetLetter) => boolean;
  checkIsLetterGuessed: (input: AlphabetLetter) => boolean;
  resetLetterStates: () => void;
  updateHealth: (input: number) => void;
  setUserCategory: (input: string) => void;
  toggleModal: (modalType: InGameModal | null) => void;
};

const WRONG_GUESS_REDUCTION_INDEX = 12.5;

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [category, setCategory] = useState("");
  const [word, setWord] = useState("");
  const [modal, setModal] = useState<Modal>({ type: null, open: false });
  const [health, setHealth] = useState(100);
  const [guessedLetters, setGuessedLetters] = useState<AlphabetLetter[]>([]);
  const [allLetters, setAllLetters] = useState<GridOfLetters>([]);
  const [allClickedLetters, setAllClickedLetters] = useState<AlphabetLetter[]>(
    [],
  );

  const setWordToGuess = (input: string) => {
    const allCategoryWords: string[] = CATEGORIES[input];
    const wordIndex: number = Math.floor(
      Math.random() * allCategoryWords.length,
    );
    const word: string = allCategoryWords[wordIndex];

    setWord(word);

    const chars = getCharGrid(word);
    setAllLetters(chars);
  };

  const setUserCategory = (input: string) => {
    if (!input) return;

    setCategory(input);

    setWordToGuess(input);
  };

  const letterClick = (inputLetter: AlphabetLetter) => {
    const included = isLetterInAllLetters(inputLetter, allLetters);

    if (included) {
      setGuessedLetters((prev) => {
        return [...prev, inputLetter];
      });
    } else if (!included && !isLetterClicked(inputLetter, allClickedLetters)) {
      handleHealthUpdate();
    }

    setAllClickedLetters((prev) => {
      return [...prev, inputLetter];
    });
  };

  const letterKeyPress = (pressedKey: AlphabetLetter) => {
    if (isLetterClicked(pressedKey, allClickedLetters)) return;

    const isValidLetter = /^[a-zA-Z]$/.test(pressedKey);

    if (!isValidLetter) return;

    letterClick(pressedKey.toLowerCase() as AlphabetLetter);
  };

  const checkIsLetterClicked = (letter: AlphabetLetter): boolean =>
    isLetterClicked(letter, allClickedLetters);

  const checkIsLetterGuessed = (letter: AlphabetLetter): boolean =>
    isLetterGuessed(letter, guessedLetters);

  const resetLetterStates = () => {
    setGuessedLetters([]);
    setAllLetters([]);
    setAllClickedLetters([]);
    setHealth(100);
  };

  const resetModal = () => setModal({ type: null, open: false });

  const handleSetModal = (input: InGameModal | null) => {
    if (!input) {
      resetModal();
    }

    setModal({ type: input, open: true });
  };

  const handleHealthUpdate = () => {
    setHealth((prevHealth) => {
      const newHealth = prevHealth - WRONG_GUESS_REDUCTION_INDEX;

      if (newHealth < 0) return prevHealth;

      return newHealth;
    });
  };

  const value: GameContextType = {
    modal: modal,
    selectedCategory: category,
    wordToGuess: word,
    health,
    guessedLetters,
    allLetters,
    allClickedLetters,
    setUserCategory,
    toggleModal: handleSetModal,
    updateHealth: handleHealthUpdate,
    letterClick,
    letterKeyPress,
    checkIsLetterClicked,
    checkIsLetterGuessed,
    resetLetterStates,
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
