import { FC } from 'react';

import styles from './match-details.module.scss';
import { MatchDetailsNarration } from './narration';
import { Match } from '@model/match/interfaces';
import { SHOW_MATCH_PREVIEW_FROM } from '@utils/constants/ui';
import { MatchAction } from '@utils/match-simulator/interfaces';
import { getSeconds } from '@utils/jikan';
import { MatchDetailsStartingSoon } from './starting-soon';

export type Props = {
  match: Match;
  actions?: MatchAction[];
};

export const MatchDetails: FC<Props> = ({ match, actions }) => {
  const now = getSeconds();
  let narration: JSX.Element | undefined;

  if (match.timestamp < now && actions) {
    narration = <MatchDetailsNarration actions={actions} />;
  } else if (match.timestamp < now + SHOW_MATCH_PREVIEW_FROM / 1000) {
    narration = <MatchDetailsStartingSoon matchStartTime={match.timestamp} />;
  }

  return <div className={styles.root}>{narration}</div>;
};
