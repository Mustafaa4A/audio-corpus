import { Divider } from '@mui/material'
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
           Markaad dhegaysanayso, si taxadir leh u hubi in waxa la duubay ay yihiin waxa shaashada ku qoray; ka laabo haddii ay jiraan xitaa khaladaad yaryar.
          </CriteriaItem>
        </Grid>
        <Grid item xm={12} sm={7} mt={3}>
          <CriteriaItem number={2} title="dhawaaqa kala duwan" >
            Si fiican uga taxadir ereyada isku dhigaal ah lakiin kala dhawaaqa ah adigoo u eegeya jumlada ay ku jiraan.
            Sidoo kale ereyada asal ahaan ka imaaday laba iyo ka badan erey oo la iski keenay.
          </CriteriaItem>
        </Grid>
        <Grid item xm={12} sm={7} mt={3}>
          <CriteriaItem number={3} title="Codadka kale iyo buuqa" >
            Si fiican uga taxadir in ay soo galaan codad kale ama dhawaq aan ka mid ahay codka aad duubayso. Isku day inaad ku duunbo goob aan lahyn buuq iyo waxa la midka ah.
          </CriteriaItem>
        </Grid>
        <Grid item xm={12} sm={7}>
          <Typography sx={{ fontSize: '1.15em', textAlign: 'justify' }}>
            Ugu dambayn, mugga codka waa wax dabiici ah; qofna wuu cod dheeraan karaa midkale na wuu cod gaabnaan karaa dhib malah, lakiin waxa ka taxadirtaa codka inuu noqdo mid aan u hooseeya ama aad u sareya dhawaq ahaan. <br/>
            Sidoo kale codka saaid ha boobsiin ama saaid ha u kala dhigdhigin waxa ka dhigtaa sida ugu macquulsan.
          </Typography>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Criteria