export type FileExtensionType = 'xlsx' | 'csv';
export type CellType = string | number | boolean | Date | object;
export type ExcelFileOptions = {
  isNameHasDateTime?: boolean;
  extension?: FileExtensionType;
};

export type ExcelDownloadButtonProps = {
  fileName: string;
  data: CellType[][];
  options?: ExcelFileOptions;
  style?: React.CSSProperties;
  element?: React.ReactElement;
};

export type ExcelColumnsType<TData = Record<string, unknown>> = {
  label: string;
  propName: string;
  mapValue?: (record: TData) => CellType;
}[];
