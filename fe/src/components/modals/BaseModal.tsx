import type { ReactNode } from "react";
import "./BaseModal.scss";

interface IProps {
  classNames?: string;
  header: ReactNode;
  children: ReactNode;
  backdrop?: boolean;
}

export const BaseModal = ({
  classNames,
  header,
  children,
  backdrop,
}: IProps) => {
  return (
    <div className="BaseModal__container">
      {backdrop && <div className="BaseModal--backdrop"></div>}
      <div className={classNames ? `BaseModal ${classNames}` : "BaseModal"}>
        <header>{header}</header>
        <main>{children}</main>
      </div>
    </div>
  );
};
