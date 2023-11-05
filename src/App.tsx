import Handsontable from 'handsontable/base';
import { registerAllModules } from 'handsontable/registry';
import { HotTable } from '@handsontable/react';
import { Settings } from 'handsontable/plugins/contextMenu';
import './App.css';
import 'handsontable/dist/handsontable.full.min.css';
import Button from './components/Button';
import { DEFAULT_DATA } from './default_data';

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
  const handleClickSave = () => {};
  return (
    <div className="App">
      <Button callback={handleClickSave}>저장</Button>
      <HotTable
        data={DEFAULT_DATA.slice(1)}
        colHeaders={DEFAULT_DATA[0] as string[]}
        contextMenu={CONTEXT_MENU}
        {...HOTTABLE_PROPS}
      />
    </div>
  );
}

export default App;
