import React from 'react';
import Login from './../features/auth';
import { LayoutOfContainer } from './../Layout';

const Profile = () => (
  <LayoutOfContainer>
    <div className="profile">
      <Login />
    </div>
  </LayoutOfContainer>
);

export default Profile;
