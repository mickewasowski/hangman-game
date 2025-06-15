import './GuideCard.scss';

interface IProps {
  index: number;
  title: string;
  content: string;
}

export const GuideCard = ({index, title, content}: IProps) => {
  return (
    <div className='GuideCard'>
      <span className='GuideCard__index'>
        <h1>{index}</h1>
      </span>
      <span className='GuideCard__title'>
        <h3>{title}</h3>
      </span>
      <span className='GuideCard__content'>
        <p>{content}</p>
      </span>
    </div>
  )
};
