import { userConstants } from './constants';
import { firestore } from 'firebase';

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
                if((doc.data().user_uid_1 === user.uid_1 && doc.data().user_uid_2 && user.uid_2)
                ||
               (doc.data().user_uid_1 === user.uid_2 && doc.data().user_uid_2 && user.uid_1)
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