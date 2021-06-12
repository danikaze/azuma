import { v4 as uuidv4 } from 'uuid';

export type PrivateId = number;
export type PublicId = string;

export type TimestampUtc = number;

export interface TimestampData {
  /** Timestamp of the creation time */
  createdAt: TimestampUtc;
  /** Timestamp of the last modification time */
  updatedAt: TimestampUtc;
}

const RATIO_SECS_MS = 1000;

/**
 * Generate a unique ID for the database
 */
export function generateUniqueId(): string {
  return uuidv4();
}

/**
 * Get a standard way to store timestamps as numbers in the database
 */
export function getTimestamp(date?: Date): TimestampUtc {
  const timestamp = date ? date.getTime() : Date.now();
  return Math.floor(timestamp / RATIO_SECS_MS);
}
