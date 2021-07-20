import { CellType, ColumnsType } from '../types';

export const generateTableData = <TData = Record<string, unknown>>(
  data: TData[],
  columns: ColumnsType<TData>
): CellType[][] => {
  const columnsRow: string[] = columns.map(({ label }) => label);
  const rows: CellType[][] = data.map(
    (record) =>
      columns.map(({ key, mapValue }) =>
        mapValue ? mapValue(record) : record[key as keyof TData]
      ) as CellType[]
  );

  return [columnsRow, ...rows];
};
