import * as React from 'react';

import Footer from '../Footer';
import Header from '../Header';

import styles from './styles.module.scss';

interface Props {
  children?: React.ReactElement<{}>;
  incrementIndex(): {};
  decrementIndex(): {};
}

const Layout = (props: Props) => {

  return (
    <div className={styles.main_container}>
      <Header/>
      <div className={styles.page}>
        <div className={styles.main}>
          {React.Children.toArray(props.children)}
        </div>
      </div>
      <Footer incrementIndex={props.incrementIndex} decrementIndex={props.decrementIndex} />
    </div>
  );

};

export default Layout;
