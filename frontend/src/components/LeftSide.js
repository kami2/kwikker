import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { NavigationMenu } from './NavigationMenu';


const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(3),
    },
  },
  link: {
    textDecoration: 'none',
  }
}));

export function LeftSide() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid
        container
        direction="column"
        alignItems="flex-start">
        <NavigationMenu />
      </Grid>
    </div>
  );
}