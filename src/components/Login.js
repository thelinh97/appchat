import React from 'react';
import { Form, Input, Button } from 'antd';
import { Link } from 'react-router-dom';
const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 8 },
  size : ''
};
const tailLayout = {
  wrapperCol: { offset: 4, span: 8 },
};

const Login = () => {
  const onFinish = values => {
    console.log('Success:', values);
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };
  return (
    <Form
      {...layout}
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      style={{ marginTop: '50px', marginLeft: '400px' }}
    >
         <h1 style = {{ marginLeft: '250px'}}>Login</h1>
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item {...tailLayout} name="remember" valuePropName="checked">
      <Link to='/signup' >Sign Up</Link>
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit"  >
         Login
        </Button>
      </Form.Item>
    </Form>
  );
};
export default Login;