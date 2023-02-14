import * as React from 'react';
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
import { Grid } from '@mui/material';
import { Link } from 'react-router-dom';


const theme = createTheme();

const SignIn = () => {
   const handleSubmit = (event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      console.log({
         email: data.get('email'),
         password: data.get('password'),
      });
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
               <h1>Login</h1>
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