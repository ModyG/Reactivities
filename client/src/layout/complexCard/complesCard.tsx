import React, { useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { cyan } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import HouseboatIcon from '@mui/icons-material/Houseboat';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useStore } from '../../app/stores/store';
import LoadingCompo from '../loading/loadingComponent';
import { useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default observer(function RecipeReviewCard() {
  const { activityStore } = useStore();
  const { selectedActivity: activity, loadActivity, loadingInitial } = activityStore;
  const { id } = useParams();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    if (id) loadActivity(id);
  }, [id, loadActivity]);


  if (loadingInitial || !activity) return <LoadingCompo content={'Olla'} />;

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: cyan[500] }} aria-label="recipe">
            <HouseboatIcon />
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={activity.title}
        subheader={activity.date}
      />
      <CardMedia
        component="img"
        height="194"
        image={`/assets/categoryImages/${activity.category}.jpg`}
        alt={activity.category}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {activity.city}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {activity.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>
            {activity.venue}
          </Typography>
        </CardContent>
      </Collapse>
      <Stack direction="row" justifyContent={"center"} mb={"10px"} spacing={2}>
        <Button
          variant="contained"
          endIcon={<EditIcon />}
          href={`/CreateActivity/manage/${id}`}
        >
          Edit
        </Button>
        <Button
          variant="outlined"
          startIcon={<DeleteIcon />}
          href={`/Activities`}
        >
          Cancel
        </Button>
      </Stack>
    </Card>
  );
})
