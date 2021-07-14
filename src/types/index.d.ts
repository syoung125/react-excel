export type FileExtensionType = 'xlsx' | 'csv';

export type ExcelColumnType<RecordType = any> = {
  label: string;
  key: string;
  value?: (record: RecordType) => string;
};
export type ExcelColumnsType<RecordType = any> = ExcelColumnType<RecordType>[];

export type ExcelSheetType<RecordType = any> = {
  name: string;
  dataSet: RecordType[];
  columns: ExcelColumnsType<RecordType>;
};

export type ExcelDownloadProps = {
  fileName: string;
  fileExtension?: FileExtensionType;
  sheetData: ExcelSheetType;
  children?: React.ReactNode;
};
