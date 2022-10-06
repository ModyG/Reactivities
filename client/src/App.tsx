import React, { useEffect, useState } from 'react';
import ResponsiveAppBar from './layout/navBar/NavBar';
import axios from 'axios';
import { Activity } from './app/models/activity';
import ActivityDashboard from './features/activities/dashboard/activitiesDashboard';
import { v4 as uuid } from 'uuid';


const App = () => {

  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    axios.get<Activity[]>('http://localhost:5000/api/activities').then(response => {
      //console.log(response);
      setActivities(response.data);
    })
  }, []);

  const handleSelectActivity = (id: string) => {
    setSelectedActivity(activities.find(x => x.id === id))
  };
  const handleCancelSelectActivity = () => {
    setSelectedActivity(undefined);
  };

  const handleOpenEditForm = (id?: string) => {
    id ? handleSelectActivity(id) : handleCancelSelectActivity();
    setEditMode(true);
  }

  const handleCloseEditForm = () => {
    setEditMode(false);
  }

  const handleCreateOrEditActivity = (activity: Activity) => {
    activity.id ? setActivities([...activities.filter(x => x.id !== activity.id)])
      : setActivities([...activities, { ...activity, id: uuid() }]);
    setEditMode(false);
    setSelectedActivity(activity);
  }

  const handleDeleteActivity = (id: string) => {
    setActivities([...activities.filter(x => x.id !== id )])
  }
  return (
    <>
      <ResponsiveAppBar
        handleOpenEditForm={handleOpenEditForm}
      />
      <ActivityDashboard
        activities={activities}
        selectedActivity={selectedActivity}
        selectActivity={handleSelectActivity}
        cancelActivity={handleCancelSelectActivity}
        editMode={editMode}
        handleOpenEditForm={handleOpenEditForm}
        handleCloseEditForm={handleCloseEditForm}
        handleCreateOrEditActivity={handleCreateOrEditActivity}
        handleDeleteActivity={handleDeleteActivity}
      />
    </>
  );
}

export default App;
