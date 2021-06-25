// tslint:disable:no-magic-numbers
import { useFakeTimers, SinonFakeTimers } from 'sinon';
import { Jikan, getSeconds, getMilliseconds, Unit } from '../jikan';

describe('Jikan', () => {
  let timers: SinonFakeTimers;

  beforeEach(() => {
    timers = useFakeTimers();
  });

  afterEach(() => {
    timers.uninstall();
  });

  describe('static getSeconds', () => {
    it('should return seconds ellapsed from 1970 until NOW', () => {
      const now = new Date().getTime();
      const result = getSeconds();

      expect(result).toBe(now);
    });

    it('should return seconds ellapsed from 1970 until the specified date', () => {
      const seconds = Math.floor(new Date().getTime() / 1000);
      const result = getSeconds(new Jikan(seconds * 1000));

      expect(result).toBe(seconds);
    });
  });

  describe('static getMilliseconds', () => {
    it('should return milliseconds ellapsed from 1970 until NOW', () => {
      const now = new Date().getTime();
      const result = getMilliseconds();

      expect(result).toBe(now);
    });

    it('should return milliseconds ellapsed from 1970 until the specified date', () => {
      const milliseconds = new Date().getTime();
      const result = getMilliseconds(new Jikan(milliseconds));

      expect(result).toBe(milliseconds);
    });
  });

  describe('#constructor', () => {
    it('should accept dates, numbers and Jikan objects', () => {
      const testData = [
        {
          input: undefined,
          expected: new Date(),
        },
        {
          input: '2022-01-01T04:12:34+0900',
          expected: new Date('2021-12-31T19:12:34Z'),
        },
        {
          input: '2022-01-01T02:12:34+0700',
          expected: new Date('2021-12-31T19:12:34Z'),
        },
      ];

      testData.forEach((testCase, i) => {
        const stringResult = new Jikan(testCase.input);
        const dateResult = new Jikan(
          testCase.input ? new Date(testCase.input) : new Date()
        );
        const cloneResult = new Jikan(stringResult);

        expect(stringResult.getMilliseconds(), `String constructor: ${i}`).toBe(
          testCase.expected.getTime()
        );
        expect(dateResult.getMilliseconds(), `Date constructor: ${i}`).toBe(
          testCase.expected.getTime()
        );
        expect(cloneResult.getMilliseconds(), `Clone constructor: ${i}`).toBe(
          testCase.expected.getTime()
        );
      });
    });
  });

  describe('#format', () => {
    it('should provide all available formats in the default locale', () => {
      const d = new Jikan(new Date('2022-01-01T04:01:02+0900'));
      const testData = [
        ['YYYY', '2022'],
        ['YY', '22'],
        ['MMMM', 'January'],
        ['MMM', 'Jan'],
        ['MM', '01'],
        ['M', '1'],
        ['DD', '01'],
        ['D', '1'],
        ['www', 'Saturday'],
        ['ww', 'Sat'],
        ['w', 'S'],
        ['d', '6'],
        ['HH', '04'],
        ['H', '4'],
        ['hh', '04'],
        ['h', '4'],
        ['mm', '01'],
        ['m', '1'],
        ['ss', '02'],
        ['s', '2'],
        ['X', '1640977262'],
        ['x', '1640977262000'],
        ['u', 'Fri, 31 Dec 2021 19:01:02 GMT'],
        ['c', '2021-12-31T19:01:02.000Z'],
        ['C', '2021-12-31T19:01:02.000Z'],
      ];

      testData.forEach(([format, expected]) => {
        expect(d.format(format), `format("${format}")`).toBe(expected);
      });
    });

    it('should provide all available formats in other languages', () => {
      const d = new Jikan(new Date('2022-01-01T04:01:02+0900'), {
        locale: 'es',
      });
      const testData = [
        ['YYYY', '2022'],
        ['YY', '22'],
        ['MMMM', 'enero'],
        ['MMM', 'ene.'],
        ['MM', '01'],
        ['M', '1'],
        ['DD', '01'],
        ['D', '1'],
        ['www', 'sábado'],
        ['ww', 'sáb.'],
        ['w', 'S'],
        ['d', '6'],
        ['HH', '04'],
        ['H', '4'],
        ['hh', '04'],
        ['h', '4'],
        ['mm', '01'],
        ['m', '1'],
        ['ss', '02'],
        ['s', '2'],
        ['X', '1640977262'],
        ['x', '1640977262000'],
        ['u', 'Fri, 31 Dec 2021 19:01:02 GMT'],
        ['c', '2021-12-31T19:01:02.000Z'],
        ['C', '2021-12-31T19:01:02.000Z'],
      ];

      testData.forEach(([format, expected]) => {
        expect(d.format(format), `format("${format}")`).toBe(expected);
      });
    });

    it('should return same value if the format has no placeholders', () => {
      const formats = ['', 'vyz foo'];
      const validDate = new Jikan('2017-04-09');

      formats.forEach((format) => {
        expect(validDate.format(format)).toBe(format);
      });
    });
  });

  describe('#compareTo', () => {
    const dates = [
      new Jikan('2015-01-01'),
      new Jikan('2016-01-01'),
      new Jikan('2017-01-01'),
    ];

    it('should accept Jikans and other formats', () => {
      expect(dates[0].compareTo(dates[1].format('c'))).toBeLessThan(0);
      expect(dates[0].compareTo(dates[1])).toBeLessThan(0);
      expect(dates[0].compareTo(Number(dates[1].format('x')))).toBeLessThan(0);
      expect(
        dates[0].compareTo(new Date('Fri Jan 01 2016 09:00:00 GMT+0900 (JST)'))
      ).toBeLessThan(0);
    });

    it('should return <0 / 0 / >0 if compared data x is older / equal / newer than y', () => {
      dates.forEach((x, i) => {
        dates.forEach((y, j) => {
          const res = x.compareTo(y);

          if (i < j) {
            expect(res).toBeLessThan(0);
          } else if (i === j) {
            expect(res).toBe(0);
          } else {
            expect(x.compareTo(y)).toBeGreaterThan(0);
          }
        });
      });
    });

    it('should return the number by given unit', () => {
      const today = new Jikan('2018-06-26 00:00:00');
      const halfDay = new Jikan('2018-06-26 12:00:00');
      const yesterday = new Jikan('2018-06-25 00:00:00');
      const nextWeek = new Jikan('2018-07-03 00:00:00');

      // unit should be MILLISECOND by default:
      expect(today.compareTo(yesterday)).toBe(86400000);
      // explicit units:
      expect(today.compareTo(yesterday, Unit.MILLISECOND)).toBe(86400000);
      expect(today.compareTo(yesterday, Unit.SECOND)).toBe(86400);
      expect(today.compareTo(yesterday, Unit.MINUTE)).toBe(1440);
      expect(today.compareTo(yesterday, Unit.HOUR)).toBe(24);
      expect(today.compareTo(yesterday, Unit.DAY)).toBe(1);
      expect(today.compareTo(halfDay, Unit.DAY)).toBe(-0.5);
      expect(yesterday.compareTo(today, Unit.DAY)).toBe(-1);
      expect(nextWeek.compareTo(today, Unit.WEEK)).toBe(1);
    });
  });

  describe('#isBefore', () => {
    const dates = [
      new Jikan('2015-01-01'),
      new Jikan('2016-01-01'),
      new Jikan('2017-01-01'),
    ];

    it('should return true only when the current date is before the compared one', () => {
      dates.forEach((x, i) => {
        dates.forEach((y, j) => {
          expect(x.isBefore(y)).toBe(i < j);
        });
      });
    });
  });

  describe('#isAfter', () => {
    const dates = [
      new Jikan('2015-01-01'),
      new Jikan('2016-01-01'),
      new Jikan('2017-01-01'),
    ];

    it('should return true only when the current date is after the compared one', () => {
      dates.forEach((x, i) => {
        dates.forEach((y, j) => {
          expect(x.isAfter(y)).toBe(i > j);
        });
      });
    });
  });

  describe('#isSame', () => {
    const dates = [
      new Jikan('2015-01-01'),
      new Jikan('2016-01-01'),
      new Jikan('2017-01-01'),
    ];

    it('should return true only when the current date is the same than the compared one', () => {
      dates.forEach((x, i) => {
        dates.forEach((y, j) => {
          expect(x.isSame(y)).toBe(i === j);
        });
      });
    });
  });

  describe('#isSameOrBefore', () => {
    const dates = [
      new Jikan('2015-01-01'),
      new Jikan('2016-01-01'),
      new Jikan('2017-01-01'),
    ];

    it('should return true only when the current date is before or the same than the compared one', () => {
      dates.forEach((x, i) => {
        dates.forEach((y, j) => {
          expect(x.isBeforeOrSame(y)).toBe(i <= j);
        });
      });
    });
  });

  describe('#isSameOrAfter', () => {
    const dates = [
      new Jikan('2015-01-01'),
      new Jikan('2016-01-01'),
      new Jikan('2017-01-01'),
    ];

    it('should return true only when the current date is after or the same than the compared one', () => {
      dates.forEach((x, i) => {
        dates.forEach((y, j) => {
          expect(x.isAfterOrSame(y)).toBe(i >= j);
        });
      });
    });
  });

  describe('#isBetween', () => {
    const dates = [
      new Jikan('2015-01-01'),
      new Jikan('2016-01-01'),
      new Jikan('2017-01-01'),
    ];

    it('should return true only when the current date is between (not equal) the other two', () => {
      dates.forEach((x, i) => {
        dates.forEach((y, j) => {
          dates.forEach((z, k) => {
            const expected =
              (j < k && i > j && i < k) || (k < j && i > k && i < j);
            expect(x.isBetween(y, z)).toBe(expected);
          });
        });
      });
    });
  });

  describe('#isBetweenOrSame', () => {
    const dates = [
      new Jikan('2015-01-01'),
      new Jikan('2016-01-01'),
      new Jikan('2017-01-01'),
    ];

    it('should return true only when the current date is between or equal the other two', () => {
      dates.forEach((x, i) => {
        dates.forEach((y, j) => {
          dates.forEach((z, k) => {
            const expected =
              (j <= k && i >= j && i <= k) || (k <= j && i >= k && i <= j);
            expect(x.isBetweenOrSame(y, z)).toBe(expected);
          });
        });
      });
    });
  });

  describe('#add', () => {
    it('should operate properly on dates', () => {
      const t0 = new Jikan('2016-01-05T03:30:00.000Z');
      const t1 = new Jikan('2016-01-05T04:30:00.000Z');
      const t2 = new Jikan('2016-01-05T02:30:00.000Z');
      const t3 = new Jikan('2016-01-06T03:30:00.000Z');
      const t4 = new Jikan('2016-01-04T03:30:00.000Z');
      const t5 = new Jikan('2016-01-12T03:30:00.000Z');
      const t6 = new Jikan('2015-12-29T03:30:00.000Z');
      const oneHour = 3600000;
      const oneDay = 86400000;

      expect(new Jikan(t0).add(0).isSame(t0)).toBe(true);
      expect(new Jikan(t0).add(oneHour).isSame(t1)).toBe(true);
      expect(new Jikan(t0).add(-oneHour).isSame(t2)).toBe(true);
      expect(new Jikan(t0).add(oneDay).isSame(t3)).toBe(true);
      expect(new Jikan(t0).add(-oneDay).isSame(t4)).toBe(true);
      expect(new Jikan(t0).add(7 * oneDay).isSame(t5)).toBe(true);
      expect(new Jikan(t0).add(-7 * oneDay).isSame(t6)).toBe(true);
    });
  });
});
