import type { ReactNode } from "react";
import "./BaseModal.scss";

interface IProps {
  classNames?: string;
  headerTitle?: string;
  header?: ReactNode;
  children: ReactNode;
  backdrop?: boolean;
}

/**
 * BaseModal provides a structure for all modals/popups in the game.
 * @param {string} classNames - optional class names
 * @param {string} headerTitle - optional header title
 * @param {ReactNode} header - optional header JSX
 * @param {ReactNode} children - the body of the modal
 * @param {boolean} backdrop - on/off the backdrop with color
 */
export const BaseModal = ({
  classNames,
  headerTitle,
  header,
  children,
  backdrop,
}: IProps) => {
  return (
    <div className="BaseModal__container">
      {backdrop && <div className="BaseModal--backdrop"></div>}
      <div className={classNames ? `BaseModal ${classNames}` : "BaseModal"}>
        {headerTitle && (
          <header>
            <div className="BaseModal__header">
              <h3
                className="BaseModal__header__title"
                data-text={`${headerTitle}`}
              >
                {headerTitle}
              </h3>
            </div>
          </header>
        )}
        {header && <header>{header}</header>}
        <main>{children}</main>
      </div>
    </div>
  );
};
