import { Check, Clear, KeyboardDoubleArrowRight, KeyboardVoice, PlayArrow, Stop } from '@mui/icons-material'
import { Box, Button, Typography } from '@mui/material'
import { collection, deleteDoc, doc, getDocs, query, updateDoc, where } from 'firebase/firestore'
import { deleteObject, ref } from 'firebase/storage'
import React, { useEffect, useRef, useState } from 'react'
import { LineWave } from 'react-loader-spinner'
import { db, storage } from '../utils/firebase-config'
import AudioControl from './AudioControl'
import BackArrow from './BackArrow'
import TextDisplay from './TextDisplay'
import VerifyBtn from './VerifyBtn'
import Waiting from './Waiting'

const Listen = ({ onClose }) => {
  const [playing, setPlaying] = useState(false);
  const audiRef = useRef();
  const [processing, setProcessing] = useState(false);
  const [transcription, setTranscriptions] = useState();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const AudioTansCollectionRef = collection(db, "metadata");

  const playAudio = () => {
    if (transcription) {
      setPlaying(true);
      audiRef.current.play();
    }
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


  const sucessVerify = async () => {
    setProcessing(true);
    try {
      const document = await doc(db, 'metadata', transcription.id);
      await updateDoc(document, { verified: true });
      loadData();
      setProcessing(false);
    } catch (error) {
      console.log(error.message);
      setProcessing(false);
    }
  }

  const errorVerify = async () => {
    setProcessing(true);
    try {
      // update the transcriptyion
      const transDoc = await doc(db, 'transcriptions', transcription.id);
      await updateDoc(transDoc, { recorded: false });

      // delete metadata
      const metaDoc = await doc(db, 'metadata', transcription.id);
      await deleteDoc(metaDoc);

      // delete file
      const audioRef = ref(storage, transcription.audio_path);
      await deleteObject(audioRef);
      
      loadData();
      setProcessing(false);
    } catch (error) {
      console.log(error.message);
      setProcessing(false);
    }
  }

  const loadData = async () => {
    setLoading(true);
    const qu = await query(AudioTansCollectionRef, where("verified", "==", false));
    const docsRef = await getDocs(qu);
    await setData(docsRef.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    setLoading(false);
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
        pt: 12,
        px:2
      }}>
        {processing && <Waiting />}
        <Typography variant='h6' color='white' pb='2' >
          Tap <PlayArrow sx={{  fontSize: 35,color:'#5bc0de' }} />to listen
        </Typography>
        
        <TextDisplay>
          {
           (!data.length && !loading) ? (
              "Sorry!. No statement availiable for recording now.."
            ): (
              transcription ? transcription?.transcription : <LineWave />
            )
          }
        </TextDisplay>
        
        <video src={transcription?.audio_url} ref={audiRef} onEnded={(onEndAudio)} hidden />
        
        <Box
          sx={{
            display: 'flex',
            gap: 4, mt: 4,
            justifyContent: 'center',
            alignItems: 'end'
          }}
        >
          <VerifyBtn color='error' disabled={!transcription || playing}
            onClick={errorVerify}>
            <Clear sx={{
              fontSize: 35,
              color:'white'
            }} /> 
          </VerifyBtn>
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
          <VerifyBtn color='success' disabled={!transcription || playing}
            onClick={sucessVerify}>
            <Check sx={{
              fontSize: 35,
              color:'white'
            }} />
          </VerifyBtn>
        
        </Box>
          <Box
          sx={{
            p: 1.2,
            px: 5,
            border: '1px solid white',
            position: 'absolute',
            bottom: 5,
            right:2,
            display: 'flex',
            justifyContent: 'center',
            borderRadius: '15px',
            cursor:'pointer'
          }}
          onClick={generateTrans}
        >
          <KeyboardDoubleArrowRight sx={{fontSize:30}} />
        </Box>
      </Box>
    </>
  )
}

export default Listen;
