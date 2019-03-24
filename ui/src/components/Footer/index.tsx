import * as React from 'react';

import styles from './styles.module.scss';

interface Props {
  incrementIndex(): {};
  decrementIndex(): {};
}

const Footer = (props: Props) => {
  return (
    <div className={styles.footer}>
      <button onClick={props.decrementIndex}>〈</button>
      <button onClick={props.incrementIndex}>〉</button>
    </div>
  );
};

export default Footer;
