import { CropSquare, KeyboardDoubleArrowRight, KeyboardVoice, PlayArrow, Replay, Stop } from '@mui/icons-material'
import { Modal, Box, Button, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react'
import { useReactMediaRecorder } from 'react-media-recorder';
import useSound from 'use-sound';
import AudioControl from '../components/AudioControl'
import BackArrow from '../components/BackArrow';
import CustomBtn from '../components/CustomBtn';
import TextDisplay from '../components/TextDisplay'
import Wrap from '../components/Wrap'
import data from '../data';

const Contribute = () => {
  const { startRecording, stopRecording, pauseRecording, mediaBlobUrl, clearBlobUrl } = useReactMediaRecorder({
    video: false,
    audio: true,
    echoCancellation: true
  });
  const [play, { stop }] = useSound(mediaBlobUrl);
  const audio = new Audio(mediaBlobUrl);
  const [recording, setRecording] = useState(false);
  const [playing, setPlaying] = useState(false);

  const [open, setOpen] = useState(false);
  const [text, setText] = useState();

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
    audio.play();
  }

  const pauseAudio = () => {
    setPlaying(false);
    audio.pause();
  }

  const clear = () => {
    pauseAudio();
    clearBlobUrl();
  }

  const generateText = () => {
    const id = parseInt(Math.random() * 10);
    setText(data[1].text);
  }

  useEffect(() => {
    generateText();
  },[])

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
          bgcolor: 'blur',
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
            
            <TextDisplay> { text } </TextDisplay>
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
          </Box>

          <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            float: {
              sm:'right'
            },
            m: 3,
          }}>
            <CustomBtn color='success' onClick={generateText}>
              Skip  <KeyboardDoubleArrowRight />
           </CustomBtn>
            <CustomBtn disabled={!mediaBlobUrl}>
              Submit
            </CustomBtn>
          </Box>
        </>
      </Modal>
    </Wrap>
  )
}

export default Contribute