import Button from "./Button";
import MenuIcon from "../assets/menu.svg?react";
import { useGameContext } from "../contexts/GameContext";
import "./MenuTitleButton.scss";

export const MenuTitleButton = ({clickHandler}: {clickHandler: () => void}) => {
  const { selectedCategory } = useGameContext();

  return (
    <div className="Menu">
      <Button
        classNames={"button"}
        icon={<MenuIcon />}
        clickHandler={clickHandler}
      />
      <h2 className="title">{selectedCategory}</h2>
    </div>
  );
};
