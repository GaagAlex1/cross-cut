// src/App.tsx
import React from 'react';
import { Layout } from 'antd';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Snowflakes from './components/common/Snowflakes';
import LoginForm from './components/form/LoginForm';
import './App.css';

const { Content } = Layout;

const App: React.FC = () => (
    <Layout style={{ minHeight: '100vh', background: '#f0f2f5' }}>
        <Snowflakes />

        <Header />

        <Content
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                padding: '2rem',
                background: '#f0f2f5'
            }}
        >
            <div
                style={{
                    width: '100%',
                    maxWidth: 400,
                    background: '#ffffff',
                    padding: '24px',
                    borderRadius: '8px',
                    boxShadow: '0 0 10px rgba(0,0,0,0.1)'
                }}
            >
                <LoginForm />
            </div>
        </Content>

        <Footer />
    </Layout>
);

export default App;
