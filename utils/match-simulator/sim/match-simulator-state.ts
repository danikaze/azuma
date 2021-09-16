import { Match } from '@model/match/interfaces';
import { MATCH_PERIODS } from '@utils/constants/game';
import { Rng } from '@utils/rng';
import { MatchActionData } from '..';
import { ActionCreator, getActionFactory } from '../actions/factory';
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
  protected createAction!: ActionCreator;

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
  protected log!: MatchActionData[][];
  /** All actions in a single list */
  protected actions!: MatchActionData[];

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
    this.createAction = getActionFactory(this.rng);

    this.time = 0;
    this.period = 0;
    this.score = [0, 0];
    this.log = [];
    this.actions = [];

    for (let i = 0; i < MATCH_PERIODS; i++) {
      this.log.push([]);
    }
  }
}
