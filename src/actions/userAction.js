import { userConstants } from './constants';
import { firestore, storage, auth } from 'firebase';
import { message } from 'antd'


export const getRealtimeUser = (uid) => {
    return async dispatch => {
        
        dispatch({ type: `${userConstants.GET_REALTIME_USER}_REQUEST` });
        const db = firestore();
        const unsubscribe = db.collection("users")
        //.where("uid", "!=", uid)
        .onSnapshot(function(querySnapshot) {
        var users = [];
        querySnapshot.forEach(function(doc) {
            if(doc.data().uid !== uid ){

                users.push(doc.data());
            }
           
        });

        dispatch({ type: `${userConstants.GET_REALTIME_USER}_SUCCESS`,
                    payload: { users }
     });
    });

    return unsubscribe;
    }
}

export const updateMessage = (msgObj) => {

    return dispatch => {
        const db = firestore();
        db.collection('conversations')
        .add({
            ...msgObj,
            isView: false,
            createdAt: new Date()
            })
        .then( data => {

        })
        .catch(error =>{
            console.log(error);
        })

}
}

export const getRealTimeMessage = ( user ) => {

    return async dispatch => {
        const db = firestore();
        db.collection('conversations')
        .where('user_uid_1', 'in', [ user.uid_1, user.uid_2 ])
        .orderBy('createdAt', 'asc')
        .onSnapshot(function(querySnapshot) {
            var conversations = [];
            querySnapshot.forEach(function(doc) {
                if((doc.data().user_uid_1 === user.uid_1 && doc.data().user_uid_2 === user.uid_2)
                ||
               (doc.data().user_uid_1 === user.uid_2 && doc.data().user_uid_2 === user.uid_1)
                 ){
                    conversations.push(doc.data());
                 }
            });
           if( conversations.length > 0 ){
               dispatch({
                   type: userConstants.GET_REALTIME_MESSAGE,
                   payload: { conversations }
               })
           }else{
               dispatch({
                   type:`${userConstants.GET_REALTIME_MESSAGE}_FAILURE`,
                   payload: { conversations }
               })
           }
        });
    }

}

export const uploadAvatar = (info, uid) => {

    return  dispatch => {

                dispatch({
                    type: `${userConstants.UPLOAD_AVATAR_USER}_REQUEST`,
                    payload: { mess : 'Đang tải ảnh lên ...'}
                })
            
            const img = info.file.originFileObj;
            var uploadTask =  storage().ref(`img/${img.name}`).put(img);
            uploadTask.on('state_changed', function(snapshot){}, function(error) {
                // Handle unsuccessful uploads
                alert(error);
              }, function() {
                // Handle successful uploads on complete
                // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                storage().ref('img').child(img.name).getDownloadURL().then(function(downloadURL) {
                  localStorage.setItem('avatar', downloadURL)
                  var user = auth().currentUser;
                    user.updateProfile({
                    photoURL: downloadURL
                    }).then(function() {
                    // Update successful.
 
                        const db = firestore();
                         db.collection('users')
                         .doc(uid)
                        .update({
                           avatar: downloadURL
                         })
                         .then(() => {
                             message.info('Đổi ảnh đaị diện thành công')
                             dispatch({
                               type: `${userConstants.UPLOAD_AVATAR_USER}_SUCCESS`
                            })

                         })
                         .catch((err) => {
                             console.log(err)
                        })
                    
                    })
                    .catch(function(error) {
                    // An error happened.
                    dispatch({
                        type: `${userConstants.UPLOAD_AVATAR_USER}_FAILURE`,
                        payload: { mess: 'upload failure!' }
                    })
                    });
                });
              });
             }
    }

export const post = (files, content, uid ) => {
   
    return   dispatch => {
        const listImg = [];
        dispatch({
            type: `${userConstants.POST_USER}_REQUEST`,
            payload: { isLoading: true }
        });
            
        for (const file of files) {   
                const img = file;
                var uploadTask =  storage().ref(`posts/${img.name}`).put(img);
                uploadTask.on('state_changed', function(snapshot){}, function(error) {
                
                    alert(error);
                  },  function() {
                    
                    storage().ref('posts').child(img.name).getDownloadURL()
                    .then( function(downloadURL) {
                        listImg.push(downloadURL);
                     if(listImg.length === files.length){
                        const db = firestore();
                        db.collection('posts')
                        .add({
                          user_uid: uid,
                          imgList: [...listImg],
                          content: content,
                          createdAt: new Date()
                                   })
                          .then(() => {
                              message.info('Đăng bài viết thành công')
                      
                           })
                          .catch((err) => {
          
                                console.log(err)
          
                                  })
                     }
                      
                      console.log(listImg)
                      dispatch({
                          type: `${userConstants.POST_USER}_SUCCESS`,
                          payload: { isLoading: false }
                      });
                      
                    })
                    .catch((err) => { console.log(err) })
                    
                  })
    
    
    
            };
            
        }

        }
   
    
    

