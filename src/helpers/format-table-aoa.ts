import { CellType, ColumnsType } from '../types';

export const formatTableAOA = <TData = Record<string, unknown>>(
  data: TData[] = [],
  columns: ColumnsType<TData>
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
