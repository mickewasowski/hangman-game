import { useEffect, useState } from "react";
import "./GuideCard.scss";

interface IProps {
  index: number;
  title: string;
  content: string;
}

export const GuideCard = ({ index, title, content }: IProps) => {
  const [windowWidth, setWindowWidth] = useState(0);

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [window.innerWidth]);

  return (
    <div className="GuideCard">
      {windowWidth > 600 && (
        <span className="GuideCard__index">
          <h1>{index}</h1>
        </span>
      )}
      <div>
        <span className="GuideCard__title">
          {windowWidth <= 600 && (
            <span className="GuideCard__index">
              <h1>{index}</h1>
            </span>
          )}
          <h3>{title}</h3>
        </span>
        <span className="GuideCard__content">
          <p>{content}</p>
        </span>
      </div>
    </div>
  );
};
