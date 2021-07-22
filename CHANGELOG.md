<!-- markdownlint-disable MD024 MD034 MD033 -->

# Release Notes

## 0.0.1 (2021-07-16)

- Change main component name ExcelDownload to ExcelDownloadButton (de23462)
- Redesign and refactor Sheet class (de23462)
- Add generateTableData helper (3611272)
- Preprocess cell data before covert aoa to sheet (c411ed7)
- Add sheetOptions to Sheet class (c411ed7, ce5a4ca)

## 0.0.2 (2021-07-16)

- change package name (react-excel-download -> react-excel)
- update README.md

## 0.0.3 (2021-07-21)

- change generateTableData helper name to formatTableAOA
- remove sheetOptions and remove dayjs dependency
- rename ColumnsType.key -> ColumnsType.propName
- not assign file name to work sheet name (default sheet name is 'Sheet1')
- make createWorkBook, convertToWorkSheet to private method of Sheet class
- will not work when sheet data is empty and sheet data has different row length

## 0.0.4 (2021-07-22)

- format null data to '' for default (44e4df5)
- fix small bug

## 0.0.5 (2021-07-22)

- change class name Sheet -> ExcelFile (e255f5e)
- add ExcelFileOptions (94b7e10)
