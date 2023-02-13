import { ArrowBack,  CropSquare, KeyboardDoubleArrowRight, KeyboardVoice } from '@mui/icons-material'
import { Modal, Box, Button, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import AudioControl from '../components/AudioControl'
import BackArrow from '../components/BackArrow';
import CustomBtn from '../components/CustomBtn';
import TextDisplay from '../components/TextDisplay'
import Wrap from '../components/Wrap'
import data from '../data';

const Contribute = () => {
  const [open, setOpen] = useState(false);
  const [recording, setRecording] = useState(false);
  const [text, setText] = useState();

  const handleModel = () => setOpen(prev => !prev);
  const handleRecord = () => setRecording(prev => !prev);

  const generateText = () => {
    const id = parseInt(Math.random() * 10);
    setText(data[id].text);
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
              (!recording) ? (
                <AudioControl onClick={handleRecord}>
                  <KeyboardVoice sx={{
                  fontSize: 30,
                  color:'red'
                 }} />
              </AudioControl>
              ) : (
                <AudioControl onClick={handleRecord}>
                  <CropSquare sx={{
                  fontSize: 30,
                  color:'red'
            }} />
            </AudioControl>
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
            <CustomBtn disabled>
              Submit
            </CustomBtn>
          </Box>
          
        </>
      </Modal>
    </Wrap>
  )
}

export default Contribute