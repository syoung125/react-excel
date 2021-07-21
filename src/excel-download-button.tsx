import React from 'react';

import Sheet from './sheet';
import { ExcelDownloadButtonProps } from './types';

function ExcelDownloadButton({
  fileName,
  fileExtension = 'xlsx',
  data,
  style,
  element,
}: ExcelDownloadButtonProps) {
  const handleClick = () => {
    const sheet = new Sheet(fileName, data);
    sheet.download(fileExtension);
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
