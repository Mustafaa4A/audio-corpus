import React, {useState} from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';

import Container from '@mui/material/Container';
import Copyright from '../components/Copyright';
import { Grid, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getUser, signInUser } from '../utils/firebase-config';
import { login } from '../store/reducer';
import Waiting from '../components/Waiting';



const SignIn = () => {
   const [loading, setLoading] = useState(false);
   const [message, setMessage] = useState();
   const navigate = useNavigate();
   const dispatch = useDispatch();

   const handleSubmit = async (event) => {
      setLoading(true);
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      const email = data.get('email');
      const password = data.get('password');

      if (!password || !email) {
         setMessage("Fill the required fields");
         setLoading(false);
         return;
      }

      try {
         const { user } = await signInUser(email, password);
         const userElement = await getUser(user);
         dispatch(login(userElement));
         setLoading(false);
         return;
      } catch (error) {
         if (error.code === "auth/user-not-found") {
            setMessage("User not found");
            setLoading(false);
            return;
         }

         if (error.code === "auth/wrong-password") {
            setMessage("Worng password");
            setLoading(false);
            return;
         }

         if (error.code === "auth/network-request-failed") {
            setMessage("Network Failed");
            setLoading(false);
            return;
         }

         if (error.code === "auth/too-many-requests") {
            setMessage("Too may requests");
            setLoading(false);
            return;
         }

         if (error.code === "auth/user-disabled") {
            setMessage("You're not allowed to the system, please contact to the adminstrator.");
            setLoading(false);
            return;
         }

         setMessage("Error Ocurred");
         setLoading(false);
      }
   };

   return (
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
            { loading && <Waiting /> }
            <Box >
               <Typography sx={{textAlign:'center'}} variant='h4'>SIGN IN</Typography>
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
      
   );
};

export default SignIn;