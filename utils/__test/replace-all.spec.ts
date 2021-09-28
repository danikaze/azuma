import 'jest';
import { replaceAll } from '@utils/replace-all';

describe('replaceAll', () => {
  it('should replace nothing if not found', () => {
    expect(replaceAll('text', 'nop', 'xxx')).toEqual('text');
  });

  it('should replace all occurrences', () => {
    expect(replaceAll('123412341234', '12', 'xx')).toEqual('xx34xx34xx34');
  });

  it('should not infinite-loop with the replaced value', () => {
    expect(replaceAll('xyz', 'xyz', 'xyzxyz')).toEqual('xyzxyz');
  });
});
