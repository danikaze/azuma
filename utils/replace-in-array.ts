/**
 * Acts like `Array.splice` but allows to specify an array element instead of
 * an index
 */
export function replaceInArray<T>(
  array: T[],
  itemToRemove: T,
  ...itemsToInsert: T[]
): void {
  const index = array.findIndex((elem) => elem === itemToRemove);
  if (index === -1) return;
  array.splice(index, 1, ...itemsToInsert);
}
