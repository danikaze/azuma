import clsx from 'clsx';
import { FC } from 'react';
import { TeamCommentData } from '@utils/match-simulator/action-log/comments';
import { getLogger } from '@utils/logger';
import styles from './rich-data.module.scss';

export type Props = {
  fullPath?: string;
  type: 'name';
  data: TeamCommentData;
};

export const MatchDetailsRichDataTeam: FC<Props> = ({
  fullPath,
  type,
  data,
}) => {
  try {
    const content = data[type];

    return <div className={clsx(styles.root, styles.team)}>{content}</div>;
  } catch (e) {
    getLogger('MatchDetailsRichDataTeam').error(e, fullPath);

    return (
      <div className={clsx(styles.root, styles.unknown)}>
        {fullPath || String(e)}
      </div>
    );
  }
};
