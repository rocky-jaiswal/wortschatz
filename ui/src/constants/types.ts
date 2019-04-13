import { Dispatch as ReduxDispatch, Action } from 'redux';
import { AppStateType } from '../redux/app/types';

interface RootState {
  app: AppStateType;
  // tslint:disable-next-line:no-any
  router?: any;
}

export type ActionType<T> = {
  type: string;
  payload?: T;
};

export type RootStateType = RootState;

export type Dispatch = ReduxDispatch<Action>;
