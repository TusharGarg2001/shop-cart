import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Alert, message } from 'antd';
import { loginRequest, loginSuccess, loginFailure } from '../redux/action/authAction';
import styles from './Login.module.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector((state) => state.auth.error);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const credentials = useSelector((state) => state.auth.credentials);
 

  useEffect(() => {
    if (credentials.length === 0) {
      dispatch(loginRequest());
    }
  }, [dispatch, credentials.length]);

  const handleSubmit = () => {
    const user = credentials.find((user) => user.email === email && user.safe === password);

    if (user) {
      dispatch(loginSuccess(user));
      message.success('Login successful');
    } else {
      dispatch(loginFailure('Invalid email or password'));
    }
  };

  if (isAuthenticated) {
    navigate('/home');
  }

  return (
    <div className={styles.loginContainer}>
        
      
      <div className={styles.loginBox}>
      <h3 style={{fontFamily:'cursive'}}> Welcome To ShopCart!</h3>
     
    
        <Form layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please enter your email!' }]}
          >
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please enter your password!' }]}
          >
            <Input.Password
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Login
            </Button>
          </Form.Item>
        </Form>
        {error && <Alert message={error} type="error" showIcon />}
      </div>
    </div>
  );
};

export default Login;

