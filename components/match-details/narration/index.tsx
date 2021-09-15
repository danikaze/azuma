import { FC } from 'react';
import { Table, TableColumn, TableRow } from '@components/table';
import { MatchActionData } from '@utils/match-simulator';

import styles from './match-details-narration.module.scss';

export type Props = {
  actions: MatchActionData[];
};

const columns: TableColumn[] = [
  {
    key: 'time',
    className: styles.timeCol,
  },
  {
    key: 'action',
    className: styles.actionCol,
  },
];

export const MatchDetailsNarration: FC<Props> = ({ actions }) => {
  if (!actions) return null;

  // TODO: Replace the Table by a Grid
  return (
    <div className={styles.root}>
      <h2>Comments</h2>
      <Table noHeader reverseRows columns={columns} rows={getRows(actions)} />
    </div>
  );
};

function getRows(actions: MatchActionData[]): TableRow[] {
  return actions.map((action) => ({
    time: formatTime(action.time),
    action: action.type,
  }));
}

function formatTime(time: number): string {
  // tslint:disable:no-magic-numbers
  const min = Math.floor(time / 60);
  const secs = String(Math.floor(time % 60)).padStart(2, '0');

  return `${min}' ${secs}''`;
}
