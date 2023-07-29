import React, { useState } from 'react';
import { Modal, Form, Input, Button, DatePicker, InputNumber } from 'antd';

interface EditRowModalProps {
  visible: boolean;
  initialValue: string;
  onCancel: () => void;
  onSave: (value: string) => void;
}

  
export const EditRowModal: React.FC<EditRowModalProps> = ({
  visible,
  initialValue,
  onCancel,
  onSave,
}) => {
    const [value, setValue] = useState(initialValue);

  const handleSave = () => {
    onSave(value);
  };

  const handleCancel = () => {
    onCancel();
    setValue(initialValue);
  }; 



  return (
    <Modal
      open={visible}
      title="Add new action"
      onCancel={handleCancel}
      footer={[
        <Button key="cancel" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button key="save" type="primary" onClick={handleSave}>
          Save
        </Button>,
      ]}
    >
      <Form>
      <Form.Item label="Number">
            <InputNumber/>
        </Form.Item>
        <Form.Item label="Name">
          <Input placeholder="Type name" />
        </Form.Item>
        <Form.Item label="Data">
          <DatePicker picker="date" placeholder="Chose date"  />
        </Form.Item>
        <Form.Item label="Action">
          <Input placeholder="Describe action" />
        </Form.Item>
      </Form>
    </Modal>
  );
};
