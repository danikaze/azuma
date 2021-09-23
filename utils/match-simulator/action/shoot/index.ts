import {
  FieldSection,
  SIM_TEAM_REF_I_HOME,
  SIM_TEAM_REF_I_AWAY,
  FIELD_SECTION_I,
} from '@utils/match-simulator/sim/constants';
import { MatchSimulatorQuerier } from '@utils/match-simulator/sim/match-simulator-querier';
import { SimTeamRef } from '@utils/match-simulator/sim/team';
import { Rng } from '@utils/rng';
import { ActionLogDataWithoutTime, MatchAction } from '..';

export class Shoot extends MatchAction {
  protected static readonly CHANCES: Record<
    SimTeamRef,
    Record<FieldSection, number>
  > = {
    [SIM_TEAM_REF_I_HOME]: {
      [FieldSection.HOME_TEAM_GOAL]: 0,
      [FieldSection.HOME_TEAM_MID]: 0,
      [FieldSection.CENTER]: 0,
      [FieldSection.AWAY_TEAM_MID]: 50,
      [FieldSection.AWAY_TEAM_GOAL]: 80,
    },
    [SIM_TEAM_REF_I_AWAY]: {
      [FieldSection.HOME_TEAM_GOAL]: 80,
      [FieldSection.HOME_TEAM_MID]: 50,
      [FieldSection.CENTER]: 0,
      [FieldSection.AWAY_TEAM_MID]: 0,
      [FieldSection.AWAY_TEAM_GOAL]: 0,
    },
  };

  public static getChances(sim: MatchSimulatorQuerier): number {
    const attackerIndex = sim.getAttackingTeamIndex();
    if (attackerIndex === undefined) return 0;
    return Shoot.CHANCES[attackerIndex][sim.getBallPosition()[FIELD_SECTION_I]];
  }

  public run(sim: MatchSimulatorQuerier, rng: Rng): ActionLogDataWithoutTime[] {
    const shooter = sim.getPossessionPlayer()!;
    const keeper = sim.getRandomPlayer({
      team: sim.getDefendingTeam(),
      filter: (player) => player.getPosition() === 'GK',
    })!;

    const isShortDistance = (() => {
      const ballPosition = sim.getBallPosition();
      return (
        ballPosition[0] === FieldSection.HOME_TEAM_GOAL ||
        ballPosition[0] === FieldSection.AWAY_TEAM_GOAL
      );
    })();

    const shootGoesIn = shooter.skillCheck(
      rng,
      'shoot',
      isShortDistance
        ? MatchAction.DC_SHOOT_LONG_IN_GOAL
        : MatchAction.DC_SHOOT_LONG_IN_GOAL
    );

    if (!shootGoesIn) {
      return [
        {
          type: 'ShootMiss',
          shooter: shooter.getRef(),
          keeper: keeper.getRef(),
        } as ActionLogDataWithoutTime<'ShootMiss'>,
      ];
    }

    const shootRoll = shooter.skillRoll(rng, 'shoot');
    const gkRoll = keeper.skillRoll(rng, 'goalkeeper');

    if (shootRoll > gkRoll) {
      return [
        {
          type: 'ShootGoal',
          shooter: shooter.getRef(),
          keeper: keeper.getRef(),
        } as ActionLogDataWithoutTime<'ShootGoal'>,
      ];
    }

    if (shootRoll + MatchAction.DC_DIFF_SHOOT_BLOCK < gkRoll) {
      return [
        {
          type: 'ShootBlocked',
          shooter: shooter.getRef(),
          keeper: keeper.getRef(),
        } as ActionLogDataWithoutTime<'ShootBlocked'>,
      ];
    }

    return [
      {
        type: 'ShootRejected',
        shooter: shooter.getRef(),
        keeper: keeper.getRef(),
      } as ActionLogDataWithoutTime<'ShootRejected'>,
    ];
  }
}
