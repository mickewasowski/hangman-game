import { BaseModal } from "./BaseModal";
import Button from "../Button";
import logo from "../../assets/logo.svg";
import IconPlay from "../../assets/play.svg?react";
import "./HomeModal.scss";
import { useNavigate } from "react-router";

export const HomeModal = () => {
  const navigate = useNavigate();

  return (
    <BaseModal
      classNames={'HomeModal'}
      header={
        <div className="HomeModal__logo-wrapper">
          <img src={logo} alt={"Hangman-Logo"} />
        </div>
      }
      children={
        <div className="HomeModal__buttons-section">
          <Button classNames="HomeModal__buttons-section__circle-play-button" icon={<IconPlay />} routeTo={'/categories'} />
          <Button classNames="HomeModal__buttons-section__how-to-play" text="How to play" clickHandler={() => navigate('/how-to-play')} />
        </div>
      }
    />
  );
};
