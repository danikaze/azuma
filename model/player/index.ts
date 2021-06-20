import { Player } from './interfaces';

export function getPlayerName(
  player: Pick<Player, 'name' | 'surname'>
): string {
  return `${player.name} ${player.surname}`;
}
