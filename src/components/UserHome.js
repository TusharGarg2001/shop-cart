import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsRequest } from '../redux/action/productActions';
import { addToCart } from '../redux/action/cartActions';
import { Card, Button, Modal, message } from 'antd';
import Poster from './Poster';
import ShopFooter from './Footer';
import styles from './UserHome.module.css';
import DisplayComponent from './AdminFeatures';

const { Meta } = Card;

const themes = {
  default: {
    containerBackground: 'linear-gradient(to bottom , #ffffff, #a2bde5, #ffffff)',
    productBackground: '#f7fbff',
    buttonBackground: '#007bff',
    buttonHoverBackground: '#0056b3',
    textColor: '#000000',
    borderColor: '#ffffff',
  },
  light: {
    containerBackground:'linear-gradient(to bottom right, #ffffff, #7A7FBA,#ffffff , #7A7FBA)',
    productBackground: '#f5f6fc',
    buttonBackground: 'blue',
    buttonHoverBackground: '#218838',
    textColor: '#000000',
    borderColor: '#ffffff',
  },
  dark: {
    containerBackground: '#000000',
    productBackground: '#000000',
    buttonBackground: '#000000',
    buttonHoverBackground: '#e0a800',
    textColor: '#ffffff',
    borderColor: '#ffffff',
  },
};

const UserHome = () => {
  const dispatch = useDispatch();
  const { loading, products, error } = useSelector((state) => state.products);
  const searchTerm = useSelector((state) => state.search.searchTerm);
  const currentTheme = useSelector((state) => state.theme.theme);
  const user = useSelector((state) => state.auth.user);

  const [expandedProduct, setExpandedProduct] = useState(null);

  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchProductsRequest());
    }
  }, [dispatch, products.length]);

  const handleAddToCart = (product) => {
    message.success('Product added to cart');
    dispatch(addToCart(product));
  };

  const handleExpandProduct = (product) => {
    setExpandedProduct(product);
  };

  const handleCloseModal = () => {
    setExpandedProduct(null);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching products: {error}</p>;

  const filteredProducts = searchTerm
    ? products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : products;

  const themeStyles = themes[currentTheme] || themes.default;

  return (
    <div className={styles.container} style={{ background: themeStyles.containerBackground }}>
      <Poster />
      {user.role === 'admin' ? (
        <DisplayComponent />
      ) : (
        <>
          <h2 className={styles.header} style={{ color: themeStyles.textColor }}>Products</h2>
          <div className={styles.productList}>
            {filteredProducts.map((product) => (
              <Card
                key={product.id}
                hoverable
                style={{
                  width: 270,
                  margin: '10px',
                  backgroundColor: themeStyles.productBackground,
                  color: themeStyles.textColor,
                  border: `1px solid ${currentTheme === 'dark' ? '#444444' : '#d9d9d9'}`,
                }}
                cover={<img alt={product.name} src={product.image} className={styles.productImage}  style={{ height: '30vh', border: `0.2px solid ${themeStyles.borderColor}` }} />}
                onClick={() => handleExpandProduct(product)}
                className={currentTheme === 'dark' ? styles.cardHoverDark : ''}
              >
                <Meta 
                  title={<span style={{ color: themeStyles.textColor }}>{product.name}</span>}
                  description={
                    <div style={{ color: themeStyles.textColor }}>
                      <p>Type: {product.type}</p>
                      <p>Model: {product.model}</p>
                      <p>Price: ₹{product.price}</p>
                    </div>
                  } 
                />
              </Card>
            ))}
          </div>
          {expandedProduct && (
        
        <Modal
          
          visible={!!expandedProduct}
          onCancel={handleCloseModal}
          className={`modalBg `}
          
         
          width="95vw"
          bodyStyle={{ backgroundColor: themes[currentTheme]. productBackground, color: themes[currentTheme].textColor,  border: `0.1px solid ${themeStyles.borderColor}`,
          borderRadius: '8px' }}
        >
          <div style={{ display: 'flex', flexDirection: 'row', color: themes[currentTheme].textColor , padding:'40px'}} className={styles.expandedProduct}>
            <div
              style={{
                flex: '1',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <img
                src={expandedProduct.image}
                alt={expandedProduct.name}
                style={{ width: '100%' ,  maxHeight:'400px', borderRadius:'8px'}}
              />
            </div>
            <div style={{ flex: '1', paddingLeft: '20px' }}>
            <span style={{ color: themes[currentTheme].textColor}}><h1 >{expandedProduct.name}</h1></span>
              <p>
                <strong>Type:</strong> {expandedProduct.type}
              </p>
              <p>
                <strong>Price:</strong> ₹{expandedProduct.price}
              </p>
              <p>
                <strong>Model:</strong> {expandedProduct.model}
              </p>
              <p>
                <strong>Product Description:</strong> {expandedProduct.description}
              </p>
             
              <Button key="close" onClick={handleCloseModal} style={{marginRight:'10px'}}>
              Close
            </Button>
            <Button
              key="add"
              type="primary"
              onClick={() => handleAddToCart(expandedProduct)}
            >
              Add to Cart
            </Button>
            </div>
          </div>
        </Modal>
        
      )}
        </>
      )}
      <ShopFooter />
    </div>
  );
};

export default UserHome;
