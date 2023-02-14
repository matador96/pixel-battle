import React from 'react';
import { SiDelicious } from 'react-icons/si';
import { RxExit, RxHome, RxPerson, RxPieChart, RxChatBubble, RxPlay } from 'react-icons/rx';
import Footer from './/Footer.tsx';

const Layout = ({ children }) => <div className="layout">{children}</div>;

const LeftSidebar = ({ children }) => <div className="sidebar-left">{children}</div>;

const Container = ({ children }) => <div className="container">{children}</div>;

const Main = ({ children }) => <div className="main">{children}</div>;

const Logo = () => (
  <div className="logo">
    <SiDelicious />
  </div>
);

const Menu = () => (
  <div className="menu">
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
  </div>
);

const Header = () => <div className="header"></div>;

const Title = () => <div className="title">Head to head</div>;
const SubTitle = () => <div className="subtitle">Subtitle head</div>;

const Content = () => (
  <div className="content">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. In scelerisque, ipsum vitae maximus
    vehicula, enim mi scelerisque odio, eget imperdiet tortor enim consequat quam. Nullam nec erat
    ut tellus ullamcorper malesuada. Cras aliquam fringilla varius. Vestibulum ultrices ipsum nisl,
    vitae commodo lacus vestibulum nec. Quisque a felis vel tortor tempor mollis at vel justo.
    Praesent congue massa et hendrerit blandit. Aenean volutpat enim eget ante elementum, vel luctus
    quam pretium. Nulla facilisi. Nulla vulputate lacinia quam, at blandit nisi. In feugiat posuere
    lectus. Donec lacinia lacus eu hendrerit bibendum. Pellentesque habitant morbi tristique
    senectus et netus et malesuada fames ac turpis egestas. Duis nec tempor turpis. Donec a risus
    ornare, rhoncus nibh in, condimentum lectus. Praesent ante nulla, hendrerit quis feugiat eu,
    finibus ut erat. Pellentesque interdum, nunc nec ultricies aliquet, odio lectus fermentum eros,
    non aliquam odio dolor id eros. Pellentesque non mi nec sapien vulputate finibus. Morbi eget
    lectus at mauris efficitur mollis. Mauris a elit nec libero tristique aliquam. Pellentesque
    laoreet nulla sit amet dui laoreet maximus. Nam purus mauris, vulputate quis justo et, eleifend
    tincidunt neque. Donec ipsum risus, molestie ut massa nec, pulvinar rhoncus urna. Nulla
    tincidunt eleifend lectus, eget malesuada enim rhoncus et. Ut nec ex vel urna aliquet varius sit
    amet sed nunc. Quisque ex ex, mattis in felis vitae, porttitor malesuada sapien. Orci varius
    natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec id sapien
    ornare, facilisis odio et, finibus elit. Nullam ac leo sit amet elit malesuada posuere. Nulla
    dictum viverra aliquam. Maecenas dolor dui, pharetra nec eleifend maximus, tincidunt nec metus.
    Aliquam tempor ultricies cursus.
  </div>
);

const LayoutComponent = (props) => (
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
        <Footer ok={'s'} />
      </Container>
    </Main>
  </Layout>
);

export default LayoutComponent;
