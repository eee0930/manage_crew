import { HotTable } from '@handsontable/react';
import { useRef, useState } from 'react';

export const useHotHooks = (
  initialData: (string | number | undefined)[][],
  readOnlys: boolean[]
) => {
  const ref = useRef<HotTable>(null);
  const [updatedData, setUpdatedData] = useState(initialData);
  const [readOnlyIdx, setReadOnlyIdx] = useState(readOnlys);

  return { ref };
};
