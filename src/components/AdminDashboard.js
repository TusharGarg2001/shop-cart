import { useState ,useEffect} from 'react';
import { List, Avatar, Modal, Form, Input, Button, message , Row, Col,Select} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { updateCredential, addUser } from '../redux/action/authAction';
import { loginRequest } from '../redux/action/authAction';
import styles from './AdminDashboard.module.css'
import {UserAddOutlined } from '@ant-design/icons';


const AdminDashboard = () => {
  const [isAddUserModalVisible, setAddUserModalVisible] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const userForm = Form.useForm()[0];
  const addUserForm = Form.useForm()[0];
  const dispatch = useDispatch();
  const credentials = useSelector((state) => state.auth.credentials);
  const currentTheme = useSelector((state) => state.theme.theme);

  useEffect(() => {
    if (credentials.length === 0) {
      dispatch(loginRequest());
    }
  }, [dispatch, credentials.length]);

  const themes = {
    default: {
      containerBackground: 'linear-gradient(135deg,#dfe9f3,  #a2bde5, #dfe9f3)',
      textColor: '#000000',
      borderColor:'#ffffff'
    },
    light: {
      containerBackground: 'linear-gradient(to bottom left , #ffffff, #7A7FBA)',
      textColor: '#000000',
      borderColor:'#ffffff'
    },
    dark: {
      containerBackground: '#000000',
      textColor: '#afaeae',
      borderColor:'#ffffff'
    },
  };

  const handleCloseModal = () => {
    setAddUserModalVisible(false);
    setEditUser(null);
  };

  const handleAddUserClick = () => {
    setAddUserModalVisible(true);
  };

  const handleEditUser = (user) => {
    setEditUser(user);
    userForm.setFieldsValue(user);
  };

  const handleUserEditFinish = (values) => {
    const updatedUser = { ...editUser, ...values };
    dispatch(updateCredential(updatedUser));
    setEditUser(null);
    message.success('User updated successfully');
  };

  const handleAddUserFinish = (values) => {
    dispatch(addUser(values));
    addUserForm.resetFields();
    setAddUserModalVisible(false);
    message.success('User added successfully');
  };

  const themeStyles = themes[currentTheme] || themes.default;
  const { Option } = Select;

  return (
    <div style={{background: themeStyles.containerBackground, padding:'20px'}}>
      <Button type="primary" onClick={handleAddUserClick} style={{  float:'right', marginTop:'24px' }}>
      <UserAddOutlined /> Add User
      </Button>

      <h1 style={{  textAlign:'center', marginBottom:'24px', color: themeStyles.textColor }}>Authenticated Users! </h1>

      <div >
        <List
          itemLayout="horizontal"
          dataSource={credentials}
          renderItem={(user) => (
            <List.Item
            style={{ color: themeStyles.textColor , borderTop: `0.1px solid ${themeStyles.textColor}`}}
              actions={[
                <Button type="link" onClick={() => handleEditUser(user)}>
                  Edit
                </Button>,
              ]}
            >
              
              <List.Item.Meta
              
                avatar={<Avatar src={user.image} />}
                title={<span style={{ color: themeStyles.textColor }}>{user.name}</span>}

                description={
                  <div style={{   color: themeStyles.textColor }}>
                  <p style={{  padding:'2px 0px', margin:'0px'}}>Role: {user.role}</p>
                  <p style={{  padding:'2px 0px', margin:'0px'}}>Email: {user.email}</p>
                  <p style={{  padding:'2px 0px', margin:'0px'}}>Contact Number: {user.contactNumber}</p>
                  <p style={{  padding:'2px 0px', margin:'0px'}}>Password: {user.safe}</p>
                </div>
                }
              />
            </List.Item>
          )}
        />
      </div>

      {editUser && (
         <Modal
         className={`modalBg `}
         
         open={!!editUser}
         onCancel={handleCloseModal}
        
         width="90vw"
         bodyStyle={{ background: themes[currentTheme].containerBackground, color: themes[currentTheme].textColor,  border: `0.1px solid ${themeStyles.borderColor}`,
         borderRadius: '8px'}}
       >
         <div className={styles.modalContent}>
         <div className={styles.imageContainer}>
             <img
               src={`${process.env.PUBLIC_URL}/4182997.jpg`}
               alt="Edit User Background"
               className={styles.backgroundImage}
              
             />
           </div>
           <div className={styles.formContainer}>
             <Form
               form={userForm}
               layout="vertical"
               onFinish={handleUserEditFinish}
               initialValues={editUser}
             >
               <h2 style={{ color: themeStyles.textColor, marginBottom: '20px' }}>Edit User</h2>
               <Row gutter={16}>
                 <Col span={12}>
                   <Form.Item
                     name="name"
                     label={<span style={{ color: themeStyles.textColor }}>Name </span>}
                     rules={[{ required: true, message: 'Please enter the name' }]}
                   >
                     <Input />
                   </Form.Item>
                 </Col>
                 <Col span={12}>
                   <Form.Item
                     name="role"
                     label={<span style={{ color: themeStyles.textColor }}>Role </span>}
                     rules={[{ required: true, message: 'Please enter the role' }]}
                   >
                    <Select placeholder="Select a role">
    <Option value="user">User</Option>
    <Option value="admin">Admin</Option>
  </Select>
                   </Form.Item>
                 </Col>
               </Row>
               <Row gutter={16}>
                 <Col span={12}>
                   <Form.Item
                     name="email"
                     label={<span style={{ color: themeStyles.textColor }}>Email </span>}
                     rules={[{ required: true, message: 'Please enter the email' }]}
                   >
                     <Input />
                   </Form.Item>
                 </Col>
                 <Col span={12}>
                   <Form.Item
                     name="contactNumber"
                     label={<span style={{ color: themeStyles.textColor }}>Contact Number </span>}
                     rules={[{ required: true, message: 'Please enter the contact number' }]}
                   >
                     <Input />
                   </Form.Item>
                 </Col>
               </Row>
               <Form.Item
                 name="image"
                 label={<span style={{ color: themeStyles.textColor }}>Image URL</span>}
                 rules={[{ required: true, message: 'Please enter the image URL' }]}
               >
                 <Input />
               </Form.Item>
               <Form.Item
                 name="safe"
                 label={<span style={{ color: themeStyles.textColor }}>Password </span>}
                 rules={[{ required: true, message: 'Please enter the password' }]}
               >
                 <Input />
               </Form.Item>
               <Form.Item  style={{textAlign:'right'}}>
               <Button key="cancel" onClick={handleCloseModal} style={{marginRight:'10px'}}>
             Cancel
           </Button>
           <Button
             key="save"
             type="primary"
             onClick={() => userForm.submit()}
           >
             Save
           </Button>
             </Form.Item>
             </Form>
           </div>
          
         </div>
       </Modal>
      )}

{isAddUserModalVisible && (
       <Modal
       className={`modalBg `}
       
       open={isAddUserModalVisible}
       onCancel={handleCloseModal}
       width="90vw"
       bodyStyle={{ background: themes[currentTheme].containerBackground, color: themes[currentTheme].textColor,  border: `0.1px solid ${themeStyles.borderColor}`,
       borderRadius: '8px'}}
     >
       <div className={styles.modalContent}>
       <div className={styles.imageContainer}>
           <img
             src={`${process.env.PUBLIC_URL}/52233.jpg`}
             alt="Add User Background"
             className={styles.backgroundImage}
            
           />
         </div>
         <div className={styles.formContainer}>
           <Form
             form={addUserForm}
             layout="vertical"
             onFinish={handleAddUserFinish}
           >
             <h2 style={{ color: themeStyles.textColor, marginBottom: '20px' }}>Add User</h2>
             <Row gutter={16}>
               <Col span={12}>
                 <Form.Item
                 
                   name="name"
                   label={<span style={{ color: themeStyles.textColor }}>Name </span>}
                   rules={[{ required: true, message: 'Please enter the name' }]}
                 >
                  <Input placeholder="Enter name" />
                 </Form.Item>
               </Col>
               <Col span={12}>
                 <Form.Item
                 
                   name="role"
                   label={<span style={{ color: themeStyles.textColor }}>Role </span>}
                   rules={[{ required: true, message: 'Please enter the role' }]}
                 >
                  <Select placeholder="Select a role">
                     <Option value="user">User</Option>
                     <Option value="admin">Admin</Option>
                  </Select>
                 </Form.Item>
               </Col>
             </Row>
             <Row gutter={16}>
               <Col span={12}>
                 <Form.Item
                   name="email"
                   label={<span style={{ color: themeStyles.textColor }}>Email </span>}
                   rules={[{ required: true, message: 'Please enter the email' }]}
                 >
                   <Input placeholder="Enter email" />
                 </Form.Item>
               </Col>
               <Col span={12}>
                 <Form.Item
                   name="contactNumber"
                   label={<span style={{ color: themeStyles.textColor }}>Contact Number</span>}
                   rules={[{ required: true, message: 'Please enter the contact number' }]}
                 >
                   <Input placeholder="Enter contact number" />
                 </Form.Item>
               </Col>
             </Row>
             <Form.Item
               name="safe"
               label={<span style={{ color: themeStyles.textColor }}>Password </span>}
               rules={[{ required: true, message: 'Please enter the password' }]}
             >
               <Input placeholder="Enter password" />
             </Form.Item>
             <Form.Item
               name="image"
               label={<span style={{ color: themeStyles.textColor }}>Image URL </span>}
               rules={[{ required: true, message: 'Please enter the image URL' }]}
             >
                <Input placeholder="Enter image URL" />
             </Form.Item>
             <Form.Item style={{textAlign:'right'}}>
                <Button key="cancel" onClick={handleCloseModal}>
                Cancel
              </Button>
              <Button key="save" type="primary" onClick={() => addUserForm.submit()} style={{marginLeft:'10px'}}>
                Save
              </Button>
             </Form.Item>
           </Form>
         </div>
       </div>
     </Modal>
      )}
    </div>
  );
};

export default AdminDashboard;

