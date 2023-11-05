import Handsontable from 'handsontable/base';
import { registerAllModules } from 'handsontable/registry';
import { HotTable } from '@handsontable/react';
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
function App() {
  const handleClickSave = () => {};
  return (
    <div className="App">
      <Button callback={handleClickSave}>저장</Button>
      <HotTable data={DEFAULT_DATA} {...HOTTABLE_PROPS} />
    </div>
  );
}

export default App;
