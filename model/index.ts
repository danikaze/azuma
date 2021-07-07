import { v4 as uuidv4 } from 'uuid';

export type PrivateId = number;
export type PublicId = string;

export type TimestampUtc = number;

export interface TimestampData {
  /** Timestamp of the creation time (ms) */
  createdAt: TimestampUtc;
  /** Timestamp of the last modification time (ms) */
  updatedAt: TimestampUtc;
}

/**
 * Generate a unique ID for the database
 */
export function generateUniqueId(): string {
  return uuidv4();
}
