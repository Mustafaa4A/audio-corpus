import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid';
import { collection, getDocs } from 'firebase/firestore';
import MUIDataTable from 'mui-datatables';
import React, { useEffect, useState } from 'react'
import Wrap from '../components/Wrap'
import { db } from '../utils/firebase-config';

const AudioDataset = () => {
  const metadataCollectionRef = collection(db, "metadata");
  const [data, setData] = useState([]);

   const columns = [
    { name: 'sequence_id', label: 'ID', },
    { name: 'transcription', label: 'Transcription', },
    { name: 'audio_path', label: 'Audio Path',},
    { name: 'duration_in_seconds', label: 'Duration in seconds',},
    { name: 'person', label: 'Person',options:{}}
  ];

  useEffect(() => {
    const loadData = async () => {
      // const qu = await query(metadataCollectionRef, where("recorded", "==", false));
      const docsRef = await getDocs(metadataCollectionRef);
      await setData(docsRef.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      console.log(data);
    }
    loadData();
    
  }, [])

  const opttions = {
    onCellClick:(e)=>console.log("oooooooo"),
  }

  return (
    <Wrap>
      <Box sx={{
          width: '100%',
          height: '100vh',
          color: 'black',
          margin: 'auto',
          mb:15
        }}>
        {
          data && (
            <MUIDataTable
              title='Audio Corpus'
              data={data}
              columns={columns}
              opttions={opttions}
            />
          )
        }
      </Box>
    </Wrap>
  )
}

export default AudioDataset