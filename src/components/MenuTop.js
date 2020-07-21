import React, { useEffect } from 'react';
import { Row, Col, Divider } from 'antd';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../actions/authAction'; 


const MenuTop = () => {
    const auth = useSelector( state => state.auth );
    const dispatch = useDispatch();
    const handleLogOut = () => {
        dispatch(logout(auth.uid))
    }
    
    return (
        <Row gutter={[8, 8]} style={{color: 'white'}} >
        <Col span={6} order={1}>
        </Col>
        <Col span={6} order={1}>
            <NavLink to='/' style={{color: 'white'}} >Web Messenger</NavLink>
        </Col>
        { !auth.authenticated ? <Col span={4} order={2}>
            <NavLink to='/login' style={{color: 'white'}} >Login</NavLink>
        </Col> : null }
        { !auth.authenticated ?
        <Col span={6} order={3}>
             <NavLink to='/signup' style={{color: 'white'}} >Sign Up</NavLink>
        </Col> : null }
        <Col span={4} order={4}>
            { auth.authenticated ? `Hi ${auth.firstName} ${auth.lastName}`: null}
        </Col>
        { auth.authenticated ? 
        <Col span={6} order={5} style={{ cursor: 'pointer'}} onClick={ handleLogOut }  >
        Log Out
       </Col> : null
        }
      </Row>
    )  
}

export default MenuTop;