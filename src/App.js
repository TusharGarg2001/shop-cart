import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider, useSelector } from 'react-redux';
import store from './redux/Store';
import Layout from './components/Layout';
import Login from './components/Login';
import UserHome from './components/UserHome';
import AdminDashboard from './components/AdminDashboard';
import Cart from './components/Cart';
import RedirectRoute from './components/RedirectRoute';
import UserDetails from './components/UserDetails';
import './App.css';
import NotFound from './components/WrongPath';

const PrivateRoute = ({ element, adminRoute, ...rest }) => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const role = useSelector(state => state.auth.user?.role);

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  if (adminRoute && role !== 'admin') {
    return <Navigate to="/home" />;
  }

  return element;
};

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/ShopCart/" element={<RedirectRoute element={<Login />} />} />
          <Route path="/home" element={<Layout />}>
            <Route index element={<UserHome />} />
            <Route path="cart" element={<Cart />} />
            <Route path="user-details" element={<UserDetails />} />
            <Route path="admin" element={<PrivateRoute adminRoute element={<AdminDashboard />} />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
