import React from "react";
import { Activity } from "../../../app/models/activity";
//import RecipeReviewCard from "../../../layout/complexCard/complesCard";
import { ListItem } from '@mui/material';
import AlignItemsList from "../../../layout/itemList/itemList";

interface Prop {
  activities: Activity[];
  selectActivity: (id: string) => void;
  handleDeleteActivity: (id: string) => void; 
}

const ActivityList = ({ activities, selectActivity, handleDeleteActivity }: Prop) => {
  return (
    <>
      {activities.map(activity => (
        <ListItem key={activity.id}>
          <AlignItemsList 
            selectActivity={selectActivity}
            id={activity.id}
            title={activity.title}
            date={activity.date}
            description={activity.description}
            location={activity.city}
            venue={activity.venue}
            handleDeleteActivity= {handleDeleteActivity}
          />
        </ListItem>
      ))}
    </>
  )
}

export default ActivityList;