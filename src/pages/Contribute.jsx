import { ArrowBack,  CropSquare, KeyboardVoice } from '@mui/icons-material'
import { Modal, Box, Button, Typography } from '@mui/material';
import React, { useState } from 'react'
import AudioControl from '../components/AudioControl'
import BackArrow from '../components/BackArrow';
import TextDisplay from '../components/TextDisplay'
import Wrap from '../components/Wrap'

const Contribute = () => {
  const [open, setOpen] = useState(false);

  const handleModel = () => setOpen(prev => !prev);

  return (
    <Wrap>
      <Button onClick={handleModel}>Open modal</Button>
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

            <Typography sx={{color:'white', fontSize:20}}>
                Click  <KeyboardVoice sx={{color:'red' }} /> to begin recording
            </Typography>
            {/* <Typography sx={{color:'white', fontSize:20}}>
                Click  <CropSquare sx={{color:'red' }} /> to save
            </Typography> */}

            
            <TextDisplay>
                Markii maxkamadii lakeenay ayuu diiday af-celiyihii ay dowladu u qabatay doortayna mid uu yaqaanay oo uu moodayay inuusanba jirin qof qudha oo ka badiya afka-ingiriiska. 
            </TextDisplay>

            <AudioControl>
              <KeyboardVoice sx={{
                fontSize: 30,
                color:'red'
              }} />
            </AudioControl>

          {/* <AudioControl>
            <CropSquare sx={{
              fontSize: 30,
              color:'red'
            }} />
          </AudioControl> */}
            
          </Box>

          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            m:3,
            float: {
              md:'right'
            }
          }}>
            <Button variant="contained" color="error" sx={{
              p: 2,
              px: 4,
              mb: 2,
              color:'black',
              backgroundColor:'white'
            }}>
              generate
            </Button>
            <Button variant="contained" color='success' disabled sx={{
              p: 2,
              px: 4,
              mb: 3,
            }}>
              Submit
            </Button>
          </Box>
          
        </>
      </Modal>
    </Wrap>
  )
}

export default Contribute