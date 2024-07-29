import { useState, useEffect } from 'react';
import { Card, Modal, Button, Form, Input, message, ConfigProvider, Row, Col } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsRequest, updateProduct, addProduct } from '../redux/action/productActions';
import { addToCart } from '../redux/action/cartActions';
import styles from './AdminFeatures.module.css';

const DisplayComponent = () => {
  const [isAddProductModalVisible, setAddProductModalVisible] = useState(false);
  const [expandedProduct, setExpandedProduct] = useState(null);
  const [editProduct, setEditProduct] = useState(null);
  const [form] = Form.useForm();
  const addProductForm = Form.useForm()[0];
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const searchTerm = useSelector((state) => state.search.searchTerm);
  const currentTheme = useSelector((state) => state.theme.theme); 

  const themes = {
    default: {
      cardTextColor: '#000000',
      cardBackgroundColor: '#f9fdff',
      borderColor: '#ffffff',
    },
    light: {
      cardTextColor: '#000000',
      cardBackgroundColor: '#f5f6fc',
      borderColor: '#ffffff',
    },
    dark: {
      cardTextColor: '#afaeae',
      cardBackgroundColor: '#000000',
      borderColor: '#ffffff',
    },
  };

  const themeStyles = themes[currentTheme] || themes.default;


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
    setEditProduct(null);
    setAddProductModalVisible(false);
  };

  const handleAddProductClick = () => {
    setAddProductModalVisible(true);
  };

  const handleEditProduct = (product) => {
    
    setEditProduct(product);
    form.setFieldsValue(product);
  };

  const handleEditFinish = (values) => {
    const updatedProduct = { ...editProduct, ...values };
    dispatch(updateProduct(updatedProduct));
    setEditProduct(null);
    handleCloseModal();
    message.success('Product updated successfully');
  };

  const handleAddProductFinish = (values) => {
    dispatch(addProduct(values));
    addProductForm.resetFields();
    setAddProductModalVisible(false);
    message.success('Product added successfully');
  };

  const filteredProducts = searchTerm
    ? products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : products;



  return (
    <div className={styles.container}>
      <Button type="primary" onClick={handleAddProductClick} style={{ float: 'right', marginRight: '16px', marginTop: '16px' }}>
        Add Product
      </Button>
      <h2 style={{ textAlign: 'center', marginBottom: '24px', color: themes[currentTheme].cardTextColor , fontFamily:'cursive'}}>ShopCart Products!</h2>

      <div className={styles.productList}>
        {filteredProducts.map((product) => (
          <ConfigProvider
            theme={{
              token: {
                colorBgContainer: themes[currentTheme].cardBackgroundColor,
              },
            }}>
            <Card
              key={product.id}
              
             
              
              style={{
                width: 270,
                margin: '10px',
                backgroundColor: themes[currentTheme].cardBackgroundColor,
                color: themes[currentTheme].cardTextColor,
                border: `1px solid ${themeStyles.borderColor}`,
              }}

              cover={<img alt={product.name} src={product.image} style={{ height: '30vh', border: `0.2px solid ${themeStyles.borderColor}` }} />}
              className={currentTheme === 'dark' ? styles.cardHoverDark : ''}
              actions={[
                <Button type="link" onClick={() => handleExpandProduct(product)} style={{  color: themes[currentTheme].cardTextColor }}>
                  View
                </Button>,
                <Button type="link" onClick={() => handleEditProduct(product)} style={{ color: themes[currentTheme].cardTextColor }}>
                  Edit
                </Button>,
              ]}
            >
              <Card.Meta
                title={<span style={{ color: themes[currentTheme].cardTextColor }}>{product.name}</span>}
                description={
                  <div style={{ color: themes[currentTheme].cardTextColor }}>
                    <p>Type: {product.type}</p>
                    <p>Model: {product.model}</p>
                    <p>Price: ₹{product.price}</p>
                  </div>
                }
              />
            </Card>
          </ConfigProvider>
        ))}
      </div>

      {expandedProduct && (
        
        <Modal
          
          visible={!!expandedProduct}
          onCancel={handleCloseModal}
          className={`modalBg `}
          
         
          width="95vw"
          bodyStyle={{ backgroundColor: themes[currentTheme].cardBackgroundColor, color: themes[currentTheme].cardTextColor,  border: `0.1px solid ${themeStyles.borderColor}`,
          borderRadius: '8px' }}
        >
          <div className={styles.expandedProduct}  style={{ display: 'flex', flexDirection: 'row', color: themes[currentTheme].cardTextColor , padding:'50px'}}>
            
            <div style={{ flex: '1', paddingLeft: '20px' }}>
            <span style={{ color: themes[currentTheme].cardTextColor}}><h1 >{expandedProduct.name}</h1></span>
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
          </div>
        </Modal>
        
      )}

      {editProduct && (
         <Modal
         
         visible={!!editProduct}
         onCancel={handleCloseModal}
         className={`modalBg `}
         bodyStyle={{ backgroundColor: themes[currentTheme].cardBackgroundColor, color: themes[currentTheme].cardTextColor,  border: `0.1px solid ${themeStyles.cardTextColor}`,
         borderRadius: '8px'}}
         width="95vw"
        
       >
         <div className={styles.modalContent}>
        
           <div className={styles.formContainer}>
             <Form
             
                 form={form}
               layout="vertical"
               onFinish={handleEditFinish}
               initialValues={editProduct}
               className={styles.addProductForm}
             >
              <h2 style={{ color: themeStyles.cardTextColor, marginBottom: '20px' }}>Edit Product</h2>
               <Row gutter={16}>
                 <Col span={12}>
                   <Form.Item
                   
                     name="name"
                     label={<span style={{ color: themeStyles.cardTextColor }}>Product Name</span>}
                    
                     rules={[{ required: true, message: 'Please enter the product name' }]}
                   >
                     <Input />
                   </Form.Item>
                 </Col>
                 <Col span={12}>
                   <Form.Item
                     name="type"
                     
                     label={<span style={{ color: themeStyles.cardTextColor }}>Type</span>}
                     rules={[{ required: true, message: 'Please enter the product type' }]}
                   >
                     <Input />
                   </Form.Item>
                 </Col>
               </Row>
               <Row gutter={16}>
                 <Col span={12}>
                   <Form.Item
                     name="model"
                     
                     label={<span style={{ color: themeStyles.cardTextColor }}>Model</span>}
                     rules={[{ required: true, message: 'Please enter the product model' }]}
                   >
                     <Input />
                   </Form.Item>
                 </Col>
                 <Col span={12}>
                   <Form.Item
                     name="price"
                    
                     label={<span style={{ color: themeStyles.cardTextColor }}>Price (₹)</span>}
                     rules={[{ required: true, message: 'Please enter the product price' }]}
                   >
                     <Input />
                   </Form.Item>
                 </Col>
               </Row>
               <Form.Item
                 name="description"
               
                 label={<span style={{ color: themeStyles.cardTextColor }}>Product Description</span>}
                 rules={[{ required: true, message: 'Please enter the product description' }]}
               >
                 <Input />
               </Form.Item>
               <Form.Item
                 name="image"
                
                 label={<span style={{ color: themeStyles.cardTextColor }}>Image</span>}
                 rules={[{ required: true, message: 'Please enter the product image URL' }]}
               >
                 <Input />
               </Form.Item>
               <Form.Item>
                <Button key="cancel" onClick={handleCloseModal}>
                 Cancel
               </Button>
               <Button key="save" type="primary" onClick={() => form.submit()} style={{ marginLeft: '10px' }}>
                 Save
               </Button>
               </Form.Item>
             </Form>
           </div>
           <div className={styles.imageContainer}>
             <img
             
               src={`${process.env.PUBLIC_URL}/5464026.jpg`}
               alt="Edit Product Background"
               className={styles.backgroundImage}
             />
           </div>
         </div>
       </Modal>
      )}

      {isAddProductModalVisible && (
        <Modal
       
        className={`modalBg `}
        visible={isAddProductModalVisible}
        onCancel={handleCloseModal}
        
        width="95vw"
        bodyStyle={{ backgroundColor: themes[currentTheme].cardBackgroundColor, color: themes[currentTheme].cardTextColor,  border: `0.1px solid ${themeStyles.cardTextColor}`,
         borderRadius: '8px',  overflow: 'hidden'}}
      >
        <div className={styles.modalContent}>
       
          <div className={styles.formContainer}>
            <Form
              form={addProductForm}
              layout="vertical"
              onFinish={handleAddProductFinish}
              className={styles.addProductForm}
            >
               <h2 style={{ color: themeStyles.cardTextColor, marginBottom: '20px' }}>Add Product</h2>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="name"
                    label={<span style={{ color: themeStyles.cardTextColor }}>Product Name</span>}
                    rules={[{ required: true, message: 'Please enter the product name' }]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="type"
                    label={<span style={{ color: themeStyles.cardTextColor }}>Type</span>}
                    rules={[{ required: true, message: 'Please enter the product type' }]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="model"
                    label={<span style={{ color: themeStyles.cardTextColor }}>Model</span>}
                    rules={[{ required: true, message: 'Please enter the product model' }]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="price"
                    label={<span style={{ color: themeStyles.cardTextColor }}>Price (₹)</span>}
                    rules={[{ required: true, message: 'Please enter the product price' }]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item
                name="description"
                label={<span style={{ color: themeStyles.cardTextColor }}>Product Description</span>}
                rules={[{ required: true, message: 'Please enter the product description' }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="image"
                label={<span style={{ color: themeStyles.cardTextColor }}>Image URL</span>}
                rules={[{ required: true, message: 'Please enter the product image URL' }]}
              >
                <Input />
              </Form.Item>
              <Form.Item>
              <Button key="cancel" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button key="save" type="primary" onClick={() => addProductForm.submit()} style={{ marginLeft: '10px' }}>
            Save
          </Button>,
               </Form.Item>
            </Form>
          </div>
          <div className={styles.imageContainer}>
            <img
              src={`${process.env.PUBLIC_URL}/5057942.jpg`}
              alt="Add Product Background"
              className={styles.backgroundImage}
            />
          </div>
        </div>
      </Modal>
      )}
    </div>
  );
};

export default DisplayComponent;
