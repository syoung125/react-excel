export type FileExtensionType = 'xlsx' | 'csv';
export type CellType = string | number | boolean | Date | object;

export type ExcelDownloadButtonProps = {
  fileName: string;
  fileExtension?: FileExtensionType;
  data: CellType[][];
  style?: React.CSSProperties;
  element?: React.ReactElement;
};

export type ColumnsType<TData = Record<string, unknown>> = {
  label: string;
  key: string;
  mapValue?: (record: TData) => CellType;
}[];
