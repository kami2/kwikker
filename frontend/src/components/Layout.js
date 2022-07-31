import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { LeftSide } from "./LeftSide";
import { RightSide } from "./RightSide";
import PrivateRoute from "./PrivateRoute";

import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import { NavigationMenu } from "./NavigationMenu";


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    leftMenu: {
        display: 'flex',
        justifyContent: 'flex-end',
        [theme.breakpoints.down('sm')]: {
            display: 'none',
            justifyContent: 'flex-start',
        },
    },
    rightMenu: {
        [theme.breakpoints.down('sm')]: {
            display: 'none'
        },
    },
    burgerMenuButton: {
        color: '#329ba8',
        marginLeft: 5,
        [theme.breakpoints.up('sm')]: {
            display: 'none'
        },
    },
    burgerMenu: {
        margin: 0,
    }
}));

export default function Layout(props) {
    const classes = useStyles();

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };


    return (
        <PrivateRoute>
            <div className={classes.root}>
                <Grid container direction='row' justifyContent="center">
                    <Grid item xs sm={4}>
                        <div className={classes.burgerMenuButton}>
                            <MenuIcon fontSize='large' aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                            </MenuIcon>
                            <Menu
                                id="simple-menu"
                                getContentAnchorEl={null}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'right',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                className={classes.burgerMenu}
                                anchorEl={anchorEl}
                                keepMounted
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                <NavigationMenu />
                            </Menu>
                        </div>
                        <div className={classes.leftMenu}><LeftSide /></div>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        {props.children}
                    </Grid>
                    <Grid item xs sm={4}>
                        <div className={classes.rightMenu}><RightSide /></div>
                    </Grid>
                </Grid>
            </div>
        </PrivateRoute>
    )
}