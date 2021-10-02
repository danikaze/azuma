import {
  AnyMatchActionLogData,
  MatchActionLogData,
} from '@utils/match-simulator/action-log/interfaces';
import { MatchSimulatorQuerier } from '@utils/match-simulator/sim/match-simulator-querier';
import { Rng } from '@utils/rng';
import { MatchAction } from '..';

export class Pass extends MatchAction {
  public static getChances(sim: MatchSimulatorQuerier): number {
    if (sim.getAttackingTeamIndex() === undefined) return 0;
    return MatchAction.DEFAULT_ACTION_CHANCES;
  }

  public run(sim: MatchSimulatorQuerier, rng: Rng): AnyMatchActionLogData[] {
    const currentPlayer = sim.getPossessionPlayer()!;
    const toPlayer = sim.getRandomPlayer({
      team: sim.getAttackingTeam(),
      filter: (player) => player !== currentPlayer,
    })!;

    const cutBy = sim.getRandomPlayer({
      team: sim.getDefendingTeam(),
      filter: (player) => player.getPosition() !== 'GK',
    });

    const passSuccess =
      !cutBy ||
      currentPlayer.skillRoll(rng, 'pass') > cutBy.skillRoll(rng, 'defense');

    const action = passSuccess
      ? ({
          type: 'Pass',
          from: currentPlayer.getRef(),
          to: toPlayer.getRef(),
        } as MatchActionLogData['Pass'])
      : ({
          type: 'PassCut',
          from: currentPlayer.getRef(),
          to: toPlayer.getRef(),
          cutBy: cutBy!.getRef(),
        } as MatchActionLogData['PassCut']);

    return [action];
  }
}
