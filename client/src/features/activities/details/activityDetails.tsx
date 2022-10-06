import React from "react";
import { Activity } from "../../../app/models/activity";
import RecipeReviewCard from "../../../layout/complexCard/complesCard";

interface Prop {
  activity: Activity;
  cancelActivity: () => void;
  handleOpenEditForm: (id: string) => void;
}

const ActivityDetails = ({ activity, cancelActivity, handleOpenEditForm }: Prop) => {
  return (
    <RecipeReviewCard 
      activity={activity} 
      cancelActivity={cancelActivity}
      handleOpenEditForm={handleOpenEditForm}
    />
  )
}

export default ActivityDetails;