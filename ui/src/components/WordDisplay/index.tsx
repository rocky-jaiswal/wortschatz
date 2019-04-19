import * as React from 'react';

import styles from './styles.module.scss';

interface Props {
  wordId: number;
  germanWord: string;
}

const WordDisplay = (props: Props) => {
  return (
    <div className={styles.word_display}>
      <h1 key={props.wordId}>{props.germanWord}</h1>
    </div>
  );
};

export default WordDisplay;
