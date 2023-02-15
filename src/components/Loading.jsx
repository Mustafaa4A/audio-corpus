import { Box } from '@mui/material'
import React from 'react'
import { BallTriangle } from 'react-loader-spinner'

const Loading = () => {
  return (
    <Box
      sx={{
        width:'100%',
        height:'90vh',
        display: 'flex',
        flexDirection:'column',
        justifyContent: 'center',
        alignItems: 'center',
        overflow:'hidden'
      }}
    >
      <BallTriangle
        height={100}
        width={100}
        radius={5}
        color="#4fa94d"
        ariaLabel="ball-triangle-loading"
        wrapperClass={{}}
        wrapperStyle=""
        visible={true}
      />
    </Box>
  )
}

export default Loading