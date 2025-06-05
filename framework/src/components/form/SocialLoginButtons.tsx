import React from 'react';
import { Button, Space } from 'antd';
import { GoogleOutlined, AppleOutlined } from '@ant-design/icons';

const SocialLoginButtons: React.FC = () => (
    <Space direction="vertical" style={{ width: '100%' }}>
        <Button icon={<GoogleOutlined />} block>
            Continue with Google
        </Button>
        <Button icon={<AppleOutlined />} block>
            Sign in with Apple
        </Button>
    </Space>
);

export default SocialLoginButtons;