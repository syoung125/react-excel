import XLSX, { WorkSheet, WorkBook } from 'xlsx';

import { CellType, FileExtensionType } from './types';
import { isDate, formateDate } from './utils/date';

export default class Sheet {
  constructor(readonly name: string, readonly data: CellType[][]) {
    this.validateName(name);

    this.name = name;
    this.data = this.preprocessData(data);
  }

  private validateName(name: string): boolean {
    if (name === null || name.length === 0) {
      throw Error('Invalid file name provided');
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

  private joinNameAndExtension(
    name: string,
    extension: FileExtensionType
  ): string {
    return `${name}.${extension}`;
  }

  private convertToWorkSheet(data: CellType[][]): WorkSheet {
    return XLSX.utils.aoa_to_sheet(data);
  }

  private createWorkBook(name: string, data: CellType[][]): WorkBook {
    const workBook = XLSX.utils.book_new();
    const workSheet = this.convertToWorkSheet(data);
    XLSX.utils.book_append_sheet(workBook, workSheet, name);
    return workBook;
  }

  /**
   * Download xlsx or csv file
   * @param extension file extension, default value is xlsx
   */
  download(extension: FileExtensionType = 'xlsx'): void {
    const fileFullName = this.joinNameAndExtension(this.name, extension);
    XLSX.writeFile(this.createWorkBook(this.name, this.data), fileFullName);
  }
}
