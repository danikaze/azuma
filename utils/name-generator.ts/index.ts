import { Player, PlayerGenre } from '@model/player/interfaces';
import { Rng } from '@utils/rng';
import { femaleNames } from './lists/female-names';
import { maleNames } from './lists/male-names';
import { surnames } from './lists/surnames';

export interface GenerateNameOptions {
  genre: PlayerGenre;
}

export type GeneratedName = Pick<Player, 'name' | 'surname'>;

export interface NamesDefinition {
  names: { [genre in PlayerGenre]: string[] };
  surnames: string[];
}

export function generateName(options: GenerateNameOptions): GeneratedName {
  const rng = new Rng();
  const nameList = options.genre === 'm' ? maleNames : femaleNames;

  return {
    name: rng.pick(nameList)!,
    surname: rng.pick(surnames)!,
  };
}
