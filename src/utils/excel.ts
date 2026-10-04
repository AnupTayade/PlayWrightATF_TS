import fs from 'node:fs';
import XLSX from 'xlsx';

export type DataRow = Record<string, string | number | boolean | null>;

export function readExcelSheet(filePath: string, sheetName?: string): DataRow[] {
  const workbook = XLSX.readFile(filePath);
  const name = sheetName ?? workbook.SheetNames[0];
  if (!name) throw new Error(`No worksheets found in ${filePath}`);
  return XLSX.utils.sheet_to_json<DataRow>(workbook.Sheets[name], { defval: null });
}

export function assertExcelExists(filePath: string): void {
  if (!fs.existsSync(filePath)) throw new Error(`Excel file does not exist: ${filePath}`);
}

export function validateColumns(rows: DataRow[], expected: string[]): void {
  const actual = rows[0] ? Object.keys(rows[0]) : [];
  if (JSON.stringify(actual) !== JSON.stringify(expected)) {
    throw new Error(`Excel columns mismatch. Expected ${expected.join(',')}; received ${actual.join(',')}`);
  }
}
