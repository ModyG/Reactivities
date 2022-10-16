import React, { ChangeEvent, useEffect, useState } from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';
import { useNavigate, useParams } from 'react-router-dom';
import LoadingCompo from '../../../layout/loading/loadingComponent';
import { v4 as uuid } from 'uuid';

export default observer(function CardEdit() {
  let navigate = useNavigate();
  const { activityStore } = useStore();
  const { loading, createActivity, updateActivity, loadActivity, loadingInitial } = activityStore;
  const { id } = useParams();
  const [activity, setActivity] = useState({
    id: '',
    title: '',
    category: '',
    description: '',
    date: '',
    city: '',
    venue: ''
  });

  useEffect(() => {
    if (id) loadActivity(id).then(activity => setActivity(activity!));
  }, [id, loadActivity]);

  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    //console.log(activity);
    if (activity.id.length === 0) {
      let newActivity = {
        ...activity,
        id: uuid()
      }
      createActivity(newActivity).then(() => {
        navigate(`/Activities/${newActivity.id}`);
      })
    } else {
      updateActivity(activity).then(() => {
        navigate(`/Activities/${activity.id}`);
      })
    }
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setActivity({ ...activity, [name]: value })
  }

  if (loadingInitial) return <LoadingCompo content='Loading activity...' />

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
          href='/Activities'
        >
          Cencel
        </Button>
      </Stack>
    </form>
  );
})

