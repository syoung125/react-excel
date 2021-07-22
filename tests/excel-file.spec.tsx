import faker from 'faker';
import XLSX from 'xlsx';

import { ExcelFile } from '../src';
import { mockAoaData, getMockedFormatDataTestCases } from './mocks';

describe('ExcelFile class', () => {
  const fakeName = faker.name.title();
  const fakeData = mockAoaData();
  const excelFile = new ExcelFile(fakeName, fakeData);
  const excelFilePrototype = Object.getPrototypeOf(excelFile);

  it('throws error when it gets invalid fileName', () => {
    const invalidName = '';
    const errorMessage = 'Invalid file name provided';
    expect(() => {
      new ExcelFile(invalidName, fakeData);
    }).toThrow(errorMessage);
  });

  describe('validateData', () => {
    it('should be throw error when it gets invalid data', () => {
      const invalidData = [[]];
      const errorMessage = 'Invalid data provided';
      expect(() => {
        new ExcelFile(fakeName, invalidData);
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
        new ExcelFile(fakeName, invalidData);
      }).toThrow(errorMessage);
    });
  });

  describe('formatData', () => {
    const cases = getMockedFormatDataTestCases();
    test.each(cases)('$name', ({ before, after }) => {
      const formattedData = excelFilePrototype.formatData(before);
      expect(formattedData).toEqual(after);
    });
  });

  it('creates workbook', () => {
    const workBook = excelFilePrototype.createWorkBook(excelFile.data);
    const firstSheetName = workBook.SheetNames[0];
    expect(firstSheetName).toEqual('Sheet1');
  });

  it('formats full name', () => {
    const result = excelFilePrototype.formatFullName(fakeName, 'xlsx');
    expect(result).toEqual(`${fakeName}.xlsx`);
  });

  it('calls writeFile when download excel file', () => {
    const spy = jest.spyOn(XLSX, 'writeFile').mockImplementation(jest.fn());
    excelFile.download();
    expect(spy).toHaveBeenCalled();
  });
});
