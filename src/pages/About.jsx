import { Send } from '@mui/icons-material'
import { Button, Link, TextField } from '@mui/material'
import {  Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import Wrap from '../components/Wrap'
const About = () => {
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log(data.get('name'));
    console.log(data.get('message'));


  }
  return (
    <Wrap>
      <Box mt='50px'>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            gap: 3,
            maxWidth: '800px',
            my: 15,
            mb:5
          }} 
        >
          <Typography  textTransform='uppercase'variant='h6' fontWeight='bold' mb='10px'>Welcome to our website!</Typography>
          <Typography>
            We are working to build the accuracy of Automatic Speech Recognition (ASR) in the Somali language, and we need your help.
          </Typography>
          <Typography>
            By contributing your voice to our data collection efforts, you can help us train our ASR system more efficiently and effectively.
          </Typography>
            <Typography>
              Your contributions will not only help us improve ASR technology, but they will also help make speech recognition more accessible to Somali speakers around the world. 
          </Typography>
          <Typography>
            So please take a few minutes to share your voice with us, and together we can create a more inclusive and technologically advanced future. 
          </Typography>
          <Typography variant='h6' fontFamily='bold' mb='10px'>Thank you for your participation!</Typography>
          
        </Box>
        <Typography fontSize='1.5em' fontFamily='bold' mb='10px'>For more information feel free to leave us your message:</Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3, maxWidth:'600px' }}>
          <TextField
            autoComplete="given-name"
            name="name"
            required
            fullWidth
            id="name"
            label="Your Name"
            sx={{mb:5}}
          />

          <TextField
            autoComplete="given-name"
            name="message"
            required
            fullWidth
            id="message"
            label="Message"
            multiline
            rows={6}
            sx={{mb:5}}
          />
          <Button type="submit" startIcon={<Send />} size='large' variant='contained'  sx={{ml:'auto'}}>
            SEND
          </Button>
        </Box>
        <Box sx={{mt:3}}>
          <Link href='https://wa.me/+252683891399'
            sx={{ p: 2, textDecoration: 'none', bgcolor: 'green', color: 'white', borderRadius: '10px', cursor: 'pointer' }}>Whatsapp
          </Link>
          <Link href='mailto: 4a.ascad@gmail.com'
            sx={{ p: 2,ml:2, textDecoration: 'none', bgcolor: '#E84D7B', color: 'white', borderRadius: '10px', cursor: 'pointer' }}>Email
          </Link>
        </Box>
      </Box>
    </Wrap>
  )
}

export default About