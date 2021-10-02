export function getField<O extends {}, F0 extends keyof O>(
  obj: O,
  f0: F0
): O[F0];

export function getField<
  O extends {},
  F0 extends keyof O,
  F1 extends keyof O[F0]
>(obj: O, f0: F0, f1: F1): O[F0][F1];

export function getField<
  O extends {},
  F0 extends keyof O,
  F1 extends keyof O[F0],
  F2 extends keyof O[F0][F1]
>(obj: O, f0: F0, f1: F1, f2: F2): O[F0][F1][F2];

export function getField<
  O extends {},
  F0 extends keyof O,
  F1 extends keyof O[F0],
  F2 extends keyof O[F0][F1],
  F3 extends keyof O[F0][F1][F2]
>(obj: O, f0: F0, f1: F1, f2: F2, f3: F3): O[F0][F1][F2][F3];

export function getField<
  O extends {},
  F0 extends keyof O,
  F1 extends keyof O[F0],
  F2 extends keyof O[F0][F1],
  F3 extends keyof O[F0][F1][F2],
  F4 extends keyof O[F0][F1][F2][F3]
>(obj: O, f0: F0, f1: F1, f2: F2, f3: F3, f4: F4): O[F0][F1][F2][F3][F4];

export function getField<
  O extends {},
  F0 extends keyof O,
  F1 extends keyof O[F0],
  F2 extends keyof O[F0][F1],
  F3 extends keyof O[F0][F1][F2],
  F4 extends keyof O[F0][F1][F2][F3],
  F5 extends keyof O[F0][F1][F2][F3][F4]
>(
  obj: O,
  f0: F0,
  f1: F1,
  f2: F2,
  f3: F3,
  f4: F4,
  f5: F5
): O[F0][F1][F2][F3][F4][F5];

export function getField<
  O extends {},
  F0 extends keyof O,
  F1 extends keyof O[F0],
  F2 extends keyof O[F0][F1],
  F3 extends keyof O[F0][F1][F2],
  F4 extends keyof O[F0][F1][F2][F3],
  F5 extends keyof O[F0][F1][F2][F3][F4],
  F6 extends keyof O[F0][F1][F2][F3][F4][F5]
>(
  obj: O,
  f0: F0,
  f1: F1,
  f2: F2,
  f3: F3,
  f4: F4,
  f5: F5,
  f6: F6
): O[F0][F1][F2][F3][F4][F5][F6];

export function getField<
  O extends {},
  F0 extends keyof O,
  F1 extends keyof O[F0],
  F2 extends keyof O[F0][F1],
  F3 extends keyof O[F0][F1][F2],
  F4 extends keyof O[F0][F1][F2][F3],
  F5 extends keyof O[F0][F1][F2][F3][F4],
  F6 extends keyof O[F0][F1][F2][F3][F4][F5],
  F7 extends keyof O[F0][F1][F2][F3][F4][F5][F6]
>(
  obj: O,
  f0: F0,
  f1: F1,
  f2: F2,
  f3: F3,
  f4: F4,
  f5: F5,
  f6: F6,
  f7: F7
): O[F0][F1][F2][F3][F4][F5][F6][F7];

export function getField<
  O extends {},
  F0 extends keyof O,
  F1 extends keyof O[F0],
  F2 extends keyof O[F0][F1],
  F3 extends keyof O[F0][F1][F2],
  F4 extends keyof O[F0][F1][F2][F3],
  F5 extends keyof O[F0][F1][F2][F3][F4],
  F6 extends keyof O[F0][F1][F2][F3][F4][F5],
  F7 extends keyof O[F0][F1][F2][F3][F4][F5][F6],
  F8 extends keyof O[F0][F1][F2][F3][F4][F5][F6][F7]
>(
  obj: O,
  f0: F0,
  f1: F1,
  f2: F2,
  f3: F3,
  f4: F4,
  f5: F5,
  f6: F6,
  f7: F7,
  f8: F8
): O[F0][F1][F2][F3][F4][F5][F6][F7][F8];

export function getField<
  O extends {},
  F0 extends keyof O,
  F1 extends keyof O[F0],
  F2 extends keyof O[F0][F1],
  F3 extends keyof O[F0][F1][F2],
  F4 extends keyof O[F0][F1][F2][F3],
  F5 extends keyof O[F0][F1][F2][F3][F4],
  F6 extends keyof O[F0][F1][F2][F3][F4][F5],
  F7 extends keyof O[F0][F1][F2][F3][F4][F5][F6],
  F8 extends keyof O[F0][F1][F2][F3][F4][F5][F6][F7],
  F9 extends keyof O[F0][F1][F2][F3][F4][F5][F6][F7][F8]
>(
  obj: O,
  f0: F0,
  f1: F1,
  f2: F2,
  f3: F3,
  f4: F4,
  f5: F5,
  f6: F6,
  f7: F7,
  f8: F8,
  f9: F9
): O[F0][F1][F2][F3][F4][F5][F6][F7][F8][F9];

/**
 * Return the value inside an object specified by its field path
 */
export function getField<
  O extends {},
  F0 extends keyof O,
  F1 extends keyof O[F0],
  F2 extends keyof O[F0][F1],
  F3 extends keyof O[F0][F1][F2],
  F4 extends keyof O[F0][F1][F2][F3],
  F5 extends keyof O[F0][F1][F2][F3][F4],
  F6 extends keyof O[F0][F1][F2][F3][F4][F5],
  F7 extends keyof O[F0][F1][F2][F3][F4][F5][F6],
  F8 extends keyof O[F0][F1][F2][F3][F4][F5][F6][F7],
  F9 extends keyof O[F0][F1][F2][F3][F4][F5][F6][F7][F8]
>(
  obj: O,
  f0: F0,
  f1?: F1,
  f2?: F2,
  f3?: F3,
  f4?: F4,
  f5?: F5,
  f6?: F6,
  f7?: F7,
  f8?: F8,
  f9?: F9
): unknown {
  if (!f1) return obj[f0];
  if (!f2) return obj[f0][f1];
  if (!f3) return obj[f0][f1][f2];
  if (!f4) return obj[f0][f1][f2][f3];
  if (!f5) return obj[f0][f1][f2][f3][f4];
  if (!f6) return obj[f0][f1][f2][f3][f4][f5];
  if (!f7) return obj[f0][f1][f2][f3][f4][f5][f6];
  if (!f8) return obj[f0][f1][f2][f3][f4][f5][f6][f7];
  if (!f9) return obj[f0][f1][f2][f3][f4][f5][f6][f7][f8];
  return obj[f0][f1][f2][f3][f4][f5][f6][f7][f8][f9];
}
