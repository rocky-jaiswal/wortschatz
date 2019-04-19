import * as React from 'react';
import { Link } from 'react-router-dom';

import styles from './styles.module.scss';

interface Props {
  wordCount: number;
  currentIndex: number;
  setIndex(payload: number): {};
}

const Header = (props: Props) => {
  return (
    <div className={styles.header}>
      <h2><Link to="/">Wortschatz</Link></h2>
      <div>
        <span>
          <input
            id="indexInputHeader"
            type="number"
            min={0}
            max={props.wordCount - 1}
            disabled={props.wordCount === 0}
            value={props.currentIndex}
            onChange={(e) => e.target.validity.valid && props.setIndex(parseInt(e.target.value, 10))}
          />
          /
          {props.wordCount}
        </span>
      </div>
    </div>
  );
};

export default Header;
