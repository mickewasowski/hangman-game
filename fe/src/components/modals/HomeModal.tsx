import { BaseModal } from "./BaseModal";
import logo from "../../assets/logo.svg";
import IconPlay from "../../assets/play.svg?react";
import "./HomeModal.scss";
import { Link, useNavigate } from "react-router";

export const HomeModal = () => {
  // TODO: use the component for the icon button instead
  const navigate = useNavigate();

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
          <button onClick={(e) => {
            console.log('click');

            navigate('/how-to-play')

          }} className="HomeModal__buttons-section__how-to-play">How to play</button>
        </div>
      }
    />
  );
};
