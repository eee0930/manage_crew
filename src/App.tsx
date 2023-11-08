import Handsontable from 'handsontable/base';
import { registerAllModules } from 'handsontable/registry';
import { HotTable } from '@handsontable/react';
import { Settings } from 'handsontable/plugins/contextMenu';
import './App.css';
import 'handsontable/dist/handsontable.full.min.css';
import Button from './components/Button';
import { DEFAULT_DATA, READONLY_STATE } from './default_data';
import { useEffect, useRef, useState } from 'react';

registerAllModules();

const HOTTABLE_PROPS = {
  height: 'auto',
  width: 'auto',
  licenseKey: 'non-commercial-and-evaluation',
};

const CONTEXT_MENU: Settings = [
  'row_above',
  'row_below',
  '---------',
  'col_left',
  'col_right',
  '---------',
  'remove_col',
  'remove_row',
];

function App() {
  const [datas, setDatas] = useState(DEFAULT_DATA);
  const [updatedData, setUpdatedData] = useState(DEFAULT_DATA);
  const [readOnlyCols, setReadOnlyCols] = useState(READONLY_STATE);
  const [notReadOnlyRows, setNotReadOnlyRows] = useState<number[]>([]);
  const [deletedColIdx, setDeletedColIdx] = useState<number[]>([]);
  const [deletedRowIdx, setDeletedRowIdx] = useState<number[]>([]);
  const hotRef = useRef<HotTable>(null);
  const handleClickSave = () => {};
  useEffect(() => {
    const hot = hotRef?.current?.hotInstance;
    if (hot) {
      hot.updateSettings({
        cells(row: number, col: number) {
          const cellProperties: Handsontable.CellMeta = {};
          if (!notReadOnlyRows.includes(row)) {
            if (readOnlyCols[col]) {
              cellProperties.editor = false;
              cellProperties.allowRemoveColumn = false;
            }
          }
          if (row === 0) {
            cellProperties.allowRemoveColumn = false;
          }
          return cellProperties;
        },
      });
    }
  }, [readOnlyCols, notReadOnlyRows]);
  const updateSetting = () => {};
  return (
    <div className="App">
      <Button callback={handleClickSave}>저장</Button>

      <HotTable
        ref={hotRef}
        data={datas}
        contextMenu={CONTEXT_MENU}
        {...HOTTABLE_PROPS}
      />
    </div>
  );
}

export default App;
