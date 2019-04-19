import * as React from 'react';

import Footer from '../Footer';
import Header from '../Header';

import styles from './styles.module.scss';

interface Props {
  loading: boolean;
  wordCount: number;
  currentIndex: number;
  children?: React.ReactElement<{}>;
  incrementIndex(): {};
  decrementIndex(): {};
  setIndex(payload: number): {};
}

const Layout = (props: Props) => {

  return (
    <div className={styles.main_container}>
      <Header
        wordCount={props.wordCount}
        currentIndex={props.currentIndex}
        setIndex={props.setIndex}
      />
      <div className={styles.page}>
        <div className={styles.main}>
          {React.Children.toArray(props.children)}
        </div>
      </div>
      <Footer
        loading={props.loading}
        incrementIndex={props.incrementIndex}
        decrementIndex={props.decrementIndex}
      />
    </div>
  );

};

export default Layout;
