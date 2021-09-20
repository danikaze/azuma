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
    const goal: ActionLogDataWithoutTime<'Goal'> = {
      type: 'Goal',
    };

    return [goal];
  }
}
