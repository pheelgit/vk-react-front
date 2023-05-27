import React from 'react';

import styles from './Layout.module.scss';

export const Layout = ({ header, sidebar, content }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.headerWrapper}>
        <div className={styles.header} children={header} />
      </div>
      <main className={styles.main}>
        <div className={styles.sideBar} children={sidebar} />
        <div className={styles.content} children={content} />
      </main>
    </div>
  );
};
