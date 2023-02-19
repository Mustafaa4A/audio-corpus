import { Upload } from '@mui/icons-material';
import { Box, Button } from '@mui/material';
import React, { useState } from 'react'
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../utils/firebase-config';
import Wrap from '../components/Wrap';
import * as XLSX from 'xlsx';
import MUIDataTable from 'mui-datatables';

const TextDataset = () => {
  const [show, setShow] = useState(false);
  const [rows, setRows] = useState([]);
  const columns = [
    { name: 'id', label: 'ID',},
    { name: 'text', label: 'Text'},
  ];

  const [file, setFile] = useState();

  const transCollectionRef = collection(db, "transcriptions");

  const handleOnChange = (e) => {
    setFile(e.target.files[0]);
  };

  const readFile = (e) => {
    e.preventDefault();
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

  const options = {
    search: false,
    download: false,
    print: false,
    filter: false,
    view: false
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
          <Button disabled={!file?true:false} color='success' variant='contained' onClick={submitData}>Submit</Button>
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
            <MUIDataTable
              title='Transcription data'
              data={rows}
              columns={columns}
              options={options}
        />
          )
        }
      </Box>
    </Wrap>
  )
}

export default TextDataset;
