import React from 'react'
import { CssBaseline } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';
import { Box } from '@mui/system';

const theme = createTheme();

const Wrap = ({children}) => {
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="100">
        <CssBaseline />
        <Box sx={{ marginTop: 10}}>
           { children}
        </Box>
      </Container>
    </ThemeProvider>
  )
}

export default Wrap