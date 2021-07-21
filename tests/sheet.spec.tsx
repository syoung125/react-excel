import faker from 'faker';
import XLSX from 'xlsx';

import { Sheet } from '../src';
import { mockAoaData, generateProprocessDataTestCases } from './mocks';

describe('Sheet class', () => {
  const fakeName = faker.name.title();
  const fakeData = mockAoaData();
  const sheet = new Sheet(fakeName, fakeData);
  const sheetPrototype = Object.getPrototypeOf(sheet);

  it('throws error when it gets invalid fileName', () => {
    const invalidName = '';
    const errorMessage = 'Invalid file name provided';
    expect(() => {
      new Sheet(invalidName, fakeData);
    }).toThrow(errorMessage);
  });

  describe('validateData', () => {
    it('should be throw error when it gets invalid data', () => {
      const invalidData = [[]];
      const errorMessage = 'Invalid data provided';
      expect(() => {
        new Sheet(fakeName, invalidData);
      }).toThrow(errorMessage);
    });

    it('should be throw error when all rows are not a same length.', () => {
      const invalidData = [
        [1, 2, 3],
        [4, 5],
        [6, 7, 8, 9, 10],
      ];
      const errorMessage = 'All rows should be a same length';
      expect(() => {
        new Sheet(fakeName, invalidData);
      }).toThrow(errorMessage);
    });
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

  it('formats full name', () => {
    const result = sheetPrototype.formatFullName(fakeName, 'xlsx');
    expect(result).toEqual(`${fakeName}.xlsx`);
  });

  it('calls writeFile when download sheet', () => {
    const spy = jest.spyOn(XLSX, 'writeFile').mockImplementation(jest.fn());
    sheet.download();
    expect(spy).toHaveBeenCalled();
  });
});
