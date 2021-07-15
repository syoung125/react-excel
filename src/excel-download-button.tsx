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
    const sheet = new Sheet(fileName, fileExtension, data);
    sheet.download();
  };

  const renderDefaultButton = () => {
    const label = {
      xlsx: '엑셀',
      csv: 'CSV',
    }[fileExtension];

    return <button style={style}>{label} 다운</button>;
  };

  return <span onClick={handleClick}>{element || renderDefaultButton()}</span>;
}

export default ExcelDownloadButton;
