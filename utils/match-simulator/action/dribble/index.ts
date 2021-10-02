import { DribbleCut } from '@utils/match-simulator/action-log/dribble-cut';
import {
  AnyMatchActionLogData,
  CreateMatchActionLogData,
  MatchActionLogData,
} from '@utils/match-simulator/action-log/interfaces';
import { MatchSimulatorQuerier } from '@utils/match-simulator/sim/match-simulator-querier';
import { SimPlayerRef } from '@utils/match-simulator/sim/player';
import { SimTeam } from '@utils/match-simulator/sim/team';
import { Rng } from '@utils/rng';
import { MatchAction } from '..';

export class Dribble extends MatchAction {
  public static getChances(sim: MatchSimulatorQuerier): number {
    if (sim.getAttackingTeamIndex() === undefined) return 0;
    return MatchAction.DEFAULT_ACTION_CHANCES / 2;
  }

  private static getSubstitutePlayer(
    rng: Rng,
    team: SimTeam
  ): SimPlayerRef | undefined {
    const player = team.getRandomPlayer(rng, {
      type: 'only-substitutes',
      filter: (player) => !player.hasState('injury'),
    });
    return player?.getRef();
  }

  public run(sim: MatchSimulatorQuerier, rng: Rng): AnyMatchActionLogData[] {
    const actions: AnyMatchActionLogData[] = [];
    const attackingPlayer = sim.getPossessionPlayer()!;
    const defensePlayer = sim.getRandomPlayer({
      team: sim.getDefendingTeam(),
      filter: (player) => player.getPosition() !== 'GK',
    })!;

    const dribbleSuccess =
      !defensePlayer ||
      attackingPlayer.skillRoll(rng, 'dribble') >
        defensePlayer.skillRoll(rng, 'defense');

    const dribbleResult = {
      type: dribbleSuccess ? 'Dribble' : 'DribbleCut',
      attacker: attackingPlayer.getRef(),
      defender: defensePlayer.getRef(),
    } as MatchActionLogData['Dribble'] | MatchActionLogData['DribbleCut'];

    actions.push(dribbleResult);

    const gotInjuried =
      !dribbleSuccess &&
      defensePlayer.skillCheck(rng, 'aggresivity', MatchAction.DC_FAUL) &&
      !attackingPlayer.skillCheck(
        rng,
        'constitution',
        MatchAction.DC_AVOID_INJURY
      );

    const isFaul = !dribbleSuccess && rng.integer(100) > MatchAction.DC_FAUL;

    if (isFaul && gotInjuried) {
      if (gotInjuried) {
        actions.push({
          type: 'FaulWithInjury',
          from: defensePlayer.getRef(),
          to: attackingPlayer.getRef(),
          duration: rng.integer(...MatchAction.ALTERED_STATE_DURATIONS.injury),
        } as MatchActionLogData['FaulWithInjury']);

        const substitutePlayer = Dribble.getSubstitutePlayer(
          rng,
          attackingPlayer.team
        );

        if (substitutePlayer) {
          actions.push({
            type: 'Substitution',
            playerOut: attackingPlayer.getRef(),
            playerIn: substitutePlayer,
          } as MatchActionLogData['Substitution']);
        }
      } else {
        actions.push({
          type: 'FaulWithoutInjury',
          from: defensePlayer.getRef(),
          to: attackingPlayer.getRef(),
        } as MatchActionLogData['FaulWithoutInjury']);
      }
    } else if (gotInjuried) {
      actions.push({
        type: 'Injury',
        from: defensePlayer.getRef(),
        injuriedPlayer: attackingPlayer.getRef(),
      } as MatchActionLogData['Injury']);

      const substitutePlayer = Dribble.getSubstitutePlayer(
        rng,
        attackingPlayer.team
      );

      if (substitutePlayer) {
        actions.push({
          type: 'Substitution',
          playerOut: attackingPlayer.getRef(),
          playerIn: substitutePlayer,
        } as MatchActionLogData['Substitution']);
      }
    }

    return actions;
  }
}
