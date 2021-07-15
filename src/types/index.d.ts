export type FileExtensionType = 'xlsx' | 'csv';

export type ExcelDownloadButtonProps = {
  fileName: string;
  fileExtension?: FileExtensionType;
  data: any[][];
  style?: React.CSSProperties;
  element?: React.ReactElement;
};
