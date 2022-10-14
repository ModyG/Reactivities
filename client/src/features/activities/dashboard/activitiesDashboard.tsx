import React from 'react';
import { Grid } from '@mui/material';
import ActivityList from './activityList';
import ActivityDetails from '../details/activityDetails';
import CardEdit from '../form/ActivityForm';
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';

export default observer(function ActivityDashboard() {

  const { activityStore } = useStore();
  const { selectedActivity, editMode } = activityStore;
  return (
    <Grid container spacing={2}>
      <Grid item xs={8} md={8}>
        <ActivityList />
      </Grid>
      <Grid item xs={4} md={4} mt={"30px"}>
        {selectedActivity && !editMode &&
          <ActivityDetails />}
        {editMode &&
          <CardEdit />}
      </Grid>
    </Grid>
  )
})
