import React from 'react';
import { Story, Meta } from '@storybook/react';

import ExcelDownload from './excel-download';
import { ExcelDownloadProps, ExcelSheetType } from './types';

export default {
  title: 'ExcelDownload',
  component: ExcelDownload,
} as Meta;

type TData = {
  name: { firstname: string; lastname: string };
  address: { contry: string; city: string };
  gender: 'female' | 'male';
  paid: boolean;
};

const sheetData: ExcelSheetType<TData> = {
  name: 'sheet2',
  dataSet: [
    {
      name: { firstname: 'Seoyoung', lastname: 'Ko' },
      address: { contry: 'Korea', city: 'Seoul' },
      gender: 'female',
      paid: true,
    },
    {
      name: { firstname: 'Summin', lastname: 'Choi' },
      address: { contry: 'Spain', city: 'Madrid' },
      gender: 'male',
      paid: false,
    },
  ],
  columns: [
    {
      label: '성',
      key: 'firstname',
      value: (record) => record.name.firstname,
    },
    {
      label: '이름',
      key: 'lastname',
      value: (record) => record.name.lastname,
    },
    {
      label: '주소',
      key: 'address',
      value: (record) => `${record.address.contry}, ${record.address.city}`,
    },
    { label: '성별', key: 'gender' },
    {
      label: '지불여부',
      key: 'paid',
      value: (record) => (record.paid ? 'O' : 'X'),
    },
  ],
};

const DefaultTemplate: Story<ExcelDownloadProps> = (
  args: ExcelDownloadProps
) => <ExcelDownload {...args} />;

export const Default = DefaultTemplate.bind({});
Default.args = {
  fileName: 'new_excel_file',
  sheetData: sheetData,
};

export const withChildren = () => (
  <ExcelDownload fileName="new_excel_file" sheetData={sheetData}>
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
  </ExcelDownload>
);
