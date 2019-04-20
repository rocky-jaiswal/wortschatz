import Immutable from 'seamless-immutable';

import { ActionType } from '../../constants/types';
import { AppState, AppStateType } from './types';
import { INC_INDEX, LOAD_INITIAL_DATA_SUCCESS, DEC_INDEX, SET_INDEX, LOAD_INITIAL_DATA_INPROGRESS } from './actions';

export const istate: AppState = {
  locale: 'en',
  loading: false,
  words: [],
  currentIndex: 0
};

export const initialState = Immutable.from(istate);

// tslint:disable-next-line:no-any
const appReducer = (state = initialState, action: ActionType<any>): AppStateType => {
  switch (action.type) {

    default:
      return state;

    case LOAD_INITIAL_DATA_INPROGRESS:
      return state.set('loading', true);

    case LOAD_INITIAL_DATA_SUCCESS:
      return state
        .set('loading', false)
        .set('words', action.payload);

    case DEC_INDEX:
      return state.set('currentIndex', state.currentIndex === 0 ? state.words.length - 1 : state.currentIndex - 1);

    case INC_INDEX:
      return state.set('currentIndex', state.currentIndex === state.words.length - 1 ? 0 : state.currentIndex + 1);

    case SET_INDEX:
      if (isNaN(action.payload)) {
        return state;
      }
      if (action.payload >= state.words.length) {
        return state.set('currentIndex', state.words.length);
      } else {
        return state.set('currentIndex', action.payload);
      }

  }
};

export default appReducer;
