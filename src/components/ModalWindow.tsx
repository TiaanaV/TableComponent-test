import React from "react"
import { Modal, Input, Form } from "antd"
import { FormInstance } from "antd/lib/form"

  interface Props {
    form: FormInstance;
    isOpen: boolean;
    onCancel: () => void;
    onOk:() => Promise<void>;

  }
  
export const ModalWindow: React.FC<Props> = ({ form, isOpen,onCancel, onOk}) => {
   
	return (
		<Modal open={isOpen} onCancel={onCancel} onOk={onOk} destroyOnClose >
			<Form form={form} layout="vertical">
				<Form.Item
					name="name"
					label="Name"
					rules={[{ required: true, message: "Please enter name" }]}
				>
					<Input />
				</Form.Item>
				<Form.Item
					name="date"
					label="Date"
					rules={[{ required: true, message: "Please select date" }]}
				>
					<Input type="date" />
				</Form.Item>
				<Form.Item
					name="value"
					label="Value"
					rules={[{ required: true, message: "Please enter value" }]}
				>
					<Input type="number" />
				</Form.Item>
			</Form>
		</Modal>
	)
}
