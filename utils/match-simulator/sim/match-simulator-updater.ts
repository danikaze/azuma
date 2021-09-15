import { Match } from '@model/match/interfaces';
import {
  GOAL_SCORE,
  MATCH_BREAK_MS,
  MATCH_PERIOD_MS,
} from '@utils/constants/game';
import { getLogger } from '@utils/logger';
import { MatchActionData } from '..';
import { MatchAction, MatchActionDataMap, MatchActionType } from '../actions';
import { MatchStartData } from '../actions/match-start';
import { TieBreakData } from '../actions/tie-break';
import { SIM_PLAYER_REF_I_TEAM } from './constants';
import { MatchSimulatorQuerier } from './match-simulator-querier';
import { SimPlayer, SimPlayerRef } from './player';
import { SimTeam, SimTeamRef } from './team';

type ActionsWithoutTime = {
  [K in keyof MatchActionDataMap]: Omit<MatchActionDataMap[K], 'time'>;
};

/**
 * Top layer over the Match data that allows to update the state
 */
export class MatchSimulatorUpdater extends MatchSimulatorQuerier {
  constructor(match: Match) {
    super(match);

    if (match.log) {
      this.log = match.log;
    }
  }

  private static getActions(
    log: MatchActionData[][],
    ellapsedMs?: number
  ): MatchActionData[] {
    const actions: MatchActionData[] = [];
    const fullPeriodAndBreak = (MATCH_PERIOD_MS + MATCH_BREAK_MS) / 1000;
    let playedTime = ellapsedMs ? ellapsedMs / 1000 : undefined;

    for (const period of log) {
      // no time limit
      if (playedTime === undefined) {
        actions.push(...period);
        continue;
      }

      // full period finished
      if (playedTime! > MATCH_PERIOD_MS) {
        playedTime -= fullPeriodAndBreak;
        actions.push(...period);
        continue;
      }

      // period still not started
      if (playedTime < 0) {
        break;
      }

      // period being currently played
      for (const action of period) {
        if (playedTime < action.time) break;
        actions.push(action);
      }
      playedTime -= fullPeriodAndBreak;
    }

    return actions;
  }

  public replay(ellapsedMs?: number): void {
    const log = this.log;
    this.reset();
    MatchSimulatorUpdater.getActions(log, ellapsedMs).forEach((actionData) =>
      this.update(this.createAction(actionData))
    );
  }

  public update(action: MatchAction<MatchActionType>): void {
    if (!IS_PRODUCTION) {
      Object.entries(action.data).forEach(([key, value]) => {
        if (JSON.stringify(value) === undefined) {
          getLogger('MatchSimulatorUpdater').warn(
            `MatchAction "${action.data.type}" is using non-serializable data in key ${key}`
          );
        }
      });
    }

    this.log[this.period].push(action.data);
    this.actions.push(action.data);
    action.run(this);
  }

  public startMatch(action: MatchStartData) {
    this.possession = this.getPlayer(action.playerRef);
  }

  public switchPossession(): void {
    if (!this.possession) {
      this.possession = this.getRandomPlayer()!;
      return;
    }
    this.possession = this.getRandomPlayer({
      team: this.getDefendingTeam(),
    })!;
  }

  public setPossession(player: SimPlayer | SimPlayerRef | undefined): void {
    this.possession = this.getPlayer(player);
  }

  public goal() {
    if (!this.possession) return;
    this.addScore(this.getAttackingTeamIndex()!, GOAL_SCORE);
  }

  public untie(action: TieBreakData) {
    this.addScore(action.teamRef, GOAL_SCORE / 2);
  }

  protected do<T extends keyof ActionsWithoutTime>(
    data: ActionsWithoutTime[T]
  ): void {
    const action = this.createAction({
      ...data,
      time: this.time,
    } as MatchActionDataMap[T]);
    this.update(action);
    this.time += action.duration;
  }

  protected addScore(team: SimTeamRef, value: number): void {
    this.score[team] += value;
  }

  protected getTeam(team: SimTeam | SimTeamRef): SimTeam {
    if (team instanceof SimTeam) return team;
    return this.teams[team];
  }

  protected getPlayer(
    player: SimPlayer | SimPlayerRef | undefined
  ): SimPlayer | undefined {
    if (!player || player instanceof SimPlayer) return;
    return this.getTeam(player[SIM_PLAYER_REF_I_TEAM]).getPlayerFromRef(player);
  }
}
