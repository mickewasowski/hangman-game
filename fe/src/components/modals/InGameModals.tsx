import { BaseModal } from "./BaseModal.tsx";
import Button from "../Button.tsx";
import "./InGameModals.scss";

//TODO: the below should have one common class InGameModal
//this class should provide the basic structure of the component:
//1. width
//2. height
//3. position
//4. backdrop

const PauseModal = () => {
  return (
    <BaseModal
      backdrop={true}
      header={
        <div className="PauseModal__header">
          <h3 className="PauseModal__header__title" data-text="Paused">Paused</h3>
        </div>
      }
      classNames="PauseModal"
      children={
        <div className="PauseModal__main">
          <Button classNames="PauseModal__main__button" text="continue" />
          <Button classNames="PauseModal__main__button" text="new category" />
          <Button
            classNames="PauseModal__main__button PauseModal__main__button--quit"
            text="quit game"
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
