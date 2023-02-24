import { FileDownload } from '@mui/icons-material';
import { Box, Button, Link } from '@mui/material'
import { collection, getDocs } from 'firebase/firestore';
import { getDownloadURL, listAll, ref } from 'firebase/storage';
import JSZip from 'jszip';
import MUIDataTable from 'mui-datatables';
import React, { useEffect, useState } from 'react'
import { LineWave } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';
import Wrap from '../components/Wrap'
import { db, storage } from '../utils/firebase-config';

const AudioDataset = () => {
  const [downloadUrl, setDownloadUrl] = useState('');
  const metadataCollectionRef = collection(db, "metadata");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

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


  useEffect(() => {
    downloadHandler();
  },[data])


  const downloadHandler = async () => {
    try {
      const zip = new JSZip();
      data.map(async (item) => {
        const url = item.audio_url;
        const response = await fetch(url);
        const blob = await response.blob();
        zip.file(item.name, blob);
      })

      // Generate the zip folder and get its content as a Blob
      const content = await zip.generateAsync({ type: 'blob' });

      // Create a URL for the Blob and set it as the download URL
      const url = URL.createObjectURL(content);
      setDownloadUrl(url);
      } catch (error) {
        console.log(error.message);
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
        <Link href={downloadUrl}>
          <Button variant='contained'
          sx={{
            m: 2,
            ml: 'auto',
            display: 'flex',
            justifyContent:'center'
          }}
        >
          <FileDownload /> 
          Download Audio
        </Button>
        </Link>

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