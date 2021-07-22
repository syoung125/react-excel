import XLSX, { WorkSheet, WorkBook } from 'xlsx';

import { CellType, FileExtensionType, ExcelFileOptions } from './types';
import { isDate, formatDate, getDateTimeStrings } from './utils';

export default class ExcelFile {
  private wb: WorkBook;

  constructor(
    readonly name: string,
    readonly data: CellType[][],
    readonly options?: ExcelFileOptions
  ) {
    this.validateName(name);
    this.validateData(data);

    this.name = options?.isNameHasDateTime
      ? this.addDateTimeToName(name)
      : name;
    this.data = this.formatData(data);
    this.wb = this.createWorkBook(this.data);
  }

  /**
   * Check name validation
   * It throws error when name is null or empty
   * @param name
   */
  private validateName(name: string) {
    if (name === null || name.length === 0) {
      throw Error('Invalid file name provided');
    }
    return;
  }

  /**
   * Return file name with date time
   */
  private addDateTimeToName = (name: String) => {
    const { year, month, day, hours, minutes, seconds } = getDateTimeStrings(
      new Date()
    );
    const dateString = `${year}-${month}-${day}`;
    const timeString = `${hours}_${minutes}_${seconds}`;
    return `${name}_${dateString}T${timeString}`;
  };

  /**
   * Check data validation
   * It throws error when data is empty or has different row length
   * @param data
   */
  private validateData(data: CellType[][]) {
    if (data.length === 0 || data[0].length === 0) {
      throw Error('Invalid data provided');
    }
    if (data.find((row) => row.length !== data[0].length)) {
      throw Error('All rows should be a same length');
    }
    return;
  }

  /**
   * Return formatted data
   * @param data
   */
  private formatData(data: CellType[][]): string[][] {
    return data.map((row) =>
      row.map((cell) => {
        if (cell === null) {
          return '';
        }
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
          return formatDate(cell);
        }
        if (typeof cell === 'object') {
          return JSON.stringify(cell);
        }

        return '';
      })
    );
  }

  /**
   * Create workSheet from provided data
   */
  private createWorkSheet(data: CellType[][]): WorkSheet {
    return XLSX.utils.aoa_to_sheet(data);
  }

  /**
   * Create workBook with only one sheet.
   * Appended sheet will be named 'Sheet1' for default.
   */
  private createWorkBook(data: CellType[][]): WorkBook {
    const workBook = XLSX.utils.book_new();
    const workSheet = this.createWorkSheet(data);
    XLSX.utils.book_append_sheet(workBook, workSheet);
    return workBook;
  }

  /**
   * Format file full name by joinning name and extension
   */
  private formatFullName(name: string, extension: FileExtensionType): string {
    return `${name}.${extension}`;
  }

  /**
   * Download xlsx or csv file
   * @param extension file extension, default is 'xlsx'
   */
  download(extension: FileExtensionType = 'xlsx'): void {
    const fileFullName = this.formatFullName(this.name, extension);
    XLSX.writeFile(this.wb, fileFullName);
  }
}
