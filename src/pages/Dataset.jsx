import { FileUpload, Upload } from '@mui/icons-material';
import { Box, Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React, { useState } from 'react'

import Wrap from '../components/Wrap';
import data from '../data';

const Dataset = () => {
  const [show, setShow] = useState(false);
  const [rows, setRows] = useState([]);
  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'text', headerName: 'Text', width: 800 },
  ];

  const [file, setFile] = useState();
  const fileReader = new FileReader();

  const handleOnChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (file) {
        fileReader.onload = function (event) {
          const data = event.target.result;
          const buffer = data.toString();
          const arr = buffer.split('\n');
          const headers = ['id', 'text'];

          const objDate = [];
          for (let i = 1; i < arr.length; i++) {
            const item = arr[i].split(',');
            let obj = {};
            for (var j = 0; j < item.length; j++) {
              const column = headers[j];
              const element = item[j].trim();
              obj[column] = element;
            }
             objDate.push(obj);
          }
          setRows(objDate);
        };
        fileReader.readAsText(file);
        setShow(true);
    }
  };

  return (
    <Wrap>
      <Box sx={{float: 'right', mr:{md:12}}}>
        <form action="" >
        <Button variant='contained' component="label" sx={{m:2}}>
          <input
          type={"file"}
          id={"csvFileInput"}
          accept={".csv"}
          onChange={handleOnChange}
          hidden
          />
          <Upload />
          Upload
        </Button>
        <Button disabled={!file?true:false} variant='contained' onClick={handleOnSubmit} sx={{m:2}}>
          Display
        </Button>
     </form>
      </Box>
      
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
        <h1>Upload Dataset</h1>
        {
          show && (
            <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
            checkboxSelection
        />
          )
        }
      </Box>
      <Button disabled={!file?true:false} color='success' variant='contained' onClick={()=>{}}
      sx={{
        display:'block',
        px:12,
        py:2,
        borderRadius:'30px',
        ml:{
          md:'auto'
        },
        mt:3,
        mr:{
          md:15
        }
      }}
      >
          Submit
      </Button>
    </Wrap>
  )
}

export default Dataset;
