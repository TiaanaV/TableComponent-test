import React,{useState} from "react";
import {Button,Table} from "antd";
import { SearchBar } from "./SearchBar";
import { EditRowModal } from "./EditRowModal";

interface Data {
    key: string;
    number: number;
    name: string;
    date: Date;
    action: string;
    }

  const defaultData: Data[] = [
    {
    key: "1",
    number: 1,
    name: "John Doe",
    date: new Date(1632448800000),
    action: "Edit"
    },
    {
    key: "2",
    number: 2,
    name: "Jane Smith",
    date: new Date(1632693600000),
    action: "Delete"
    },
    ]


export const TableComponent = () => {
    const [tableData,setTableData] = useState<Data[]>(defaultData);
    //const [searchValue, setSearchValue] = useState<string>("");
    const [showModal, setShowModal] = useState(false);

    const handleAddRow = () => {
        setShowModal(true);
      };

    const handleCancelEdit = () => {
        setShowModal(false);
      };

  const handleAddData = (data: Data) => {
    debugger
    console.log(tableData)
    setTableData([...tableData, data]);
    setShowModal(false);
  };

    // const handleSearch = (value: string) => {
    //     setSearchValue(value);
    //   };
      

    const columns = [
        {
        title: "Name",
        dataIndex: "name",
        key: "name",
        editable: true,
        },
        { 
        title: "Date",
        dataIndex: "date",
        key: "date",
        editable: true,
        },
        {
        title: "Number",
        dataIndex: "number",
        key: "Number",
        editable: true,
        },
        {
        title: "Action",
        dataIndex: "action",
        key: "action",
        editable: true,
        },
    ];

    
//    const dataSourceFiltered = dataSource.filter((data) =>
//   data.data.includes(searchValue)
// );  - поиск и сортировка

       return(
        <>
        <Button onClick={handleAddRow}>Add row</Button>
        {showModal && <EditRowModal onAdd={handleAddData} onCancel={handleCancelEdit} />}
       {/* // <SearchBar onSearch={handleSearch}/> */}
        <Table dataSource={tableData} columns={columns}></Table>
        </>
       ) 
}