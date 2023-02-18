import { Modal, Button, Box, Typography } from '@mui/material';
import React, { useState } from 'react'
import Speak from '../components/Speak'
import Wrap from '../components/Wrap'
import Image from '../assets/bgimage.avif';
import Listen from '../components/Listen'
import Criteria from '../components/Criteria'
import { useSelector } from 'react-redux';
import { ArrowDownward } from '@mui/icons-material';

const Contribute = () => {
  const user = useSelector(auth => auth.user);
  const [openSpeakModal, setOpenSpeakModal] = useState(false);
  const [openListenModal, setOpenListenModal] = useState(false);


  const handleSpeakModal = () => setOpenSpeakModal(prev => !prev);
  const handleListenModal = () => setOpenListenModal(prev => !prev);

  return (
    <Wrap>
      <Criteria />
      <Typography sx={{ fontSize: '1.15em', textAlign: 'justify', mb:3, display:'flex' }}>
        Si aad u bilowdo riix badhanka hoose <ArrowDownward color='error' />
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          gap:2
        }}
      >

      <Button
        sx={{
          display:'block',
          width: '100%',
          maxWidth: '500px',
          p:2
        }}
        variant='contained' onClick={handleSpeakModal}>Speak Now</Button>
        {(user.roll === 'admin') && <Button variant='contained'
          sx={{
            display:'block',
            width: '100%',
            maxWidth: '500px',
            // my: 2,
            p:2
          }}
          onClick={handleListenModal}>Listen Now</Button>}
        </Box>
      <Modal
        open={openSpeakModal}
        onClose={handleSpeakModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          background: `url(${Image})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          overflowY:'scroll'
        }}
      >
        <Speak onClose={handleSpeakModal} />
      </Modal>
      <Modal
        open={openListenModal}
        onClose={handleListenModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          background: `url(${Image})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          overflowY:'scroll'
        }}
      >
        <Listen onClose={ handleListenModal } />
      </Modal>
      
    </Wrap>
  )
}

export default Contribute