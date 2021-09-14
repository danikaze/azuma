import 'jest';
import { replaceInArray } from '@utils/replace-in-array';

describe('replaceInArray', () => {
  it('should do nothing if the item is not found', () => {
    const array = ['a', 'b', 'c'];
    replaceInArray(array, 'x', 'y');
    expect(array).toEqual(['a', 'b', 'c']);
  });

  it('should remove the element if no replacement is specified', () => {
    const array = ['a', 'b', 'c'];
    replaceInArray(array, 'a');
    expect(array).toEqual(['b', 'c']);
  });

  it('should replace an element', () => {
    const array = ['a', 'b', 'c'];
    replaceInArray(array, 'a', 'x');
    expect(array).toEqual(['x', 'b', 'c']);
  });

  it('should replace multiple elements', () => {
    const array = ['a', 'b', 'c'];
    replaceInArray(array, 'b', 'x', 'y', 'z');
    expect(array).toEqual(['a', 'x', 'y', 'z', 'c']);
  });
});
