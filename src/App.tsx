import { HotTable } from '@handsontable/react';
import { registerAllModules } from 'handsontable/registry';
import { Settings } from 'handsontable/plugins/contextMenu';
import './App.css';
import 'handsontable/dist/handsontable.full.min.css';
import Button from './components/Button';
import { DEFAULT_DATA, READONLY_STATE } from './default_data';
import { useHotHooks } from './hooks/useHotHooks';

registerAllModules(); // use handsontable's all modules

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

type TDate<T> = { [key: number]: T };
interface IData {
  head: {
    added: TDate<string | undefined>;
    deleted: TDate<undefined>;
    updated: TDate<string | undefined>;
  };
  body: {
    added: TDate<(string | number)[]>;
    deleted: TDate<undefined>;
    updated: TDate<TDate<string | number>>;
  };
}

function App() {
  const { hotRef, compare, setData } = useHotHooks(
    DEFAULT_DATA,
    READONLY_STATE
  );

  const handleClickSave = () => {
    const hot = hotRef?.current?.hotInstance;
    const printData: IData = {
      head: { added: {}, deleted: {}, updated: {} },
      body: { added: {}, deleted: {}, updated: {} },
    };
    if (hot) {
      const hotData = hot.getData();

      setData(hotData);
      console.log(printData);
    }
  };

  return (
    <div className="App">
      <Button callback={handleClickSave}>저장</Button>

      <HotTable
        ref={hotRef}
        data={DEFAULT_DATA}
        contextMenu={CONTEXT_MENU}
        {...HOTTABLE_PROPS}
      />
    </div>
  );
}

export default App;
