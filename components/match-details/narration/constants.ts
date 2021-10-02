import { AnyMatchActionComment } from '@utils/match-simulator/action-log/comments';
import styles from './match-details-narration.module.scss';

export const actionTypeToIconMap: Partial<
  Record<AnyMatchActionComment['type'], string>
> = {
  Substitution: styles.substitution,
  ShootGoal: styles.goal,
  Injury: styles.injury,
  FaulWithInjury: styles.injury,
  MatchEnd: styles.time,
  PeriodEnd: styles.time,
};
