import React from 'react';

import { CreateFormDto } from '@types';
import { Form, Input, Modal } from 'antd';

interface ModalWindowProps {
    isOpen: boolean;
    onCancel: () => void;
    onOk: (data: CreateFormDto) => Promise<void>;
    data?: CreateFormDto;
}

export const ModalWindow: React.FC<ModalWindowProps> = ({ isOpen, onCancel, data, onOk }) => {
    const [form] = Form.useForm();

    return (
        <Modal onCancel={onCancel} onOk={form.submit} open={isOpen} destroyOnClose>
            <Form form={form} layout="vertical" onFinish={onOk} initialValues={data}>
                <Form.Item name="name" label="Name" rules={[{ required: true, message: 'Please enter name' }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="date" label="Date" rules={[{ required: true, message: 'Please select date' }]}>
                    <Input type="date" />
                </Form.Item>
                <Form.Item name="value" label="Value" rules={[{ required: true, message: 'Please enter value' }]}>
                    <Input type="number" />
                </Form.Item>
            </Form>
        </Modal>
    );
};
