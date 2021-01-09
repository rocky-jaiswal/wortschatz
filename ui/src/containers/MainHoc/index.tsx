import * as React from 'react'
import { connect } from 'react-redux'

import Layout from '../../components/Layout'
import { RootStateType, Dispatch } from '../../constants/types'
import {
  incrementIndex,
  decrementIndex,
  setIndex,
} from '../../redux/app/actions'

interface StateProps {
  loading: boolean
  wordCount: number
  currentIndex: number
}

interface DispatchProps {
  incrementIndex(): {}
  decrementIndex(): {}
  setIndex(payload: number): {}
}

// tslint:disable-next-line:no-any
function mapStateToProps(state: RootStateType): StateProps {
  return {
    loading: state.app.loading,
    wordCount: state.app.words.length,
    currentIndex: state.app.currentIndex,
  }
}

function mapDispatchToProps(dispatch: Dispatch): DispatchProps {
  return {
    incrementIndex: () => dispatch(incrementIndex()),
    decrementIndex: () => dispatch(decrementIndex()),
    setIndex: (payload: number) => dispatch(setIndex(payload)),
  }
}

// tslint:disable-next-line:no-any
export const withWrapper = (WrappedComponent: any) => {
  // tslint:disable-next-line:no-any
  class MainHoc extends React.Component<any, never> {
    render() {
      return (
        <Layout
          loading={this.props.loading}
          wordCount={this.props.wordCount}
          currentIndex={this.props.currentIndex}
          incrementIndex={this.props.incrementIndex}
          decrementIndex={this.props.decrementIndex}
          setIndex={this.props.setIndex}
        >
          <WrappedComponent match={this.props.match} />
        </Layout>
      )
    }
  }

  return connect(mapStateToProps, mapDispatchToProps)(MainHoc)
}
