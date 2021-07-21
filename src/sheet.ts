import XLSX, { WorkSheet, WorkBook } from 'xlsx';

import { CellType, FileExtensionType } from './types';
import { isDate, formateDate } from './utils/date';

export default class Sheet {
  constructor(readonly name: string, readonly data: CellType[][]) {
    this.validateName(name);
    this.validateData(data);

    this.name = name;
    this.data = this.preprocessData(data);
  }

  /**
   * check name validation
   * It throws error when name is null or empty
   */
  private validateName(name: string): boolean {
    if (name === null || name.length === 0) {
      throw Error('Invalid file name provided');
    }
    return true;
  }

  /**
   * check data validation
   * It throws error when data is empty or has different row length
   */
  private validateData(data: CellType[][]): boolean {
    if (data.length === 0 || data[0].length === 0) {
      throw Error('Invalid data provided');
    }
    if (data.find((row) => row.length !== data[0].length)) {
      throw Error('All rows should be a same length');
    }
    return true;
  }

  private preprocessData(_data: CellType[][]): string[][] {
    const data: string[][] = _data.map((row) =>
      row.map((cell) => {
        if (typeof cell === 'string') {
          return cell;
        }
        if (typeof cell === 'number') {
          return cell.toString();
        }
        if (typeof cell === 'boolean') {
          return cell.toString().toUpperCase();
        }
        if (isDate(cell)) {
          return formateDate(cell);
        }
        if (typeof cell === 'object') {
          return JSON.stringify(cell);
        }

        return '';
      })
    );
    return data;
  }

  /**
   * Format file full name by joinning name and extension
   */
  private formatFullName(name: string, extension: FileExtensionType): string {
    return `${name}.${extension}`;
  }

  private convertToWorkSheet(data: CellType[][]): WorkSheet {
    return XLSX.utils.aoa_to_sheet(data);
  }

  /**
   * Create workBook with only one sheet.
   * Appended sheet will be named 'Sheet1' for default.
   */
  private createWorkBook(data: CellType[][]): WorkBook {
    const workBook = XLSX.utils.book_new();
    const workSheet = this.convertToWorkSheet(data);
    XLSX.utils.book_append_sheet(workBook, workSheet);
    return workBook;
  }

  /**
   * Download xlsx or csv file
   * @param extension file extension, default is 'xlsx'
   */
  download(extension: FileExtensionType = 'xlsx'): void {
    const workBook = this.createWorkBook(this.data);
    const fileFullName = this.formatFullName(this.name, extension);
    XLSX.writeFile(workBook, fileFullName);
  }
}
