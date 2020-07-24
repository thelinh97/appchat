import React,{ useEffect, useState } from 'react';
import { List, Avatar, Space } from 'antd';
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { firestore } from 'firebase';




const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

 function PostPersonal(props) {
   

   const auth =  useSelector( state => state.auth);
   const [ listData, setListData ] = useState([])

  useEffect(() => {
    if(auth.uid){
    const db = firestore();
    var unsubscribe = db.collection('posts')
        .where('user_uid', '==', `${auth.uid}`)
        .orderBy('createdAt', 'desc')
        .onSnapshot(function(querySnapshot) {
            var arr = [];
            querySnapshot.forEach(function(doc) {
                if( doc.data().user_uid === auth.uid )
                 {
                    arr.push(doc.data());
                    
                 }
            });
           
            setListData(arr);
        });
      };
      return () => unsubscribe;
  },[auth.uid]);
  console.log(listData)
    return (
        <List
        itemLayout="vertical"
        size="large"
        style={{padding:'0 100px'}}
        dataSource={listData}
        renderItem={item => (
          <List.Item
            key={item.title}
            actions={[
              <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
              <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
              <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
            ]}
            
          >
            
            {item.imgList.map((imgUrl, index )=> 
            <img
            key = {index}
            style={{marginBottom: '2px', width:'200px', height:'200px'}}
              width={272}
              alt="logo"
              src={imgUrl}
            />
              )}
            
              
            <List.Item.Meta
              avatar={<Avatar src={auth.avatar} style={{width: '60px', height: '60px'}}/>}
              title={<a href={item.href}>{item.title}</a>}
              description={item.description}
            />
            {item.content}
          </List.Item>
        )}
      />
    );
}

export default PostPersonal;