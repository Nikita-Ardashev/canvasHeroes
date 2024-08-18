import { cursorModel, heroesModel, heroModel, storeModel } from '@/store/storeModel';
import { Instance } from 'mobx-state-tree';

export type TSideHero = 'red' | 'blue';
export interface IHeroModel extends Instance<typeof heroModel> {}
export interface IHeroesModel extends Instance<typeof heroesModel> {}
export interface ICursorModel extends Instance<typeof cursorModel> {}
export interface IStoreModel extends Instance<typeof storeModel> {}
