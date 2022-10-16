import React, { useEffect } from 'react';
import ResponsiveAppBar from './layout/navBar/NavBar';
import ActivityDashboard from './features/activities/dashboard/activitiesDashboard';
import { useStore } from './app/stores/store';
import { observer } from 'mobx-react-lite';
import { Route, Routes } from 'react-router-dom';
import HomePage from './features/home/HomePage';
import ActivityForm from './features/activities/form/ActivityForm';
import ActivityDetails from './features/activities/details/activityDetails';

const App = () => {
  const { activityStore } = useStore();
  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);

  return (
    <>
      <ResponsiveAppBar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/Activities' element={<ActivityDashboard />} />
        <Route path='/Activities/:id' element={<ActivityDetails />} />
        <Route path='/CreateActivity' element={<ActivityForm />} />
        <Route path='/CreateActivity/manage/:id' element={<ActivityForm />} />
      </Routes>
    </>
  );
}

export default observer(App);
