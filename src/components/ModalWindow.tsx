import React from 'react';

import { Modal } from 'antd';

import { FormDto } from '../types/form.dto';

import { ModalForm } from './ModalForm';

interface ModalWindowProps {
    isOpen: boolean;
    onSubmit: (data: FormDto) => void;
    onCancel: () => void;
    formData?: FormDto;
}

export const ModalWindow: React.FC<ModalWindowProps> = ({ formData, onSubmit, isOpen, onCancel }) => {
    const handleSubmit = (formDto: FormDto) => {
        onSubmit(formDto);
    };

    return (
        <Modal open={isOpen} footer={null} onCancel={onCancel} destroyOnClose>
            <ModalForm handleSubmit={handleSubmit} onCancel={onCancel} formData={formData} />
        </Modal>
    );
};
