import React, { FC } from 'react';

import { Button, DatePicker, Form, Input, InputNumber } from 'antd';
// eslint-disable-next-line import/no-extraneous-dependencies
import styled from 'styled-components';

import type { FormDto } from '../types/form.dto';
const { useForm } = Form;

interface ItemFormProps {
    handleSubmit: (formDto: FormDto) => void;
    onCancel: () => void;
    formData?: FormDto;
}

const StyledInputNumber = styled(InputNumber)`
    width: 100%;
`;

const StyledDatePicker = styled(DatePicker)`
    width: 100%;
`;

const FormFooter = styled.footer`
    display: flex;
    justify-content: flex-end;
    gap: 0.5rem;
`;
export const ModalForm: FC<ItemFormProps> = ({ handleSubmit, onCancel, formData }) => {
    const [form] = useForm<FormDto>();

    return (
        <Form form={form} layout="vertical" onFinish={(formData) => handleSubmit(formData)} initialValues={formData}>
            <Form.Item name="name" label="Имя" rules={[{ required: true, message: 'Please enter name' }]}>
                <Input />
            </Form.Item>
            <Form.Item name="date" label="Дата" rules={[{ required: true, message: 'Please select date' }]}>
                <StyledDatePicker format="DD.MM.YYYY" />
            </Form.Item>
            <Form.Item
                name="value"
                label="Числовое значение"
                rules={[{ required: true, message: 'Please enter value' }]}
            >
                <StyledInputNumber />
            </Form.Item>
            <FormFooter>
                <Button onClick={onCancel}>Отменить</Button>
                <Button htmlType="submit" type="primary">
                    Сохранить
                </Button>
            </FormFooter>
        </Form>
    );
};
