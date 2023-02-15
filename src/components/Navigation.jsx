import React, { useState } from "react";
import { Outlet, useNavigate } from 'react-router-dom'
import {
   AppBar,
   Button,
   Tab,
   Tabs,
   Toolbar,
   Typography,
   useMediaQuery,
   useTheme,
} from "@mui/material";
import { AddBusinessRounded } from "@mui/icons-material";
import DrawerComp from "./DrawerComp";
import pages from "../utils/pages";

const Navigation = () => {
   const [value, setValue] = useState();
   const theme = useTheme();
   const navigate = useNavigate()

   const isMatch = useMediaQuery(theme.breakpoints.down("md"));
   

   return (
      <React.Fragment>
         <AppBar sx={{ background: "#063970" }}>
            <Toolbar>
               <AddBusinessRounded sx={{ transform: "scale(2)" }} />
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
                        {
                           pages.map((page, index) => (
                              <Tab key={index} label={page.name} onClick={() => navigate(page.link)} />
                           ))
                        }

                     </Tabs>
                     <Button sx={{ marginLeft: "auto" }} variant="contained"
                        onClick={() => navigate('/Signin')}>
                        Login
                     </Button>
                     <Button sx={{ marginLeft: "10px" }} variant="contained"
                        onClick={() => navigate('/SignUp')}>
                        Sign Up
                     </Button>
                  </>
               )}
            </Toolbar>
         </AppBar>
         <Outlet />
      </React.Fragment>
   );
};

export default Navigation;