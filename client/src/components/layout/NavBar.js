import React from 'react';

import { createStyles, makeStyles, AppBar, StepLabel, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme =>
  createStyles({
    appBar: {
      backgroundColor: '#80cbc4',
      padding: theme.spacing(1),
      marginBottom: theme.spacing(2),
      flexDirection: 'row'
    },
    appIcon: {
      paddingLeft: theme.spacing(1)
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
      <StepLabel className={classes.appIcon} icon={
        <img src={require("../../assets/logo.svg")} alt="" width="24" height="24" />}
      />
      <Typography variant="h5" className={classes.title}>
        Check me!
      </Typography>
    </AppBar>
  )
}

export default NavBar;