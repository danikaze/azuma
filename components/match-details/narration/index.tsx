import React, { FC, ReactNode } from 'react';
import { Table, TableColumn, TableRow } from '@components/table';
import { AnyMatchActionComment } from '@utils/match-simulator/action-log/comments';
import styles from './match-details-narration.module.scss';
import { MatchDetailsRichData } from '../rich-data';

export type Props = {
  comments: AnyMatchActionComment[];
};

const columns: TableColumn<'time' | 'comment'>[] = [
  {
    key: 'time',
    className: styles.timeCol,
  },
  {
    key: 'comment',
    className: styles.commentCol,
  },
];

export const MatchDetailsNarration: FC<Props> = ({ comments }) => {
  if (!comments) return null;

  // TODO: Replace the Table by a Grid
  return (
    <div className={styles.root}>
      <h2>Play by Play</h2>
      <Table noHeader reverseRows columns={columns} rows={getRows(comments)} />
    </div>
  );
};

function getRows(
  comments: AnyMatchActionComment[]
): TableRow<'time' | 'comment', never>[] {
  return comments.map((comment) => ({
    time: formatTime(comment.time),
    comment: formatText(comment),
  }));
}

function formatTime(time: number): string {
  // tslint:disable:no-magic-numbers
  const min = Math.floor(time / 60);
  const secs = String(Math.floor(time % 60)).padStart(2, '0');

  return `${min}' ${secs}''`;
}

function formatText(comment: AnyMatchActionComment): ReactNode[] {
  const PREFIX = '{{';
  const SUFFIX = '}}';
  const formattedText: ReactNode[] = [];
  const text = comment.text;

  function pushRich(node: ReactNode): void {
    const richNode = isRich ? (
      <MatchDetailsRichData
        key={formattedText.length}
        type={node as string}
        params={comment.params}
      />
    ) : (
      node
    );
    formattedText.push(richNode);
    isRich = !isRich;
  }

  let start = text.indexOf(PREFIX);
  let end = 0;
  let isRich = start === 0;

  while (start !== -1) {
    const plainText = text.substring(end, start);
    if (plainText.length > 0) {
      pushRich(plainText);
    }

    end = text.indexOf(SUFFIX, start);
    if (end === -1) {
      pushRich(text.substr(start + PREFIX.length));
      break;
    }

    pushRich(text.substring(start + PREFIX.length, end));
    end += SUFFIX.length;

    start = text.indexOf(PREFIX, end);
  }

  if (end < text.length && end !== -1) {
    pushRich(text.substr(end));
  }

  return formattedText;
}
