import { MatchSimulatorState } from './match-simulator-state';
import { SimulateMatchResult } from '..';
import { SimTeam, SimTeamGetRandomPlayerOptions, SimTeamRef } from './team';
import { SimPlayer, SimPlayerRef } from './player';
import {
  FieldPosition,
  SIM_PLAYER_REF_I_TEAM,
  SIM_TEAM_REF_I_AWAY,
  SIM_TEAM_REF_I_HOME,
} from './constants';

/**
 * Wraps the raw data of a match and provides public accesors via methods
 */
export class MatchSimulatorQuerier extends MatchSimulatorState {
  public getResult(): Readonly<SimulateMatchResult> {
    return {
      homeScore: this.score[SIM_TEAM_REF_I_HOME],
      awayScore: this.score[SIM_TEAM_REF_I_AWAY],
      log: this.log,
      actions: this.actions,
    };
  }

  public getBallPosition(): FieldPosition {
    // return a reference but readonly-typed so it's not modified from outside
    return this.ballPosition;
  }

  public getAttackingTeam(): SimTeam | undefined {
    if (!this.possession) return;
    return this.possession.team;
  }

  public getDefendingTeam(): SimTeam | undefined {
    if (!this.possession) return;
    return this.teams[0] === this.possession.team
      ? this.teams[1]
      : this.teams[0];
  }

  public isScoreTied(): boolean {
    return this.score[SIM_TEAM_REF_I_HOME] === this.score[SIM_TEAM_REF_I_AWAY];
  }

  public getAttackingTeamIndex(): SimTeamRef | undefined {
    if (!this.possession) return;
    return this.teams[0] === this.possession.team ? 0 : 1;
  }

  public getDefendingTeamIndex(): SimTeamRef | undefined {
    if (!this.possession) return;
    return this.teams[0] === this.possession.team ? 1 : 0;
  }

  protected getRandomTeam(): SimTeam {
    return this.teams[this.rng.integer(0, 1)];
  }

  protected getRandomPlayer(
    options: { team?: SimTeam } & SimTeamGetRandomPlayerOptions = {}
  ): SimPlayer | undefined {
    const team = options.team || this.getRandomTeam();

    return team.getRandomPlayer(this.rng, options)!;
  }

  protected getTeam(team: SimTeam | SimTeamRef): SimTeam {
    if (team instanceof SimTeam) return team;
    return this.teams[team];
  }

  protected getPlayer(
    player: SimPlayer | SimPlayerRef | undefined
  ): SimPlayer | undefined {
    if (!player || player instanceof SimPlayer) return player;
    return this.getTeam(player[SIM_PLAYER_REF_I_TEAM]).getPlayerFromRef(player);
  }
}
