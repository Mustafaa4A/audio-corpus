import { Button } from '@mui/material';
import { Box, Typography } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Copyright from '../components/Copyright';
import Wrap from '../components/Wrap'

const font = "'Work Sans', sans-serif";

const theme = createTheme({
  typography: {
    fontFamily: font,
  },
  button: {
    fontFamily: font,
  }
});
const url = 'https://vod-progressive.akamaized.net/exp=1676562360~acl=%2Fvimeo-prod-skyfire-std-us%2F01%2F4314%2F14%2F371571670%2F1542711483.mp4~hmac=0cbe19456d362fdf6ede5ae6f6df4b39e5e25038a148da77ac20e4ede32405ba/vimeo-prod-skyfire-std-us/01/4314/14/371571670/1542711483.mp4';
 
const Home = () => {
  const navigate = useNavigate();
  const isLogin = useSelector(auth => auth.isLogin);
  const user = useSelector(auth => auth.user);

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: '100vh',
          bgcolor: 'rgba(46, 45, 45, 0.5)',
          mb:12
        }}
      >
        <video
          style={{
            position: 'absolute',
            width: '100%',
            objectFit:'cover',
            height: '100vh',
            zIndex: '-99',
          }}
          autoPlay loop muted src={url} />
        
        <Box
          sx={{
            mx: {
              md: '20%',
            
            },
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height:'100vh'
          }}
        >

          <Typography variant='h6' sx={{
            color: 'white',
            textAlign: 'center',
            fontSize: '1.4em',
            
          }}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam, dicta dolor. Delectus ipsum iusto minima dignissimos architecto neque vitae sunt quas iure voluptatem, dicta sint quibusdam, illo provident illum ab.
          </Typography>
          
          {
            isLogin ? (
            <Button size='large' color='warning' sx={{ mx: "auto", width:'100%', p:1.5, mt:5, maxWidth:'400px' }} variant="contained"
                  onClick={() => navigate('/contribute')}>
                  Contribute now!
            </Button>
            ): (
               <Box sx={{mt:5, textAlign:'center'}}>
              <Button size='large' sx={{ marginLeft: "auto" }} variant="contained"
                  onClick={() => navigate('/signin')}>
                  Login
                </Button>
                <Button size='large' sx={{ marginLeft: "10px" }} variant="contained"
                  onClick={() => navigate('/SignUp')}>
                  Sign Up
                </Button>
              </Box>
            )
         }
        </Box>
      </Box>
      <Copyright />
    </ThemeProvider>
  )
}

export default Home