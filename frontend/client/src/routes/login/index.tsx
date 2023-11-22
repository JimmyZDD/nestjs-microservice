/*
 * @Author: zdd
 * @Date: 2023-11-21 10:26:47
 * @LastEditors: zdd dongdong@grizzlychina.com
 * @LastEditTime: 2023-11-21 22:16:23
 * @FilePath: index.tsx
 */
import { gql, useMutation } from '@apollo/client';
import { Button, Form, Input } from 'antd-mobile';
import { useNavigate } from 'react-router-dom';

interface LoginParam {
  username: string;
  password: string;
}

function Login() {
  const navigate = useNavigate();

  const [login, { data, loading, error }] = useMutation<
    { login: string },
    LoginParam
  >(
    gql`
      mutation LoginMutation($username: String!, $password: String!) {
        login(username: $username, password: $password)
      }
    `
  );

  const onFinish = async (values: LoginParam) => {
    const { data } = await login({ variables: values });
    if (data?.login) {
      localStorage.setItem('token', data.login);
      navigate('/home');
    }
  };

  return (
    <Form
      name="form"
      onFinish={onFinish}
      footer={
        <Button block type="submit" color="primary" size="large">
          提交
        </Button>
      }
    >
      <Form.Header>Login</Form.Header>
      <Form.Item name="username" label="Username" rules={[{ required: true }]}>
        <Input placeholder="Please input username" />
      </Form.Item>
      <Form.Item name="password" label="Password" rules={[{ required: true }]}>
        <Input type="password" placeholder="Please input password" />
      </Form.Item>
    </Form>
  );
}

export default Login;
