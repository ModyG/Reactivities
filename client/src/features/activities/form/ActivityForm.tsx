import React, { ChangeEvent, useState } from 'react';
//import FilledInput from '@mui/material/FilledInput';
import FormControl from '@mui/material/FormControl';
//import FormHelperText from '@mui/material/FormHelperText';
//import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';

export default observer(function CardEdit() {
  const { activityStore } = useStore();
  const { selectedActivity, closeForm, loading, createActivity, updateActivity } = activityStore;

  const initialState = selectedActivity ?? {
    id: '',
    title: '',
    category: '',
    description: '',
    date: '',
    city: '',
    venue: ''
  }

  const [activity, setActivity] = useState(initialState);

  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    //console.log(activity);
    activity.id ? updateActivity(activity) : createActivity(activity);
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setActivity({ ...activity, [name]: value })
  }

  return (
    <form
      autoComplete="off"
      onSubmit={handleSubmit}
    >

      <FormControl>
        <InputLabel htmlFor="component-outlined">Title</InputLabel>
        <OutlinedInput
          id="component-outlined"
          value={activity.title}
          onChange={handleChange}
          name='title'
          label="Title"
        />
      </FormControl>
      <FormControl>
        <TextField
          fullWidth
          label="Description"
          id="fullWidth"
          name='description'
          value={activity.description}
          onChange={handleChange}
        />
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="component-outlined">Category</InputLabel>
        <OutlinedInput
          id="component-outlined"
          value={activity.category}
          onChange={handleChange}
          name='category'
          label="Category"
        />
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="component-outlined">Date</InputLabel>
        <OutlinedInput
          id="component-outlined"
          value={activity.date}
          onChange={handleChange}
          type='date'
          name='date'
          label="Date"
        />
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="component-outlined">City</InputLabel>
        <OutlinedInput
          id="component-outlined"
          value={activity.city}
          onChange={handleChange}
          name='city'
          label="City"
        />
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="component-outlined">Venue</InputLabel>
        <OutlinedInput
          id="component-outlined"
          value={activity.venue}
          onChange={handleChange}
          name='venue'
          label="Venue"
        />
      </FormControl>
      <Stack direction="row" justifyContent={"center"} mb={"10px"} spacing={2}>
        <Button
          variant="contained"
          type='submit'
          onClick={() => loading}
        >
          Submite
        </Button>
        <Button
          variant="outlined"
          onClick={closeForm}
        >
          Cencel
        </Button>
      </Stack>
    </form>
  );
})

