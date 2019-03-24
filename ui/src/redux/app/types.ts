import { Immutable } from 'seamless-immutable';

export interface WordAndMeaning {
  englishWord: string;
  germanWord: string;
}

export interface AppState {
  loading: boolean;
  locale: string;
  words: WordAndMeaning[];
  currentIndex: number;
}

export type AppStateType = Immutable<AppState>;
