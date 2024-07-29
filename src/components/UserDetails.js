import { useSelector } from 'react-redux';
import { Avatar, Card } from 'antd';
import styles from './UserDetails.module.css';

const UserDetails = () => {
  const user = useSelector((state) => state.auth.user);
  const currentTheme = useSelector((state) => state.theme.theme);

  const themes = {
    default: {
      containerBackground: 'linear-gradient(to bottom left, #ffffff, #a2bde5, #dfe9f3)',
      cardBackground: '#ffffff',
      textColor: '#000000'
    },
    light: {
      containerBackground: 'linear-gradient(to bottom right, #7A7FBA, #7A7FBA, #ffffff, #7A7FBA)',
      cardBackground: '#f0f0f0',
      
      textColor: '#000000'
    },
    dark: {
      containerBackground: '#000000',
      cardBackground: '#000000',
      textColor: '#ffffff'
    },
  };

  const themeStyles = themes[currentTheme] || themes.default;

  return (
    <div className={styles.userDetails} style={{ background: themeStyles.containerBackground }}>
      <Card
        
        style={{
          backgroundColor: themeStyles.cardBackground,
          color: themeStyles.textColor,
          borderRadius: '15px',
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
          width: '90%',
          maxWidth: '400px',
          textAlign: 'center',
          padding: '20px'
        }}
      >
        <Avatar src={user.image} size={100} style={{ marginBottom: '20px' }} />
        <Card.Meta
          title={<span style={{ color: themeStyles.textColor, fontSize: '1.5rem' }}>{user.name}</span>}
          description={
            <div style={{ color: themeStyles.textColor }}>
              <p><strong>Role: </strong>{user.role}</p>
              <p><strong>Email: </strong>{user.email}</p>
              <p><strong>Contact: </strong>{user.contactNumber}</p>
            </div>
          }
        />
      </Card>
    </div>
  );
};

export default UserDetails;
