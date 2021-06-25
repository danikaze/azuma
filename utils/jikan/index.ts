// tslint:disable:no-magic-numbers
export type AcceptedDate = number | string | Date | Jikan;
export type AcceptedOffset = number | string;

const ACCEPTED_FORMATS = /(YYYY|YY|MMMM|MMM|MM|M|DD|D|www|ww|w|d|HH|H|hh|h|mm|m|ss|s|X|x|u|c|C)/g;

const replacementFunctions: {
  [key: string]: (date: Date, locale: string | string[]) => number | string;
} = {};
replacementFunctions.YYYY = (date): number => date.getFullYear();
replacementFunctions.YY = (date): string =>
  String(date.getFullYear()).substring(2);
replacementFunctions.MMMM = (date, locale): string =>
  date.toLocaleString(locale, { month: 'long' });
replacementFunctions.MMM = (date, locale): string =>
  date.toLocaleString(locale, { month: 'short' });
replacementFunctions.MM = (date): string =>
  `${date.getMonth() + 1}`.padStart(2, '0');
replacementFunctions.M = (date): number => date.getMonth() + 1;
replacementFunctions.DD = (date): string =>
  `${date.getDate()}`.padStart(2, '0');
replacementFunctions.D = (date): number => date.getDate();
replacementFunctions.www = (date, locale): string =>
  date.toLocaleString(locale, { weekday: 'long' });
replacementFunctions.ww = (date, locale): string =>
  date.toLocaleString(locale, { weekday: 'short' });
replacementFunctions.w = (date, locale): string =>
  date.toLocaleString(locale, { weekday: 'narrow' });
replacementFunctions.d = (date): number => date.getDay();
replacementFunctions.HH = (date): string =>
  `${date.getHours()}`.padStart(2, '0');
replacementFunctions.H = (date): number => date.getHours();
replacementFunctions.hh = (date): string =>
  String(date.getHours() % 12).padStart(2, '0');
replacementFunctions.h = (date): number => date.getHours() % 12;
replacementFunctions.mm = (date): string =>
  `${date.getMinutes()}`.padStart(2, '0');
replacementFunctions.m = (date): number => date.getMinutes();
replacementFunctions.ss = (date): string =>
  `${date.getSeconds()}`.padStart(2, '0');
replacementFunctions.s = (date): number => date.getSeconds();
replacementFunctions.X = (date): number => date.getTime() / 1000;
replacementFunctions.x = (date): number => date.getTime();
replacementFunctions.u = (date): string => date.toUTCString();
replacementFunctions.C = (date): string => date.toISOString();
replacementFunctions.c = (date): string =>
  `${date.getUTCFullYear()}` +
  `-${`${date.getUTCMonth() + 1}`.padStart(2, '0')}` +
  `-${`${date.getUTCDate()}`.padStart(2, '0')}` +
  `T${`${date.getUTCHours()}`.padStart(2, '0')}` +
  `:${`${date.getUTCMinutes()}`.padStart(2, '0')}` +
  `:${`${date.getUTCSeconds()}`.padStart(2, '0')}` +
  `.${`${date.getUTCMilliseconds()}`.padStart(3, '0')}Z`;

/**
 * Units of time used in conversion,
 * values are in milliseconds.
 */
export enum Unit {
  MILLISECOND = 1,
  SECOND = 1000,
  MINUTE = 60000, // 60 * 1000
  HOUR = 3600000, // 60 * 60 * 1000
  DAY = 86400000, // 24 * 60 * 60 * 1000
  WEEK = 604800000, // 7 * 24 * 60 * 60 * 1000
}

export interface JikanOptions {
  /**
   * Locale to use when formatting dates as accepted by `Intl.DateTimeFormat`
   *
   * Default browser local by default
   */
  locale?: string | string[];
}

export class Jikan {
  /** Internal Date object to perform operations */
  private readonly date: Date;
  /** Locale to use when formatting names */
  private readonly locale: string | string[];

