import * as React from 'react'

import styles from './styles.module.scss'

interface Props {
  show: boolean
}

const Loading = (props: Props) => {
  return (
    <div className={props.show ? styles.loading : styles.hidden}>
      <div className={styles.loading_dot} />
      <div className={styles.loading_dot} />
      <div className={styles.loading_dot} />
      <div className={styles.loading_dot} />
    </div>
  )
}

export default Loading
