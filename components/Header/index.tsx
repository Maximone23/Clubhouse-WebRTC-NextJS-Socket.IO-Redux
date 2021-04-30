import clsx from 'clsx';
import Link from 'next/link';
import React from 'react';
import { Avatar } from '../Avatar';

import styles from './Header.module.scss';

export const Header: React.FC = () => {

  return (
    <div className={styles.header}>
      <div className="container d-flex align-items-center justify-content-between">
          <Link href="/">
            <div className={clsx(styles.headerLogo, 'd-flex align-items-center cup')}>
              <img src="/static/hand-wave.png" alt="Logo" className="mr-5" />
              <h4>Clubhouse</h4>
            </div>
          </Link>
          <Link href="/users/1">
            <div className="d-flex align-items-center cup">
              <b className="mr-15">Maxim Zalutskii</b>
              <Avatar src="" width="40px" height="40px" />
            </div>
          </Link>
      </div>
    </div>
  );
};
