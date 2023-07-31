import React, { useState } from "react"
import { Table, Form, Button, Modal } from "antd"
import { SearchBar } from "./SearchBar"
import { ModalWindow } from "./ModalWindow"
import { v4 as uuid } from "uuid"
import style from "../styles/TableComponent.module.css"

interface TableItem {
  [key: string]: string | number;
  id: number;
  name: string;
  date: string;
  value: number;
}

export const TableComponent: React.FC = () => {
	const [data, setData] = useState<TableItem[]>([])
	const [modalVisible, setModalVisible] = useState(false)

	const [form] = Form.useForm()

	const handleAdd = () => {
		setModalVisible(true)
	}

	const handleEdit = (record: TableItem) => {
		form.setFieldsValue(record)
		setModalVisible(true)
	}

	const handleDelete = (record: TableItem) => {
		setData(data.filter((item) => item.id !== record.id))
	}

	const handleSave = async () => {
		try {
			const values = await form.validateFields()

			const newItem: TableItem = {
				id: uuid(),
				...values,
			}

			setData([...data, newItem])
			form.resetFields()
			setModalVisible(false)
		} catch (error) {
			console.error(error)
		}
	}

	const columns = [
		{
			title: "Name",
			dataIndex: "name",
			key: "name",
			sorter: (a: TableItem, b: TableItem) => a.name.localeCompare(b.name),
		},
		{
			title: "Date",
			dataIndex: "date",
			key: "date",
			sorter: (a: TableItem, b: TableItem) =>
				new Date(a.date).getTime() - new Date(b.date).getTime(),
		},
		{
			title: "Value",
			dataIndex: "value",
			key: "value",
			sorter: (a: TableItem, b: TableItem) => a.value - b.value,
		},
		{
			title: "Actions",
			dataIndex: "actions",
			key: "actions",
			render: (_: any, record: TableItem) => (
				<>
					<Button type="link" onClick={() => handleEdit(record)}>
            Edit
					</Button>
					<Button type="link" onClick={() => handleDelete(record)}>
            Delete
					</Button>
				</>
			),
		},
	]

	const handleSearch = (value: string) => {
		let filteredData
		if (value === "") {
			filteredData = data
		} else {
			filteredData = data.filter((item) => {
				for (const key in item) {
					const cellValue = String(item[key])
					if (cellValue.toLowerCase().includes(value.toLowerCase())) {
						return true
					}
				}
				return false
			})
		}
		if (filteredData.length === 0) {
			Modal.error({
				title: "Error",
				content: "Invalid search data entered",
			})
			return
		}
		setData(filteredData)
	}

	return (
		<>
			<div className={style.container}>
				<SearchBar onSearch={handleSearch} />
				<Button type="primary" onClick={handleAdd}>
          Add
				</Button>
			</div>
			<Table dataSource={data} columns={columns} />
			<ModalWindow
				form={form}
				isOpen={modalVisible}
				onCancel={() => setModalVisible(false)}
				onOk={handleSave}
			/>
		</>
	)
}
