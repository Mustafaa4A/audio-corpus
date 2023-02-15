import { CropSquare, KeyboardDoubleArrowRight, KeyboardVoice, PlayArrow, Replay, Stop } from '@mui/icons-material'
import { Modal, Box, Button, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react'
import { useReactMediaRecorder } from 'react-media-recorder';
import useSound from 'use-sound';
import AudioControl from '../components/AudioControl'
import BackArrow from '../components/BackArrow';
import CustomBtn from '../components/CustomBtn';
import TextDisplay from '../components/TextDisplay';
import Wrap from '../components/Wrap';
import Image from '../assets/bgimage.avif';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../utils/firebase-config';

const Contribute = () => {
  const { startRecording, stopRecording, pauseRecording, mediaBlobUrl, clearBlobUrl } = useReactMediaRecorder({
    video: false,
    audio: true,
    echoCancellation: true,
    blobPropertyBag: { type: "audio/wav" }
  });
  const audiRef = useRef();
  const [recording, setRecording] = useState(false);
  const [playing, setPlaying] = useState(false);

  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [text, setText] = useState({});

  const transCollectionRef = collection(db, "transcriptions");
  // const 

  const handleModel = () => setOpen(prev => !prev);
  const start = () => {
    startRecording();
    setRecording(prev => !prev);
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

  const submitAudio = async () => {
    const audioBlob = await fetch(mediaBlobUrl).then((r) => r.blob());
    const audiofile = new File([audioBlob], `${text.id}.wav`, {
        type: "audio/wav",
    });
    
    const formData = new FormData();
    formData.append('transcription', text);
    formData.append('audio', audiofile);
    formData.append('person', null);
    formData.append('createAt', Date.now());
    console.log(Array.from(formData));
  }

  const generateText = () => {
    const index = parseInt(Math.random() * data.length);
    setText({ id: data[index].id, transcription: data[index].transcription });
    clearBlobUrl();
    setRecording(false);
    setPlaying(false);
  }

  useEffect(() => {
    const loadData = async () => {
      const qu = await query(transCollectionRef, where("recorded", "==", false));
      const docsRef = await getDocs(qu);
      await setData(docsRef.docs.map((doc) => doc.data()));
      await generateText();
    }
    loadData();
  }, [])


  return (
    <Wrap>
      <Box>
        <Button onClick={handleModel}>Open modal</Button>
      </Box>
      
      <Modal
        open={open}
        onClose={handleModel}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          background: `url(${Image})`,
          backgroundSize: 'cover',
          backgroundRepeat:'no-repeat'
        }}
      >
        <>
          <BackArrow onClick={ handleModel } />
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
            
            <TextDisplay> { text?.transcription } </TextDisplay>
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
            <CustomBtn onClick={submitAudio} disabled={!mediaBlobUrl}>
              Submit
            </CustomBtn>
          </Box>
        </>
      </Modal>
    </Wrap>
  )
}

export default Contribute