import clsx from 'clsx';
import React, { FC } from 'react';
import { getField } from '@utils/get-field';
import {
  AnyMatchActionComment,
  PlayerCommentData,
  TeamCommentData,
} from '@utils/match-simulator/action-log/comments';
import {
  MatchDetailsRichDataPlayer,
  Props as MatchDetailsRichDataPlayerProps,
} from './player';
import {
  MatchDetailsRichDataTeam,
  Props as MatchDetailsRichDataTeamProps,
} from './team';

import styles from './rich-data.module.scss';

export type Props = {
  type: string;
  params: AnyMatchActionComment['params'];
};

const TEXT_ELEMS = ['duration', 'currentPeriod'];
const TEAM_ELEMS = ['winningTeam', 'team'];
const PLAYER_ELEMS = [
  'player',
  'playerIn',
  'playerOut',
  'attacker',
  'defender',
  'shooter',
  'keeper',
  'from',
  'to',
  'cutBy',
  'injuriedPlayer',
];

export const MatchDetailsRichData: FC<Props> = ({ type, params }) => {
  if (!params) return null;
  const fields = type.split('.');
  const last = fields[fields.length - 1];
  let res;

  try {
    if (TEXT_ELEMS.includes(last)) {
      // tslint:disable-next-line:no-any
      res = getField(params as any, ...(fields as [string]));
    }

    if (TEAM_ELEMS.includes(last)) {
      const data = getField(
        params as any, // tslint:disable-line:no-any
        ...(fields as [string])
      ) as TeamCommentData;

      res = <MatchDetailsRichDataTeam fullPath={type} data={data} />;
    }

    if (PLAYER_ELEMS.includes(last)) {
      const data = getField(
        params as any, // tslint:disable-line:no-any
        ...(fields as [string])
      ) as PlayerCommentData;

      res = <MatchDetailsRichDataPlayer fullPath={type} data={data} />;
    }
  } catch (e) {}

  if (res) return res;
  res = (
    <div className={clsx(styles.root, styles.unknown)}>{`{{${type}}}`}</div>
  );
};
