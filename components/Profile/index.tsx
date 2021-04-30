import React from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import { Button } from '../Button';
import { Avatar } from '../Avatar';


import styles from './Profile.module.scss';



interface ProfileProps {
  fullName: string;
  nickName: string;
  avatarUrl: string;
  about: string;
}


export const Profile: React.FC<ProfileProps> = ({ fullName, nickName, avatarUrl, about}) => {
  return (
    <>
        <Link href="/rooms">
            <div className="d-flex cup">
            <img src="/static/back-arrow.svg" alt="Back" className="mr-10" />
            <h3>Back</h3>
            </div>
        </Link>
        <div className="d-flex align-items-center">
          <div className=" d-flex align-items-center">
            <Avatar width="100px" height="100px" src={avatarUrl} />
            <div className="d-flex flex-column ml-30 mr-30">
              <h2 className="mt-0 mb-0">{fullName}</h2>
              <h3 className={clsx(styles.nickname, 'mt-0 mb-0')}>{nickName}</h3>
            </div>
          </div>
          <Button className={styles.followBtn} color="blue"> Follow</Button>
        </div>
        <p className={styles.about}>{about}</p>
    </>
  );
};
