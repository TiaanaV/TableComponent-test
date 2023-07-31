import React, { useState } from 'react';

import { CreateFormDto } from '@types';
import { Button, Table } from 'antd';
import { v4 as uuid } from 'uuid';

import style from '../styles/TableComponent.module.css';

import { ModalWindow } from './ModalWindow';
import { SearchBar } from './SearchBar';

interface TableItem {
    id: string;
    name: string;
    date: string;
    value: string;
}

export const TableComponent: React.FC = () => {
    const [data, setData] = useState<TableItem[]>([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState<TableItem | null>(null);

    const handleAdd = () => {
        setModalVisible(true);
    };

    const handleEdit = (item: TableItem) => {
        setSelectedItem(item);
        setModalVisible(true);
    };

    const handleDelete = (record: TableItem) => {
        setData(data.filter((item) => item.id !== record.id));
    };

    const handleSave = async (createFormDto: CreateFormDto) => {
        if (selectedItem) {
            const filteredData = data.filter((el) => el.id !== selectedItem.id);
            const updatedItem: TableItem = {
                id: selectedItem.id,
                ...createFormDto,
            };
            setData([...filteredData, updatedItem]);
            setSelectedItem(null);
            setModalVisible(false);
            return;
        }
        const newItem: TableItem = {
            id: uuid(),
            ...createFormDto,
        };
        setData((prev) => [...prev, newItem]);
        setModalVisible(false);
    };

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            sorter: (a: TableItem, b: TableItem) => a.name.localeCompare(b.name),
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
            sorter: (a: TableItem, b: TableItem) => new Date(a.date).getTime() - new Date(b.date).getTime(),
        },
        {
            title: 'Value',
            dataIndex: 'value',
            key: 'value',
            // sorter: (a: TableItem, b: TableItem) => a.value - b.value,
        },
        {
            title: 'Actions',
            dataIndex: 'actions',
            key: 'actions',
            render: (_: never, record: TableItem) => (
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
    ];

    const handleSearch = () => {
        // let filteredData: Array<TableItem> = [];
        // if (value !== '') {
        //     filteredData = data.filter((item) => {
        //         for (const key in item) {
        //             const cellValue = String(item[key]);
        //             if (cellValue.toLowerCase().includes(value.toLowerCase())) {
        //                 return true;
        //             }
        //         }
        //         return false;
        //     });
        // }
        // if (filteredData.length === 0) {
        //     Modal.error({
        //         title: 'Error',
        //         content: 'Invalid search data entered',
        //     });
        //     return;
        // }
        // setData(filteredData);
    };

    return (
        <>
            <div className={style.container}>
                <SearchBar onSearch={handleSearch} />
                <Button type="primary" onClick={handleAdd}>
                    Add
                </Button>
            </div>
            <Table rowKey="id" dataSource={data} columns={columns} />
            <ModalWindow
                data={selectedItem}
                isOpen={modalVisible}
                onCancel={() => setModalVisible(false)}
                onOk={handleSave}
            />
        </>
    );
};
