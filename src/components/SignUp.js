import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import { Link, Redirect } from "react-router-dom";
import { useDispatch , useSelector } from 'react-redux';
import { signup } from '../actions/authAction';



const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 8},
};
const tailLayout = {
  wrapperCol: { offset: 4, span: 8 },
};

const SignUp = () => {
    
    const [ email, setEmail ] = useState(null);
    const [ password, setPassword ] = useState(null);
    const [ passwordAgain, setPasswordAgain ] = useState(null);
    const [ firstName, setFirstName ] = useState(null);
    const [ lastName, setLastName ] = useState(null);
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth)

    const handleSubmit = () => {

      if ( password === passwordAgain){

      const user = {
        firstName, lastName, email, password
      };
      dispatch(signup(user))
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
        <h1 style = {{ marginLeft: '250px'}}>Sign Up</h1>
        <Form.Item
        label="First name"
        name="firstname"
        rules={[{ required: true, message: 'Please input your first name!' }]}
      >
        <Input onChange={(e) => { setFirstName( e.target.value )}} />
      </Form.Item>
      <Form.Item
        label="Last name"
        name="lastname"
        rules={[{ required: true, message: 'Please input your last name!' }]}
      >
        <Input onChange={(e) => { setLastName( e.target.value )}} />
      </Form.Item>
      <Form.Item
        label="Email"
        name="username"
        rules={[{ required: true, message: 'Please input your email!' }]}
      >
        <Input onChange={(e) => { setEmail( e.target.value )}} />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password onChange={(e) => { setPassword( e.target.value )}} />
      </Form.Item>

      <Form.Item
        label="Password again"
        name="passwordagain"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password onChange={(e) => { setPasswordAgain( e.target.value )}} />
      </Form.Item>

      <Form.Item {...tailLayout} name="remember" valuePropName="checked">
         <Link to='/' > Login </Link>
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit" onClick={() => { handleSubmit() }}>
          Sign Up
        </Button>
      </Form.Item>
    </Form>
  );
};
export default SignUp;