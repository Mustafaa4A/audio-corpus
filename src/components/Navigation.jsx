import React, { useState } from "react";
import { Outlet, useNavigate } from 'react-router-dom'
import {
   AppBar,
   Box,
   Button,
   Tab,
   Tabs,
   Toolbar,
   Typography,
   useMediaQuery,
   useTheme,
} from "@mui/material";
import { AddBusinessRounded, SettingsVoice } from "@mui/icons-material";
import DrawerComp from "./DrawerComp";
import { useDispatch, useSelector } from "react-redux";
import { Avatar } from "@mui/material";
import { logout } from '../store/reducer';

const Navigation = () => {
   const [value, setValue] = useState();
   const theme = useTheme();
   const navigate = useNavigate()
   const isLogin = useSelector(auth => auth.isLogin);
   const user = useSelector(auth => auth.user);
   const dispatch = useDispatch();

   const isMatch = useMediaQuery(theme.breakpoints.down("md"));
   

   return (
      <React.Fragment>
         <AppBar sx={{ background: "#063970" }}>
            <Toolbar>
               <SettingsVoice sx={{ fontSize: 40, }} onClick={ ()=>navigate('/')} />
               {isMatch ? (
                  <>
                     <Typography sx={{ fontSize: "2rem", paddingLeft: "10%" }}>
                        Somali Voice
                     </Typography>
                     <DrawerComp />
                  </>
               ) : (
                  <>
                     <Tabs
                        sx={{ marginLeft: "auto" }}
                        indicatorColor="secondary"
                        textColor="inherit"
                        value={value}
                        onChange={(e, value) => setValue(value)}
                     >
                           
                        <Tab label='Home' onClick={() => navigate('/')} /> 
                        {
                           isLogin &&  <Tab label='Contribute' onClick={() => navigate('/contribute')} />
                        }
                        {
                              (isLogin && user?.roll == 'admin') &&
                              <Tab label='Dataset' onClick={() => navigate('/dataset')} />
                        }
                        {
                           (isLogin && user?.roll == 'admin') &&  <Tab label='Contributers' onClick={() => navigate('/contributers')} />
                        }
                        <Tab label='About Us' onClick={() => navigate('/aboutus')} />

                     </Tabs>
                        {
                           isLogin ? (
                              <Box sx={{ marginLeft: "auto", display:'flex', gap:3 }} variant="contained" >
                                 <Box sx={{ display:'flex', gap:1, alignItems:'center' }} >
                                    <Avatar>{user?.displayName[0]}</Avatar>
                                    <Typography>{ user?.displayName }</Typography>
                                 </Box>
                                 <Button sx={{ marginLeft: "auto" }} variant="contained" color='error'
                                    onClick={() => dispatch(logout())}>
                                    Logout
                                 </Button>
                              </Box>
                           ): (
                              <>
                                 <Button sx={{ marginLeft: "auto" }} variant="contained"
                                    onClick={() => navigate('/Signin')}>
                                    Login
                                 </Button>
                                 <Button sx={{ marginLeft: "10px" }} variant="contained"
                                    onClick={() => navigate('/SignUp')}>
                                    Sign Up
                                 </Button>
                              </>
                           )      
                        }
                        
                  </>
               )}
            </Toolbar>
         </AppBar>
         <Outlet />
      </React.Fragment>
   );
};

export default Navigation;