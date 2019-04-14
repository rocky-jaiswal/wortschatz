import * as React from 'react';
import { Spring } from 'react-spring/renderprops';

import styles from './styles.module.scss';

interface Props {
  englishWord: string;
}

const MeaningDisplay = (props: Props) => {
  return (
    <div className={styles.meaning_display}>
      <Spring
        from={{ x: 0 }}
        to={{ x: 100 }}
        config={{ duration: 1100 }}
        key={`${props.englishWord}-1`}
      >
        {p => (
          <svg>
            <line x1="0" y1="0" x2={`${p.x}%`} y2="0" stroke="#FF509D" strokeWidth="5" />
          </svg>
        )}
      </Spring>
      <Spring
        from={{ opacity: 0 }}
        to={{ opacity: 1 }}
        delay={1000}
        key={`${props.englishWord}-2`}
      >
        {p => <h1 style={p}>{props.englishWord}</h1>}
      </Spring>
    </div>
  );
};

export default MeaningDisplay;
