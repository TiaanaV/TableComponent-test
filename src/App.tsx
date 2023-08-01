import React from 'react';

import { ConfigProvider, Layout } from 'antd';
import ruRU from 'antd/locale/ru_RU';
import styled from 'styled-components';

import 'antd/dist/reset.css';

import { TableComponent } from './components';

const { Content, Footer } = Layout;

const StyledContent = styled(Content)`
    padding: 0 2rem;
`;

const StyledFooter = styled(Footer)`
    text-align: center;
`;

function App() {
    return (
        <ConfigProvider locale={ruRU}>
            <Layout className="layout">
                <StyledContent>
                    <TableComponent />
                </StyledContent>
                <StyledFooter>Tatiana Valanitskaya</StyledFooter>
            </Layout>
        </ConfigProvider>
    );
}

export default App;
