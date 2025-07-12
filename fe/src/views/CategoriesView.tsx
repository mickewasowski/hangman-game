import "./CategoriesView.scss";
import { Link } from "react-router-dom";
import BackIcon from "../assets/back.svg?react";
import Button from "../components/Button.tsx";

interface IProps {
  categories: string[];
}

const CategoriesView = ({ categories }: IProps) => {
  const handlePickCategory = (category: string): void => {
    //TODO: implement picking and applying the category
  };

  return (
    <div className="CategoriesView">
      <header className="CategoriesView__header">
        <Link className="CategoriesView__header__back" to={"/"}>
          <BackIcon />
        </Link>
        <h1 data-text="Pick a Category">Pick a Category</h1>
      </header>
      <main className="CategoriesView__main">
        <div className="CategoriesView__main__categories-wrapper">
          {categories.map((category, index) => {
            return (
              <Button
                key={`${category}-${index}`}
                text={category}
                clickHandler={() => handlePickCategory(category)}
                classNames="CategoriesView__main__categories-wrapper__category-btn"
              />
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default CategoriesView;
