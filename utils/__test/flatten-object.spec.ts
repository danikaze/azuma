// tslint:disable:no-magic-numbers
import { flattenObject } from '@utils/flatten-object';

describe('flattenObject', () => {
  it('should flatten objects', () => {
    const data = {
      int: 123,
      str: 'foo',
      fn: () => {},
      obj1: {
        n: 5.67,
        str: 'bar',
        obj2: {
          inner: 'data',
        },
        array: [1, 2, 3],
      },
      arr: ['a', 'b'],
    };

    const expected = {
      int: 123,
      str: 'foo',
      'obj1.n': 5.67,
      'obj1.str': 'bar',
      'obj1.obj2.inner': 'data',
      'obj1.array[0]': 1,
      'obj1.array[1]': 2,
      'obj1.array[2]': 3,
      'arr[0]': 'a',
      'arr[1]': 'b',
    };

    const res = flattenObject(data);
    expect(res).toEqual(expected);
  });

  it('should flatten arrays too', () => {
    const data = [123, 'str', { n: 1, t: 'txt' }, ['x', 'y']];

    const expected = {
      '[0]': 123,
      '[1]': 'str',
      '[2].n': 1,
      '[2].t': 'txt',
      '[3][0]': 'x',
      '[3][1]': 'y',
    };

    const res = flattenObject(data);
    expect(res).toEqual(expected);
  });
});
