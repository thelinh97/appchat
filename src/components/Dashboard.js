import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import { CheckCircleTwoTone } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { getRealtimeUser, updateMessage, getRealTimeMessage } from '../actions/userAction';
import avatarDemo from '../img/avatardemo.jpg'

const User = (props) =>{
    const {user, onClick } = props;  
    return(
        <div onClick={ () => { onClick(user) }} className="displayName">
        <div className="displayPic">
            <img src={user.avatar ? user.avatar : avatarDemo } alt="" />
        </div>
        <div style={{margin: '0 10px', display: 'flex', flex: 1, justifyContent: 'space-between'}}>
        <span style={{fontWeight: 500}}>{user.firstName} {user.lastName}</span>
            <span><CheckCircleTwoTone twoToneColor={ user.isOnline ? "#52c41a" : '#dedada'} /></span>
        </div>
    </div>
    )
}

export default function Dashboard (props) {

    const auth = useSelector( state => state.auth );
    const users = useSelector( state => state.users )
    const dispatch = useDispatch();
    const [ chatStarted, setChatStarted ] = useState(false);
    const [ chatUser, setChatUser ] = useState('');
    const [ message, setMessage ] = useState('');
    const [ userUid, setUserUid ] = useState(null);
    let unsubscribe;

    useEffect( () => {
        unsubscribe = dispatch( getRealtimeUser(auth.uid) )
        .then(unsubscribe => {
            return unsubscribe;
        })
        .catch( error =>{
            console.log(error);
        });
    }, []);
    useEffect( () => {
        return () => {
            //cleanup
            unsubscribe.then(f => f()).catch(error => { console.log( error )})
        }
    },[])

    const initChat = ( user ) => {
        setChatStarted(true);
        setChatUser(`${user.firstName} ${user.lastName}`);
        setUserUid(user.uid);
        dispatch( getRealTimeMessage({ uid_1: auth.uid, uid_2: user.uid }));
        
    }

    const submitMessage =  () =>{

        const msgObj = {
            user_uid_1: auth.uid,
            user_uid_2: userUid,
            message
        };
        if(message !== ''){
            dispatch( updateMessage(msgObj) )
        }
        setMessage('')
    }

    return(
     <section className="container">
    <div className="listOfUsers">
        {users.users.length > 0 ? users.users.map( (user) => {
            return (
              <User key={user.uid} user={user} onClick={ initChat } />
            )
        }): null }
        
                
    </div>
    <div className="chatArea">
    <div className="chatHeader">{ chatStarted ? chatUser : null}</div>
        <div className="messageSections">
        { chatStarted ? 
            users.conversations.map((con, index) => {
                return(
                    <div style={{ textAlign: con.user_uid_1 === auth.uid ? 'right' : 'left' }} key={index} >
                 <p className="messageStyle" >{con.message}</p>
            </div>
                )
            })
            : null 
        }
        </div>
        { chatStarted ?
            <div className="chatControls">
                <input
                style={{width: '100%'}} 
                value = {message} 
                onChange = {(e) => { setMessage( e.target.value )}}
                onKeyPress={(event) => {
                    if (event.key === "Enter") {
                    submitMessage()
                    };
                }}
                placeholder = 'Write message'
                />
                <button onClick={ submitMessage } >Send</button>
            </div> : null
        }
    </div>
</section>
    )
}