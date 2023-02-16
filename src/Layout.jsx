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
  const [title, setTile] = useState('');
  const location = useLocation();

  const [transitions] = useSpring(() => ({
    from: { opacity: 0 },
    to: { opacity: 1 },
  }));

  useEffect(() => {
    const currentTitle = props.children.props.children.find(
      (item) => item.props.path === location.pathname,
    )?.props?.title;
    setTile(currentTitle);
  }, [location]);

  return (
    <animated.div className="title" style={transitions} key={title}>
      {title}
    </animated.div>
  );
};

const Content = ({ children }) => <div className="content">{children}</div>;

const LayoutComponent = (props) => {
  return (
    <Layout>
      <LeftSidebar>
        <Logo />
        <Menu />
      </LeftSidebar>
      <Main>
        <Container>
          <Header />
          <Title {...props} />

          <Content>{props.children}</Content>
          <Footer />
        </Container>
      </Main>
    </Layout>
  );
};

export default LayoutComponent;
