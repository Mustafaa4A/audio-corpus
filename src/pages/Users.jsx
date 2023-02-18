import { Box } from '@mui/system';
import { collection, getDocs } from 'firebase/firestore';
import MUIDataTable from 'mui-datatables';
import React, { useEffect, useState } from 'react'
import { LineWave } from 'react-loader-spinner';
import Wrap from '../components/Wrap';
import { db } from '../utils/firebase-config';

const Users = () => {
  const usersCollectionRef = collection(db, "users");
  
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const columns = [
    { name: 'displayName', label: 'Name', },
    { name: 'email', label: 'Email',options:{filter:false} },
    { name: 'roll', label: 'Roll',options:{filter:false}},
    { name: 'num_seconds', label: 'Num Seconds',options:{filter:false}},
  ];

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const docsRef = await getDocs(usersCollectionRef);
      await setData(docsRef.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setLoading(false);
    }
    loadData();
    
  }, [])  

  return (
    <Wrap>
      <Box sx={{
          width: '100%',
          height: '100vh',
          color: 'black',
          margin: 'auto',
          mb:15
        }}>
        {
          !loading ? (
            <MUIDataTable
              title='Contributers'
              data={data}
              columns={columns}
            />
          ) : (
              <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                height: '80vh',
                justifyContent: 'center',
                alignItems:'center'
              }}>
                <LineWave />
            </Box>
          )
        }
      </Box>
    </Wrap>
  )
}

export default Users