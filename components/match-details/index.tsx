import { FC } from 'react';
import { Match } from '@model/match/interfaces';
import { SHOW_MATCH_PREVIEW_FROM } from '@utils/constants/ui';
import { getMilliseconds } from '@utils/jikan';
import { AnyMatchActionComment } from '@utils/match-simulator/action-log/comments';
import { MatchDetailsNarration } from './narration';
import { MatchDetailsStartingSoon } from './starting-soon';

import styles from './match-details.module.scss';

export type Props = {
  match: Match;
  comments?: AnyMatchActionComment[];
};

export const MatchDetails: FC<Props> = ({ match, comments }) => {
  const now = getMilliseconds();
  let narration: JSX.Element | undefined;

  if (match.timestamp < now && comments) {
    narration = <MatchDetailsNarration comments={comments} />;
  } else if (match.timestamp < now + SHOW_MATCH_PREVIEW_FROM) {
    narration = <MatchDetailsStartingSoon matchStartTime={match.timestamp} />;
  }

  return <div className={styles.root}>{narration}</div>;
};
