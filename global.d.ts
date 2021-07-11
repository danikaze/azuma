/// <reference types="./build-tools/styles.d.ts" />

/**
 * Global type definitions available everywhere
 */

type Nullable<T> = {
  [P in keyof T]: T[P] | null;
};

// tslint:disable: no-any
type Tuple<ElementT, LengthT extends number, OutputT extends any[] = []> = {
  0: OutputT;
  1: Tuple<ElementT, LengthT, PushFront<OutputT, ElementT>>;
}[OutputT['length'] extends LengthT ? 0 : 1];

type PushFront<TailT extends any[], FrontT> = ((
  e: FrontT,
  ...rest: TailT
) => any) extends (...tuple: infer TupleT) => any
  ? TupleT
  : never;
// tslint:enable: no-any
