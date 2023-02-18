import { Link, Typography } from '@mui/material';
import React from 'react';

const Copyright = (props) => {
  return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
         {'Copyright © '}
         <Link color="inherit" href="/">
            FYP2023@just
         </Link>{' '}
         {new Date().getFullYear()}
         {'.'}
      </Typography>
   );
}

export default Copyright;