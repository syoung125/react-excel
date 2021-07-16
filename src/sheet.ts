import XLSX, { WorkSheet, WorkBook } from 'xlsx';
import dayjs from 'dayjs';

import { CellType, FileExtensionType, SheetOptions } from './types';

export default class Sheet {
  readonly name: string;
  readonly extension: FileExtensionType;
  readonly data: CellType[][];
  private options: SheetOptions;

  constructor(
    name: string,
    extension: FileExtensionType,
    data: CellType[][],
    options?: SheetOptions
  ) {
    this.validateName(name);

    this.name = name;
    this.extension = extension;
    this.data = data;
    this.options = options || {};
  }

  private validateName(name: string): boolean {
    if (name === null || name.length === 0) {
      throw Error('Invalid file name provided');
    }
    return true;
  }

  private joinNameAndExtension(
    name: string,
    extension: FileExtensionType
  ): string {
    return `${name}.${extension}`;
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
        if (Object.prototype.toString.call(cell) === '[object Date]') {
          const date = cell as Date;
          return dayjs(date).format(this.options?.dateFormat || 'YYYY-MM-DD');
        }
        if (typeof cell === 'object') {
          return JSON.stringify(cell);
        }

        return '';
      })
    );
    return data;
  }

  setOptions(options: SheetOptions): void {
    this.options = options;
  }

  convertToWorkSheet(): WorkSheet {
    return XLSX.utils.aoa_to_sheet(this.preprocessData(this.data));
  }

  createWorkBook(): WorkBook {
    const workbook = XLSX.utils.book_new();
    const worksheet = this.convertToWorkSheet();
    XLSX.utils.book_append_sheet(workbook, worksheet, this.name);
    return workbook;
  }

  download(extension?: FileExtensionType): void {
    const fileFullName = this.joinNameAndExtension(
      this.name,
      extension || this.extension
    );
    XLSX.writeFile(this.createWorkBook(), fileFullName);
  }
}
