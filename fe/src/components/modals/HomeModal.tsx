import { BaseModal } from "./BaseModal";
import logo from "../../assets/logo.svg";
import IconPlay from "../../assets/icon-play.svg?react";
import "./HomeModal.scss";

export const HomeModal = () => {
  return (
    <BaseModal
      classNames={'HomeModal'}
      header={
        <div>
          <img src={logo} alt={"Hangman-Logo"} />
        </div>
      }
      children={
        <div className="HomeModal__buttons-section">
          <button className="HomeModal__buttons-section__circle-play-button">
            <IconPlay />
          </button>
          <button className="HomeModal__buttons-section__how-to-play">How to play</button>
        </div>
      }
    />
  );
};
