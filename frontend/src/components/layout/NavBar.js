import React from 'react';

import { createStyles, makeStyles, AppBar, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme =>
  createStyles({
    appBar: {
      backgroundColor: '#ff8a65',
      padding: theme.spacing(1),
      marginBottom: theme.spacing(2)
    },
    title: {
      flexGrow: 1,
      color: '#33281ced'
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