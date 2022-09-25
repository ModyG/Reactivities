import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Grid, List, ListItem, ListItemText, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';



const Demo = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

function App() {
  const [activities, setActivities] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:5000/api/activities').then(response => {
      console.log(response);
      setActivities(response.data);
    })
  }, []);

  return (
    <div>
      <Box sx={{ flexGrow: 1, maxWidth: 752 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
              Activities
            </Typography>
            <Demo>
              <List>
                {activities.map((activity: any) => (
                  <ListItem key={activity.id}>
                    <ListItemText
                      primary={activity.title}
                    />
                  </ListItem>
                ))}

              </List>
            </Demo>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default App;
