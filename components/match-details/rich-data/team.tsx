import clsx from 'clsx';
import { FC } from 'react';
import { TeamCommentData } from '@utils/match-simulator/action-log/comments';
import { getLogger } from '@utils/logger';
import styles from './rich-data.module.scss';

export type Props = {
  fullPath?: string;
  data: TeamCommentData;
};

export const MatchDetailsRichDataTeam: FC<Props> = ({ fullPath, data }) => {
  try {
    return <div className={clsx(styles.root, styles.team)}>{data.name}</div>;
  } catch (e) {
    getLogger('MatchDetailsRichDataTeam').error(e, fullPath);

    return (
      <div className={clsx(styles.root, styles.unknown)}>
        {fullPath || String(e)}
      </div>
    );
  }
};
