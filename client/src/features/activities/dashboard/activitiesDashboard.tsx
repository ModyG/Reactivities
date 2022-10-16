import React, { useEffect } from 'react';
import { Grid } from '@mui/material';
import ActivityList from './activityList';
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';
import LoadingCompo from '../../../layout/loading/loadingComponent';

export default observer(function ActivityDashboard() {

  const { activityStore } = useStore();
  const { loadingInitial, loadActivities, activityRegistry } = activityStore;

  useEffect(() => {
    if (activityRegistry.size <= 1) loadActivities();
  }, [activityRegistry.size, loadActivities])

  if (loadingInitial) return <LoadingCompo content="Loading App..." />
  return (
    <Grid container spacing={2}>
      <Grid item xs={8} md={8}>
        <ActivityList />
      </Grid>
    </Grid>
  )
})
