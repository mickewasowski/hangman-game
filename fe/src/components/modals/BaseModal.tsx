import type { ReactNode } from "react";
import "./BaseModal.scss";

interface IProps {
  classNames?: string;
  header: ReactNode;
  children: ReactNode;
}

export const BaseModal = ({ classNames, header, children }: IProps) => {
  return (
    <div className={classNames ? `BaseModal ${classNames}` : "BaseModal"}>
      <header>{header}</header>
      <main>{children}</main>
    </div>
  );
};
