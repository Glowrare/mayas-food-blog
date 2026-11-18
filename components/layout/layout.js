import { Fragment } from 'react';
import MainNavigation from './main-navigation';
import SiteFooter from './site-footer';

const Layout = (props) => {
  return (
    <Fragment>
      <MainNavigation />
      <main>{props.children}</main>
      <SiteFooter />
    </Fragment>
  );
};
export default Layout;
