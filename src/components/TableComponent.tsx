import React, { useState } from 'react';

import type { TableItem } from '@types';
import { Button, Table } from 'antd';
import { Dayjs } from 'dayjs';
import styled from 'styled-components';
import { v4 as uuid } from 'uuid';

import { FormDto } from '../types/form.dto';

import { ModalWindow } from './ModalWindow';
import { SearchBar } from './SearchBar';

const TableHeader = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;
`;

const TableComponentWrapper = styled.div`
    padding: 2rem 0;
`;

const TableRowActions = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
`;

export const TableComponent: React.FC = () => {
    const [initialData, setInitialData] = useState<TableItem[]>([]);
    const [filteredData, setFilteredData] = useState<TableItem[] | null>(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState<TableItem | null>(null);

    const handleModal = () => setIsModalVisible((prev) => !prev);
    const onModalClose = () => {
        setSelectedItem(null);
        handleModal();
    };

    const handleAdd = () => {
        setIsModalVisible(true);
    };

    const handleEdit = (item: TableItem) => {
        setSelectedItem(item);
        setIsModalVisible(true);
    };

    const handleDelete = (record: TableItem) => {
        setInitialData(initialData.filter((item) => item.id !== record.id));
    };

    const handleCreate = (formDto: FormDto) => {
        const newItem: TableItem = {
            id: uuid(),
            ...formDto,
        };
        setInitialData((prev) => [...prev, newItem]);
        setIsModalVisible(false);
    };

    const handleUpdate = (formDto: FormDto) => {
        setInitialData((prev) => {
            return prev.reduce((acc: TableItem[], currentValue) => {
                if (currentValue.id === selectedItem.id) {
                    const updatedItem: TableItem = {
                        id: selectedItem.id,
                        ...formDto,
                    };
                    return [...acc, updatedItem];
                }
                return [...acc, currentValue];
            }, []);
        });
        setSelectedItem(null);
        setIsModalVisible(false);
    };

    const handleSave = async (formDto: FormDto) => {
        setFilteredData(null);
        const isElementSelected = !!selectedItem;
        return isElementSelected ? handleUpdate(formDto) : handleCreate(formDto);
    };

    const handleSearch = (searchTerm: string) => {
        if (!searchTerm) {
            setFilteredData(null);
        }
        const regex = new RegExp(searchTerm, 'i');
        const preparedFilteredData = initialData.filter(({ name, value, date }) =>
            Object.values({ name, value, date }).find((value) => regex.test(value.toString())),
        );
        setFilteredData(preparedFilteredData);
    };

    const columns = [
        {
            title: 'Имя',
            dataIndex: 'name',
            key: 'name',
            sorter: (a: TableItem, b: TableItem) => a.name.localeCompare(b.name),
        },
        {
            title: 'Дата',
            dataIndex: 'date',
            key: 'date',
            sorter: ({ date: firstDate }: TableItem, { date: secondDate }: TableItem) =>
                firstDate.unix() - secondDate.unix(),
            render: (value: Dayjs) => value.format('DD.MM.YYYY'),
        },
        {
            title: 'Числовое значение',
            dataIndex: 'value',
            key: 'value',
            sorter: (a: TableItem, b: TableItem) => a.value - b.value,
        },
        {
            title: 'Действия',
            dataIndex: 'actions',
            key: 'actions',
            render: (_: never, record: TableItem) => (
                <TableRowActions>
                    <Button type="link" onClick={() => handleDelete(record)}>
                        Удалить
                    </Button>
                    <Button type="link" onClick={() => handleEdit(record)}>
                        Редактировать
                    </Button>
                </TableRowActions>
            ),
        },
    ];

    return (
        <TableComponentWrapper>
            <TableHeader>
                <SearchBar onSearch={handleSearch} />
                <Button type="primary" onClick={handleAdd}>
                    Добавить
                </Button>
            </TableHeader>
            <Table rowKey="id" dataSource={filteredData ?? initialData} columns={columns} />
            <ModalWindow
                formData={selectedItem}
                onCancel={onModalClose}
                onSubmit={handleSave}
                isOpen={isModalVisible}
            />
        </TableComponentWrapper>
    );
};
