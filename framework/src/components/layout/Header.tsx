import React from 'react';
import { Typography } from 'antd';
const { Title, Paragraph } = Typography;

const Header: React.FC = () => (
    <header className="header-container">
        <Title level={1}>Welcome</Title>
        <Paragraph>Please log in to your account</Paragraph>
    </header>
);

export default Header;
