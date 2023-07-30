import React, { useState } from 'react';
import { Modal, Form, Input, Button, DatePicker, InputNumber } from 'antd';

interface FormValues {
    key: string;
    number: number;
    name: string;
    date: Date;
    action: string;
  }

  interface Props {
    onAdd: (data: FormValues) => void;
    onCancel: () => void;
  }
  
export const EditRowModal: React.FC<Props> = ({onAdd,onCancel}) => {
   // const [value, setValue] = useState(initialValue);
  
   const [form] = Form.useForm();

  const handleCancel = () => {
    form.resetFields();
    onCancel();
  };

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        form.resetFields();
        onAdd(values);
        console.log(values)
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Modal
      open={true}
      title="Add new action"
      onCancel={handleCancel}
      footer={[
        <Button key="cancel" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button key="save" type="primary" onClick={handleOk}>
          Save
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical">
      <Form.Item label="Number" name="numbers" rules={[{ required: true, message: "Number is required" }]}>
            <InputNumber/>
        </Form.Item>
        <Form.Item label="Name" name="name" rules={[{ required: true, message: "Name is required" }]}>
          <Input placeholder="Type name" />
        </Form.Item>
        <Form.Item label="Date" name="date" rules={[{ required: false, message: "" }]}>
          <DatePicker picker="date" placeholder="Chose date"  />
        </Form.Item>
        <Form.Item label="Action" name="action" rules={[{ required: true, message: "Action is required" }]}>
          <Input placeholder="Describe action" />
        </Form.Item>
      </Form>
    </Modal>
  );
};
