import React from 'react';
import { Row, Col, Divider } from 'antd';
import { NavLink } from 'react-router-dom'

const MenuTop = () => {
    return (
        <Row gutter={[8, 8]} style={{color: 'white'}} >
        <Col span={4} order={1}>
        </Col>
        <Col span={4} order={1}>
            <NavLink to='/' style={{color: 'white'}} >Web Messenger</NavLink>
        </Col>
        <Col span={4} order={2}>
            <NavLink to='/login' style={{color: 'white'}} >Login</NavLink>
        </Col>
        <Col span={4} order={3}>
             <NavLink to='/signup' style={{color: 'white'}} >Sign Up</NavLink>
        </Col>
        <Col span={4} order={4}>
         The Linh
        </Col>
        <Col span={4} order={5} style={{ cursor: 'pointer'}}>
         Log Out
        </Col>
      </Row>
    )  
}

export default MenuTop;