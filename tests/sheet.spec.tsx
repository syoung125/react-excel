import dayjs from 'dayjs';

import { Sheet } from '../src';

const MOCK_DATA = [
  ['name', 'height', 'weight'],
  ['Joe', 188, 87],
  ['Marry', 158, 54],
  ['Bob', 177, 78],
];

describe('Sheet class', () => {
  const sheet = new Sheet('new_file', 'xlsx', MOCK_DATA);
  const sheetPrototype = Object.getPrototypeOf(sheet);

  it('throws error when it gets invalid fileName', () => {
    const errorMessage = 'Invalid file name provided';
    expect(() => {
      new Sheet('', 'xlsx', MOCK_DATA);
    }).toThrow(errorMessage);
  });

  describe('preprocessData', () => {
    const cases = [
      {
        name: 'string',
        before: [['string', 'hello']],
        after: [['string', 'hello']],
      },
      { name: 'number', before: [['number', 123]], after: [['number', '123']] },
      {
        name: 'boolean',
        before: [['boolean', true]],
        after: [['boolean', 'TRUE']],
      },
      {
        name: 'object',
        before: [['object', { firstName: 'John', lastName: 'Doe' }]],
        after: [['object', '{"firstName":"John","lastName":"Doe"}']],
      },
      {
        name: 'date',
        before: [['date', new Date()]],
        after: [['date', dayjs(new Date()).format('YYYY-MM-DD')]],
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

    test.each(cases)('$name', ({ before, after }) => {
      const preprocessedData = sheetPrototype.preprocessData(before);
      expect(preprocessedData).toEqual(after);
    });
  });

  it('creates workbook', () => {
    const sheetName = 'my_excel_file';
    const sheet = new Sheet(sheetName, 'xlsx', MOCK_DATA);
    const sheetNames = sheet.createWorkBook().SheetNames;
    expect(sheetName).toEqual(sheetNames[0]);
  });

  it('joins name and extension', () => {
    const result = sheetPrototype.joinNameAndExtension('new_file', 'xlsx');
    expect(result).toEqual('new_file.xlsx');
  });

  it('set options', () => {
    sheetPrototype.setOptions({ dateFormat: 'YY/MM/DD' });
    expect(sheetPrototype.options).toEqual({ dateFormat: 'YY/MM/DD' });
  });
});
