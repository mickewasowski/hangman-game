import { alphabetLetters, getCharGrid } from "../utils/Utils.ts";
import Button from "../components/Button.tsx";
import { type GridOfLetters, type AlphabetLetter } from "../types/Types.ts";
import { useEffect, useState, type ReactNode } from "react";
import HeartIcon from "../assets/heart.svg?react";
import { InGameModal } from "../types/Types.ts";
import "./GamePlay.scss";
import {
  LooseModal,
  PauseModal,
  WinModal,
} from "../components/modals/InGameModals.tsx";
import { useGameContext } from "../contexts/GameContext.tsx";
import { MenuTitleButton } from "../components/MenuTitleButton.tsx";

const WRONG_GUESS_REDUCTION_INDEX = 12.5;
const GamePlay = () => {
  const [guessedLetters, setGuessedLetters] = useState<AlphabetLetter[]>([]);
  const [allLetters, setAllLetters] = useState<GridOfLetters>([]);
  const [allClickedLetters, setAllClickedLetters] = useState<AlphabetLetter[]>(
    [],
  );
  const { wordToGuess, health, updateHealth, modal, toggleModal } =
    useGameContext();

  useEffect(() => {
    if (allLetters.length) return;
    const chars = getCharGrid(wordToGuess);
    setAllLetters(chars);

    window.addEventListener("keydown", handleKeypress);

    return () => {
      window.removeEventListener("keydown", handleKeypress);
      toggleModal(null);
    };
  }, [allLetters.length, wordToGuess]);

  useEffect(() => {
    const uniqueWordLetters = new Set(allLetters.flat());
    if (guessedLetters.length === 0 || allLetters.flat().length === 0) return;

    if ([...uniqueWordLetters].every((x) => guessedLetters.includes(x))) {
      toggleModal(InGameModal.Win);
      return;
    }

    if (guessedLetters.length < uniqueWordLetters.size && health === 0) {
      toggleModal(InGameModal.Loose);
      return;
    }
  }, [allClickedLetters]);

  const handleKeypress = (event) => {
    event.preventDefault();
    const pressedKey = event.key;

    if (isLetterClicked(pressedKey)) return;

    if (/^[a-zA-Z]$/.test(pressedKey)) {
      handleLetterClick(pressedKey.toLowerCase() as AlphabetLetter);
    }
  };

  const handleLetterClick = (letter: AlphabetLetter): void => {
    const included = isLetterInAllLetters(letter);

    if (included) {
      setGuessedLetters((prev) => {
        return [...prev, letter];
      });
    } else {
      const newHealth = health - WRONG_GUESS_REDUCTION_INDEX;
      updateHealth(newHealth);
    }

    setAllClickedLetters((prev) => {
      return [...prev, letter];
    });
  };

  const isLetterGuessed = (input: AlphabetLetter): boolean => {
    return guessedLetters.includes(input);
  };

  const isLetterInAllLetters = (input: AlphabetLetter): boolean => {
    let result: boolean = false;

    allLetters.forEach((letterArray) => {
      if (letterArray.includes(input)) {
        result = true;
        return;
      }
    });

    return result;
  };

  const isLetterClicked = (letter: AlphabetLetter): boolean => {
    return allClickedLetters.includes(letter);
  };

  const renderAllWordsCharacterPlaceholders = (): ReactNode => {
    return allLetters.map((chars, i) => (
      <div key={i} className="GamePlay__main__words__word">
        {chars.map((char, j) => {
          const guessed: boolean = isLetterGuessed(char);

          return (
            <p
              key={`${i}-${j}`}
              className={`GamePlay__main__words__word__letter GamePlay__main__words__word__letter${!guessed && "--inactive"}`}
            >
              {guessed ? char : ""}
            </p>
          );
        })}
        {i < allLetters.length - 1 && (
          <div className="GamePlay__main__words__word__spacer" />
        )}
      </div>
    ));
  };

  const resetStates = () => {
    setGuessedLetters([]);
    setAllLetters([]);
    setAllClickedLetters([]);
    updateHealth(100);
    toggleModal(null);
  };

  const renderModal = () => {
    switch (modal.type) {
      case InGameModal.Pause: {
        return <PauseModal handleCloseModal={() => toggleModal(null)} />;
      }
      case InGameModal.Win: {
        return <WinModal playAgain={resetStates} />;
      }
      case InGameModal.Loose: {
        return <LooseModal playAgain={resetStates} />;
      }
      default: {
        return null;
      }
    }
  };

  return (
    <>
      <div className="GamePlay">
        <header className="GamePlay__header">
          <MenuTitleButton
            clickHandler={() => toggleModal(InGameModal.Pause)}
          />
          <div className="GamePlay__header__lives">
            <div className="GamePlay__header__lives__healthbar-wrapper">
              <span
                className="GamePlay__header__lives__healthbar-wrapper__score"
                style={{ width: health + "%" }}
              ></span>
            </div>
            <div className="GamePlay__header__lives__heart">
              <HeartIcon />
            </div>
          </div>
        </header>
        <main className="GamePlay__main">
          <div className="GamePlay__main__words">
            {renderAllWordsCharacterPlaceholders()}
          </div>
          <div className="GamePlay__main__alphabet">
            {alphabetLetters.map((letter, i) => {
              return (
                <Button
                  key={i}
                  disabled={isLetterClicked(letter)}
                  text={letter}
                  classNames={`GamePlay__main__alphabet__letter-btn ${isLetterClicked(letter) ? "GamePlay__main__alphabet__letter-btn--disabled" : ""}`}
                  clickHandler={() => handleLetterClick(letter)}
                />
              );
            })}
          </div>
        </main>
      </div>
      <>{renderModal()}</>
    </>
  );
};

export default GamePlay;
