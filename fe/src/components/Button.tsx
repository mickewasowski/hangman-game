import { useNavigate } from "react-router-dom";
import "./Button.scss";

interface IProps {
  icon?: string;
  text?: string;
  routeTo?: string;
  clickHandler?: () => void;
  classNames?: string;
}

const Button = ({icon, text, routeTo, clickHandler, classNames}: IProps) => {
  const navigate = useNavigate();


  const handleClick = (event) => {
    event.preventDefault();

    if (routeTo) {
      navigate(routeTo);
    } else if (clickHandler !== undefined) {
      clickHandler();
    }
  }

  return (
  <button className={classNames} onClick={handleClick}>{icon}{text}</button>
  )
}

export default Button;