  constructor(date: AcceptedDate = new Date(), options?: JikanOptions) {
    if (date instanceof Jikan) {
      this.date = new Date(date.date);
      this.locale = date.locale;

      return;
    }

    // create the date in UTC
    const utc = getUtc(date);
    this.date = new Date(utc);
    this.locale = options?.locale || [];
  }

  /**
   * Return a formatted date from a string of tokens.
   * Everything is returned in local time except `x`, `X`, `u`, `C` and `c`,
   * which are returned in UTC time
   *
   * **Year:**
   * * **YYYY**: 1970..2030
   * * **YY**: 70..01..30
   *
   * **Month:**
   * * **MMMM**: January..December
   * * **MMM**: Jan..Dec
   * * **MM**: 01..12
   * * **M**: 1..12
   *
   * **Day of the month:**
   * * **DD**: 01..31
   * * **D**: 1..31
   *
   * **Day of the week:**
   * * **www**: Sunday..Saturday
   * * **ww**: Sun..Sat
   * * **w**: S..S
   * * **d**: 0..6
   *
   * **Hour:**
   * * **HH**: 00..23
   * * **H**: 0..23
   * * **hh**: 00..11
   * * **h**: 0..11
   *
   * **Minutes:**
   * * **mm**: 00..60
   * * **m**: 0..60
   *
   * **Seconds:**
   * * **ss**: 00..60
   * * **s**: 0..60
   *
   * **Unix timestamp:**
   * * **X**: 1360013296 (seconds)
   * * **x**: 1360013296123 (milliseconds)
   *
   * **ISO Format:**
   * * **u**: Tue, 04 Apr 2017 07:35:17 GMT
   * * **C**: 2017-03-30T00:55:45.397Z (same as `Date.toISOString`)
   * * **c**: 2017-03-30T00:55:45.397Z (fixed format to provide
   *                                    cross-browser stability)
   *
   * @param formatString format of the string with the available placeholders
   * @return             formatted string
   */
  public format(formatString: string): string {
    if (!formatString) {
      return formatString;
    }

    return formatString.replace(ACCEPTED_FORMATS, (match, token) => {
      return replacementFunctions[token](this.date, this.locale) as string;
    });
  }

  /**
   * Compare two `Jikan` objects in _java style_.
   * This method takes into account different timezones.
   *
   * @param  date Date to compare/subtract.
   * @param  unit Specify return unit, etc: DAY, SECOND, ...
   * @return      Time difference between dates in the given unit.
   *              (positive if this object is more recent than `date`)
   *
   * @example
   * var now     = new Jikan('2016-01-06 17:30+09:00');
   * var before  = new Jikan('2016-01-06 17:25+09:00');
   * var later   = new Jikan('2016-01-06 17:35+09:00');
   * var nowUtc  = new Jikan('2016-01-06 08:30+00:00');
   * var nowUtc2 = new Jikan('2016-01-06 17:30+09:00');
   * nowUtc2.setTimezone('Z');
   * var today         = new Jikan('2016-01-06 00:00+00:00');
   * var yesterday     = new Jikan('2016-01-05 00:00+00:00');
   *
   * now.compareTo(before);  // 300000
   * now.compareTo(now);     // 0
   * now.compareTo(later);   // -300000
   * now.compareTo(nowUtc);  // 0
   * now.compareTo(nowUtc2); // 0
   * today.compareTo(yesterday, Unit.DAY); // 1
   * yesterday.compareTo(today, Unit.DAY); // -1
   */
  public compareTo(date: AcceptedDate, unit: Unit = Unit.MILLISECOND): number {
    const d = date instanceof Jikan ? date : new Jikan(date);

    return (this.date.getTime() - d.date.getTime()) / unit;
  }

  /**
   * Check if this date is before `date`
   *
   * @param  date Date in one of the accepted formats.
   * @return      `true` if this is before `date`
   */
  public isBefore(date: AcceptedDate): boolean {
    return this.compareTo(date) < 0;
  }

  /**
   * Check if this date is after `date`
   *
   * @param  date Date in one of the accepted formats.
   * @return      `true` if this is after `date`
   */
  public isAfter(date: AcceptedDate): boolean {
    return this.compareTo(date) > 0;
  }

