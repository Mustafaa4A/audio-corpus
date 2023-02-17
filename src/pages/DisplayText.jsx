import { Box } from '@mui/material'
import React from 'react'
import Wrap from '../components/Wrap'

const DisplayText = () => {
  return (
    <Wrap>
      <Box sx={{
          width: '100%',
          height: '100vh',
          color: 'black',
          margin: 'auto',
          mb:15
      }}>
        <h1>Transcriptions</h1>
      </Box>
    </Wrap>
  )
}

export default DisplayText;