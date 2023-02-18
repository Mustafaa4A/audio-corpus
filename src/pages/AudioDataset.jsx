import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid';
import { collection, getDocs } from 'firebase/firestore';
import MUIDataTable from 'mui-datatables';
import React, { useEffect, useState } from 'react'
import { LineWave } from 'react-loader-spinner';
import Wrap from '../components/Wrap'
import { db } from '../utils/firebase-config';

const AudioDataset = () => {
  const metadataCollectionRef = collection(db, "metadata");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

   const columns = [
    { name: 'sequence_id', label: 'ID', },
    { name: 'transcription', label: 'Transcription',options:{filter:false} },
    { name: 'audio_path', label: 'Audio Path',options:{filter:false}},
    { name: 'duration_in_seconds', label: 'Duration in seconds',},
    { name: 'person', label: 'Person', options: {} },
    {
       name: 'verified', label: 'Verified', options:{
         customBodyRender: (value) => value?'Yes':'No'
    }}
  ];

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const docsRef = await getDocs(metadataCollectionRef);
      await setData(docsRef.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setLoading(false);
    }
    loadData();
    
  }, [])

 
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
          !loading ? (
            <MUIDataTable
              title='Audio Corpus'
              data={data}
              columns={columns}
            />
          ) : (
              <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                height: '80vh',
                justifyContent: 'center',
                alignItems:'center'
              }}>
                <LineWave />
              </Box>
          )
        }
      </Box>
    </Wrap>
  )
}

export default AudioDataset