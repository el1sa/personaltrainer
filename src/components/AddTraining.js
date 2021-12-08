import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';


function AddTraining(props) {
    const [open, setOpen] = React.useState(false);

    const [training, setTraining] = React.useState({
        date: '',
        duration: '',
        activity: '',
        customer: 'https://customerrest.herokuapp.com/api/trainings/{id}' // Mitä tähän tulee?
    })

    const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
      props.addTraining(training);
      handleClose();
  }

  const inputChanged = e => {
      setTraining({...training, [e.target.name]: e.target.value })
  }

    return (
        <div>
        <Button variant="contained" onClick={handleClickOpen}>
        Add Training
        </Button>
        <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Training</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            name="date"
            value={training.date}
            onChange={inputChanged}
            label="Date"        
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            name="duration"
            value={training.duration}
            onChange={inputChanged}
            label="Duration"        
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            name="activity"
            value={training.activity}
            onChange={inputChanged}
            label="Activity"        
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
        </div>
    );
}

export default AddTraining;