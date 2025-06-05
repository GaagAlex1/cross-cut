import React from 'react';
import { Form, Input } from 'antd';

interface InputFieldProps {
    name: string;
    label: string;
    placeholder: string;
    type?: string;
    rules?: any[];
}

const InputField: React.FC<InputFieldProps> = ({
                                                   name,
                                                   label,
                                                   placeholder,
                                                   type = 'text',
                                                   rules = [],
                                               }) => (
    <Form.Item name={name} label={label} rules={rules}>
        <Input type={type} placeholder={placeholder} />
    </Form.Item>
);

export default InputField;
