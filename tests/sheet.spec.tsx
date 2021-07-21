import faker from 'faker';
import XLSX from 'xlsx';

import { Sheet } from '../src';
import { mockAoaData, generateProprocessDataTestCases } from './mocks';

describe('Sheet class', () => {
  const fakeData = mockAoaData();
  const sheetName = faker.name.title();
  const sheet = new Sheet(sheetName, fakeData);
  const sheetPrototype = Object.getPrototypeOf(sheet);

  it('throws error when it gets invalid fileName', () => {
    const errorMessage = 'Invalid file name provided';
    expect(() => {
      new Sheet('', fakeData);
    }).toThrow(errorMessage);
  });

  describe('preprocessData', () => {
    const cases = generateProprocessDataTestCases();
    test.each(cases)('$name', ({ before, after }) => {
      const preprocessedData = sheetPrototype.preprocessData(before);
      expect(preprocessedData).toEqual(after);
    });
  });

  it('creates workbook', () => {
    const workBook = sheetPrototype.createWorkBook(sheet.data);
    const firstSheetName = workBook.SheetNames[0];
    expect(firstSheetName).toEqual('Sheet1');
  });

  it('joins name and extension', () => {
    const result = sheetPrototype.joinNameAndExtension(sheetName, 'xlsx');
    expect(result).toEqual(`${sheetName}.xlsx`);
  });

  it('calls writeFile when download sheet', () => {
    const spy = jest.spyOn(XLSX, 'writeFile').mockImplementation(jest.fn());
    sheet.download();
    expect(spy).toHaveBeenCalled();
  });
});
