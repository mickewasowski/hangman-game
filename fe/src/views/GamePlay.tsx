import { alphabetLetters, getCharGrid } from "../utils/Utils.ts";
import Button from "../components/Button.tsx";
import "./GamePlay.scss";
import { type GridOfLetters, type AlphabetLetter } from "../types/Types.ts";
import { useEffect, useState, type ReactNode } from "react";

const GamePlay = () => {
  //TODO: get the selected category from the global state
  //fetch a word based on the selected category
  //show a loading spinner while fetching the word
  const [guessedLetters, setGuessedLetters] = useState<AlphabetLetter[]>([]);
  const [allLetters, setAllLetters] = useState<GridOfLetters>([]);
  const [allClickedLetters, setAllClickedLetters] = useState<AlphabetLetter[]>([]);

  useEffect(() => {
    if (allLetters.length) return;
    const chars = getCharGrid("The Lion King");
    setAllLetters(chars);
  }, []);

  const handleLetterClick = (letter: AlphabetLetter): void => {
    //TODO: check if the letter is contained in any of the words
    //if yes mark the letter as disabled (slightly transparent)
    //disable the button as well
    const included = isLetterInAllLetters(letter);

    if (included) {
      setGuessedLetters([...guessedLetters, letter]);
    }

    setAllClickedLetters([...allClickedLetters, letter]);
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
        {
          chars.map((char, j) => {
            const guessed: boolean = isLetterGuessed(char);

            return (
              <p key={`${i}-${j}`} className={`GamePlay__main__words__word__letter${!guessed && '--inactive'}`}>
                {guessed ? char : ""}
              </p>
            )
          })
        }
      </div>
    ));
  };

  return (
    <div className="GamePlay">
      <header className="GamePlay__header">
        <div className="GamePlay__header__menu"></div>
        <div className="GamePlay__header__lives"></div>
      </header>
      <main className="GamePlay__main">
        <div className="GamePlay__main__words">{renderAllWordsCharacterPlaceholders()}</div>
        <div className="GamePlay__main__alphabet">
          {alphabetLetters.map((letter) => {
            return (
              <Button
                disabled={isLetterClicked(letter)}
                text={letter}
                classNames={`GamePlay__main__alphabet__letter-btn${isLetterClicked(letter) ? '--disabled' : ''}`}
                clickHandler={() => handleLetterClick(letter)}
              />
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default GamePlay;
