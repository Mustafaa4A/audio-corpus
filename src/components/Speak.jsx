import { CropSquare, KeyboardDoubleArrowRight, KeyboardVoice, PlayArrow, Replay, Stop } from '@mui/icons-material'
import { Modal, Box, Button, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react'
import { useReactMediaRecorder } from 'react-media-recorder';
import AudioControl from './AudioControl'
import BackArrow from './BackArrow';
import CustomBtn from './CustomBtn';
import TextDisplay from './TextDisplay';
import { addDoc, collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { db, storage } from '../utils/firebase-config';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { Bars } from 'react-loader-spinner';
import { useSelector } from 'react-redux';
import Waiting from './Waiting';

const Speak = ({ onClose, data }) => {
  const [uploading, setUploading] = useState(false);
  const { startRecording, stopRecording, pauseRecording, mediaBlobUrl, clearBlobUrl } = useReactMediaRecorder({
    video: false,
    audio: true,
    echoCancellation: true,
    blobPropertyBag: { type: "audio/wav" },
    askPermissionOnMount: true
  });
  const audiRef = useRef();
  const [recording, setRecording] = useState(false);
  const [playing, setPlaying] = useState(false);

  const [text, setText] = useState({});

  
  const metadataCollectionRef = collection(db, "metadata");
  
  const user = useSelector(auth => auth.user);

  
  const start = async () => {
    navigator.permissions.query({ name: 'microphone' }).then(({ state }) => {
      if (state === 'granted') {
        startRecording();
        setRecording(prev => !prev);
      }
    })
  };

  const stopRecord = () => {
    pauseRecording();
    stopRecording();
    setRecording(prev => !prev);
  };

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

  const clear = () => {
    pauseAudio();
    clearBlobUrl();
  }

  const submit = async () => {
    setUploading(true);
    const audioBlob = await fetch(mediaBlobUrl).then((r) => r.blob());
    const audiofile = new File([audioBlob], `${text.sequence_id}.wav`, {
      type: "audio/wav",
    });

    const trans = {
      sequence_id: text.sequence_id,
      transcription: text.transcription,
      person: user.displayName,
      audio_name: text.sequence_id,
      audio_path: `waves/${text.sequence_id}.wav`,
      audio_url: '',
      duration_in_seconds: audiRef.current.duration,
      verified: 'unverified',
      createdAt: Date.now()
    }

    const audioRef = ref(storage, trans.audio_path);
    try {
      uploadBytes(audioRef, audiofile).then((file) => {
        getDownloadURL(file.ref).then(async (url) => {
          trans.audio_url = url;
          await addDoc(metadataCollectionRef, trans);
          await updateTrans(text.id);
          generateText();
          setUploading(false);
        })
      })
    } catch (error) {
      console.log(error.message);
    }
  }

  const updateTrans = async (id) => {
    try {
      const document = await doc(db, 'transcriptions', id);
      await updateDoc(document, { recorded: true });
    } catch (error) {
      console.log(error.message);
    }
  }

  const generateText = () => {
    const index = parseInt(Math.random() * data.length);
    setText(data[index]);
    reset();
    console.log(data[index]);
  }

  const reset = () => {
    clearBlobUrl();
    setRecording(false);
    setPlaying(false);
  }

  useEffect(() => {
    generateText();
  }, []);

  return (
    <>
      {uploading && (
        <Waiting />
      )}
      <BackArrow onClick={ onClose } />
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        pt: 12,
        px:2
      }}>
        {
          (!recording) ? (
          <Typography sx={{color:'white', fontSize:20}}>
            Click  <KeyboardVoice sx={{color:'red' }} /> to begin recording
          </Typography>
          ) : (
            <Typography sx={{color:'white', fontSize:20}}>
              Click  <CropSquare sx={{color:'red' }} /> to save
            </Typography>
          )
        }
        
        <TextDisplay> {text ? text?.transcription : (
          "No text"
        )} </TextDisplay>
        <Box sx={{
          position: 'absolute',
          top: 15,
        }} hidden={(!recording)}>
          <Bars color='#fa4bf4'/>
        </Box>
        {
          (!mediaBlobUrl) ? (
            (!recording) ? (
              <AudioControl onClick={start}>
                <KeyboardVoice sx={{
                  fontSize: 30,
                  color:'red'
                }} />
              </AudioControl>
            ) : (
              <AudioControl onClick={stopRecord}>
                <CropSquare sx={{
                  fontSize: 30,
                  color:'red'
                }} />
              </AudioControl>
            )
          ) : (
            <Box sx={{ display: 'flex', gap: 5 }}>
            <AudioControl disabled={playing} onClick={clear} >
              <Replay sx={{
                  fontSize: 40,
                  color:'red'
                }} />
            </AudioControl>
              {
                (playing) ? (
                  <AudioControl onClick={pauseAudio}>
                    <Stop  sx={{
                    fontSize: 40,
                      color:'red'
                    }} /> 
                  </AudioControl>
                    ) : (
                  <AudioControl  onClick={playAudio}>
                    <PlayArrow  sx={{
                    fontSize: 40,
                      color:'green'
                        }} /> 
                  </AudioControl>
                  ) 
                }
          </Box>
          )
        }
        <video src={mediaBlobUrl} ref={audiRef} onEnded={onEndAudio} hidden/>
      </Box>

      <Box sx={{
        display: 'flex',
        flexDirection: 'row',
        float: {
          sm:'right'
        },
        m: 3,
      }}>
        <CustomBtn disabled={mediaBlobUrl || recording}  color='success' onClick={generateText}>
          Skip  <KeyboardDoubleArrowRight />
        </CustomBtn>
        <CustomBtn onClick={submit} disabled={!mediaBlobUrl}>
          Submit
        </CustomBtn>
        
      </Box>
    </>
  )
}

export default Speak;