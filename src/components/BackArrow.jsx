import { ArrowBack } from '@mui/icons-material'
import { Box } from '@mui/material'
import React from 'react'

const BackArrow = ({onClick}) => {
  return (
    <Box
      sx={{
      backgroundColor: 'white',
        mt: 2,
        ml:2,
        boxShadow: 5,
        width: '60px',
        height: '60px',
        borderRadius: '50%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        position:"absolute"
      }}
      onClick={onClick}
    >
      <ArrowBack sx={{
      fontSize:30
        }} />
    </Box>
  )
}

export default BackArrow