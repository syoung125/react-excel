import dayjs from 'dayjs';
import faker from 'faker';

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

export const generateProprocessDataTestCases = () => {
  const fakeString = faker.datatype.string();
  const fakeNumber = faker.datatype.number();
  const fakeBoolean = faker.datatype.boolean();
  const fakeJson = JSON.parse(faker.datatype.json());
  const fakeDate = faker.datatype.datetime();

  return [
    {
      name: 'string',
      before: [['string', fakeString]],
      after: [['string', fakeString]],
    },
    {
      name: 'number',
      before: [['number', fakeNumber]],
      after: [['number', fakeNumber.toString()]],
    },
    {
      name: 'boolean',
      before: [['boolean', fakeBoolean]],
      after: [['boolean', fakeBoolean.toString().toUpperCase()]],
    },
    {
      name: 'object',
      before: [['object', fakeJson]],
      after: [['object', JSON.stringify(fakeJson)]],
    },
    {
      name: 'date',
      before: [['date', fakeDate]],
      after: [['date', dayjs(fakeDate).format('YYYY-MM-DD')]],
    },
    {
      name: 'undefined',
      before: [['undefined', undefined]],
      after: [['undefined', '']],
    },
    {
      name: 'null',
      before: [['null', null]],
      after: [['null', 'null']],
    },
  ];
};
