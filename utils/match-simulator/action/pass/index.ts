import { MatchSimulatorQuerier } from '@utils/match-simulator/sim/match-simulator-querier';
import { Rng } from '@utils/rng';
import { ActionLogDataWithoutTime, MatchAction } from '..';

export class Pass extends MatchAction {
  public static getChances(sim: MatchSimulatorQuerier): number {
    if (sim.getAttackingTeamIndex() === undefined) return 0;
    return MatchAction.DEFAULT_ACTION_CHANCES;
  }

  public run(sim: MatchSimulatorQuerier, rng: Rng): ActionLogDataWithoutTime[] {
    const currentPlayer = sim.getPossessionPlayer()!;
    const toPlayer = sim.getRandomPlayer({
      team: sim.getAttackingTeam(),
      filter: (player) => player !== currentPlayer,
    })!;

    const pass: ActionLogDataWithoutTime<'Pass'> = {
      type: 'Pass',
      from: currentPlayer.getRef(),
      to: toPlayer.getRef(),
    };

    return [pass];
  }
}
