import * as React from 'react';
import { connect } from 'react-redux';

import Layout from '../../components/Layout';
import { RootStateType, Dispatch } from '../../constants/types';
import { incrementIndex, decrementIndex } from '../../redux/app/actions';

interface StateProps {
}

interface DispatchProps {
  incrementIndex(): {};
  decrementIndex(): {};
}

// tslint:disable-next-line:no-any
function mapStateToProps(_state: RootStateType, ownProps: any): StateProps {
  return {
    ...ownProps
  };
}

function mapDispatchToProps(dispatch: Dispatch): DispatchProps {
  return {
    incrementIndex: () => dispatch(incrementIndex()),
    decrementIndex: () => dispatch(decrementIndex())
  };
}

// tslint:disable-next-line:no-any
export const withWrapper = (WrappedComponent: any) => {

  // tslint:disable-next-line:no-any
  class MainHoc extends React.Component<any, never> {

    render() {
      return (
        <Layout incrementIndex={this.props.incrementIndex} decrementIndex={this.props.decrementIndex}>
          <WrappedComponent match={this.props.match} />
        </Layout>
      );
    }

  }

  return connect(mapStateToProps, mapDispatchToProps)(MainHoc);
};
