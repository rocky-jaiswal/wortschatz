import * as React from 'react';
import { Link } from 'react-router-dom';

import styles from './styles.module.scss';

const Header = (_props: {}) => {
  return (
    <div className={styles.header}>
      <h2><Link to="/">Wortschatz</Link></h2>
    </div>
  );
};

export default Header;
