import { BaseModal } from "./BaseModal.tsx";
import Button from "../Button.tsx";
import "./InGameModals.scss";
import { useNavigate } from "react-router-dom";

//TODO: the below should have one common class InGameModal
//this class should provide the basic structure of the component:
//1. width
//2. height
//3. position
//4. backdrop

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
      header={
        <div className="PauseModal__header">
          <h3 className="PauseModal__header__title" data-text="Paused">
            Paused
          </h3>
        </div>
      }
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

const WinModal = () => {
  return <BaseModal header={<></>} classNames="" children={<></>} />;
};

const LooseModal = () => {
  return <BaseModal header={<></>} classNames="" children={<></>} />;
};

export { PauseModal, WinModal, LooseModal };
