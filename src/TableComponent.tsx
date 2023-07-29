import React,{useState} from "react";
import {Button,Table} from "antd";
import { SearchBar } from "./SearchBar";
import { EditRowModal } from "./EditRowModal";


export const TableComponent = () => {
    const [tableData,setTableData] = useState<string[]>([]);
    const [searchValue, setSearchValue] = useState<string>("");
    const [isModalVisible, setIsModalVisible] = useState(false);

  const handleAddRow = () => {
    setIsModalVisible(true);
  };

  const handleModalSave = (rowData: string | null) => {
    setIsModalVisible(false);
    if (rowData) {
        setTableData([...tableData, rowData]);
    }
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

    const handleSearch = (value: string) => {
        setSearchValue(value);
      };
      

    const columns = [
        {
        title: "Name",
        dataIndex: "name",
        key: "name",
        },
        {
        title: "Data",
        dataIndex: "data",
        key: "data",
        },
        {
        title: "Number",
        dataIndex: "number",
        key: "Number",
        },
        {
        title: "Action",
        dataIndex: "action",
        key: "action",
        },
    ];

    const dataSource = tableData.map((data,index) => ({
        key:index,
        data,
    })
    )
    const dataSourceFiltered = dataSource.filter((data) =>
  data.data.includes(searchValue)
);

       return(
        <>
        <Button onClick={handleAddRow}>Add row</Button>
        <EditRowModal 
                   visible={isModalVisible}
                   onSave={handleModalSave}
                   onCancel={handleModalCancel} initialValue={""}      />
        <SearchBar onSearch={handleSearch}/>
        <Table dataSource={dataSourceFiltered} columns={columns}></Table>
        </>
       ) 
}