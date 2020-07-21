import { auth , firestore } from 'firebase';
import { authConstants } from './constants'


export const signup = ( user ) => {

    return async ( dispatch ) => {

        const db = firestore();
        dispatch({
            type: `${authConstants.USER_LOGIN}_REQUEST`
        })
        auth().createUserWithEmailAndPassword( user.email, user.password )
        .then( ( data ) => { 
            console.log ( data );
            const name = `${user.firstName} ${user.lastName}`;
            const currentUser = auth().currentUser;
            currentUser.updateProfile({
                displayName: name
            })
            .then( () => {
                db.collection('users')
                .doc(data.user.uid)
                .set({
                    firstName: user.firstName,
                    lastName: user.lastName,
                    uid: data.user.uid,
                    createdAt: new Date(),
                    isOnline: true
                })
                .then( () => {
                    const loggedInUser = {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    uid: data.user.uid,
                    email: user.email
                    };
                    localStorage.setItem( 'user', JSON.stringify( loggedInUser ));
                    console.log('logged successfully...!!');
                    dispatch({
                        type: `${authConstants.USER_LOGIN}_SUCCESS`,
                        payload: { user: loggedInUser }
                    })
                })
                .catch(( error ) => { console.log( error );
                    dispatch({
                        type: `${authConstants.USER_LOGIN}_FAILURE`,
                        payload: { error }
                    })
                })
            })

        } )
        .catch( ( error ) => { console.log( error )})
    }
}

export const signin = (user) => {
    return async dispatch => {

        dispatch({ type: `${authConstants.USER_LOGIN}_REQUEST` });
        auth()
        .signInWithEmailAndPassword( user.email, user.password )
        .then( (data) => {

            const db = firestore();
            db.collection('users')
            .doc(data.user.uid)
            .update({
                isOnline: false
            })
            .then(() => {
                const name = data.user.displayName.split(' ');
                const firstName = name[0];
                const lastName = name[1];
                const loggedInUser = {
                firstName,
                lastName,
                email: data.user.email,
                uid: data.user.uid
            };
            localStorage.setItem('user',JSON.stringify(loggedInUser));
            dispatch({ 
                type: `${authConstants.USER_LOGIN}_SUCCESS`,
                payload: { user: loggedInUser }
            });
                
            })
            .catch( error => { console.log(error); })
        })
        .catch((error) => {
            console.log(error);
            dispatch({
                type: `${authConstants.USER_LOGIN}_FAILURE`,
                payload: { error }
            })
        })
}
}

export const isLoggedInUser = () => {
 return async dispatch => {

    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')): null;
    if(user){
        dispatch({
            type: `${authConstants.USER_LOGIN}_SUCCESS`,
            payload: { user: user }
        })
    }else {
        dispatch({
            type: `${authConstants.USER_LOGIN}_FAILURE`,
            payload: { error: 'Login again please!' }
        })
    }
 }
}

export const logout = (uid) => {
    return async dispatch => {
        dispatch({ type: `${ authConstants.USER_LOGOUT}_REQUEST`});
        const db = firestore();
        db.collection('users')
        .doc(uid)
        .update({
            isOnline: false
        })
        .then( () => {

        auth()
        .signOut()
        .then( () => {
            localStorage.clear();
            dispatch({ type: `${ authConstants.USER_LOGOUT}_SUCCESS`});
        })
        .catch( (error) => {
            console.log(error);
            dispatch({ type: `${ authConstants.USER_LOGOUT}_FAILURE`,
                        payload: { error }
        });
        })

        })
        .catch((error) => {
            console.log(error)
        })


        
    }
}