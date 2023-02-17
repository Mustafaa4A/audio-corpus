import { Box, Grid, Typography } from '@mui/material';
import React from 'react'
import { useNavigate } from 'react-router-dom'
import Wrap from '../components/Wrap';

const Dataset = () => {
  const navigate = useNavigate();
  return (
    <Wrap>
      <Box sx={{ display: 'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
        <Grid container>
          <Grid item xs={12} sm={5}
            onClick={()=>navigate('text')}
            sx={{
              maxWidth:'200px',
              minHeight: '150px',
              bgcolor: '#657',
              display: 'flex',
              justifyContent: 'center',
              alignItems:'center',
              color: 'white',
              borderRadius: '20px',
              cursor: 'pointer',
              m: 2
            }} >
          <Typography variant='h5'>Upload Text</Typography>
          </Grid>
          
          <Grid item xs={12} sm={5}
            onClick={()=>navigate('text/display')}
            sx={{
              maxWidth:'200px',
              minHeight: '150px',
              bgcolor: '#657',
              display: 'flex',
              justifyContent: 'center',
              alignItems:'center',
              color: 'white',
              borderRadius: '20px',
              cursor: 'pointer',
              m: 2
            }} >
          <Typography variant='h5'>Display Text</Typography>
        </Grid>

          <Grid item xs={12} sm={5}
            onClick={()=>navigate('audio')}
            sx={{
                maxWidth:'200px',
                minHeight: '150px',
                bgcolor: '#657',
                display: 'flex',
                justifyContent: 'center',
                alignItems:'center',
                color: 'white',
                borderRadius: '20px',
                cursor: 'pointer',
                m:2
            }}>
          <Typography variant='h5'>Display Dataset</Typography>
        </Grid>
        
      </Grid>
      </Box>
    </Wrap>
  )
}

export default Dataset