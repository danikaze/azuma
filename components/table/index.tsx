import clsx from 'clsx';
import { ReactNode } from 'react';
import styles from './table.module.scss';

export interface TableColumn<K extends string = string> {
  key: K;
  label?: string;
  className?: string;
}

export type TableRow<
  C extends string = string,
  K extends string = string
> = Record<C, ReactNode> & { [key in K]: string | number };

export interface Props<C extends string = string, K extends string = string> {
  /** List of colmums and their definitions */
  columns: readonly TableColumn<C | K>[];
  /** Data to render */
  rows: readonly TableRow<C, K>[];
  /**
   * `key` of the colum to use as key for that row
   * If not specified, the index will be used
   */
  keyCol?: K;
  /** If `true`, no header will be rendered */
  noHeader?: boolean;
  /** If `true`, last rows will be on top */
  reverseRows?: boolean;
  /** Additional classNames to be added */
  className?: string;
}

export function Table<C extends string = string, K extends string = string>({
  className,
  noHeader,
  columns,
  rows,
  keyCol,
  reverseRows,
}: Props<C, K>) {
  return (
    <table className={clsx(styles.root, className)}>
      {!noHeader && renderHeader(columns)}
      {renderBody(columns, rows, keyCol, reverseRows)}
    </table>
  );
}

function renderHeader(columns: readonly TableColumn[]): JSX.Element {
  const ths = columns.map((col) => (
    <th key={col.key} className={col.className}>
      {col.label}
    </th>
  ));

  return (
    <thead>
      <tr>{ths}</tr>
    </thead>
  );
}

function renderBody<C extends string, K extends string | never>(
  columns: readonly TableColumn<C | K>[],
  rows: readonly TableRow<C, K>[],
  key: K | undefined,
  reverse?: boolean
): JSX.Element {
  const addMethod = reverse ? 'unshift' : 'push';
  const trs: JSX.Element[] = [];
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    const tds = columns.map((col) => (
      <td key={col.key} className={col.className}>
        {row[col.key]}
      </td>
    ));

    const trKey = key ? row[key] : i;
    trs[addMethod](<tr key={trKey}>{tds}</tr>);
  }

  return <tbody>{trs}</tbody>;
}
