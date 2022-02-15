import React from "react";
import styles from "./Container.module.css";

interface IContainer {
  children: React.ReactNode;
}

const Container = ({ children }: IContainer) => {
  return <div className={styles.root}>{children}</div>;
};

export default Container;
