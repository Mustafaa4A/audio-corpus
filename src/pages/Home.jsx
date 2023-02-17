import { Button } from '@mui/material';
import { Box, Typography } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Copyright from '../components/Copyright';
import Wrap from '../components/Wrap';
import bg from '../assets/bg.mp4';

const font = "'Work Sans', sans-serif";

const theme = createTheme({
  typography: {
    fontFamily: font,
  },
  button: {
    fontFamily: font,
  }
});
 
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
          bgcolor: 'rgba(46, 45, 45, 0.1)',
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
          autoPlay loop muted src={bg} />
        
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
            Take a few time to share your voice with us, and together we can create a more inclusive and technologically advanced future.
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
          <Button size='large' color='error' sx={{ mx: "auto", width:'100%', p:1.5, mt:5, maxWidth:'400px' }} variant="contained"
                  onClick={() => navigate('/aboutus')}>
                  Read More About the webssite!
          </Button>
        </Box>
      </Box>
      <Copyright />
    </ThemeProvider>
  )
}

export default Home