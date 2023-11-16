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

type Data = (string | number | undefined)[][];
type TDate<T> = { [key: number]: T };
interface IHead {
  added: TDate<string | undefined>;
  deleted: TDate<undefined>;
  updated: TDate<string | undefined>;
}
interface IBody {
  added: TDate<(string | number)[]>;
  deleted: TDate<undefined>;
  updated: TDate<TDate<string | number>>;
}
interface IData {
  head: IHead;
  body: IBody;
}

function App() {
  const { hotRef, compare, setInitData, hooks } = useHotHooks(
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
      const nowData = hot.getData();
      const compareData = [...compare];
      const headData = setHeadData(nowData, compareData);
      const bodyData = setBodyData(nowData, compareData);
      const newPrintData = {
        ...printData,
        head: headData,
        body: bodyData,
      };

      setInitData(nowData);
      console.log(newPrintData);
    }
  };

  const setHeadData = (data: Data, compare: Data) => {
    const head: IHead = {
      added: {},
      deleted: {},
      updated: {},
    };
    const len = data[0].length;
    for (let i = 0; i < len; i++) {
      const compareData = compare[0][i];
      if (compareData === '') {
        head.added[i] = data[0][i] as string;
      }
    }
    return head;
  };

  const setBodyData = (data: Data, compare: Data) => {};

  return (
    <div className="App">
      <Button callback={handleClickSave}>저장</Button>

      <HotTable
        ref={hotRef}
        data={DEFAULT_DATA}
        contextMenu={CONTEXT_MENU}
        {...HOTTABLE_PROPS}
        {...hooks}
      />
    </div>
  );
}

export default App;
