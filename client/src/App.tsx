import React, { useEffect, useState } from 'react';
import ResponsiveAppBar from './layout/navBar/NavBar';
import { Activity } from './app/models/activity';
import ActivityDashboard from './features/activities/dashboard/activitiesDashboard';
import { v4 as uuid } from 'uuid';
import agent from './app/axios/agent';
import LoadingCompo from './layout/loading/loadingComponent';


const App = () => {

  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  useEffect(() => {
    agent.Activities.list().then(response => {
      let actiivities: Activity[] = [];
      response.forEach(activity => {
        activity.date = activity.date.split('T')[0];
        actiivities.push(activity);
      })
      //console.log(response);
      setActivities(response);
      setLoading(false);
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
    setSubmitting(true);
    if (activity.id) {
      agent.Activities.update(activity).then(() => {
        setActivities([...activities.filter(x => x.id !== activity.id)])
        setSelectedActivity(activity);
        setEditMode(false);
        setSubmitting(false);
      })
    } else {
      activity.id = uuid();
      agent.Activities.create(activity).then(() => {
        setActivities([...activities, activity]);
        setSelectedActivity(activity);
        setEditMode(false);
        setSubmitting(false);
      })
    }
  }

  const handleDeleteActivity = (id: string) => {
    setSubmitting(true);
    agent.Activities.delete(id).then(() => {
      setActivities([...activities.filter(x => x.id !== id)])
    });
    setSubmitting(false);
  }

  if (loading) return <LoadingCompo content="Loading App..." />

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
        submitting={submitting}
      />
    </>
  );
}

export default App;
