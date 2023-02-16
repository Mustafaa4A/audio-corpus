import { Box } from '@mui/material'
import React from 'react'
import { TailSpin } from 'react-loader-spinner'

const Waiting = () => {
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      width: '100%',
      height: '100vh',
      zIndex: '99',
      pb:30
    }}>
        <TailSpin
        color='red'
        height="100"
        width="100"
        />
    </Box>
)
}

export default Waiting