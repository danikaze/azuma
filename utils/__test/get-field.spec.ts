import { getField } from '@utils/get-field';

describe('getField', () => {
  const o1 = {
    a: 'a',
    o2: {
      b: 'b',
      o3: {
        c: 'c',
        o4: {
          d: 'd',
          o5: {
            e: 'e',
            o6: {
              f: 'f',
              o7: {
                g: 'g',
                o8: {
                  h: 'h',
                  o9: {
                    i: 'i',
                    o10: {
                      j: 'j',
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  };

  it('should return the specified field', () => {
    expect(getField(o1, 'a')).toEqual('a');
    expect(getField(o1, 'o2', 'b')).toEqual('b');
    expect(getField(o1, 'o2', 'o3', 'c')).toEqual('c');
    expect(getField(o1, 'o2', 'o3', 'o4', 'd')).toEqual('d');
    expect(getField(o1, 'o2', 'o3', 'o4', 'o5', 'e')).toEqual('e');
    expect(getField(o1, 'o2', 'o3', 'o4', 'o5', 'o6', 'f')).toEqual('f');
    expect(getField(o1, 'o2', 'o3', 'o4', 'o5', 'o6', 'o7', 'g')).toEqual('g');
    expect(getField(o1, 'o2', 'o3', 'o4', 'o5', 'o6', 'o7', 'o8', 'h')).toEqual(
      'h'
    );
    expect(
      getField(o1, 'o2', 'o3', 'o4', 'o5', 'o6', 'o7', 'o8', 'o9', 'i')
    ).toEqual('i');
    expect(
      getField(o1, 'o2', 'o3', 'o4', 'o5', 'o6', 'o7', 'o8', 'o9', 'o10', 'j')
    ).toEqual('j');
  });
});
