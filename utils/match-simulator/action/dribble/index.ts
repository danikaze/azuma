import { MatchSimulatorQuerier } from '@utils/match-simulator/sim/match-simulator-querier';
import { SimPlayerRef } from '@utils/match-simulator/sim/player';
import { SimTeam } from '@utils/match-simulator/sim/team';
import { Rng } from '@utils/rng';
import { ActionLogDataWithoutTime, MatchAction } from '..';

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

  public run(sim: MatchSimulatorQuerier, rng: Rng): ActionLogDataWithoutTime[] {
    const actions: ActionLogDataWithoutTime[] = [];
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
      attack: attackingPlayer.getRef(),
      defense: defensePlayer.getRef(),
    } as ActionLogDataWithoutTime<'Dribble' | 'DribbleCut'>;

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
        } as ActionLogDataWithoutTime<'FaulWithInjury'>);

        const substitutePlayer = Dribble.getSubstitutePlayer(
          rng,
          attackingPlayer.team
        );

        if (substitutePlayer) {
          actions.push({
            type: 'Substitution',
            out: attackingPlayer.getRef(),
            in: substitutePlayer,
          } as ActionLogDataWithoutTime<'Substitution'>);
        }
      } else {
        actions.push({
          type: 'FaulWithoutInjury',
          from: defensePlayer.getRef(),
          to: attackingPlayer.getRef(),
        } as ActionLogDataWithoutTime<'FaulWithoutInjury'>);
      }
    } else if (gotInjuried) {
      actions.push({
        type: 'Injury',
        from: defensePlayer.getRef(),
        player: attackingPlayer.getRef(),
      } as ActionLogDataWithoutTime<'Injury'>);

      const substitutePlayer = Dribble.getSubstitutePlayer(
        rng,
        attackingPlayer.team
      );

      if (substitutePlayer) {
        actions.push({
          type: 'Substitution',
          out: attackingPlayer.getRef(),
          in: substitutePlayer,
        } as ActionLogDataWithoutTime<'Substitution'>);
      }
    }

    return actions;
  }
}
