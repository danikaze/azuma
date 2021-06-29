import { MatchAction, MatchTeam } from '../interfaces';

export interface MatchActionData {
  Goal: {};
  MatchStart: { team: MatchTeam };
  SwitchPossession: {};
  PeriodEnd: {};
  PeriodStart: {};
  MatchEnd: {};
  TieBreak: { team: MatchTeam };
}

export function isAction<T extends keyof MatchActionData>(
  type: T,
  action: MatchAction
): action is MatchAction<T> {
  return action.type === type;
}

export function createAction<T extends keyof MatchActionData>(
  data: MatchAction<T>
): MatchAction<T> {
  return data;
}
