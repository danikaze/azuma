import { FC } from 'react';
import { Page } from '@components/page';
import { Match } from '@model/match/interfaces';
import { MatchDetails } from '@components/match-details';
import { MatchDetailsHeader } from '@components/match-details/header';

export type Props = {
  match: Match;
};

export const MatchPage: FC<Props> = ({ match }) => {
  const header = <MatchDetailsHeader match={match} />;

  return (
    <Page
      activePage="players"
      title={`${match.homeTeam.name} vs ${match.awayTeam.name}`}
      description="Azuma League player description"
      externalHeader={header}
    >
      <MatchDetails match={match} />
    </Page>
  );
};
