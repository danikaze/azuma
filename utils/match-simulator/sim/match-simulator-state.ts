import { Match } from '@model/match/interfaces';
import { MATCH_PERIODS } from '@utils/constants/game';
import { Rng } from '@utils/rng';
import { MatchActionCreationData } from '..';
import { AnyActionComment } from '../action-log/comments';
import {
  FieldPosition,
  FieldSection,
  FieldSectionSide,
  SIM_TEAM_REF_I_AWAY,
  SIM_TEAM_REF_I_HOME,
} from './constants';
import { SimPlayer } from './player';
import { SimTeam } from './team';

export interface MatchSimulatorStateOptions {
  rngSeed?: number;
}

/**
 * The most basic MatchSimulator information, it just has the raw data
 */
export class MatchSimulatorState {
  protected rng!: Rng;

  protected readonly teams: [SimTeam, SimTeam];
  protected score!: [homeTeamScore: number, awayTeamScore: number];
  protected possession: SimPlayer | undefined;
  /** Ellapsed PERIOD time in SECONDS */
  protected time: number = 0;
  protected period: number = 0;
  protected readonly ballPosition: FieldPosition = [
    FieldSection.CENTER,
    FieldSectionSide.CENTER,
  ];

  /** Actions per period */
  protected log!: MatchActionCreationData[][];
  /** All actions in a single list */
  protected actions!: MatchActionCreationData[];
  /** All comments in a single list */
  protected comments!: AnyActionComment[];

  constructor(match: Match) {
    this.teams = [
      new SimTeam(match.homeTeam, SIM_TEAM_REF_I_HOME),
      new SimTeam(match.awayTeam, SIM_TEAM_REF_I_AWAY),
    ];

    this.reset();
  }

  public reset(options?: MatchSimulatorStateOptions): void {
    this.rng = options?.rngSeed
      ? new Rng({ seed: options.rngSeed })
      : new Rng();

    this.time = 0;
    this.period = 0;
    this.score = [0, 0];
    this.log = [];
    this.actions = [];
    this.comments = [];

    for (let i = 0; i < MATCH_PERIODS; i++) {
      this.log.push([]);
    }
  }
}
