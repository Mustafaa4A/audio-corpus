import  React, {useState} from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Copyright from '../components/Copyright';
import { Link, useNavigate } from 'react-router-dom';
import { SignUpUser, saveUser, getUser } from '../utils/firebase-config';
import { useDispatch } from 'react-redux';
import {login} from '../store/reducer'
import Waiting from '../components/Waiting';


const SignUp = () => {
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const [message, setMessage] = useState();
   const [loading, setLoading] = useState(false);

   const handleSubmit = async (event) => {
      setLoading(true);
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      const fname = data.get('firstName');
      const lname = data.get('lastName');
      const displayName = data.get('firstName') + ' ' + data.get('lastName');
      const email = data.get('email');
      const password = data.get('password');
      const confirmPassword = data.get('confirmPassword');

      if (!fname || !lname || !password || !email || !confirmPassword) {
         setMessage("Fill the required fields");
         setLoading(false);
         return;
      }

      if (password !== confirmPassword) {
         setMessage("Password Does Not Match");
         setLoading(false);
         return;
      }

      try {
         const { user } = await SignUpUser(email, password);
         await saveUser(user, { displayName, roll: 'user' });
         const userElement = await getUser(user);
         dispatch(login(userElement))
         setLoading(false);
         navigate('/');
         return;
      } catch (error) {
         if (error.code === "auth/invalid-email") {
            setMessage("Invalid email");
            setLoading(false);
            return;
         }

         if (error.code === "auth/email-already-in-use") {
            setMessage("Email has already in use");
            setLoading(false);
            return;
         }

         if (error.code === "auth/weak-password") {
            setMessage("Password should be at least 6 characters");
            setLoading(false);
            return;
         }

         setMessage("An error occured");
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
               <Typography sx={{textAlign:'center'}} variant='h4'>SIGN UP</Typography>
               <Typography sx={{ textAlign: 'center', color: 'red', mt:4, fontSize:'1.3em' }} >
                  {message && message}
               </Typography>
            </Box>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
               <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                     <TextField
                        autoComplete="given-name"
                        name="firstName"
                        required
                        fullWidth
                        id="firstName"
                        label="First Name"
                        autoFocus
                     />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                     <TextField
                        required
                        fullWidth
                        id="lastName"
                        label="Last Name"
                        name="lastName"
                        autoComplete="family-name"
                     />
                  </Grid>
                  <Grid item xs={12}>
                     <TextField
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                     />
                  </Grid>
                  <Grid item xs={12}>
                     <TextField
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="new-password"
                     />
                  </Grid>
                  <Grid item xs={12}>
                     <TextField
                        required
                        fullWidth
                        name="confirmPassword"
                        label="confirm Password"
                        type="password"
                        id="confirmPassword"
                     />
                  </Grid>
               </Grid>
               <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 5, mb: 2, p: 1, fontSize: '20px', borderRadius: '30px' }}
               >
                  Sign Up
               </Button>
               <Grid container justifyContent="flex-end">
                  <Grid item>
                     <Link to="/signin">
                        Already have an account? Sign in
                     </Link>
                  </Grid>
               </Grid>
            </Box>
         </Box>
         <Copyright sx={{ mt: 5 }} />
      </Container>
   );
};

export default SignUp;