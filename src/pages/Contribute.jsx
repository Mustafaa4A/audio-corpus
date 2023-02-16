import { Modal } from '@mui/material'
import { Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Speak from '../components/Speak'
import Wrap from '../components/Wrap'
import Image from '../assets/bgimage.avif';
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../utils/firebase-config';
import Listen from '../components/Listen'
import Criteria from '../components/Criteria'

const Contribute = () => {
  const [openSpeakModal, setOpenSpeakModal] = useState(false);
  const [openListenModal, setOpenListenModal] = useState(false);

  const [transcriptions, setTranscriptions] = useState([]);
  const [audioTranscriptions, setAudioTranscriptions] = useState([]);
  
  const transCollectionRef = collection(db, "transcriptions");

  const handleSpeakModal = () => setOpenSpeakModal(prev => !prev);
  const handleListenModal = () => setOpenListenModal(prev => !prev);
  
    
  useEffect(() => {
    const loadData = async () => {
      const qu = await query(transCollectionRef, where("recorded", "==", false));
      const docsRef = await getDocs(qu);
      await setTranscriptions(docsRef.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      console.log(transcriptions);
    }
    loadData();
  }, [])

  return (
    <Wrap>
      <Criteria />
      <Button onClick={handleSpeakModal}>Speak</Button>
      <Button onClick={handleListenModal}>Listen</Button>
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
        <Speak onClose={handleSpeakModal} data={transcriptions} />
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