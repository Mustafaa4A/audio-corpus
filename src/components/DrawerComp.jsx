import React, { useState } from "react";
import {
   Drawer,
   IconButton,
   List,
   ListItemButton,
   ListItemIcon,
   ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import pages from "../utils/pages";

const DrawerComp = () => {
   const [openDrawer, setOpenDrawer] = useState(false);
   const navigate = useNavigate();

   return (
      <React.Fragment>
         <Drawer
            anchor="left"
            open={openDrawer}
            onClose={() => setOpenDrawer(false)}
         >
            <List>
               {pages.map((page, index) => (
                  <ListItemButton key={index}>
                     <ListItemIcon>
                        <ListItemText onClick={()=>navigate(page.link)}>{page.name}</ListItemText>
                     </ListItemIcon>
                  </ListItemButton>
               ))}
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