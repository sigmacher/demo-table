import React, { useEffect } from "react";
import Table from "./Table/Table";
import Container from "./Container/Container";
import styles from "./App.module.css";
import { getIngredients } from "./utils/fake-api";

function App() {
  useEffect(() => {
    getIngredients();
  }, []);
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
