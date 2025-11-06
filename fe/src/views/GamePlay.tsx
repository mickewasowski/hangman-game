import { alphabetLetters, getCharGrid } from "../utils/Utils.ts";
import Button from "../components/Button.tsx";
import { type GridOfLetters, type AlphabetLetter } from "../types/Types.ts";
import { useEffect, useState, type ReactNode } from "react";
import MenuIcon from "../assets/menu.svg?react";
import HeartIcon from "../assets/heart.svg?react";
import { InGameModal, type InGameModalTypes } from "../types/Types.ts";
import "./GamePlay.scss";
import {
  LooseModal,
  PauseModal,
  WinModal,
} from "../components/modals/InGameModals.tsx";
import { useGameContext } from "../contexts/GameContext.tsx";

const WRONG_GUESS_REDUCTION_INDEX = 12.5;
const GamePlay = () => {
  //TODO: update the modals state as follows:
  //1. keep track if he has guessed all the letters -> win modal
  //2. if scoreWidth goes to 0 -> loose modal
  //3. if he clicks menu button -> pause modal
  //4. if necessary reset the state to null

  const [guessedLetters, setGuessedLetters] = useState<AlphabetLetter[]>([]);
  const [allLetters, setAllLetters] = useState<GridOfLetters>([]);
  const [allClickedLetters, setAllClickedLetters] = useState<AlphabetLetter[]>(
    [],
  );
  const [scoreWidth, setScoreWidth] = useState<number>(100);
  const [modal, setModal] = useState<InGameModalTypes | null>(null);
  const {wordToGuess, selectedCategory} = useGameContext();

  useEffect(() => {
    if (allLetters.length) return;
    const chars = getCharGrid(wordToGuess);
    setAllLetters(chars);

    window.addEventListener("keydown", handleKeypress);

    return () => {
      window.removeEventListener("keydown", handleKeypress);
    }
  }, []);

  useEffect(() => {
    if (guessedLetters.length === 0 || allLetters.flat().length === 0) return;

    if (guessedLetters.length === allLetters.flat().length) {
      setModal(InGameModal.Win);
      return;
    }

    if (guessedLetters.length < allLetters.flat().length && scoreWidth === 0) {
      setModal(InGameModal.Loose);
      return;
    }
  }, [allClickedLetters]);

  const handleKeypress = (event) => {
    event.preventDefault();
    const pressedKey = event.key;

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
      setScoreWidth((prev) => {
        return prev - WRONG_GUESS_REDUCTION_INDEX;
      });
    }

    console.log(scoreWidth);
    

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

  const openModal = () => {
    setModal(InGameModal.Pause);
  };

  const closeModal = () => {
    setModal(null);
  };

  const renderModal = () => {
    switch (modal) {
      case InGameModal.Pause: {
        return <PauseModal handleCloseModal={closeModal} />;
      }
      case InGameModal.Win: {
        return <WinModal />;
      }
      case InGameModal.Loose: {
        return <LooseModal />;
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
          <div className="GamePlay__header__menu">
            <Button
              classNames={"GamePlay__header__menu__menu-btn"}
              icon={<MenuIcon />}
              clickHandler={() => openModal()}
            />
            <h2 className="GamePlay__header__menu__title">{selectedCategory}</h2>
          </div>
          <div className="GamePlay__header__lives">
            <div className="GamePlay__header__lives__healthbar-wrapper">
              <span
                className="GamePlay__header__lives__healthbar-wrapper__score"
                style={{ width: scoreWidth + "%" }}
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
