import React, {useState} from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

export function Search() { 
  const classes = useStyles();
  const [searchInput, setSearchInput] = useState('');
  const searchItems = (searchValue) => {
        setSearchInput(searchValue)
  }
  function handleClick() {
    console.log(searchInput);
  }
  return (
    <Paper component="form" className={classes.root}>
      <InputBase
        className={classes.input}
        placeholder="Find Kwikker"
        inputProps={{ 'aria-label': 'search google maps' }} 
        onChange={(e) => searchItems(e.target.value)} />
      <IconButton onClick={ handleClick } className={classes.iconButton} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}