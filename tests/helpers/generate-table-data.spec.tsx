import { generateTableData, ColumnsType } from '../../src';

type TData = {
  id: number;
  name: { fistName: string; lastName: string };
  address: { country: string; city: string };
  age: number;
  gender: 'female' | 'male';
};

const DATA_BEFORE: TData[] = [
  {
    id: 1234,
    name: { fistName: 'John', lastName: 'Doe' },
    address: { country: 'Spain', city: 'Madrid' },
    age: 24,
    gender: 'female',
  },
  {
    id: 5678,
    name: { fistName: 'Jane', lastName: 'Doe' },
    address: { country: 'Korea', city: 'Seoul' },
    age: 32,
    gender: 'male',
  },
];

const COLUMNS: ColumnsType<TData> = [
  { label: 'P_ID', key: 'id' },
  {
    label: 'NAME',
    key: 'name',
    mapValue: (record) => `${record.name.fistName} ${record.name.lastName}`,
  },
  {
    label: 'ADDRESS',
    key: 'address',
    mapValue: (record) =>
      `I live in ${record.address.country}, ${record.address.city}.`,
  },
  {
    label: 'GENDER',
    key: 'gender',
  },
];

const DATA_AFTER = [
  ['P_ID', 'NAME', 'ADDRESS', 'GENDER'],
  [1234, 'John Doe', 'I live in Spain, Madrid.', 'female'],
  [5678, 'Jane Doe', 'I live in Korea, Seoul.', 'male'],
];

describe('generateTableData', () => {
  it('generates proper table data', () => {
    const result = generateTableData(DATA_BEFORE, COLUMNS);
    expect(result).toEqual(DATA_AFTER);
  });
});