# react-excel

[![NPM Version](https://img.shields.io/bundlephobia/min/@pickk/react-excel)](https://www.npmjs.com/package/@pickk/react-excel)
[![NPM Version](https://img.shields.io/npm/v/@pickk/react-excel)](https://www.npmjs.com/package/@pickk/react-excel)
[![license](https://img.shields.io/npm/l/@pickk/react-excel)](https://github.com/DEV-MUGLES/react-excel/blob/master/LICENSE)
[![codecov](https://codecov.io/gh/DEV-MUGLES/react-excel/branch/master/graph/badge.svg?token=JMAOQ5VL5T)](https://codecov.io/gh/DEV-MUGLES/react-excel)
[![CI](https://img.shields.io/github/workflow/status/DEV-MUGLES/react-excel/CI?label=CI)](https://github.com/DEV-MUGLES/react-excel/actions/workflows/ci.yml)
[![GitHub Stars](https://img.shields.io/github/stars/DEV-MUGLES/react-excel?style=social)](https://github.com/DEV-MUGLES/react-excel)

A data export library built with and for React.

support file extensions: .xlsx, .csv

## 1. Getting Started

```bash
npm i --save @pickk/react-excel
# or
yarn add @pickk/react-excel
```

## 2. Usage

## 2.1 ExcelDownloadButton

```jsx
const data = [
    [1,2,3],
    ["a", "b", "c"],
    ["hi", "hello", new Date()],
]

<>
    <ExcelDownloadButton
        fileName="new_excel_file"
        data={data}
    />
    <ExcelDownloadButton
        fileName="new_csv_file"
        data={data}
        options={{ extension: 'csv' }}
    />
</>
```

### ExcelDownloadButton Props

| Props    | Type                 | Default | Required | Description                                                                                                     |
| -------- | -------------------- | ------- | -------- | --------------------------------------------------------------------------------------------------------------- |
| fileName | string               |         | true     | Excel file name to be downloaded (without extension)                                                            |
| data     | CellType[][]         |         | true     | Excel data of single sheet (aoa: Array of array)                                                                |
| options  | ExcelFileOptions[][] |         | false    | Options for adding current DateTime at end of the fileName, and for downloading other extension files (ex) csv) |
| style    | React.CSSProperties  |         | false    | Download Button CSS                                                                                             |
| element  | React.ReactElement   | null    | false    | Custom button element (When it's null, default button will be rendered)                                         |

### Types

```ts
export type FileExtensionType = 'xlsx' | 'csv';
export type CellType = string | number | boolean | Date | object;
export type ExcelFileOptions = {
  isNameHasDateTime?: boolean;
  extension?: FileExtensionType;
};

export type ExcelDownloadButtonProps = {
  fileName: string;
  data: CellType[][];
  options?: ExcelFileOptions;
  style?: React.CSSProperties;
  element?: React.ReactElement;
};
```

### caveat

- It will throw error when sheet data is empty or sheet data has different row length.
  (Every row must have the same length)

## 2.2 ExcelFile class

You can generate excel file and download it.

```js
const data = [
  [1, 2, 3],
  ['a', 'b', 'c'],
  ['hi', 'hello', 'bye'],
];

const excelFile = new ExcelFile('new_file', data);
excelFile.download(); // download file as .xlsx by default

excelFile.download('csv'); // download file as .csv by default
```

### constructor

```
constructor(name: string, data: CellType[][], options?: ExcelFileOptions)
```

### fields

| Props   | Type             | Default | Required |
| ------- | ---------------- | ------- | -------- |
| name    | string           |         | true     |
| data    | CellType[][]     |         | true     |
| options | ExcelFileOptions |         | false    |

### methods

| Method                                       | Description               |
| -------------------------------------------- | ------------------------- |
| download(extension?: FileExtensionType):void | download xlsx or csv file |

## 3. Helper

## formatTable (helper)

You will probably want to export table data which is composed of columns and rows.
So,formatTable helper is provided to get formatted excel data (array of arrays).

```ts
const formatTable = <TData = Record<string, unknown>>(
  data: TData[],
  columns: ColumnsType<TData>
): CellType[][];
```

```ts
type MyData = {
  id: number;
  name: { fistName: string; lastName: string };
  address: { country: string; city: string };
};

const data: MyData[] = [
  {
    id: 1234,
    name: { fistName: 'John', lastName: 'Doe' },
    address: { country: 'Spain', city: 'Madrid' },
  },
  {
    id: 5678,
    name: { fistName: 'Jane', lastName: 'Doe' },
    address: { country: 'Korea', city: 'Seoul' },
  },
];

const columns: ColumnsType<MyData> = [
  {
    label: 'ID',
    propName: 'id',
  },
  {
    label: 'NAME',
    propName: 'name',
    mapValue: (record) => `${record.name.fistName} ${record.name.lastName}`,
  },
  {
    label: 'ADDRESS',
    propName: 'address',
    mapValue: (record) =>
      `I live in ${record.address.country}, ${record.address.city}.`,
  },
];

const aoaData = formatTable(data, columns);
/**
 *  aoaData output
 * [
 *    ['ID','NAME','ADDRESS'],
 *    [1234,'John Doe','I live in Spain, Madrid.'],
 *    [5678,'Jane Doe','I live in Korea, Seoul.'],
 * ]
 * /
```

### Types

```ts
export type ColumnsType<TData = Record<string, unknown>> = {
  label: string;
  propName: string;
  mapValue?: (record: TData) => CellType;
}[];
```

## 4. Links

- [![GitHub](https://img.shields.io/badge/-Github-333333)](https://github.com/DEV-MUGLES/react-excel)
- [![Storybook](https://img.shields.io/badge/-Storybook-ff69b4)](https://dev-mugles.github.io/react-excel/)
