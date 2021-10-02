import { FC } from 'react';
import { Page } from '@components/page';
import { Match } from '@model/match/interfaces';
import { MatchDetails } from '@components/match-details';
import { MatchDetailsHeader } from '@components/match-details/header';
import { useMatch } from './hooks';

export type Props = {
  match: Match;
};

export const MatchPage: FC<Props> = (props) => {
  const state = useMatch(props);

  const header = <MatchDetailsHeader match={state} />;

  return (
    <Page
      activePage="matches"
      title={`${state.homeTeam.name} vs ${state.awayTeam.name}`}
      description="Azuma League player description"
      externalHeader={header}
    >
      <MatchDetails comments={state.comments} match={state} />
    </Page>
  );
};
