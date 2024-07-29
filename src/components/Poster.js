import { useSelector } from 'react-redux';
import { Typography, Carousel, Row, Col } from 'antd';
import { GiftOutlined, FireOutlined } from '@ant-design/icons';
import styles from './Poster.module.css';

const { Title, Paragraph, Text } = Typography;

const themes = {
  default: {
    background: 'linear-gradient(135deg, #a2bde5, #dfe9f3)',
    titleColor: '#1890ff',
    paragraphColor: '#595959',
    highlightColor: '#ff4d4f',
    specialDiscountColor: '#679cce',
  },
  light: {
    background: 'linear-gradient(to bottom right, #7A7FBA, #7A7FBA,#ffffff , #7A7FBA)',
    titleColor: '#000',
    paragraphColor: '#595959',
    highlightColor: '#ff4d4f',
    specialDiscountColor: '#679cce',
  },
  dark: {
    background: '#000000',
    titleColor: '#afaeae',
    paragraphColor: '#afaeae',
    highlightColor: '#ff4d4f',
    specialDiscountColor: '#679cce',
  },
};

const Poster = () => {
  const currentTheme = useSelector((state) => state.theme.theme);

  const themeStyles = themes[currentTheme] || themes.default;

  return (
    <Carousel autoplay className={styles.carousel} style={{ background: themeStyles.background }}>
      <div className={styles.poster} style={{ background: themeStyles.background }}>
        <Row justify="center" align="middle" gutter={16}>
          <Col>
            <GiftOutlined className={styles.icon} style={{ color: themeStyles.highlightColor }} />
          </Col>
          <Col>
            <Title level={1} className={styles.posterTitle} style={{ color: themeStyles.titleColor }}>
              Welcome to ShopCart!
            </Title>
            <Paragraph className={styles.posterParagraph} style={{ color: themeStyles.paragraphColor }}>
              Explore our wide range of products and enjoy amazing discounts.
            </Paragraph>
            <Text className={styles.posterHighlight} style={{ color: themeStyles.highlightColor }}>
              Summer Sale is ON! Up to 50% off on selected items.
            </Text>
            <Paragraph className={styles.specialDiscount} style={{ color: themeStyles.specialDiscountColor }}>
              Special discount for AssessPrep!
            </Paragraph>
          </Col>
        </Row>
      </div>
      <div className={styles.poster} style={{ background: themeStyles.background }}>
        <Row justify="center" align="middle" gutter={16}>
          <Col>
            <FireOutlined className={styles.icon} style={{ color: themeStyles.highlightColor }} />
          </Col>
          <Col>
            <Title level={1} className={styles.posterTitle} style={{ color: themeStyles.titleColor }}>
              Exclusive Discounts!
            </Title>
            <Paragraph className={styles.posterParagraph} style={{ color: themeStyles.paragraphColor }}>
              Sign up now to get exclusive member discounts.
            </Paragraph>
            <Text className={styles.posterHighlight} style={{ color: themeStyles.highlightColor }}>
              Hurry, offers valid till stocks last!
            </Text>
            <Paragraph className={styles.specialDiscount} style={{ color: themeStyles.specialDiscountColor }}>
              Coupon Code - TUSHAR50
            </Paragraph>
          </Col>
        </Row>
      </div>
    </Carousel>
  );
};

export default Poster;
