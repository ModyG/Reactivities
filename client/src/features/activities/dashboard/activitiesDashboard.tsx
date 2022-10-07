import React from 'react';
import { Grid } from '@mui/material';
import { Activity } from '../../../app/models/activity';
import ActivityList from './activityList';
import ActivityDetails from '../details/activityDetails';
import CardEdit from '../form/ActivityForm';

interface Prop {
  activities: Activity[];
  selectedActivity: Activity | undefined;
  selectActivity: (id: string) => void;
  cancelActivity: () => void;
  editMode: boolean;
  handleOpenEditForm: (id: string) => void;
  handleCloseEditForm: () => void;
  handleCreateOrEditActivity: (activity: Activity) => void;
  handleDeleteActivity: (id: string) => void;
  submitting: boolean;
}

const ActivityDashboard = ({ activities, selectedActivity, selectActivity, cancelActivity, editMode, handleOpenEditForm, 
      handleCloseEditForm, handleCreateOrEditActivity, handleDeleteActivity, submitting }: Prop) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={8} md={8}>
        <ActivityList
          activities={activities}
          selectActivity={selectActivity}
          handleDeleteActivity={handleDeleteActivity}
        />
      </Grid>
      <Grid item xs={4} md={4} mt={"30px"}>
        {selectedActivity && !editMode &&
          <ActivityDetails
            activity={selectedActivity}
            cancelActivity={cancelActivity}
            handleOpenEditForm={handleOpenEditForm}
          />}
        {editMode &&
          <CardEdit
            activity={selectedActivity}
            handleCloseEditForm={handleCloseEditForm}
            handleCreateOrEditActivity={handleCreateOrEditActivity}
            submitting={submitting}
          />}
      </Grid>
    </Grid>
  )
}

export default ActivityDashboard;