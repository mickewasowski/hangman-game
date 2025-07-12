import { useNavigate } from "react-router-dom";
import "./Button.scss";
import type { ReactNode } from "react";

interface IProps {
  icon?: ReactNode;
  text?: string;
  routeTo?: string;
  clickHandler?: () => void | Promise<void> | undefined;
  classNames?: string;
  disabled?: boolean;
}

const Button = ({icon, text, routeTo, clickHandler, classNames, disabled}: IProps) => {
  const navigate = useNavigate();


  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (routeTo) {
      navigate(routeTo);
    } else if (clickHandler !== undefined) {
      clickHandler();
    }
  }

  return (
  <button disabled={disabled} className={classNames} onClick={handleClick}>{icon}{text}</button>
  )
}

export default Button;

