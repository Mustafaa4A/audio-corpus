import React, { useState } from "react";
import {
   Button,
   Drawer,
   IconButton,
   List,
   ListItemButton,
   ListItemIcon,
   ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from '../store/reducer';

const DrawerComp = () => {
   const [openDrawer, setOpenDrawer] = useState(false);
   const navigate = useNavigate();
   const isLogin = useSelector(auth => auth.isLogin);
   const user = useSelector(auth => auth.user);
   const dispatch = useDispatch();

   return (
      <React.Fragment>
         <Drawer
            anchor="left"
            open={openDrawer}
            onClose={() => setOpenDrawer(false)}
         >
            <List>
               <ListItemButton>
                  <ListItemIcon>
                     <ListItemText onClick={()=>navigate('/')}>Home</ListItemText>
                  </ListItemIcon>
               </ListItemButton>
               {isLogin && 
                  (
                  <ListItemButton>
                     <ListItemIcon>
                        <ListItemText onClick={()=>navigate('/contribute')}>Contribute</ListItemText>
                     </ListItemIcon>
                  </ListItemButton>
                  )
               }
               {(isLogin && user.roll=='admin' )&& 
                  (
                  <ListItemButton>
                     <ListItemIcon>
                        <ListItemText onClick={()=>navigate('/dataset')}>Dataset</ListItemText>
                     </ListItemIcon>
                  </ListItemButton>
                  )
               }
                {(isLogin && user.roll=='admin' )&& 
                  (
                  <ListItemButton>
                     <ListItemIcon>
                        <ListItemText onClick={()=>navigate('/contributers')}>Contributers</ListItemText>
                     </ListItemIcon>
                  </ListItemButton>
                  )
               }
               <ListItemButton>
                  <ListItemIcon>
                     <ListItemText onClick={()=>navigate('/aboutus')}>About Us</ListItemText>
                  </ListItemIcon>
               </ListItemButton>

               {isLogin && 
               <ListItemButton>
                  <Button sx={{ marginLeft: "auto" }} variant="contained" color='error'
                     onClick={() => dispatch(logout())}>
                     Logout
                  </Button>
               </ListItemButton>
               }
            </List>
         </Drawer>
         <IconButton
            sx={{ color: "white", marginLeft: "auto" }}
            onClick={() => setOpenDrawer(!openDrawer)}
         >
            <MenuIcon color="white" />
         </IconButton>
      </React.Fragment>
   );
};

export default DrawerComp;