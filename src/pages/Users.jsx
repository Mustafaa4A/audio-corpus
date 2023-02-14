import { Box } from '@mui/system';
import { DataGrid } from '@mui/x-data-grid';
import { collection } from 'firebase/firestore';
import React, { useState } from 'react'
import Wrap from '../components/Wrap';
import { db } from '../utils/firebase-config';

const Users = () => {
  const usersCollectionRef = collection(db, "users");
  const [users, setUsers] = useState([]);
  
  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'text', headerName: 'Text', width: 800 },
  ];

  return (
    <Wrap>
       <Box
        sx={{
          width: '100%',
          px: {
            md:15
          },
          height: '100vh',
          color: 'black',
          margin: 'auto',
          mb:15
        }}
      >
        {/* <h1>Upload Dataset</h1>
            <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
            checkboxSelection
        /> */}
      </Box>
    </Wrap>
  )
}

export default Users