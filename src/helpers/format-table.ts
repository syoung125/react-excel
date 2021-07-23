import { CellType, ExcelColumnsType } from '../types';

export const formatTable = <TData = Record<string, unknown>>(
  data: TData[] = [],
  columns: ExcelColumnsType<TData>
): CellType[][] => {
  const columnsRow: string[] = columns.map(({ label }) => label);
  const rows: CellType[][] = data.map(
    (record) =>
      columns.map(({ propName, mapValue }) =>
        mapValue ? mapValue(record) : record[propName as keyof TData]
      ) as CellType[]
  );

  return [columnsRow, ...rows];
};