  /**
   * Check if this date is exactly the same that `date`
   *
   * @param  date Date in one of the accepted formats.
   * @return      `true` if this is exactly the same that `date`
   */
  public isSame(date: AcceptedDate): boolean {
    return this.compareTo(date) === 0;
  }

  /**
   * Check if this date is the same or before that `date`
   *
   * @param  date Date in one of the accepted formats.
   * @return      `true` if this is the same or before that `date`
   */
  public isBeforeOrSame(date: AcceptedDate): boolean {
    return this.compareTo(date) <= 0;
  }

  /**
   * Check if this date is the same or after that `date`
   *
   * @param  date Date in one of the accepted formats.
   * @return      `true` if this is the same or after that `date`
   */
  public isAfterOrSame(date: AcceptedDate): boolean {
    return this.compareTo(date) >= 0;
  }

  /**
   * Check if this date is the between `date1` and `date2` (not equal)
   *
   * @param  date1 Date in one of the accepted formats.
   * @param  date2 Date in one of the accepted formats.
   * @return       `true` if this is between `date1` and `date2`
   */
  public isBetween(date1: AcceptedDate, date2: AcceptedDate): boolean {
    const d1 = new Jikan(date1);

    return d1.isBefore(date2)
      ? this.isAfter(d1) && this.isBefore(date2)
      : this.isAfter(date2) && this.isBefore(d1);
  }

  /**
   * Check if this date is the between `date1` and `date2` (or equal)
   *
   * @param  date1 Date in one of the accepted formats.
   * @param  date2 Date in one of the accepted formats.
   * @return       `true` if this is between `date1` and `date2`
   */
  public isBetweenOrSame(date1: AcceptedDate, date2: AcceptedDate): boolean {
    const d1 = new Jikan(date1);

    return d1.isBefore(date2)
      ? this.isAfterOrSame(d1) && this.isBeforeOrSame(date2)
      : this.isAfterOrSame(date2) && this.isBeforeOrSame(d1);
  }

  /**
   * Add milliseconds to a date, modifying it.
   * If you don't want to modify the current object, you might want to clone
   * this object as `var clone = new Jikan(original);`
   *
   * @param  ms Milliseconds to add (can be a negative value)
   * @return    This object to allow chaining
   */
  public add(ms: number): Jikan {
    this.date.setTime(this.date.getTime() + ms);

    return this;
  }

  /**
   * Gets the timestamp of the number of seconds that have elapsed since the
   * Unix epoch _(1 January 1970 00:00:00 UTC)_
   *
   * @return unix timestamp in seconds
   */
  public getSeconds(): number {
    return Math.floor(this.date.getTime() / 1000);
  }

  /**
   * Gets the timestamp of the number of milliseconds that have elapsed since
   * the Unix epoch _(1 January 1970 00:00:00 UTC)_
   *
   * @return unix timestamp in milliseconds
   */
  public getMilliseconds(): number {
    return this.date.getTime();
  }
}

/**
 * Gets the timestamp of the number of seconds that have elapsed since the
 * Unix epoch _(1 January 1970 00:00:00 UTC)_
 *
 * @param   date date to extract seconds from
 * @returns      unix timestamp in seconds
 */
export function getSeconds(date?: AcceptedDate): number {
  return date === undefined
    ? Math.floor(Date.now() / 1000)
    : new Jikan(date).getSeconds();
}

/**
 * Gets the timestamp of the number of milliseconds that have elapsed since
 * the Unix epoch _(1 January 1970 00:00:00 UTC)_
 *
 * @param   date date to extract milliseconds from
 * @returns      unix timestamp in milliseconds
 */
export function getMilliseconds(date?: AcceptedDate): number {
  return date === undefined ? Date.now() : new Jikan(date).getMilliseconds();
}

function getUtc(date: Exclude<AcceptedDate, Jikan>): number {
  if (typeof date === 'number') return date;

  const d = typeof date === 'string' ? new Date(date) : date;

  return d.getTime();
}
