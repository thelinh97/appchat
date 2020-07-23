import React from 'react';
import { Card, Upload, Row, Col, Form, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { uploadAvatar } from '../actions/userAction';
import avatarDemo from '../img/avatardemo.jpg'



const { Meta } = Card;

function PersonalPage(props) {

  const dispatch = useDispatch();
  const auth = useSelector( sate => sate.auth);
  const user = useSelector( sate => sate.users);
  const avatarNew = localStorage.getItem('avatar')

    const propsUpload = {

        onChange(info) {
          
          dispatch( uploadAvatar(info, auth.uid) )
        },
        
      };


    return (
        <Row style={{marginTop: '5px'}}>
            <Col flex={2} style={{marginLeft: '5px'}}>
                <Card
                hoverable
                style={{ width: 240 }}
                 cover={<img alt="example" src={ avatarNew ? avatarNew : auth.avatar ? auth.avatar : avatarDemo } />}
                >
                    <Meta title={`${auth.firstName} ${auth.lastName}`} description={auth.email} />
                </Card>
            </Col>
            <Col flex={3}>
            <Form.Item
        name="upload"
        label="Đổi ảnh đại diện"
        valuePropName="fileList"
      >
        
         <Upload {...propsUpload}>
        <Button>
            <UploadOutlined /> { user.uploadAvatarStatus ? user.uploadAvatarStatus : 'Click to Upload' }
            </Button>
        </Upload>
  
      </Form.Item>
            </Col>
        </Row>
    );
}

export default PersonalPage;