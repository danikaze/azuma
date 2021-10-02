import { SimulateMatchResult } from '..';
import {
  FieldPosition,
  SIM_PLAYER_REF_I_TEAM,
  SIM_TEAM_REF_I_AWAY,
  SIM_TEAM_REF_I_HOME,
} from './constants';
import { MatchSimulatorState } from './match-simulator-state';
import { SimPlayer, SimPlayerRef } from './player';
import { SimTeam, SimTeamGetRandomPlayerOptions, SimTeamRef } from './team';

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
      comments: this.comments,
    };
  }

  public getHomeTeam(): SimTeam {
    return this.teams[SIM_TEAM_REF_I_HOME];
  }

  public getAwayTeam(): SimTeam {
    return this.teams[SIM_TEAM_REF_I_AWAY];
  }

  public getPossessionPlayer(): SimPlayer | undefined {
    return this.possession;
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

  public getRandomTeam(): SimTeam {
    return this.teams[this.rng.integer(0, 1)];
  }

  public getRandomPlayer(
    options: { team?: SimTeam } & SimTeamGetRandomPlayerOptions = {}
  ): SimPlayer | undefined {
    const team = options.team || this.getRandomTeam();

    return team.getRandomPlayer(this.rng, options);
  }

  public getTeam(team: SimTeam | SimTeamRef): SimTeam {
    if (team instanceof SimTeam) return team;
    return this.teams[team];
  }

  public getPlayer(player: SimPlayer | SimPlayerRef): SimPlayer;

  public getPlayer(
    player: SimPlayer | SimPlayerRef | undefined
  ): SimPlayer | undefined;

  public getPlayer(
    player: SimPlayer | SimPlayerRef | undefined
  ): SimPlayer | undefined {
    if (!player || player instanceof SimPlayer) return player;
    return this.getTeam(player[SIM_PLAYER_REF_I_TEAM]).getPlayerFromRef(player);
  }
}
