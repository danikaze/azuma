import { PublicId, TimestampData } from '@model';

export interface Court extends TimestampData {
  /** Unique ID of the court */
  courtId: PublicId;

  name: string;
}
