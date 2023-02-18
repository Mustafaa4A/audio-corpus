import { Box, Link, Typography } from '@mui/material'
import React from 'react'
import Wrap from '../components/Wrap'
import Navigation from '../components/Navigation'
const Http404 = () => {
  return (
    <Wrap>
      <Navigation />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '80vh',
          flexDirection:'column'
        }}
      >
        <Typography variant='h3' sx={{}}>
          404 Page Not Found!
        </Typography>
        <Typography sx={{mt:4}}>
          <Link href='/'>Go to home page</Link>
        </Typography>
      </Box>
    </Wrap>
  )
}

export default Http404