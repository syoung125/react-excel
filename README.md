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
        fileExtension="csv"
    />
</>
```

### ExcelDownloadButton Props

| Props         | Type                | Default | Required | Description                                                             |
| ------------- | ------------------- | ------- | -------- | ----------------------------------------------------------------------- |
| fileName      | string              |         | true     | Excel file name to be downloaded (without extension)                    |
| fileExtension | FileExtensionType   | 'xlsx'  | true     | Excel file extension ('xlsx' or 'csv')                                  |
| data          | CellType[][]        |         | true     | Excel data of single sheet (aoa: Array of array)                        |
| style         | React.CSSProperties |         | false    | Download Button CSS                                                     |
| element       | React.ReactElement  | null    | false    | Custom button element (When it's null, default button will be rendered) |

### Types

```ts
export type FileExtensionType = 'xlsx' | 'csv';
export type CellType = string | number | boolean | Date | object;

export type ExcelDownloadButtonProps = {
  fileName: string;
  fileExtension?: FileExtensionType;
  data: CellType[][];
  style?: React.CSSProperties;
  element?: React.ReactElement;
};
```

## 2.2 Sheet class

You can generate excel sheet and download it.

```js
const data = [
  [1, 2, 3],
  ['a', 'b', 'c'],
  ['hi', 'hello', 'bye'],
];

const sheet = new Sheet('new_file', data);
sheet.download(); // download sheet as .xlsx by default

sheet.download('csv'); // download sheet as .csv by default
```

### constructor

```
constructor(name: string, data: CellType[][])
```

### properties

| Props | Type         | Default | Required |
| ----- | ------------ | ------- | -------- |
| name  | string       |         | true     |
| data  | CellType[][] |         | true     |

### methods

| Method                                       | Description                |
| -------------------------------------------- | -------------------------- |
| download(extension?: FileExtensionType):void | download xlsx or csv sheet |

## 3. Helper

## formatTableAOA (helper)

You will probably want to export table data which is composed of columns and rows.
So,formatTableAOA helper is provided to get formatted table array of arrays.

```ts
const formatTableAOA = <TData = Record<string, unknown>>(
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

const aoaData = formatTableAOA(data, columns);
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
