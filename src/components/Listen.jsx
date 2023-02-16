import { Check, Clear, KeyboardVoice, PlayArrow, Stop } from '@mui/icons-material'
import { Box } from '@mui/material'
import React, { useState } from 'react'
import AudioControl from './AudioControl'
import BackArrow from './BackArrow'
import TextDisplay from './TextDisplay'

const Listen = ({ onClose }) => {
  const [playing, setPlaying] = useState(false);

  return (
    <>
    <BackArrow onClick={ onClose } />
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        height:'80vh',
        pt: 12,
        px:2
      }}>
        <TextDisplay> 
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam perferendis adipisci sapiente praesentium est aliquid porro harum reprehenderit commodi obcaecati! Dicta fugit odit numquam deleniti, quod optio sint atque modi.
        </TextDisplay>
        <Box sx={{display:'flex', gap:4, mt:4}}>
          <AudioControl onClick={()=>{}}>
            <Check sx={{
              fontSize: 35,
              color:'#5bc0de'
            }} />
          </AudioControl>
          {
            playing ? (
                <AudioControl onClick={()=>{}}>
                  <Stop  sx={{
                    fontSize: 40,
                    color:'red'
                  }}/> 
              </AudioControl>
            ): (
                <AudioControl onClick={()=>{}}>
                  <PlayArrow sx={{
                    fontSize: 35,
                    color:'green'
                  }} />
                </AudioControl>
            )
          }
          <AudioControl onClick={()=>{}}>
            <Clear sx={{
              fontSize: 35,
              color:'#d9534f'
            }} />
          </AudioControl>
        </Box>
        
      </Box>
    </>
  )
}

export default Listen;