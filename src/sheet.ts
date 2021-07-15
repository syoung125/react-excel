import XLSX, { WorkSheet } from 'xlsx';

import { FileExtensionType } from './types';

export default class Sheet {
  name: string;
  extension: string;
  data: any[][];

  constructor(name: string, extension: FileExtensionType, data: any[][]) {
    this.validateName(name);

    this.name = name;
    this.extension = extension;
    this.data = data;
  }

  private validateName(name: string) {
    if (name === null || name.length === 0) {
      throw Error('Invalid file name provided');
    }
    return true;
  }

  getFileNameWithExtension() {
    return `${this.name}.${this.extension}`;
  }

  getWorkSheet(): WorkSheet {
    return XLSX.utils.aoa_to_sheet(this.data);
  }

  getWorkBook() {
    const workbook = XLSX.utils.book_new();
    const worksheet = this.getWorkSheet();
    XLSX.utils.book_append_sheet(workbook, worksheet, this.name);
    return workbook;
  }

  download() {
    XLSX.writeFile(this.getWorkBook(), this.getFileNameWithExtension());
  }
}
