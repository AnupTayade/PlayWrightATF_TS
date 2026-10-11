import { readFileSync } from 'node:fs';
import fs from 'node:fs/promises';
import { parse } from 'csv-parse/sync';
import type { DataRow } from './excel';

export function readCsvSync(filePath: string): DataRow[] {
  const content = readFileSync(filePath, 'utf8');
  return parse(content, {
    columns: headers => headers.map(header => header.trim()),
    skip_empty_lines: true,
    cast: true
  }) as DataRow[];
}

export async function readCsv(filePath: string): Promise<DataRow[]> {
  const content = await fs.readFile(filePath, 'utf8');
  return parse(content, {
    columns: headers => headers.map(header => header.trim()),
    skip_empty_lines: true,
    cast: true
  }) as DataRow[];
}

export function validateHeaders(rows: DataRow[], expected: string[]): void {
  const actual = rows[0] ? Object.keys(rows[0]) : [];
  if (JSON.stringify(actual) !== JSON.stringify(expected)) {
    throw new Error(`CSV headers mismatch. Expected ${expected.join(',')}; received ${actual.join(',')}`);
  }
}
