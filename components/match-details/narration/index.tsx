import clsx from 'clsx';
import React, { FC, ReactNode } from 'react';
import { Table, TableColumn, TableRow } from '@components/table';
import { AnyMatchActionComment } from '@utils/match-simulator/action-log/comments';
import { MatchDetailsRichData } from '../rich-data';
import { useMatchDetailsNarration } from './hooks';
import { actionTypeToIconMap } from './constants';

import styles from './match-details-narration.module.scss';

export type Props = {
  comments: AnyMatchActionComment[];
};

type ColumKeys = 'time' | 'icon' | 'comment';

const columns: TableColumn<ColumKeys>[] = [
  {
    key: 'time',
    className: styles.timeCol,
  },
  {
    key: 'icon',
    className: styles.iconCol,
  },
  {
    key: 'comment',
    className: styles.commentCol,
  },
];

export const MatchDetailsNarration: FC<Props> = (props) => {
  const { comments, refs, updateFilter } = useMatchDetailsNarration(props);
  if (!comments) return null;

  // TODO: Replace the Table by a Grid
  return (
    <div className={styles.root}>
      <h2>Play by Play</h2>

      <div className={styles.filter}>
        <label>
          <input type="checkbox" ref={refs.checkbox} onChange={updateFilter} />{' '}
          Filter only important events
        </label>
      </div>

      <Table noHeader reverseRows columns={columns} rows={getRows(comments)} />
    </div>
  );
};

function getRows(
  comments: AnyMatchActionComment[]
): TableRow<ColumKeys, never>[] {
  return comments.map((comment) => ({
    time: formatTime(comment.time),
    icon: formatIcon(comment.type),
    comment: formatText(comment),
  }));
}

function formatTime(time: number): string {
  // tslint:disable:no-magic-numbers
  const min = Math.floor(time / 60);
  const secs = String(Math.floor(time % 60)).padStart(2, '0');

  return `${min}' ${secs}''`;
}

function formatIcon(type: AnyMatchActionComment['type']): ReactNode | null {
  const iconClass = actionTypeToIconMap[type];
  if (!iconClass) return null;
  return <div className={clsx(styles.icon, iconClass)} />;
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
