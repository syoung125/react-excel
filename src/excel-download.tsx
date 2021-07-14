import React from 'react';
import XLSX from 'xlsx';

import { ExcelDownloadProps, FileExtensionType } from './types';
import Sheet from './sheet';

function ExcelDownload({
  fileName,
  fileExtension = 'xlsx',
  sheetData,
  children = getDefaultButtonElement(fileExtension),
}: ExcelDownloadProps) {
  const getFileNameWithExtension = () => {
    if (fileName === null || fileName.length === 0) {
      throw Error('Invalid file name provided');
    }
    return `${fileName}.${fileExtension}`;
  };

  const handleDownload = () => {
    /* convert state to workbook */
    const workbook = XLSX.utils.book_new();
    const sheet = new Sheet(sheetData);
    XLSX.utils.book_append_sheet(workbook, sheet.worksheet, sheet.name);
    /* generate and download workbook data to file */
    XLSX.writeFile(workbook, getFileNameWithExtension());
  };

  return <span onClick={handleDownload}>{children}</span>;
}

export default ExcelDownload;

export const getDefaultButtonElement = (
  fileExtension: FileExtensionType
): React.ReactElement => {
  const type = {
    xlsx: '엑셀',
    csv: 'CSV',
  }[fileExtension];

  return <button>{type} 다운</button>;
};
