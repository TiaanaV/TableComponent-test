// eslint-disable-next-line import/no-extraneous-dependencies
import { Dayjs } from 'dayjs';

export interface FormDto {
    value: number;
    name: string;
    date: Dayjs;
}
