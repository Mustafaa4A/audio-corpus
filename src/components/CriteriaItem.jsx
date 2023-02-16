import { Avatar } from '@mui/material'
import { Typography } from '@mui/material'
import { Box } from '@mui/material'
import React from 'react'

const CriteriaItem = ({children, number, title}) => {
  return (
    <Box sx={{mb:5}}>
      <Box sx={{display:'flex', gap:1, alignItems:'center', mb:1}}>
          <Avatar sx={{ bgcolor: '#456', width: 40, height: 40 }}>{ number || 1 }</Avatar> 
          <Typography variant='h6' fontWeight={'bold'}>{ title }</Typography>
      </Box>
      <Typography sx={{
        fontSize: '1.1em',
        textAlign: 'justify',
        ml: {
          md:4
        }
      }}>
       {children}
    </Typography>
    </Box>
  )
}

export default CriteriaItem