import { Box, Typography } from '@mui/material'
import React from 'react'

const TextDisplay = ({children}) => {
  return (
    <Box sx={{
      backgroundColor: 'white',
      boxShadow: 10,
      height:'250px',
      maxWidth: '700px',
      padding: 5,
      borderRadius: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      my:1
        }}>
          <Typography  sx={{
            textAlign: 'center',
            fontWeight:'bold',
            fontSize: {
              md: 23,
            }
      }}>
        {children}
          </Typography>
        </Box>
  )
}

export default TextDisplay