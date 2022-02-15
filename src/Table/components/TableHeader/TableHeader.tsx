import { Grid, GridProps } from "react-virtualized";
import React from "react";

interface ITableHeaderProps extends GridProps {}

const TableHeader = (props: ITableHeaderProps) => {
  return <Grid {...props} />;
};

export default TableHeader;
