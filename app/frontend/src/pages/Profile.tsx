import React from 'react';
import Login from './../features/auth';
import { LayoutOfContainer, Title, Content } from './../Layout';

const Profile = () => (
  <LayoutOfContainer>
    <Title>Profile</Title>
    <Content>
      <div className="profile">
        <Login />
      </div>
    </Content>
  </LayoutOfContainer>
);

export default Profile;
