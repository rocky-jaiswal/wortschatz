import * as React from 'react';

import styles from './styles.module.scss';

interface Props {
  germanWord: string;
}

const WordDisplay = (props: Props) => {
  return (
    <div className={styles.word_display}>
      <h1>{props.germanWord}</h1>
    </div>
  );
};

export default WordDisplay;
