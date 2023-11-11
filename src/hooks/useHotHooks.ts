import { useEffect, useRef, useState } from 'react';
import Handsontable from 'handsontable/base';
import { HotTable } from '@handsontable/react';

type HandleBeforeRenderer = (TD: HTMLTableCellElement, row: number) => void;
type HandleCols = (col: number) => void;
type HandleRows = (row: number) => void;

export const useHotHooks = (
  initialData: (string | number | undefined)[][],
  readOnlys: boolean[]
) => {
  const hotRef = useRef<HotTable>(null);
  const [data, setData] = useState(initialData);
  const [compare, setCompare] = useState(initialData);
  const [readOnlyCols, setReadOnlyCols] = useState(readOnlys);
  const [nowAddedRowsIdx, setNowAddedRowsIdx] = useState<number[]>([]);

  useEffect(() => {
    setNowAddedRowsIdx([]);
    setCompare(data);
  }, [data]);

  useEffect(() => {
    const hot = hotRef?.current?.hotInstance;
    if (hot) {
      setReadOnlyColumns(hot, readOnlyCols, nowAddedRowsIdx);
    }
  }, [readOnlyCols, nowAddedRowsIdx]);

  const setReadOnlyColumns = (
    hot: Handsontable,
    cols: boolean[],
    rows: number[]
  ) => {
    hot.updateSettings({
      cells(row: number, col: number) {
        const cellProperties: Handsontable.CellMeta = {};
        if (!rows.includes(row) && cols[col]) {
          cellProperties.editor = false;
          cellProperties.allowRemoveColumn = false;
        }
        if (row === 0) {
          cellProperties.allowRemoveColumn = false;
        }
        return cellProperties;
      },
    });
  };

  useEffect(() => {
    const hot = hotRef?.current?.hotInstance;
    if (hot) {
      hot.addHook('beforeRenderer', handleBeforeRenderer);
      hot.addHook('afterCreateCol', handleAfterCreateCol);
      hot.addHook('afterCreateRow', handleAfterCreateRow);
      hot.addHook('beforeRemoveCol', handleBeforeRemoveCol);
      hot.addHook('beforeRemoveRow', handleBeforeRemoveRow);
    }
  }, []);

  const handleBeforeRenderer: HandleBeforeRenderer = (TD, row) => {
    const parentElement = TD.parentElement;
    if (parentElement === null) {
      return;
    }
    if (row === 0) {
      Handsontable.dom.addClass(parentElement, 'head');
    }
  };
  const handleAfterCreateCol: HandleCols = (col) => {
    setReadOnlyCols((prev) => [
      ...prev.slice(0, col),
      false,
      ...prev.slice(col),
    ]);
    setCompare((prev) =>
      [...prev].map((com) => [...com.slice(0, col), '', ...com.slice(col)])
    );
  };
  const handleAfterCreateRow: HandleRows = (row) => {
    setNowAddedRowsIdx((prev) => [...prev, row]);
    setCompare((prev) => {
      const rowLen = [...prev][0].length;
      const addArr = Array(rowLen).fill('');
      return [...prev.slice(0, row), addArr, ...prev.slice(row)];
    });
  };
  const handleBeforeRemoveCol: HandleCols = (col) => {
    if (readOnlyCols[col]) {
      return false;
    }
  };
  const handleBeforeRemoveRow: HandleRows = (row) => {
    if (row === 0) {
      return false;
    }
  };

  return { hotRef, compare, setData };
};
