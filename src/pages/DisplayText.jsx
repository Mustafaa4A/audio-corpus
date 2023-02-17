import { Box } from '@mui/material'
import { collection, getDocs } from 'firebase/firestore';
import MUIDataTable from 'mui-datatables';
import React, { useEffect, useState } from 'react'
import { LineWave } from 'react-loader-spinner';
import Wrap from '../components/Wrap'
import { db } from '../utils/firebase-config';

const DisplayText = () => {
  const transCollectionRef = collection(db, "transcriptions");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

   const columns = [
    { name: 'sequence_id', label: 'SEQUENCE ID', },
    { name: 'transcription', label: 'Transcription', },
    {
       name: 'recorded', label: 'Recorded', options:{
         customBodyRender: (value) => value?'Yes':'No'
    }}
  ];

  const loadData = async () => {
    setLoading(true);
    const docsRef = await getDocs(transCollectionRef);
    await setData(docsRef.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    setLoading(false);
  }

  useEffect(() => {
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
            title='Transcriptions Data'
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

export default DisplayText;