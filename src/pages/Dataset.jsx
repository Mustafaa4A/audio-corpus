import React from 'react'
import { useNavigate } from 'react-router-dom'
import Wrap from '../components/Wrap';

const Dataset = () => {
  const navigate = useNavigate();
  return (
    <Wrap>
      <h1 onClick={()=>navigate('text')}>Text</h1>
      <h1 onClick={()=>navigate('audio')}>Audio</h1>
    </Wrap>
  )
}

export default Dataset