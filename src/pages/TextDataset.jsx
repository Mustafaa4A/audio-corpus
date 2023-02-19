import { Upload } from '@mui/icons-material';
import { Box, Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React, { useState } from 'react'
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../utils/firebase-config';
import Wrap from '../components/Wrap';
import * as XLSX from 'xlsx';

const TextDataset = () => {
  const [show, setShow] = useState(false);
  const [rows, setRows] = useState([]);
  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'text', headerName: 'Text', width: 800 },
  ];

  const [file, setFile] = useState();
  const fileReader = new FileReader();

  const transCollectionRef = collection(db, "transcriptions");

  const handleOnChange = (e) => {
    setFile(e.target.files[0]);
  };

  const readFile = (e) => {
    e.preventDefault();
    const name = file.name;
    const reader = new FileReader();
    reader.onload = (e) => {
      const bstr = e.target.result;
      const wb = XLSX.read(bstr, { type: 'binary' });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const data = XLSX.utils.sheet_to_json(ws, { header: 1 });

      const objDate = [];
      for (let i = 1; i < data.length; i++){
        let obj = {};
        obj['id'] = data[i][0];
        obj['text'] = data[i][1];
        if (obj.id || obj.text) {
          objDate.push(obj);
        }
      }
      console.log(objDate);
      setRows(objDate);
    }
    reader.readAsBinaryString(file);
    setShow(true);
  };

  const submitData = async () => {
    console.log(rows[0]);
    try {
      for (const item of rows) {
        await addDoc(transCollectionRef,
          { sequence_id: item.id, transcription: item.text, recorded: false });
        setFile(null);
        setRows([]);
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <Wrap>
      <Box sx={{float: 'right', mr:{md:12}}}>
        <form action="" >
        <Button variant='contained' component="label" sx={{m:2}}>
          <input
          type={"file"}
          id={"csvFileInput"}
          accept={".xlsx"}
          onChange={handleOnChange}
          hidden
          />
          <Upload />
          Upload
        </Button>
        <Button disabled={!file?true:false} variant='contained' onClick={readFile} sx={{m:2}}>
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
      <Button disabled={!file?true:false} color='success' variant='contained' onClick={submitData}
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

export default TextDataset;
