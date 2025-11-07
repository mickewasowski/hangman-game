import { BaseModal } from "./BaseModal.tsx";
import Button from "../Button.tsx";
import "./InGameModals.scss";
import { useNavigate } from "react-router-dom";
import { useGameContext } from "../../contexts/GameContext.tsx";

interface IPauseProps {
  handleCloseModal: () => void;
}

const PauseModal = ({ handleCloseModal }: IPauseProps) => {
  const navigate = useNavigate();

  const quitGame = () => {
    navigate("/");
  };

  const newCategory = () => {
    navigate("/categories");
  };

  const resume = () => {
    handleCloseModal();
  };

  return (
    <BaseModal
      backdrop={true}
      headerTitle="Paused"
      classNames="PauseModal"
      children={
        <div className="PauseModal__main">
          <Button
            classNames="PauseModal__main__button"
            text="continue"
            clickHandler={resume}
          />
          <Button
            classNames="PauseModal__main__button"
            text="new category"
            clickHandler={newCategory}
          />
          <Button
            classNames="PauseModal__main__button PauseModal__main__button--quit"
            text="quit game"
            clickHandler={quitGame}
          />
        </div>
      }
    />
  );
};

const WinModal = ({ playAgain }: { playAgain: () => void }) => {
  const navigate = useNavigate();
  const { selectedCategory, setUserCategory } = useGameContext();

  const quitGame = () => {
    navigate("/");
  };

  const handlePlayAgain = () => {
    setUserCategory(selectedCategory);
    playAgain();
  };

  const newCategory = () => {
    navigate("/categories");
  };

  return (
    <BaseModal
      headerTitle={"You Win"}
      classNames="WinModal"
      children={
        <div>
          <Button
            classNames="WinModal__main__button"
            text="play again!"
            clickHandler={handlePlayAgain}
          />
          <Button
            classNames="WinModal__main__button"
            text="new category"
            clickHandler={newCategory}
          />
          <Button
            classNames="WinModal__main__button WinModal__main__button--quit"
            text="quit game"
            clickHandler={quitGame}
          />
        </div>
      }
    />
  );
};

const LooseModal = ({ playAgain }: { playAgain: () => void }) => {
  const navigate = useNavigate();
  const { selectedCategory, setUserCategory } = useGameContext();

  const quitGame = () => {
    navigate("/");
  };

  const handlePlayAgain = () => {
    setUserCategory(selectedCategory);
    playAgain();
  };

  const newCategory = () => {
    navigate("/categories");
  };

  return (
    <BaseModal
      headerTitle={"You Lose"}
      classNames="LoseModal"
      children={
        <div>
          <Button
            classNames="LoseModal__main__button"
            text="play again!"
            clickHandler={handlePlayAgain}
          />
          <Button
            classNames="LoseModal__main__button"
            text="new category"
            clickHandler={newCategory}
          />
          <Button
            classNames="LoseModal__main__button LoseModal__main__button--quit"
            text="quit game"
            clickHandler={quitGame}
          />
        </div>
      }
    />
  );
};

export { PauseModal, WinModal, LooseModal };
