import * as React from 'react';

import styles from './styles.module.scss';

interface Props {
  englishWord: string;
}

const MeaningDisplay = (props: Props) => {
  return (
    <div className={styles.word_display}>
      <h1>{props.englishWord}</h1>
    </div>
  );
};

export default MeaningDisplay;
