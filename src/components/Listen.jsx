import { Check, Clear, KeyboardVoice, PlayArrow, Stop } from '@mui/icons-material'
import { Box, Typography } from '@mui/material'
import { collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore'
import React, { useEffect, useRef, useState } from 'react'
import { LineWave } from 'react-loader-spinner'
import { db } from '../utils/firebase-config'
import AudioControl from './AudioControl'
import BackArrow from './BackArrow'
import TextDisplay from './TextDisplay'
import Waiting from './Waiting'

const Listen = ({ onClose }) => {
  const [playing, setPlaying] = useState(false);
  const audiRef = useRef();
  const [processing, setProcessing] = useState(false);
  const [transcription, setTranscriptions] = useState();
  const [data, setData] = useState([]);

  const AudioTansCollectionRef = collection(db, "metadata");

  const playAudio = () => {
    setPlaying(true);
    audiRef.current.play();
  }

  const pauseAudio = () => {
    setPlaying(false);
    audiRef.current.pause();
  }

  const onEndAudio = () => {
    setPlaying(false);
  }

  const generateTrans = () => {
    const index = parseInt(Math.random() * data.length);
    setTranscriptions(data[index]);
  }


  const submitVerify = async (id, status) => {
    setProcessing(true);
    try {
      const document = await doc(db, 'metadata', id);
      await updateDoc(document, { verified: status });
      loadData();
      setProcessing(false);
    } catch (error) {
      console.log(error.message);
      setProcessing(false);
    }
  }

  const loadData = async () => {
    const qu = await query(AudioTansCollectionRef, where("verified", "==", "unverified"));
    const docsRef = await getDocs(qu);
    await setData(docsRef.docs.map((doc) => ({ ...doc.data(), id: doc.id }))); 
  }

  useEffect(() => {
    loadData();
  },[])

  useEffect(() => {
    generateTrans();
  }, [data])
 


  return (
    <>
    <BackArrow onClick={ onClose } />
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height:'80vh',
        pt: 12,
        px:2
      }}>
        {processing && <Waiting />}
        <Typography variant='h6' color='white' pb='2' >
          Tap <PlayArrow sx={{  fontSize: 35,color:'#5bc0de' }} />to listen
        </Typography>

        
        <TextDisplay> {transcription ? transcription?.transcription : (<LineWave />)} </TextDisplay>
        
        <video src={transcription?.audio_url} ref={audiRef} onEnded={(onEndAudio)} hidden />
        
        <Box sx={{display:'flex', gap:4, mt:4}}>
          <AudioControl disabled={playing}  onClick={()=>submitVerify(transcription.id, 'success')}>
            <Check sx={{
              fontSize: 35,
              color:'#5bc0de'
            }} />
          </AudioControl>
          {
            playing ? (
                <AudioControl onClick={pauseAudio}>
                  <Stop  sx={{
                    fontSize: 40,
                    color:'red'
                  }}/> 
              </AudioControl>
            ): (
                <AudioControl onClick={playAudio}>
                  <PlayArrow sx={{
                    fontSize: 35,
                    color:'green'
                  }} />
                </AudioControl>
            )
          }
          <AudioControl hidden onClick={()=>submitVerify(transcription.id, 'error')}>
            <Clear sx={{
              fontSize: 35,
              color:'#d9534f'
            }} />
          </AudioControl>
        </Box>
        
      </Box>
    </>
  )
}

export default Listen;