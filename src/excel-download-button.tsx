import React from 'react';

import ExcelFile from './excel-file';
import { ExcelDownloadButtonProps, FileExtensionType } from './types';

function ExcelDownloadButton({
  fileName,
  data,
  options,
  style,
  element,
}: ExcelDownloadButtonProps) {
  const handleClick = () => {
    const excelFile = new ExcelFile(fileName, data, options);
    excelFile.download(options?.extension);
  };

  const renderDefaultButton = (extension: FileExtensionType = 'xlsx') => {
    const label = {
      xlsx: 'Excel',
      csv: 'CSV',
    }[extension];

    return <button style={style}>{label} Download</button>;
  };

  return (
    <span onClick={handleClick}>
      {element || renderDefaultButton(options?.extension)}
    </span>
  );
}

export default ExcelDownloadButton;
