import { Check, Clear, KeyboardVoice, PlayArrow, Stop } from '@mui/icons-material'
import { Box } from '@mui/material'
import { doc, updateDoc } from 'firebase/firestore'
import React, { useEffect, useRef, useState } from 'react'
import { db } from '../utils/firebase-config'
import AudioControl from './AudioControl'
import BackArrow from './BackArrow'
import TextDisplay from './TextDisplay'
import Waiting from './Waiting'

const Listen = ({ onClose, data }) => {
  const [playing, setPlaying] = useState(false);
  const audiRef = useRef();
  const [processing, setProcessing] = useState(false);
  const [transcription, setTranscriptions] = useState();

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
      generateTrans();
      setProcessing(false);
    } catch (error) {
      console.log(error.message);
      setProcessing(false);
    }
  }

  useEffect(() => {
    generateTrans();
  }, [])
 


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
        <TextDisplay> 
          {transcription ? (
            transcription.transcription 
          ): (
              "Sorry, Somethingn went wrong.. There is no text to listen"
          )}
        </TextDisplay>
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
          <AudioControl disabled={playing} onClick={()=>submitVerify(transcription.id, 'error')}>
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