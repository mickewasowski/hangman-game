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
        <div>
          <button style={{ background: "none", border: "none" }}>
            <IconPlay />
          </button>
          <button>How to play</button>
        </div>
      }
    />
  );
};
