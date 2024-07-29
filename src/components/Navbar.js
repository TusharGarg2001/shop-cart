import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout, loginSuccess } from '../redux/action/authAction';
import { setSearchTerm } from '../redux/action/searchAction';
import { changeTheme } from '../redux/action/themeAction';
import { Layout, Menu, Input, Button, Badge, Dropdown, Avatar ,ConfigProvider} from 'antd';
import { UserOutlined, ShoppingCartOutlined, HomeOutlined, SearchOutlined, ArrowLeftOutlined, BgColorsOutlined, LogoutOutlined, ProfileOutlined } from '@ant-design/icons';
import styles from './Navbar.module.css';

const { Header } = Layout;
const { Search } = Input;

const Navbar = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const currentTheme = useSelector((state) => state.theme.theme);

  const themes = {
    default: {
      containerBackground: '#f0f2f5',
      searchBackground: '#f0f2f5',
      textColor: '#000000'
    },
    light: {
      containerBackground: 'linear-gradient(to top left, #7A7FBA, #ffffff, #7A7FBA)',
      searchBackground: '#f0f2f5',
      textColor: '#000000'
    },
    dark: {
      containerBackground: '#000000',
      searchBackground: '#001529',
      textColor: '#ffffff'
    },
  };

  useEffect(() => {
    const storedIsAuthenticated = JSON.parse(localStorage.getItem('isAuthenticated'));
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedIsAuthenticated && storedUser) {
      dispatch(loginSuccess(storedUser));
    }
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/', { replace: true });
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  
  };

  const handleSearchSubmit = () => {
    dispatch(setSearchTerm(searchQuery));
  };

  const handleThemeChange = ({ key }) => {
    dispatch(changeTheme(key));
  };

  const themeStyles = themes[currentTheme] || themes.default;

  const themeMenu = (
    <Menu onClick={handleThemeChange} style={{backgroundColor:'#001529',top:'22px',right:'26px', border:'0.1px solid white'}} >
      <Menu.Item key="default" style={{ color:'#afaeae',  borderBottom:'1px solid white'}} >
        <div style={{ display: 'inline-block', marginRight: '8px', background: 'linear-gradient(135deg, #a2bde5, #dfe9f3)', height: '10px', width: '10px', borderRadius: '5px' }}></div>
        <span className={styles.option}>Default</span>
      </Menu.Item>
      <Menu.Item key="dark" style={{ color:'#afaeae',  borderBottom:'1px solid white'}}>
        <div style={{ display: 'inline-block', marginRight: '8px', background: '#000000', height: '10px', width: '10px', borderRadius: '5px', border:'0.1px solid white' }}></div>
        <span className={styles.option}>Dark</span>
      </Menu.Item>
      <Menu.Item key="light" style={{ color:'#afaeae'}}>
        <div style={{ display: 'inline-block', marginRight: '8px', background: 'linear-gradient(to bottom right, #7A7FBA, #7A7FBA, #ffffff, #7A7FBA)', height: '10px', width: '10px', borderRadius: '5px'  }}></div>
        <span className={styles.option}>Wave</span>
      </Menu.Item>
    </Menu>
  );

  const menuItems = [
    {
      key: 'home',
      icon: <HomeOutlined />,
      label: <Link to="/home">Home</Link>,
    },
    {
      key: 'theme',
      icon: <BgColorsOutlined />,
      label: <Dropdown overlay={themeMenu} trigger={['click']}>
        <span>Theme</span>
      </Dropdown>,
    },
   
    ...(isAuthenticated && user.role === 'admin'
      ? [
        {
          key: 'admin',
          icon: <UserOutlined />,
          label: <Link to="/home/admin">Users</Link>,
        },
      ]
      : []),
    {
      key: 'cart',
      icon: ( 
      <ShoppingCartOutlined />
      ),
      label: <Link to="/home/cart"> <Badge
      count={cartItems.length}
      style={{
        backgroundColor: '#001529', 
        color: '#afaeae', 
        width: '20px', 
        height: '20px', 
        top: '-5px', 
        right: '-10px', 
        fontSize:'12px',
       
        borderRadius: '50%',
        
      }}
    >
     <span   className={styles.cart} >Cart</span>
    </Badge></Link>,
    },
  ];

  
  return (
    <Header className={styles.navbar}>
      <div className={styles.logo}>
        <Link to="/home">
          <ArrowLeftOutlined className={styles.arrow} />
        </Link>
      </div>

      <ConfigProvider
      theme={{
        token: {
          colorBgContainer: themeStyles.searchBackground,
          colorText: themeStyles.textColor,
        },
      }}
    >
      <Search
        placeholder="Search products..."
        value={searchQuery}
        onChange={handleSearchChange}
        onSearch={handleSearchSubmit}
        enterButton={<SearchOutlined />}
        style={{ margin:'0 20px',  flexGrow:'1' , width:'85vw'}}
        allowClear
      />
    </ConfigProvider>

      <Menu theme="dark" mode="horizontal" selectable={false} items={menuItems} className={styles.menu} />

      <Dropdown overlay={
      <Menu style={{backgroundColor:'#001529'}}>
        <Menu.Item key="profile" icon={<ProfileOutlined className={styles.option}/>} style={{ color:'#afaeae',  borderBottom:'1px solid white'}}>
          <span onClick={() => navigate('/home/user-details')}  className={styles.option}>Profile</span>
        </Menu.Item>
        <Menu.Item key="logout" icon={<LogoutOutlined className={styles.option}/>} style={{ color:'#afaeae'}}>
          <span onClick={handleLogout} className={styles.option}>Logout</span>
        </Menu.Item>
      </Menu>
    } trigger={['click']}>
      <span className={styles.userInfo}>
        
        <Avatar src={user.image} size="large" />
        <span className={styles.userName}>{user.name.split(' ')[0]}</span>
      
      </span>
    </Dropdown>
    </Header>
  );
};

export default Navbar;


