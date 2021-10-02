import clsx from 'clsx';
import { FC } from 'react';
import { getLogger } from '@utils/logger';
import { PlayerCommentData } from '@utils/match-simulator/action-log/comments';
import styles from './rich-data.module.scss';

export type Props = {
  fullPath?: string;
  type: 'name' | 'fullName' | 'number';
  data: PlayerCommentData;
};

export const MatchDetailsRichDataPlayer: FC<Props> = ({
  fullPath,
  type,
  data,
}) => {
  try {
    const content = data[type];

    return <div className={clsx(styles.root, styles.player)}>{content}</div>;
  } catch (e) {
    getLogger('MatchDetailsRichDataPlayer').error(e, fullPath);

    return (
      <div className={clsx(styles.root, styles.unknown)}>
        {fullPath || String(e)}
      </div>
    );
  }
};
