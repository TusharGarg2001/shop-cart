import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div style={{ textAlign:'center' , padding:'50px'
        }}>
      <h1 style={{ marginBottom:'20px'}}>404 - Page Not Found</h1>
      <p style={{ marginBottom:'20px'}}>The page you are looking for does not exist.</p>
      <Link to="/">
        Go back to ShopCart!
      </Link>
    </div>
  );
};

export default NotFound;
