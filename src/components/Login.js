import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import { Link, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signin } from '../actions/authAction';

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 8 },
  size : ''
};
const tailLayout = {
  wrapperCol: { offset: 4, span: 8 },
};

const Login = () => {
  
  const [ email, setEmail ] = useState(null);
  const [ password, setPassword ] = useState(null);
  const dispatch = useDispatch();
  const auth = useSelector( state => state.auth );


  const handleLogin = ( e ) => {

    if ( email !== '' && password !== ''){
    e.preventDefault();
    dispatch( signin({ email, password }) );
    
    }

  }
  

  if(auth.authenticated){
    return <Redirect to={`/`} />
  }
  return (
    <Form
      {...layout}
      name="basic"
      initialValues={{ remember: true }}
      style={{ marginTop: '50px', marginLeft: '400px' }}
    >
         <h1 style = {{ marginLeft: '250px'}}>Login</h1>
      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, message: 'Please input your email!' }]}
      >
        <Input onChange={ (e) => { setEmail( e.target.value )}}/>
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password onChange={ (e) => { setPassword( e.target.value )}} />
      </Form.Item>

      <Form.Item {...tailLayout} name="remember" valuePropName="checked">
      <Link to='/signup' >Sign Up</Link>
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit" onClick={ (e) => { handleLogin (e)}} >
         Login
        </Button>
      </Form.Item>
    </Form>
  );
};
export default Login;