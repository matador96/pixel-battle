import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import Footer from './/Footer.tsx';
import Menu from './components/Menu';
import Logo from './components/Menu/Logo.tsx';
import { animated, useSpring } from '@react-spring/web';

const Layout = ({ children }) => <div className="layout">{children}</div>;

const LeftSidebar = ({ children }) => <div className="sidebar-left">{children}</div>;

const Container = ({ children }) => <div className="container">{children}</div>;

const Main = ({ children }) => <div className="main">{children}</div>;

const Header = () => <div className="header"></div>;

const Title = (props) => {
  const [transitions] = useSpring(() => ({
    from: { opacity: 0 },
    to: { opacity: 1 },
  }));

  return (
    <animated.div className="title" style={transitions}>
      {props.children}
    </animated.div>
  );
};

const Content = ({ children }) => {
  const [transitions] = useSpring(() => ({
    from: { opacity: 0 },
    to: { opacity: 1 },
  }));

  return (
    <animated.div style={transitions}>
      <div className="content">{children}</div>
    </animated.div>
  );
};

const LayoutOfApp = (props) => {
  return (
    <Layout>
      <LeftSidebar>
        <Logo />
        <Menu />
      </LeftSidebar>
      {props.children}
    </Layout>
  );
};

const LayoutOfContainer = (props) => {
  return (
    <Main>
      <Container>
        <Header />
        <Content>{props.children}</Content>
        <Footer />
      </Container>
    </Main>
  );
};

export { LayoutOfApp, LayoutOfContainer, Title, Content };
