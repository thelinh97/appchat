import { userConstants } from './constants';
import { firestore } from 'firebase';

export const getRealtimeUser = (uid) => {
    return async dispatch => {
        
        dispatch({ type: `${userConstants.GET_REALTIME_USER}_REQUEST` });
        const db = firestore();
        db.collection("users")
        //.where("uid", "!=", uid)
        .onSnapshot(function(querySnapshot) {
        var users = [];
        querySnapshot.forEach(function(doc) {
            if(doc.data().uid != uid ){
                
                users.push(doc.data());
            }
           
        });

        dispatch({ type: `${userConstants.GET_REALTIME_USER}_SUCCESS`,
                    payload: { users }
     });
    });

    }
}