import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid';
import { collection, getDocs } from 'firebase/firestore';
// import MaterialTable from 'material-table';
import React, { useEffect, useState } from 'react'
import Wrap from '../components/Wrap'
import { db } from '../utils/firebase-config';

const AudioDataset = () => {
  const metadataCollectionRef = collection(db, "metadata");
  const [data, setData] = useState([]);

   const columns = [
    { field: 'sequence_id', title: 'ID', width: 100 },
    { field: 'transcription', title: 'Transcription', width: 600 },
    { field: 'audio_path', title: 'audio path', width: 100 },
    { field: 'duration_in_seconds', title: 'Duration in seconds', width: 150 },
    { field: 'person', title: 'Person', width: 100 },
    { field: 'action', title: 'Play', width: 100 },
  ];

  // useEffect(() => {
  //   const loadData = async () => {
  //     // const qu = await query(metadataCollectionRef, where("recorded", "==", false));
  //     const docsRef = await getDocs(metadataCollectionRef);
  //     await setData(docsRef.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  //     console.log(data);
  //   }
  //   loadData();
    
  // }, [])

  return (
    <Wrap>
      <Box sx={{
          width: '100%',
          height: '100vh',
          color: 'black',
          margin: 'auto',
          mb:15
        }}>
        <h1>Welcome</h1>
        
       {/* {
          data && (
            <DataGrid
            rows={data}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
            checkboxSelection
        />
          )
        } */}
        {/* <MaterialTable
          columns={columns}
          data={data}
        /> */}
        
      </Box>
    </Wrap>
  )
}

export default AudioDataset