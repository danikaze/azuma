import clsx from 'clsx';
import { FC } from 'react';
import { getLogger } from '@utils/logger';
import { PlayerCommentData } from '@utils/match-simulator/action-log/comments';
import styles from './rich-data.module.scss';

export type Props = {
  fullPath?: string;
  data: PlayerCommentData;
};

export const MatchDetailsRichDataPlayer: FC<Props> = ({ fullPath, data }) => {
  try {
    return (
      <div className={clsx(styles.root, styles.player)}>
        <span className={styles.number}>{data.number}</span> {data.fullName}
      </div>
    );
  } catch (e) {
    getLogger('MatchDetailsRichDataPlayer').error(e, fullPath);

    return (
      <div className={clsx(styles.root, styles.unknown)}>
        {fullPath || String(e)}
      </div>
    );
  }
};
