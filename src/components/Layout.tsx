import { Outlet, useLocation } from 'react-router-dom';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export interface ILayoutProps {}

const Layout: React.FunctionComponent<ILayoutProps> = (props) => {
  const location = useLocation();
  return (
    <div className="container-fluid">
      <div
        className={
          location.pathname.includes('/certification') ||
          location.pathname.includes('/agreement') ||
          location.pathname.includes('/private')
            ? 'container_middle_none'
            : 'container_middle'
        }
      >
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;