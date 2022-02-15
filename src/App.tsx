import React from "react";
import Table from "./Table/Table";
import Container from "./Container/Container";
import styles from "./App.module.css";

function App() {
  return (
    <div className={styles.root}>
      <div />
      <Container>
        <Table />
      </Container>
    </div>
  );
}

export default App;
