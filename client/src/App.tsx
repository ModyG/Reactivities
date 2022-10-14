import React, { useEffect } from 'react';
import ResponsiveAppBar from './layout/navBar/NavBar';
import ActivityDashboard from './features/activities/dashboard/activitiesDashboard';
import LoadingCompo from './layout/loading/loadingComponent';
import { useStore } from './app/stores/store';
import { observer } from 'mobx-react-lite';

const App = () => {
  const { activityStore } = useStore();
  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);

  if (activityStore.loadingInitial) return <LoadingCompo content="Loading App..." />

  return (
    <>
      <ResponsiveAppBar/>
      <ActivityDashboard />
    </>
  );
}

export default observer(App);
