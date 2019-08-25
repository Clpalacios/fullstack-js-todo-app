import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme =>
  createStyles({
    appBar: {
      backgroundColor: '#eac0c0',
      padding: theme.spacing(1),
      marginBottom: theme.spacing(2)
    },
    title: {
      flexGrow: 1,
      color: '#58534ded'
    },
  })
);

const NavBar = () => {
  const classes = useStyles();

  return (
    <AppBar position="static" className={classes.appBar}>
      <Typography variant="h5" className={classes.title}>
        TODO App
      </Typography>
    </AppBar>
  )
}

export default NavBar;