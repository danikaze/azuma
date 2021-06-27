import { combineReducers, Reducer } from 'redux';
import { HYDRATE } from 'next-redux-wrapper';
import { State } from '@store/model';
import { Action } from '@store/actions';
import { hydrateReducer } from './hydrate';

const combinedReducer = combineReducers<State, Action>({});

export const reducer: Reducer<State, Action> = (state, action) => {
  if (action.type === HYDRATE) {
    return hydrateReducer(state, action);
  }
  return combinedReducer(state, action as Action);
};
