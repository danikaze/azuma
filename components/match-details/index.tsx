import { FC } from 'react';
import { Match } from '@model/match/interfaces';
import { SHOW_MATCH_PREVIEW_FROM } from '@utils/constants/ui';
import { getMilliseconds } from '@utils/jikan';
import { MatchActionData } from '@utils/match-simulator';
import { MatchDetailsNarration } from './narration';
import { MatchDetailsStartingSoon } from './starting-soon';

import styles from './match-details.module.scss';

export type Props = {
  match: Match;
  actions?: MatchActionData[];
};

export const MatchDetails: FC<Props> = ({ match, actions }) => {
  const now = getMilliseconds();
  let narration: JSX.Element | undefined;

  if (match.timestamp < now && actions) {
    narration = <MatchDetailsNarration actions={actions} />;
  } else if (match.timestamp < now + SHOW_MATCH_PREVIEW_FROM) {
    narration = <MatchDetailsStartingSoon matchStartTime={match.timestamp} />;
  }

  return <div className={styles.root}>{narration}</div>;
};
