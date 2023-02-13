import { Box } from '@mui/material';
import React from 'react'

const AudioControl = ({children, ...props}) => {
  return (
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
        }} {...props}>
          {children}
        </Box>
  )
}

export default AudioControl;