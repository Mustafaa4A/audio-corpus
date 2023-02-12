import { CropSquare, KeyboardVoice } from '@mui/icons-material'
import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import Wrap from '../components/Wrap'

const Contribute = () => {
  return (
    <Wrap>
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems:'center'
      }}>
        <Box sx={{
          backgroundColor: 'white',
          boxShadow: 10,
          height:'250px',
          maxWidth: '700px',
          padding: 5,
          borderRadius: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems:'center'
        }}>
          <Typography  sx={{
            textAlign: 'center',
            fontWeight:'bold',
            fontSize: {
              md: 23,
            }
          }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. A velit alias voluptates ipsum suscipit consequatur, quaerat voluptatibus sit laboriosam, vitae recusandae illum veniam facere doloremque non harum minima soluta. Quas.
          </Typography>
        </Box>
        <Box sx={{
          backgroundColor: 'white',
          mt: 4,
          boxShadow: 5,
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
        }}>
          <KeyboardVoice sx={{
            fontSize: 30,
            color:'red'
          }} />
        </Box>
        <Box sx={{
          backgroundColor: 'white',
          mt: 4,
          boxShadow: 5,
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
        }}>
          <CropSquare sx={{
            fontSize: 30,
            color:'red'
          }} />
        </Box>
      </Box>
    </Wrap>
  )
}

export default Contribute