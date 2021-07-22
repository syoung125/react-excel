export type FileExtensionType = 'xlsx' | 'csv';
export type CellType = string | number | boolean | Date | object;
export type SheetOptions = { isFileNameHasDateTime: boolean };

export type ExcelDownloadButtonProps = {
  fileName: string;
  fileExtension?: FileExtensionType;
  data: CellType[][];
  style?: React.CSSProperties;
  element?: React.ReactElement;
  options?: SheetOptions;
};

export type ColumnsType<TData = Record<string, unknown>> = {
  label: string;
  propName: string;
  mapValue?: (record: TData) => CellType;
}[];
