import React from 'react';

import { makeStyles, Box, Snackbar, SnackbarContent } from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import InfoIcon from '@material-ui/icons/Info';
import clsx from 'clsx';

const useStyles1 = makeStyles(theme => ({
  success: {
    backgroundColor: theme.palette.primary.dark,
  },
  info: {
    backgroundColor: '#78909c',
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1),
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
}));

const variantIcon = {
  success: CheckCircleIcon,
  info: InfoIcon,
};

const NotificationContentWrapper = props => {
  const classes = useStyles1();
  const { className, message, onClose, variant, ...other } = props;
  const Icon = variantIcon[variant];

  return (
    <SnackbarContent
      className={clsx(classes[variant], className)}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.message}>
          <Icon className={clsx(classes.icon, classes.iconVariant)} />
          {message}
        </span>
      }
      {...other}
    />
  );
}

const Notification = props => {
  const { message, open, type, onClick } = props;

  return (
    <Box>
      <Snackbar
        autoHideDuration={2000}
        open={open}
        onClose={onClick}
        onClick={onClick}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
      >
        <NotificationContentWrapper
          message={message}
          variant={type}
          onClose={onClick} />
      </Snackbar>
    </Box>
  );
}

export default Notification;

