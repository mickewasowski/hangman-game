import { alphabetLetters } from "../utils/Utils.ts";
import Button from "../components/Button.tsx";
import { useEffect, type ReactNode } from "react";
import { useGameContext } from "../contexts/GameContext.tsx";
import { InGameModal } from "../types/Types.ts";
import "./GuessingLetters.scss";

export const GuessingLetters = () => {
  const {
    selectedCategory,
    guessedLetters,
    allLetters,
    allClickedLetters,
    wordToGuess,
    health,
    setUserCategory,
    toggleModal,
    letterClick,
    letterKeyPress,
    checkIsLetterClicked,
    checkIsLetterGuessed,
  } = useGameContext();

  useEffect(() => {
    if (allLetters.length === 0 && selectedCategory) {
      setUserCategory(selectedCategory);
    }

    window.addEventListener("keydown", handleKeypress);

    return () => {
      window.removeEventListener("keydown", handleKeypress);
      toggleModal(null);
    };
  }, [allLetters.length, wordToGuess]);

  useEffect(() => {
    const uniqueWordLetters = new Set(allLetters.flat());
    if (allLetters.flat().length === 0) return;

    if ([...uniqueWordLetters].every((x) => guessedLetters.includes(x))) {
      toggleModal(InGameModal.Win);
      return;
    }

    if (guessedLetters.length < uniqueWordLetters.size && health === 0) {
      toggleModal(InGameModal.Loose);
      return;
    }
  }, [allClickedLetters]);

  const handleKeypress = (e) => {
    e.preventDefault();
    const pressedKey = e.key;
    letterKeyPress(pressedKey);
  };

  const renderAllWordsCharacterPlaceholders = (): ReactNode => {
    return allLetters.map((chars, i) => (
      <div key={i} className="word">
        {chars.map((char, j) => {
          const guessed: boolean = checkIsLetterGuessed(char);

          return (
            <p
              key={`${i}-${j}`}
              className={`letter letter${!guessed && "--inactive"}`}
            >
              {guessed ? char : ""}
            </p>
          );
        })}
        {i < allLetters.length - 1 && <div className="spacer" />}
      </div>
    ));
  };

  return (
    <>
      <div className="letter-placeholders">
        {renderAllWordsCharacterPlaceholders()}
      </div>
      <div className="alphabet">
        {alphabetLetters.map((letter, i) => {
          return (
            <Button
              key={i}
              disabled={checkIsLetterClicked(letter)}
              text={letter}
              classNames={`letter-btn ${checkIsLetterClicked(letter) ? "letter-btn--disabled" : ""}`}
              clickHandler={() => letterClick(letter)}
            />
          );
        })}
      </div>
    </>
  );
};
