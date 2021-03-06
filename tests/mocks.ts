import faker from 'faker';
import dayjs from 'dayjs';

import { ExcelColumnsType } from '../src';

export const mockAoaData = () => {
  const colLen = faker.datatype.number(100);
  const rowLen = faker.datatype.number(100);

  const data = [];
  for (let i = 0; i < colLen; i++) {
    const col = [];
    for (let j = 0; j < rowLen; j++) {
      const randomArray = [
        faker.datatype.string(),
        faker.datatype.number(),
        faker.datatype.boolean(),
        faker.datatype.datetime(),
        faker.datatype.json(),
      ];
      const randomElement =
        randomArray[Math.floor(Math.random() * randomArray.length)];
      col.push(randomElement);
    }
    data.push(col);
  }
  return data;
};

export const getMockedFormatDataTestCases = () => {
  const fakeString = faker.datatype.string();
  const fakeNumber = faker.datatype.number();
  const fakeBoolean = faker.datatype.boolean();
  const fakeJson = JSON.parse(faker.datatype.json());
  const fakeDate = faker.datatype.datetime();

  return [
    {
      name: 'string',
      before: [[fakeString]],
      after: [[fakeString]],
    },
    {
      name: 'number',
      before: [[fakeNumber]],
      after: [[fakeNumber.toString()]],
    },
    {
      name: 'boolean',
      before: [[fakeBoolean]],
      after: [[fakeBoolean.toString().toUpperCase()]],
    },
    {
      name: 'object',
      before: [[fakeJson]],
      after: [[JSON.stringify(fakeJson)]],
    },
    {
      name: 'date',
      before: [[fakeDate]],
      after: [[dayjs(fakeDate).format('YYYY-MM-DD')]],
    },
    {
      name: 'undefined',
      before: [[undefined]],
      after: [['']],
    },
    {
      name: 'null',
      before: [[null]],
      after: [['']],
    },
  ];
};

export const mockTableData = () => {
  type TData = {
    id: number;
    name: { fistName: string; lastName: string };
    address: { country: string; city: string };
    age: number;
  };

  const data: TData[] = [...Array(2)].map(() => ({
    id: faker.datatype.number(),
    name: {
      fistName: faker.name.firstName(),
      lastName: faker.name.lastName(),
    },
    address: { country: faker.address.country(), city: faker.address.city() },
    age: faker.datatype.number(100),
  }));

  const columns: ExcelColumnsType<TData> = [
    { label: 'P_ID', propName: 'id' },
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
    { label: 'AGE', propName: 'age' },
  ];

  const columnsRow: string[] = columns.map(({ label }) => label);
  const result = [
    columnsRow,
    ...data.map((record) => [
      record.id,
      `${record.name.fistName} ${record.name.lastName}`,
      `I live in ${record.address.country}, ${record.address.city}.`,
      record.age,
    ]),
  ];

  return { data, columns, result };
};
