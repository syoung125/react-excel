export type ColumnsType<TData = Record<string, unknown>> = {
  label: string;
  key: string;
  mapValue?: (record: TData) => string;
}[];

export const generateTableData = <TData = Record<string, unknown>>(
  data: TData[],
  columns: ColumnsType<TData>
): any[][] => {
  const columnsRow = columns.map(({ label }) => label);
  const rows: any[] = data.map((record: TData) =>
    columns.map(({ key, mapValue }) =>
      mapValue ? mapValue(record) : record[key as keyof TData]
    )
  );

  return [columnsRow, ...rows];
};
