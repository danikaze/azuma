import { Team } from './interfaces';

export function getTeamImageUrl(team: Pick<Team, 'image'>): string {
  return `/static/images/teams/${team.image}`;
}
