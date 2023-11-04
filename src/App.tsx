import Handsontable from 'handsontable/base';
import { registerAllModules } from 'handsontable/registry';
import {
  registerCellType,
  DateCellType,
  HandsontableCellType,
  NumericCellType,
  TextCellType,
} from 'handsontable/cellTypes';
import 'handsontable/dist/handsontable.full.min.css';

registerAllModules();

function App() {
  return <div className="App"></div>;
}

export default App;
