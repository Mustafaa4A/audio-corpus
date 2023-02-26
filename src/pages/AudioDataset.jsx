import { FileDownload } from '@mui/icons-material';
import { Box, Button, Typography } from '@mui/material'
import { saveAs } from 'file-saver';
import { collection, getDocs } from 'firebase/firestore';
import JSZip from 'jszip';
import MUIDataTable from 'mui-datatables';
import React, { useEffect, useState } from 'react'
import { LineWave } from 'react-loader-spinner';
import Wrap from '../components/Wrap'
import { db } from '../utils/firebase-config';

const AudioDataset = () => {
  const [downloading, setDownloading] = useState(false);
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


  const downloadHandler = async () => {
    setDownloading(true);
    try {
      const zip = new JSZip();
      const waves = zip.folder('waves');

      const res = await Promise.all(
        data.map(async (item) => {
          const url = item.audio_url;
          const audioBlob = await fetch(url).then((r) => r.blob());
          waves.file(`${item.sequence_id}.wav`, audioBlob)
        })
      );
      
      const content = await zip.generateAsync({ type: 'blob' });
      await saveAs(content, 'waves.zip')
      setDownloading(false);
      } catch (error) {
        console.log(error.message);
        setDownloading(false);
      }
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

        {downloading ? (
          <Typography sx={{
            m: 2,
            ml: 'auto',
            display: 'flex',
            justifyContent: 'center',
            fontSize:'2em'
            }}>downloading...</Typography>
        ) : (
          <Button variant='contained' onClick={downloadHandler}
              sx={{
                m: 2,
                ml: 'auto',
                display: 'flex',
                justifyContent: 'center'
              }}
            >
              <FileDownload />
              Download Audio
            </Button>
          )
        }
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