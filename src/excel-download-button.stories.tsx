import React from 'react';
import { Story, Meta } from '@storybook/react';

import ExcelDownloadButton from './excel-download-button';

import { ExcelDownloadButtonProps } from './types';

export default {
  title: 'ExcelDownload',
  component: ExcelDownloadButton,
} as Meta;

const data = [
  ['이름', '랜덤숫자', '결제여부'],
  ['syoung', 123, { hi: 1 }],
  ['greatSumini', 456, new Date()],
  ['ybh', 678, true],
];

const DefaultTemplate: Story<ExcelDownloadButtonProps> = (
  args: ExcelDownloadButtonProps
) => <ExcelDownloadButton {...args} />;

export const Default = DefaultTemplate.bind({});
Default.args = {
  fileName: 'new_excel_file',
  data,
};

export const withStyle = () => {
  return (
    <ExcelDownloadButton
      fileName="new_excel_file"
      data={data}
      style={{
        borderRadius: '0.4rem',
        padding: '0.4rem 0.8rem',
      }}
    />
  );
};

export const withElement = () => {
  const CustomDownloadButton = (
    <div
      style={{
        display: 'inline-block',
        backgroundColor: 'green',
        color: 'white',
        borderRadius: '0.4rem',
        padding: '0.4rem 0.8rem',
      }}
    >
      Download Excel
    </div>
  );

  return (
    <ExcelDownloadButton
      fileName="new_excel_file"
      data={data}
      element={CustomDownloadButton}
    />
  );
};
