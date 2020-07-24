import React, { useState } from 'react';
import { Card, Upload, Row, Col, Form, Button, Input } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { uploadAvatar, post } from '../actions/userAction';
import avatarDemo from '../img/avatardemo.jpg';
import PicturesWall from './PicturesWall';
import PostPersonal from './PostPersonal';





const { TextArea } = Input;
const { Meta } = Card;



function PersonalPage(props) {

  const dispatch = useDispatch();
  const auth = useSelector( sate => sate.auth);
  const user = useSelector( sate => sate.users);
  const avatarNew = localStorage.getItem('avatar');
  const [listImg, setListImg ] = useState([]);
  const [contentPost, setContentPost] = useState('');

  const onChangUpload = (fileList) =>{
    
    const arr = [];
    if ( fileList.length > 0 ) {
      fileList.forEach( item =>{ arr.push(item.originFileObj) });
    };
    setListImg(arr);
    console.log(listImg)
  }

    const propsUpload = {

        onChange(info) {
          
          dispatch( uploadAvatar(info, auth.uid) );

        }
        
      };

      
      
      const handleSubmitPost = () => {

        dispatch( post(listImg,contentPost,auth.uid) )
        setContentPost('');
        setListImg([])

      }

    return (
        <Row>
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
            <Col flex={3} style={{marginLeft: '300px'}}>
              <Form.Item
                name="upload"
                label="Đổi ảnh đại diện"
                valuePropName="fileList"
              >
          
                <Upload {...propsUpload}>
                <Button>
                    <UploadOutlined /> { user.uploadAvatarStatus ? user.uploadAvatarStatus : 'Tải ảnh lên' }
                    </Button>
                </Upload>
          
              </Form.Item>
              <h2>Thêm bài viết</h2>

              <PicturesWall onChangUpload={onChangUpload}  />

              <TextArea rows={4}
              value={contentPost}
              style ={{ width: '100%'}}
              placeholder="Thêm bài viết"
              autoSize={{ minRows: 3, maxRows: 5 }}
              onChange={(e) => {
                 setContentPost(e.target.value)
              }}
               />
              
               <Button type="primary" loading={user.isLoading? 3 :0} onClick={ handleSubmitPost } style={{marginTop: '4px'}} >
                Đăng bài viết
              </Button>
              <hr/>
            </Col>
           
        </Row>
        
        <Row>
          <Col flex={5}>
          
            <PostPersonal/>
          </Col>
        </Row>
        </Row>
     
    );
}

export default PersonalPage;