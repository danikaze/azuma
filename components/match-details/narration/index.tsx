import { FC } from 'react';
import { Table, TableColumn, TableRow } from '@components/table';
import { AnyMatchActionComment } from '@utils/match-simulator/action-log/comments';
import styles from './match-details-narration.module.scss';

export type Props = {
  comments: AnyMatchActionComment[];
};

const columns: TableColumn[] = [
  {
    key: 'time',
    className: styles.timeCol,
  },
  {
    key: 'text',
    className: styles.actionCol,
  },
];

export const MatchDetailsNarration: FC<Props> = ({ comments }) => {
  if (!comments) return null;

  // TODO: Replace the Table by a Grid
  return (
    <div className={styles.root}>
      <h2>Comments</h2>
      <Table noHeader reverseRows columns={columns} rows={getRows(comments)} />
    </div>
  );
};

function getRows(comments: AnyMatchActionComment[]): TableRow[] {
  return comments.map((comment) => ({
    time: formatTime(comment.time),
    text: comment.text,
  }));
}

function formatTime(time: number): string {
  // tslint:disable:no-magic-numbers
  const min = Math.floor(time / 60);
  const secs = String(Math.floor(time % 60)).padStart(2, '0');

  return `${min}' ${secs}''`;
}
