import * as React from 'react';
import { connect } from 'react-redux';
import { Immutable } from 'seamless-immutable';
import { push } from 'react-router-redux';

import { Dispatch, RootStateType } from '../../constants/types';
import { loadInitialData } from '../../redux/app/actions';
import { withWrapper } from '../MainHoc';

import { WordAndMeaning } from '../../redux/app/types';
import WordDisplay from '../../components/WordDisplay';
import MeaningDisplay from '../../components/MeaningDisplay';
import styles from './styles.module.scss';

interface Props {
  loading: boolean;
  currentIndex: number;
  words: Immutable<WordAndMeaning[]>;
}

interface DispatchProps {
  changeRoute(route: string): {};
  loadInitialData(): {};
}

const mapStateToProps = (state: RootStateType, _ownProps: {}): Props => {
  return {
    loading: state.app.loading,
    currentIndex: state.app.currentIndex,
    words: state.app.words
  };
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  return {
    loadInitialData: () => dispatch(loadInitialData()),
    changeRoute: (payload: string) => dispatch(push(payload))
  };
};

export class Root extends React.Component<Props & DispatchProps> {

  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    if (this.props.words.length === 0) {
      return <div />;
    }
    return (
      <div className={styles.words_container}>
        <WordDisplay germanWord={this.props.words[this.props.currentIndex].germanWord} />
        <MeaningDisplay englishWord={this.props.words[this.props.currentIndex].englishWord} />
      </div>
    );
  }

}

export default withWrapper(connect(mapStateToProps, mapDispatchToProps)(Root));
