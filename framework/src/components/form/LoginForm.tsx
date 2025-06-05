import React from 'react';
import { Form, Button, Checkbox, message } from 'antd';
import { useAuthStore } from '../../store/authStore.ts';
import SocialLoginButtons from './SocialLoginButtons.tsx';
import InputField from './InputField.tsx';

const LoginForm: React.FC = () => {
    const [form] = Form.useForm();
    const { setEmail, setPassword, login } = useAuthStore();

    const onFinish = (values: any) => {
        const { email, password} = values;
        if (email === 'user@example.com' && password === 'password123') {
            setEmail(email);
            setPassword(password);
            login();
            void message.success('Success! You are logged in.');
        } else {
            void message.error('Incorrect email or password.');
        }
    };

    return (
        <Form
            form={form}
            name="login"
            layout="vertical"
            onFinish={onFinish}
            initialValues={{ keepLogged: false }}
        >
            <SocialLoginButtons />

            <InputField
                name="email"
                label="Email or Phone"
                placeholder="you@example.com"
                rules={[
                    { required: true, message: 'Please input your email!' },
                    { type: 'email', message: 'Invalid email format!' },
                ]}
            />

            <InputField
                name="password"
                label="Password"
                placeholder="At least 6 characters"
                type="password"
                rules={[
                    { required: true, message: 'Please input your password!' },
                    { min: 6, message: 'Password must be at least 6 characters!' },
                ]}
            />

            <Form.Item name="keepLogged" valuePropName="checked">
                <Checkbox>Keep me logged in</Checkbox>
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" block>
                    Log In
                </Button>
            </Form.Item>
        </Form>
    );
};

export default LoginForm;
