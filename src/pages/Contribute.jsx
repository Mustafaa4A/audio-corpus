import { Modal, Button } from '@mui/material';
import React, { useEffect, useState } from 'react'
import Speak from '../components/Speak'
import Wrap from '../components/Wrap'
import Image from '../assets/bgimage.avif';
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../utils/firebase-config';
import Listen from '../components/Listen'
import Criteria from '../components/Criteria'
import CustomBtn from '../components/CustomBtn';
import { useSelector } from 'react-redux';

const Contribute = () => {
  const user = useSelector(auth => auth.user);
  const [openSpeakModal, setOpenSpeakModal] = useState(false);
  const [openListenModal, setOpenListenModal] = useState(false);

  const [transcriptions, setTranscriptions] = useState([]);
  const [audioTranscriptions, setAudioTranscriptions] = useState([]);
  
  const transCollectionRef = collection(db, "transcriptions");

  const handleSpeakModal = () => setOpenSpeakModal(prev => !prev);
  const handleListenModal = () => setOpenListenModal(prev => !prev);

  return (
    <Wrap>
      <Criteria />
      <Button variant='contained' onClick={handleSpeakModal}>Speak</Button>
      { (user.roll === 'admin') && <Button onClick={handleListenModal}>Listen</Button>}
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