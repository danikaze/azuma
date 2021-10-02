import { MatchSimulatorUpdater } from '../sim/match-simulator-updater';
import { SimPlayerRef } from '../sim/player';
import { SimTeamRef } from '../sim/team';
import {
  getPlayerCommentData,
  getTeamCommentData,
  MatchActionComment,
} from './comments';
import {
  CreateMatchActionLogData,
  MatchActionLogDataFieldMap,
  MatchActionLogMetaData,
  MatchActionLogType,
} from './interfaces';

export abstract class MatchActionLogClass<
  T extends MatchActionLogType,
  D extends keyof MatchActionLogDataFieldMap = never
> {
  /** Minimum duration of the action in seconds */
  public static readonly minDuration: number = -1;
  /** Maximum duration of the action in seconds */
  public static readonly maxDuration: number = -1;
  /** Comment texts */
  public static readonly comments: string[] = [];

  protected static readonly DEFAULT_ACTION_CHANCES = 100;

  public readonly data: CreateMatchActionLogData<T, D>;
  public readonly meta: MatchActionLogMetaData;

  constructor(
    data: CreateMatchActionLogData<T, D>,
    meta: MatchActionLogMetaData
  ) {
    if (
      !IS_PRODUCTION &&
      ((this.constructor as typeof MatchActionLogClass).minDuration === -1 ||
        (this.constructor as typeof MatchActionLogClass).maxDuration === -1)
    ) {
      throw new Error(
        `Action "${data.type}" doesn't have proper duration defined`
      );
    }

    this.data = data;
    this.meta = meta;
  }

  public abstract run(sim: MatchSimulatorUpdater): void;

  public getComment(sim: MatchSimulatorUpdater): MatchActionComment<T, D> {
    return {
      type: this.data.type,
      time: this.meta.time,
      text: (this.constructor as typeof MatchActionLogClass).comments[
        this.meta.comment
      ],
      params: this.getCommentParams(sim),
    };
  }

  protected getCommentParams(
    sim: MatchSimulatorUpdater
  ): MatchActionComment<T, D>['params'] {
    // TODO: Check proper types here :(
    // tslint:disable:no-any
    return Object.entries(this.data).reduce((params, [key, value]) => {
      if (key === 'type') return params;

      if (key === 'duration' || key === 'currentPeriod') {
        (params as any)[key] = (value as unknown) as number;
      } else if (key === 'winningTeam') {
        (params as any)[key] = getTeamCommentData(
          sim,
          (value as unknown) as SimTeamRef
        );
      } else {
        (params as any)[key as D] = getPlayerCommentData(
          sim,
          (value as unknown) as SimPlayerRef
        );
      }

      return params;
    }, {} as MatchActionComment<T, D>['params']);
  }
}
