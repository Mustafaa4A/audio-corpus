import { DataGrid } from '@mui/x-data-grid';
import React from 'react'

import Wrap from '../components/Wrap';
import data from '../data';

const Dataset = () => {
  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'text', headerName: 'Text', width: 200 },
  ];
  const rows = data;

  return (
    <Wrap>
      <h1>Dataset Table</h1>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </Wrap>
  )
}

export default Dataset;
