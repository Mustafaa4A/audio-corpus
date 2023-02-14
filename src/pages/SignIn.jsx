import React, {useState} from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';

import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Copyright from '../components/Copyright';
import { Google } from '@mui/icons-material';
import { Grid, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../utils/firebase-config';


const theme = createTheme();

const SignIn = () => {
   const [message, setMessage] = useState();
   const navigate = useNavigate();

   const handleSubmit = async (event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      const email = data.get('email');
      const password = data.get('password');

      if (!password || !email) {
         setMessage("Fill the required fields");
         return;
      }

      try {
         await signInWithEmailAndPassword(auth, email, password);
         navigate('/');
      } catch (error) {
         if (error.code === "auth/user-not-found") {
            setMessage("User not found");
            return;
         }

         if (error.code === "auth/wrong-password") {
            setMessage("Worng password");
            return;
         }

         if (error.code === "auth/network-request-failed") {
            setMessage("Network Failed");
            return;
         }

         if (error.code === "auth/too-many-requests") {
            setMessage("Too may requests");
            return;
         }

         setMessage("Error Ocurred");
      }
   };

   return (
      <ThemeProvider theme={theme}>
         <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
               sx={{
                  marginTop: 8,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
               }}
            >
               <Box >
                  <Typography sx={{textAlign:'center'}} variant='h4'>SIGN UP</Typography>
                  <Typography sx={{ textAlign: 'center', color: 'red', mt:4, fontSize:'1.3em' }} >
                     {message && message}
                  </Typography>
               </Box>
               <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                  <TextField
                     margin="normal"
                     required
                     fullWidth
                     id="email"
                     label="Email Address"
                     name="email"
                     autoComplete="email"
                     autoFocus
                  />
                  <TextField
                     margin="normal"
                     required
                     fullWidth
                     name="password"
                     label="Password"
                     type="password"
                     id="password"
                     autoComplete="current-password"
                  />
                  <FormControlLabel
                     control={<Checkbox value="remember" color="primary" />}
                     label="Remember me"
                  />
                  <Button
                     type="submit"
                     fullWidth
                     variant="contained"
                     sx={{ mt: 3, mb: 1, p: 1, fontSize: '20px', borderRadius: '30px' }}
                  >
                     Sign In
                  </Button>
                  <Grid container justifyContent="flex-end">
                     <Grid item>
                        <Link to="/signup">
                           Don't have an account?
                        </Link>
                     </Grid>
                  </Grid>
                  {/* <Button
                     startIcon={<Google/>}
                     fullWidth
                     variant="contained"
                     color='error'
                     sx={{ mt: 3, mb: 2, p: 1, fontSize: '20px', borderRadius: '30px',opacity:0.9 }}
                  >
                     <span sx={{pr:3}}>  Sign In google</span>
                   
                  </Button> */}
                  
               </Box>
            </Box>
            <Copyright sx={{ mt: 5, }} />
         </Container>
      </ThemeProvider>
   );
};

export default SignIn;