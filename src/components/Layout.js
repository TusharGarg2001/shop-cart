import { useSelector } from 'react-redux';
import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';
import { Layout as AntLayout } from 'antd';

const { Content } = AntLayout;

const Layout = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <AntLayout style={{ minHeight: '100vh' }}>
      {isAuthenticated && <Navbar />}
      <Content style={{ marginTop: '64px' }}>
        <Outlet />
      </Content>
    </AntLayout>
  );
};

export default Layout;


















