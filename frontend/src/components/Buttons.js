import RemoveFromQueueSharpIcon from '@material-ui/icons/RemoveFromQueueSharp';
import { IconButton } from '@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip';
import HomeIcon from '@material-ui/icons/Home';

import { Link } from 'react-router-dom';



export function LogoutButton() {
    return (
            <Link to='/logout'><IconButton><RemoveFromQueueSharpIcon /></IconButton></Link>
    );
}

export function HomeButton() {
    return (
        <Tooltip title="Home">
            <Link to='/'><IconButton><HomeIcon /></IconButton></Link>
        </Tooltip>
    )
}