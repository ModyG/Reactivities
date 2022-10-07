import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import DeleteIcon from '@mui/icons-material/Delete';

interface Prop {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  venue: string;
  selectActivity: (id: string) => void;
  handleDeleteActivity: (id: string) => void;
}

export default function AlignItemsList({ id, title, date, description, location, venue, selectActivity, handleDeleteActivity }: Prop) {
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
        <Button onClick={() => selectActivity(id)} sx={{ marginRight: '20px' }} variant="contained" endIcon={<SendIcon />} >View</Button>
        <Button onClick={() => handleDeleteActivity(id)} variant="contained" endIcon={<DeleteIcon />}>Delete</Button>
      </ListItem>
      <Divider variant="inset" component="li" />
    </List>
  );
}
