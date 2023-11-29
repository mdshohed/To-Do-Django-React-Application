import axios from 'axios';
import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';

const User = () => {
  const [records, setRecords] = useState([])
  const [filterRecords, setFilterRecords] = useState([])

  const customStyles={
    headRow:{
      style: {
        backgroundColor: 'blue',color:'white'
      }
    },
    headCells: {
      style: {
        fontSize: '16px',fontWeight: '600',textTransform: 'uppercase',
      }
    },
    cells:{
      style: {
        fontSize: '15px'
      }
    }
  }
  const column = [
    {
      name: "ID",
      selector: row => row.id,
      sortable: true
    },
    {
      name:"Name",
      selector: row => row.name,
      sortable: true
    },
    {
      name:"Email",
      selector: row => row.email,
      sortable: true
    },
    {
      name:"city",
      selector: row => row.address.city,
      sortable: true
    },
    {
      name: "Action",
     
    }
  ]
  useEffect(()=>{
    const fetData = async ()=>{
      axios.get('https://jsonplaceholder.typicode.com/users')
      .then(res=>
        {setRecords(res.data)
        setFilterRecords(res.data)}
        )
      .catch(err=>console.log(err))
    }
    fetData()
  },[])

  const handleFilter = (e) =>{
    const newData = filterRecords.filter(row => row.name.toLowerCase().includes(e.target.value.toLowerCase()))
    setRecords(newData);
  }
  return (
    <div style={{padding: "50px 10%", background: "gray"}} >
      <div>
        <input onChange={handleFilter} className='py-2' type="text" placeholder='Search...'></input>
      </div>
      <DataTable
        columns={column}
        data={records}
        customStyles={customStyles}
        pagination
        selectableRows
        fixedHeader
        fixedHeaderScrollHeight='400px'
        highlightOnHover
      >
        
      </DataTable>
    </div>
  );
};

export default User;