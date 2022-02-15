import React, { useState, useEffect } from "react";
import { Grid, AutoSizer, ScrollSync } from "react-virtualized";
import styles from "./Table.module.css";
import cn from "classnames";
import TableHeader from "./components/TableHeader/TableHeader";
import { getIngredients, TIngredient } from "../utils/fake-api";

interface ICellRendererConfig {
  columnIndex: number;
  key: string;
  rowIndex: number;
  style: React.CSSProperties;
}

const ROW_HEIGHT = 43;

const COLUMNS = ["", "Имя", "Кол-во полетов", "Авиакомпания"];

const LOADING_LIMIT = 30;

const Table = () => {
  const [page, setPage] = useState(0);
  const [rowsCount, setRowsCount] = useState(0);
  const [activeRow, setActiveRow] = useState<undefined | number>(undefined);

  const [loading, setLoading] = useState(false);
  const [preparedData, setPreparedData] = useState<undefined | any[]>(
    undefined
  );

  const onCellHover = (rowIndex: number | undefined) => {
    setActiveRow(rowIndex);
  };

  const loadData = (page: number, size: number) => {
    return getIngredients({ page, limit: size }).then((data) => {
      const preparedData = data.reduce(
        (acc: any, item: any) => [...acc, prepareRow(item)],
        []
      );
      setPreparedData((prev) => {
        if (!prev) {
          return preparedData;
        }
        return [...prev, preparedData];
      });
      setRowsCount(preparedData.length);
    });
  };

  useEffect(() => {
    setLoading(true);
    loadData(page, LOADING_LIMIT).finally(() => setLoading(false));
  }, []);

  const onCellClick = ({
    rowIndex,
    columnIndex,
  }: {
    rowIndex: number;
    columnIndex: number;
  }) => {
    console.log(preparedData && preparedData[rowIndex]);
  };

  const prepareRow = (data: TIngredient) => {
    return [data.title, data.units, data.category];
  };

  const cellRenderer = (config: ICellRendererConfig): React.ReactNode => {
    const { key, columnIndex, style, rowIndex } = config;
    const isLastColumn = COLUMNS.length === columnIndex + 1;

    const defaultCellProps = {
      key,
      style,
      className: cn(styles.cell, {
        [styles.cell_lastColumn]: isLastColumn,
        [styles.cell_hover]: rowIndex === activeRow,
      }),
      onMouseEnter: () => onCellHover(rowIndex),
      onMouseLeave: () => onCellHover(undefined),
      onClick: () => onCellClick({ columnIndex, rowIndex }),
    };

    if (!preparedData) return;

    if (columnIndex === 0) {
      return <p {...defaultCellProps} />;
    }
    if (columnIndex === 1) {
      const cellValue = preparedData[rowIndex][columnIndex - 1];
      return (
        <div {...defaultCellProps}>
          <input
            type="text"
            onBlur={(evt) => {
              if (cellValue === evt.target.value) return;
              setPreparedData((prevState) => {
                if (!prevState) return;

                const newData = prevState.slice();
                newData[rowIndex][columnIndex - 1] = evt.target.value;
                return newData;
              });
            }}
            defaultValue={cellValue}
          />
        </div>
      );
    }

    return (
      <p {...defaultCellProps}>
        {preparedData && preparedData[rowIndex][columnIndex - 1]}
      </p>
    );
  };
  const headerCellRenderer = (config: ICellRendererConfig): React.ReactNode => {
    const { key, columnIndex, style } = config;
    return (
      <h2 key={key} style={style} className={styles.headCell}>
        {COLUMNS[columnIndex]}
      </h2>
    );
  };

  const getColumnWidth = ({
    index,
    width,
  }: {
    index: number;
    width: number;
  }) => {
    switch (index) {
      case 0:
        return width * 0.05;
      case 1:
        return width * 0.55;
      case 2:
        return width * 0.2;
      default:
        return width * 0.2;
    }
  };

  return (
    <>
      <AutoSizer>
        {({ height, width }) => (
          <ScrollSync>
            {() => (
              <>
                <TableHeader
                  className={styles.table}
                  width={width}
                  height={ROW_HEIGHT}
                  columnCount={COLUMNS.length}
                  rowCount={1}
                  rowHeight={ROW_HEIGHT}
                  columnWidth={({ index }) => getColumnWidth({ index, width })}
                  cellRenderer={headerCellRenderer}
                />
                <Grid
                  className={styles.table}
                  width={width}
                  height={height - ROW_HEIGHT}
                  columnCount={COLUMNS.length}
                  rowCount={rowsCount}
                  rowHeight={ROW_HEIGHT}
                  columnWidth={({ index }) => getColumnWidth({ index, width })}
                  cellRenderer={cellRenderer}
                />
              </>
            )}
          </ScrollSync>
        )}
      </AutoSizer>
    </>
  );
};

export default Table;
