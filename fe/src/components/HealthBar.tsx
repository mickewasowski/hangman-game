import HeartIcon from "../assets/heart.svg?react";
import { useGameContext } from "../contexts/GameContext";
import "./HealthBar.scss";

export const HealthBar = () => {
  const { health } = useGameContext();

  return (
    <div className="HealthBar">
      <div className="progress-bar">
        <span
          className="bar"
          style={{ width: health + "%" }}
        ></span>
      </div>
      <div>
        <HeartIcon />
      </div>
    </div>
  );
};
