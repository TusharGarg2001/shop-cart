import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart } from '../redux/action/cartActions';
import { List, Button, Modal, Form, Input, message } from 'antd';
import styles from './Cart.module.css';

const Cart = () => {
  const cartItems = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [form] = Form.useForm();

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price, 0);
  const currentTheme = useSelector((state) => state.theme.theme);

  const themes = {
    default: {
      containerBackground: 'linear-gradient(to bottom right ,  #a2bde5, #ffffff,  #a2bde5)',
      textColor: '#000000',
      borderColor:'#ffffff'
    },
    light: {
      containerBackground: 'linear-gradient(to top left , #7A7FBA,#ffffff , #7A7FBA)',
      textColor: '#000000',
      borderColor:'#ffffff'
    },
    dark: {
      containerBackground: '#000000',
      textColor: '#ffffff',
      borderColor:'#ffffff'
    },
  };

  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const handleOpenPaymentModal = () => {
    setShowPaymentModal(true);
  };

  const handleClosePaymentModal = () => {
    setShowPaymentModal(false);
  };

  const handlePaymentSubmit = () => {
    form
      .validateFields()
      .then(values => {
        message.success('Payment successful!');
        form.resetFields();
        setShowPaymentModal(false);
      })
      .catch(errorInfo => {
        console.log('Validation failed:', errorInfo);
      });
  };

  const themeStyles = themes[currentTheme] || themes.default;
  

  return (
    <div className={styles.mainContainer} style={{ background: themeStyles.containerBackground }}>
      <div className={styles.container} style={{ color: themeStyles.textColor }}>
        <h1 className={styles.cartHeading} style={{ borderBottom: `0.01em solid ${themeStyles.textColor}` }}>Your Cart</h1>
        <List
          itemLayout="horizontal"
          dataSource={cartItems}
          renderItem={item => (
            <List.Item
              key={item.id}
              style={{ borderBottom: `0.1px solid ${themeStyles.textColor}` }}
              actions={[
                <Button
                  className={styles.removeButton}
                  onClick={() => handleRemoveFromCart(item.id)}
                >
                  Remove
                </Button>
              ]}
            >
              <List.Item.Meta
                avatar={<img src={item.image} alt={item.name} style={{ width: '100px' }} />}
                title={<h2 style={{ color: themeStyles.textColor, fontSize: '15px' }}>{item.name}</h2>}
                description={<div style={{ color: themeStyles.textColor, textAlign: 'center' }}><strong>Price: ₹{item.price}</strong></div>}
              />
            </List.Item>
          )}
        />
        <div className={styles.cartTotal} style={{ borderBottom: `0.01em solid ${themeStyles.textColor}` }} >
          <h3>Total Price: ₹{totalPrice.toFixed(2)}</h3>
          {cartItems.length>0 &&  <Button type="primary" onClick={handleOpenPaymentModal}>
            Proceed to Payment
          </Button>}
         
        </div>

        <Modal
  className={`modalBg `}
  onCancel={handleClosePaymentModal}
  visible={showPaymentModal}
  width="90vw"
  bodyStyle={{
    background: themeStyles.containerBackground,
    color: themeStyles.textColor,
    border: `0.1px solid ${themeStyles.borderColor}`,
    borderRadius: '8px',
    padding: '20px'
  }}
>
  <div className={styles.modalContent} style={{ color: themeStyles.textColor }}>
    <div className={styles.imageContainer}>
      <img
        src={`${process.env.PUBLIC_URL}/53536.jpg`}
        alt="Payment Background"
        className={styles.backgroundImage}
      />
    </div>
    <div className={styles.formContainer}>
      <Form form={form} layout="vertical">
        <h2 style={{ color: themeStyles.textColor, marginBottom: '20px' }}>Enter Payment Information</h2>
        <Form.Item
          label={<span style={{ color: themeStyles.textColor }}>Card Number</span>}
          name="cardNumber"
          rules={[{ required: true, message: 'Please enter your card number' }]}
        >
          <Input placeholder="Card Number" />
        </Form.Item>
        <Form.Item
          label={<span style={{ color: themeStyles.textColor }}>Name on Card</span>}
          name="nameOnCard"
          rules={[{ required: true, message: 'Please enter the name on your card' }]}
        >
          <Input placeholder="Name on Card" />
        </Form.Item>
        <Form.Item
          label={<span style={{ color: themeStyles.textColor }}>Expiration Date</span>}
          name="expirationDate"
          rules={[{ required: true, message: 'Please enter card expiration date' }]}
        >
          <Input placeholder="MM/YY" />
        </Form.Item>
        <Form.Item
          label={<span style={{ color: themeStyles.textColor }}>CVV</span>}
          name="cvv"
          rules={[{ required: true, message: 'Please enter CVV' }]}
        >
          <Input placeholder="CVV" />
        </Form.Item>
        <Form.Item style={{ textAlign: 'right' }}>
          <Button type="primary" onClick={handlePaymentSubmit}>
            Pay
          </Button>
          <Button style={{ marginLeft: '10px' }} onClick={handleClosePaymentModal}>
            Cancel
          </Button>
        </Form.Item>
      </Form>
    </div>
   
  </div>
</Modal>

      </div>
    </div>
  );
};

export default Cart;


