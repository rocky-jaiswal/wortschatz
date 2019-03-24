import { Dispatch as ReduxDispatch, Action } from 'redux';
import { AppStateType } from '../redux/app/types';

interface RootState {
  app: AppStateType;
}

export type ActionType<T> = {
  type: string;
  payload?: T;
};

export type RootStateType = RootState;

export type Dispatch = ReduxDispatch<Action>;
