import "./GuideCard.scss";

interface IProps {
  index: number;
  title: string;
  content: string;
}

export const GuideCard = ({ index, title, content }: IProps) => {
  return (
    <div className="GuideCard">
      <div className="GuideCard__index">
        <h1>{index < 10 ? `0${index}` : index}</h1>
      </div>
      <div className="GuideCard__content-wrapper">
        <div className="GuideCard__content-wrapper__title">
          <h1>{index < 10 ? `0${index}` : index}</h1>
          <h3>{title}</h3>
        </div>
        <div className="GuideCard__content-wrapper__content">
          <p>{content}</p>
        </div>
      </div>
    </div>
  );
};
