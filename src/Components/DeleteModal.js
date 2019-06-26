import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Fab from '@material-ui/core/Fab';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(4),
    outline: 'none',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)'
  },
  eraseIcon: {
    height: 8,
    width: 34,
    backgroundColor: '#f6faff',
  }
}));

const DeleteModal = props => {
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <Fab className={classes.eraseIcon} onClick={handleOpen}>
        <CloseIcon className={classes.textColor} />
      </Fab>
      <Modal
        open={open}
        onClose={handleClose}
      >
        <div className={classes.paper}>
          <Typography variant="h6" id="modal-title">
            Do you want to delete user - {props.nickname}?
          </Typography>
          <Grid
            container
            direction="row"
            justify="flex-end"
            alignItems="center"
          >
            <Button onClick={handleClose}>
              No
          </Button>
            <Button onClick={() => props.delete(props.nickname)}>
              Yes
          </Button>
          </Grid>
        </div>
      </Modal>
    </div>
  );
}

export default DeleteModal;
