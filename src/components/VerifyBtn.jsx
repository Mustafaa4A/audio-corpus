import { Button } from '@mui/material'
import React from 'react'

const VerifyBtn = ({children, ...props}) => {
  return (
    <Button variant='contained' {...props}  sx={{
            width: '120px',
            maxHeight:'60px',
            py:1.2,
            borderRadius: '15px',
            m: 2,
        }}>
          {children}
    </Button>
  )
}

export default VerifyBtn