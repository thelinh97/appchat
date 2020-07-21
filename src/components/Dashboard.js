import React, { useEffect } from 'react';
import './Dashboard.css';
import { CheckCircleTwoTone } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { getRealtimeUser } from '../actions/userAction';


export default function Dashboard (props) {

    const auth = useSelector( state => state.auth );
    const users = useSelector( state => state.users )
    const dispatch = useDispatch();

    useEffect( () => {
        dispatch( getRealtimeUser(auth.uid) );
    }, [])
    console.log(users.users);

    return(
     <section className="container">
    <div className="listOfUsers">
        {users.users.length > 0 ? users.users.map( (user, index) => {
            return (
                <div className="displayName" key={index}>
            <div className="displayPic">
                <img src="https://i.pinimg.com/originals/be/ac/96/beac96b8e13d2198fd4bb1d5ef56cdcf.jpg" alt="" />
            </div>
            <div style={{margin: '0 10px', display: 'flex', flex: 1, justifyContent: 'space-between'}}>
            <span style={{fontWeight: 500}}>{user.firstName} {user.lastName}</span>
                <span><CheckCircleTwoTone twoToneColor={ user.isOnline ? "#52c41a" : '#dedada'} /></span>
            </div>
        </div>
            )
        }): null }
        
                
    </div>
    <div className="chatArea">
    <div className="chatHeader">{auth.firstName} {auth.lastName}</div>
        <div className="messageSections">

            <div style={{ textAlign: 'left' }}>
                <p className="messageStyle" >Hello User</p>
            </div>

        </div>
        <div className="chatControls">
            <textarea />
            <button>Send</button>
        </div>
    </div>
</section>
    )
}