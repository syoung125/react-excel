import React from 'react';

import Sheet from './sheet';
import { ExcelDownloadButtonProps } from './types';

function ExcelDownloadButton({
  fileName,
  fileExtension = 'xlsx',
  data,
  style,
  element,
  sheetOptions,
}: ExcelDownloadButtonProps) {
  const handleClick = () => {
    const sheet = new Sheet(fileName, fileExtension, data, sheetOptions);
    sheet.download();
  };

  const renderDefaultButton = () => {
    const label = {
      xlsx: 'Excel',
      csv: 'CSV',
    }[fileExtension];

    return <button style={style}>{label} Download</button>;
  };

  return <span onClick={handleClick}>{element || renderDefaultButton()}</span>;
}

export default ExcelDownloadButton;
