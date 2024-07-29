import { useSelector } from 'react-redux';
import { Layout, Row, Col, Typography } from 'antd';
import { FacebookOutlined, TwitterOutlined, InstagramOutlined } from '@ant-design/icons';
import styles from './Footer.module.css';

const { Footer } = Layout;
const { Text, Title, Link } = Typography;

const themes = {
  default: {
    background: 'linear-gradient(135deg, #a2bde5, #dfe9f3)',
    color: '#595959',
    iconColor: '#2f9bff',
  },
  light: {
    background: 'linear-gradient(to bottom right, #7A7FBA, #7A7FBA,#ffffff , #7A7FBA)',
    color: '#000',
    iconColor: '#000',
  },
  dark: {
    background: '#000000',
    color: '#afaeae',
    iconColor: '#afaeae',
  },
};

const ShopFooter = () => {
  const currentTheme = useSelector((state) => state.theme.theme);

  const themeStyles = themes[currentTheme] || themes.default;

  return (
    <Footer className={styles.footer} style={{ background: themeStyles.background, color: themeStyles.color }}>
      <Row justify="space-around">
        <Col span={6}>
          <Title level={4} className={styles.footerTitle} style={{ color: themeStyles.color }}>About Us</Title>
          <Text className={styles.footerText} style={{ color: themeStyles.color }}>
            ShopCart is your one-stop online shop for all your needs. We offer a wide range of products at unbeatable prices.
          </Text>
        </Col>
        <Col span={6}>
          <Title level={4} className={styles.footerTitle} style={{ color: themeStyles.color }}>Contact Us</Title>
          <Text className={styles.footerText} style={{ color: themeStyles.color }}>Email: support@shopcart.com</Text>
          <Text className={styles.footerText} style={{ color: themeStyles.color }}>Phone: +91-7988618216</Text>
        </Col>
        <Col span={6}>
          <Title level={4} className={styles.footerTitle} style={{ color: themeStyles.color }}>Follow Us</Title>
          <div className={styles.socialIcons}>
            <Link href="https://www.facebook.com" target="_blank">
              <InstagramOutlined className={styles.icon} style={{ color: themeStyles.iconColor }} />
            </Link>
            <Link href="https://www.facebook.com" target="_blank">
              <FacebookOutlined className={styles.icon} style={{ color: themeStyles.iconColor }} />
            </Link>
            <Link href="https://www.twitter.com" target="_blank">
              <TwitterOutlined className={styles.icon} style={{ color: themeStyles.iconColor }} />
            </Link>
          </div>
        </Col>
      </Row>
      <Row justify="center" className={styles.footerBottom}>
        <Text className={styles.footerBottomText} style={{ color: themeStyles.color }}>
          © 2024 ShopCart. All rights reserved.
        </Text>
      </Row>
    </Footer>
  );
};

export default ShopFooter;





