import XLSX, { WorkSheet } from 'xlsx';

import { ExcelSheetType, ExcelColumnsType } from 'src/types';

class Sheet {
  name: string;
  private dataSet: any[];
  private columns: ExcelColumnsType;
  aoa: any[][];
  worksheet: WorkSheet;

  constructor(excelSheet: ExcelSheetType) {
    const { name, columns, dataSet } = excelSheet;
    this.name = name;
    this.columns = columns;
    this.dataSet = dataSet;

    this.aoa = this.getAoa();
    this.worksheet = this.getWorkSheet();
  }

  /** Converts sheet to an array of arrays. */
  private getAoa(): any[][] {
    const columns: string[] = this.columns.map(({ label }) => label);
    const rows: any[] = this.dataSet.map((record) =>
      this.columns.map(({ key, value }) => {
        if (value) {
          return value(record);
        }
        return record[key];
      })
    );

    return [columns, ...rows];
  }

  /** Converts an array of arrays of JS data to a worksheet. */
  private getWorkSheet(): WorkSheet {
    return XLSX.utils.aoa_to_sheet(this.aoa);
  }
}

export default Sheet;
