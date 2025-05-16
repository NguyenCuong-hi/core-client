import React, { useState } from 'react';
import { Button, Divider, Form, Input, Typography } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone, GoogleOutlined } from '@ant-design/icons';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { addTab, setActiveTab } from 'store/tabsReducer';
import LoadingBlur from 'component/Loader/LoadingBlur';
import { AuthLoginService } from 'services/Auth/GetTokenService';
import Cookies from 'js-cookie'
import { GetUserService } from 'services/Auth/GetUserService';

const AuthLogin = ({ setIsLoggedIn, ...rest }) => {
  const [loading, setLoading] = useState(false);
  const [loadingView, setLoadingView] = useState(false);

  const dispatch = useDispatch();

  const handleLoginSuccess = () => {
    setLoadingView(true);
    setTimeout(() => {
      setIsLoggedIn(true);
      dispatch(addTab({
        key: "home",
        label: "Trang chủ",
        component: "DashboardDefault",
        permission: null,
      }));
      dispatch(setActiveTab('home'));
    }, 1500);
  };

  const onSubmit = async (values, { setSubmitting }) => {
    // setLoading(true);
    // setTimeout(() => {
    //   console.log('Login Info:', values);
    //   setLoading(false);
    //   setSubmitting(false);
    //   handleLoginSuccess();
    // }, 1000);


    try {
      const data = {
        username: values.username,
        password: values.password,
      }

      const loginResponse = await AuthLoginService(data);
      console.log('loginResponse', loginResponse)
      if (loginResponse.success) {
        Cookies.set('token', loginResponse.token)
        const user = await GetUserService();
        console.log('user', user)
        localStorage.setItem('username', JSON.stringify(user.data.username))
        localStorage.setItem('role', JSON.stringify(user.data.role))
        localStorage.setItem('menu', JSON.stringify(user.data.menu))
      }
    } catch (error) {
      console.error(error); 
    }
  }

  if (loadingView) {
    return <LoadingBlur />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        <div className="text-center mb-6">
          <Typography.Title level={2} className="!mb-0">
            Welcome Back
          </Typography.Title>
          <Typography.Text type="secondary">Please login to your account</Typography.Text>
        </div>

        <Button
          block
          icon={<GoogleOutlined />}
          className="mb-4 font-semibold !bg-gray-50 !text-gray-600 hover:!bg-gray-100"
        >
          Sign in with Google
        </Button>

        <Divider plain>OR</Divider>

        <Formik
          initialValues={{
            username: '',
            password: '',
            submit: null
          }}
          validationSchema={Yup.object().shape({
            username: Yup.string().max(255).required('Email is required'),
            password: Yup.string().max(255).required('Password is required')
          })}
          onSubmit={onSubmit}
        >
          {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
            <Form layout="vertical" onFinish={handleSubmit} {...rest}>
              <Form.Item
                label="Email Address"
                validateStatus={touched.username && errors.username ? 'error' : ''}
                help={touched.username && errors.username}
              >
                <Input
                  name="username"
                  placeholder="Enter your email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.username}
                  size="large"
                />
              </Form.Item>

              <Form.Item
                label="Password"
                validateStatus={touched.password && errors.password ? 'error' : ''}
                help={touched.password && errors.password}
              >
                <Input.Password
                  name="password"
                  placeholder="Enter your password"
                  iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.password}
                  size="large"
                />
              </Form.Item>

              <div className="flex justify-end mb-4">
                <Typography.Link>Forgot Password?</Typography.Link>
              </div>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  size="large"
                  loading={isSubmitting || loading}
                  className="!rounded-lg"
                >
                  Log In
                </Button>
              </Form.Item>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AuthLogin;
