import type { ReactNode } from "react";
import "./BaseModal.scss";

interface IProps {
  header: ReactNode;
  children: ReactNode;
}

export const BaseModal = ({ header, children }: IProps) => {
  return (
    <div className="BaseModal">
      <header>{header}</header>
      <main>{children}</main>
    </div>
  );
};
