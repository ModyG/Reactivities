import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import DeleteIcon from '@mui/icons-material/Delete';
import { useStore } from '../../app/stores/store';
import { observer } from 'mobx-react-lite';
import { LoadingButton } from '@mui/lab';

interface Prop {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  venue: string;
}

export default observer(function AlignItemsList({ id, title, date, description, location, venue }: Prop) {
  const { activityStore } = useStore();
  const { selectActivity, deleteActivity, loading } = activityStore;

  return (
    <List sx={{ width: '100%', maxWidth: 560, bgcolor: 'background.paper' }}>
      <ListItem alignItems="flex-start">
        <ListItemText
          primary={title}
          secondary={
            <Typography
              sx={{ display: 'inline' }}
              component="span"
              variant="body2"
              color="text.primary"
            >
              {date}<br />{location}<br />{description}<br />{venue}
            </Typography>
          }
        />
        <Button
          onClick={() => selectActivity(id)}
          sx={{ marginRight: '20px' }}
          variant="contained"
          endIcon={<SendIcon />}
        >
          View
        </Button>
        <LoadingButton
          onClick={() => deleteActivity(id)}
          variant="contained"
          endIcon={<DeleteIcon />}
          loading={loading}
        >
          Delete
        </LoadingButton>
      </ListItem>
      <Divider variant="inset" component="li" />
    </List>
  );
})
