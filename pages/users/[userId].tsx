import { useRouter } from 'next/router'
import React from 'react';
import { Header } from '../../components/Header';
import { Profile } from '../../components/Profile';

export default function ProfilePage() {
  const router = useRouter();
  const { userId } = router.query;

  return (
    <>
    <Header />
      <div className="container mt-40">
        <Profile 
          fullName="Maxim Zalutskii"
          nickName="@maximone23"
          avatarUrl="https://w7.pngwing.com/pngs/336/946/png-transparent-avatar-user-medicine-surgery-patient-avatar-face-heroes-head.png"
          about="test info"
           />
      </div>
    </>
    
  )
}