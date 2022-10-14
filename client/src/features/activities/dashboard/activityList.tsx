import React from "react";
//import RecipeReviewCard from "../../../layout/complexCard/complesCard";
import { ListItem } from '@mui/material';
import AlignItemsList from "../../../layout/itemList/itemList";
import { useStore } from "../../../app/stores/store";

const ActivityList = () => {
  const { activityStore } = useStore();
  const {activitiesByDate} = activityStore;
  return (
    <>
      {activitiesByDate.map(activity => (
        <ListItem key={activity.id}>
          <AlignItemsList
            id={activity.id}
            title={activity.title}
            date={activity.date}
            description={activity.description}
            location={activity.city}
            venue={activity.venue}
          />
        </ListItem>
      ))}
    </>
  )
}

export default ActivityList;