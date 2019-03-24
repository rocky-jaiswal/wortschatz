import { WordAndMeaning } from './types';

export const LOAD_INITIAL_DATA = 'app/LOAD_INITIAL_DATA';
export const LOAD_INITIAL_DATA_INPROGRESS = 'app/LOAD_INITIAL_DATA_INPROGRESS';
export const LOAD_INITIAL_DATA_SUCCESS = 'app/LOAD_INITIAL_DATA_SUCCESS';
export const LOAD_INITIAL_DATA_FAILED = 'app/LOAD_INITIAL_DATA_FAILED';

export const INC_INDEX = 'app/INC_INDEX';
export const DEC_INDEX = 'app/DEC_INDEX';

export const loadInitialData = () => {
  return {
    type: LOAD_INITIAL_DATA
  };
};

export const loadInitialDataInProgress = () => {
  return {
    type: LOAD_INITIAL_DATA_INPROGRESS
  };
};

export const loadInitialDataSuccess = (payload: WordAndMeaning[]) => {
  return {
    payload,
    type: LOAD_INITIAL_DATA_SUCCESS
  };
};

export const loadInitialDataFailed = () => {
  return {
    type: LOAD_INITIAL_DATA_FAILED
  };
};

export const incrementIndex = () => {
  return {
    type: INC_INDEX
  };
};

export const decrementIndex = () => {
  return {
    type: DEC_INDEX
  };
};
