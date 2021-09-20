import {
  FieldSection,
  FIELD_SECTION_I,
  SIM_TEAM_REF_I_AWAY,
  SIM_TEAM_REF_I_HOME,
} from '@utils/match-simulator/sim/constants';
import { MatchSimulatorQuerier } from '@utils/match-simulator/sim/match-simulator-querier';
import { MatchSimulatorUpdater } from '@utils/match-simulator/sim/match-simulator-updater';
import { SimTeamRef } from '@utils/match-simulator/sim/team';
import { MatchActionBaseData, MatchActionLog } from '..';

export interface GoalData extends MatchActionBaseData<'Goal'> {}

export class Goal extends MatchActionLog<'Goal'> {
  public static readonly minDuration = 15;
  public static readonly maxDuration = 30;

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
    return Goal.CHANCES[attackerIndex][sim.getBallPosition()[FIELD_SECTION_I]];
  }

  public run(sim: MatchSimulatorUpdater): void {
    sim.goal();
  }
}
