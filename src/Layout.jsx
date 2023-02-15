import React from 'react';
import { SiDelicious } from 'react-icons/si';
import { RxExit, RxHome, RxPerson, RxPieChart, RxChatBubble, RxPlay } from 'react-icons/rx';
import Footer from './/Footer.tsx';
import { animated, useSpring, useSprings } from '@react-spring/web';

const Layout = ({ children }) => <div className="layout">{children}</div>;

const LeftSidebar = ({ children }) => <div className="sidebar-left">{children}</div>;

const Container = ({ children }) => <div className="container">{children}</div>;

const Main = ({ children }) => <div className="main">{children}</div>;

const Logo = () => {
  const [props, api] = useSpring(
    () => ({
      from: { opacity: 0, transform: 'scale(0)' },
      to: { opacity: 1, transform: 'scale(1)' },
    }),
    [],
  );

  return (
    <animated.div style={props} className="logo">
      <SiDelicious />
    </animated.div>
  );
};

const Menu = () => {
  const [props, api] = useSpring(
    () => ({
      from: { opacity: 0, transform: 'translate(-90px, 0)' },
      to: { opacity: 1, transform: 'translate(0px, 0)' },
    }),
    [],
  );

  return (
    <animated.div style={props} className="menu">
      <div className="menu-item">
        <RxHome />
      </div>

      <div className="menu-item">
        <RxPlay />
      </div>

      <div className="menu-item">
        <RxPerson />
      </div>

      <div className="menu-item">
        <RxChatBubble />
      </div>

      <div className="menu-item">
        <RxPieChart />
      </div>

      <div className="menu-item exit">
        <RxExit />
      </div>
    </animated.div>
  );
};

const Header = () => <div className="header"></div>;

const Title = () => <div className="title">Head to head</div>;
const SubTitle = () => <div className="subtitle">Subtitle head</div>;

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
          <Title />
          <SubTitle />
          <Content>{props.children}</Content>
          <Footer />
        </Container>
      </Main>
    </Layout>
  );
};

export default LayoutComponent;
