import * as React from 'react';

import styles from './styles.module.scss';

interface Props {
  loading: boolean;
  incrementIndex(): void;
  decrementIndex(): void;
}

const Footer = (props: Props) => {
  return (
    <div className={styles.footer}>
      <button onClick={props.decrementIndex} disabled={props.loading}>〈</button>
      <button onClick={props.incrementIndex} disabled={props.loading}>〉</button>
    </div>
  );
};

export default Footer;
