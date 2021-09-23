import { MatchSimulatorQuerier } from '@utils/match-simulator/sim/match-simulator-querier';
import { Rng } from '@utils/rng';
import { ActionLogDataWithoutTime, MatchAction } from '..';

export class RecoverLostBall extends MatchAction {
  public static getChances(sim: MatchSimulatorQuerier): number {
    if (sim.getAttackingTeamIndex() !== undefined) return 0;
    return MatchAction.DEFAULT_ACTION_CHANCES;
  }

  public run(sim: MatchSimulatorQuerier, rng: Rng): ActionLogDataWithoutTime[] {
    const player = sim.getRandomPlayer()!;

    return [
      {
        type: 'RecoverLostBall',
        player: player.getRef(),
      } as ActionLogDataWithoutTime<'RecoverLostBall'>,
    ];
  }
}
