import { Button } from '@mui/material'
import React from 'react'

const CustomBtn = ({children, ...props}) => {
  return (
     <Button variant="contained" {...props}  sx={{
      p: 2,
      px: 10,
      m: 2,
      borderRadius:'50px'
    }}>
    {children}
    </Button>
  )
}

export default CustomBtn