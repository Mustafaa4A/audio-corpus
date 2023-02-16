import { Avatar, Box, Grid, Typography } from '@mui/material'
import React from 'react'
import CriteriaItem from './CriteriaItem'

const Criteria = () => {
  return (
    <Box sx={{p:2}}>
      <Typography variant='h4'>Shuruudaha</Typography>
      <Grid container spacing={2} sx={{my:2}}>
        <Grid item xm={12} sm={7}>
          <Typography sx={{ fontSize: '1.15em', textAlign: 'justify' }}>
            Inta aadan bilaabin duubitaanka isku hubi inaad fahantay qoraal shaashada ka muuqda,
            markaa duubitaanka la dhamato kadib si fiican u dhagayso inta aadan dirin ka hor.
          </Typography>
        </Grid>
        <Grid item xm={12} sm={7} mt={3}>
          <CriteriaItem number={1} title="Akhris qaldan" >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque accusamus mollitia architecto hic consequatur, officia consequuntur veritatis nisi nulla itaque exercitationem ipsum minus reiciendis dolores sint nihil numquam voluptatum quaerat.
          </CriteriaItem>
          <CriteriaItem number={1} title="Akhris qaldan" >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque accusamus mollitia architecto hic consequatur, officia consequuntur veritatis nisi nulla itaque exercitationem ipsum minus reiciendis dolores sint nihil numquam voluptatum quaerat.
          </CriteriaItem>
          <CriteriaItem number={1} title="Akhris qaldan" >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque accusamus mollitia architecto hic consequatur, officia consequuntur veritatis nisi nulla itaque exercitationem ipsum minus reiciendis dolores sint nihil numquam voluptatum quaerat.
          </CriteriaItem>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Criteria